import { SpacersChoiceRoom } from './base-classes/room';
import { SpacersChoiceSource } from './base-classes/source';
import { SpacersChoiceSpawn } from './base-classes/spawn';
import { ICreepMemory, SpacersChoiceCreep } from './creep';
import { SpacersChoiceMemory } from './memory';
import { buildSpawnRequestsForTownship, getSpawnCost, ISpawnRequest } from './spawning/spawn-requests';
import { ITaskRequest } from './tasks/task-request.interface';
import { assignTaskRequestsForTownship, buildTaskRequestsForTownship } from './tasks/task-requests';
import { getSpacerId } from './util/utils';

export interface ITownshipCachedRequests {
  gcl: number;
  maxEnergy: number;
  spawnRequests: ISpawnRequest[];
}

export interface ITownshipMemory {
  cachedRequests: ITownshipCachedRequests;
  primaryRoomId: string;
  rooms: string[];
}

/**
 * Townships handle spawning citizens and delegating tasks based on objects inside of the room
 */
export class Township {

  /**
   * The ID we store our township with
   */
  spacerId: string;
  primaryRoom: SpacersChoiceRoom;
  controller: StructureController;
  rooms: SpacersChoiceRoom[];
  creeps: SpacersChoiceCreep[];
  sources: SpacersChoiceSource[];
  spawns: SpacersChoiceSpawn[];
  memory: ITownshipMemory;
  spawnRequests: ISpawnRequest[];

  /*
  **********************************************
  *                    INIT                    *
  **********************************************
  */

  /**
   * Default Constructor. Load our data from our room/creeps
   */
  constructor(data: {
    spacerId: string,
    primaryRoom: SpacersChoiceRoom,
    rooms: SpacersChoiceRoom[],
    creeps: SpacersChoiceCreep[],
    sources: SpacersChoiceSource[],
    spawns: SpacersChoiceSpawn[]
  }) {
    const { spacerId, primaryRoom, rooms, creeps, sources, spawns } = data;

    this.spacerId = spacerId;
    this.primaryRoom = primaryRoom;
    this.controller = primaryRoom.controller as StructureController;
    this.rooms = rooms;
    this.creeps = creeps;
    this.sources = sources;
    this.spawns = spawns;
    this.memory = SpacersChoiceMemory.getTownshipMemory(this.spacerId);

    // Update our memory data
    this.memory.rooms = rooms.map((room) => room.spacerId);

    // Controllers can be null for no reason :(
    if (!this.controller) {
      const roomControllers = primaryRoom
          .find(FIND_STRUCTURES)
          .filter((struct) => struct.structureType === STRUCTURE_CONTROLLER);
      this.controller = roomControllers[0] as StructureController;
    }

    this.spawnRequests = this.getSpawnRequests();
  }

  /**
   * Get our spawn requests. If cache is expired/null, reset our cache
   */
  getSpawnRequests(): ISpawnRequest[] {
    if (this.areCachedRequestsOutOfDate()) {
      this.memory.cachedRequests = {
        gcl: this.primaryRoom.gcl,
        maxEnergy: this.primaryRoom.energy,
        spawnRequests: buildSpawnRequestsForTownship(this)
      };
    }
    return this.memory.cachedRequests.spawnRequests;
  }

  /**
   * Are we cached task && spawn requests list out of date
   */
  areCachedRequestsOutOfDate() {
    if (this.memory.cachedRequests) {
      const gclChanged = this.primaryRoom.gcl !== (this.memory.cachedRequests as any).gcl;
      const energyCapacityChanged = this.primaryRoom.energyCapacity !== this.memory.cachedRequests.maxEnergy;
      return gclChanged || energyCapacityChanged;

    } else {
      return true;
    }
  }

  /*
  **********************************************
  *                    RUN                     *
  **********************************************
  */

  /**
   * Handle of all of the tasks/spawning our townships should be assigning on this tick
   */
  run() {
    this.assignSpawnRequests();
    const taskRequests = buildTaskRequestsForTownship(this);
    assignTaskRequestsForTownship(this, taskRequests);
    this.runCreeps();
  }

  runCreeps() {
    this.creeps.forEach((creep) => {
      creep.run(this);
    });
  }

  /**
   * Assign our spawn requests to a spawner if we have spawn requests that need processing
   */
  assignSpawnRequests() {
    const neededSpawns = this.spawnRequests
      // Is the creep not alive
      .filter((spawnRequest) => {
        if (spawnRequest.creepSpacerId) {
          const creepIsAlive = this.creeps.some((creep) => {
            return creep.spacerId === spawnRequest.creepSpacerId;
          });
          return !creepIsAlive;

        } else {
          return true;
        }
      })
      // Is the creep not being spawned right now
      .filter((spawnRequest) => {
        const spawningNow = this.spawns.some((spawn) => {
          if (spawn.spawning) {
            return spawn.spawning.name === spawnRequest.creepSpacerId;
          } else {
            return false;
          }
        });
        return !spawningNow;
      })
      // Sort by priority
      .sort((s1, s2) => s2.priority - s1.priority);

    // For each spawn, see if we need to spawn something
    this.spawns.forEach((spawn) => {
      const notSpawning = !spawn.spawning;
      const needToSpawn = !!neededSpawns[0];
      // TODO: We need the energy to do it as well

      // Can only spawn if we aren't spawning, and there is something to spawn
      if (notSpawning && needToSpawn) {
        const spawnRequest = neededSpawns[0];
        const haveEnoughEnergy = spawn.energy >= getSpawnCost(spawnRequest);

        // We don't want waste CPU by trying to spawn when we can't
        if (haveEnoughEnergy) {
          const bodyParts = spawnRequest.bodyParts;
          const spacerId = 'Person:' + getSpacerId();
          spawnRequest.creepSpacerId = spacerId;

          spawn.spawnCreep(
            bodyParts,
            spacerId,
            {
              memory: {
                townshipId: spawnRequest.townshipId,
                job: spawnRequest.job,
                taskRequests: [],
                taskMemory: {}
              } as ICreepMemory
            }
          );
          // TODO: Get rid of this spawn request
        }
      }
    });
  }
}
