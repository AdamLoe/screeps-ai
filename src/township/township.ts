import { SpacersChoiceCreep } from '../base-classes/creep';
import { SpacersChoiceRoom } from '../base-classes/room';
import { SpacersChoiceSource } from '../base-classes/source';
import { SpacersChoiceSpawn } from '../base-classes/spawn';
import { SpacersChoiceMemory } from '../memory/memory';
import { buildSpawnRequestsForTownship, ISpawnRequest } from '../planning/spawn-requests';
import { buildTaskRequestsForTownship, ITaskRequest } from '../planning/task-requests';
import { getSpacerId } from '../util/utils';

export interface ITownshipCachedRequests {
  gcl: number;
  maxEnergy: number;
  spawnRequests: ISpawnRequest[];
  taskRequests: ITaskRequest[];
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
  rooms: SpacersChoiceRoom[];
  creeps: SpacersChoiceCreep[];
  sources: SpacersChoiceSource[];
  spawns: SpacersChoiceSpawn[];
  memory: ITownshipMemory;
  spawnRequests: ISpawnRequest[];
  taskRequests: ITaskRequest[];

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
    this.rooms = rooms;
    this.creeps = creeps;
    this.sources = sources;
    this.spawns = spawns;
    this.memory = SpacersChoiceMemory.getTownshipMemory(this.spacerId);

    if (!this.memory.primaryRoomId) {
      this.memory.primaryRoomId = primaryRoom.spacerId;
      this.memory.rooms = rooms.map((room) => room.spacerId);
    }

    this.spawnRequests = this.getSpawnRequests();
    this.taskRequests = this.getTaskRequests();
  }

  /**
   * Get our spawn requests. If cache is expired/null, reset our cache
   */
  getSpawnRequests(): ISpawnRequest[] {
    if (this.areCachedRequestsOutOfDate()) {
      this.memory.cachedRequests = {
        gcl: this.primaryRoom.gcl,
        maxEnergy: this.primaryRoom.energy,
        spawnRequests: buildSpawnRequestsForTownship(this),
        taskRequests: []
      };
    }
    return this.memory.cachedRequests.spawnRequests;
  }

  /**
   * Get our task requests. Build new task list of every tick
   */
  getTaskRequests() {
    // Wait a sec, some tasks need to persist
    // So how do I keep harvest tasks persistent
    this.memory.cachedRequests.taskRequests = buildTaskRequestsForTownship(this);
    return this.memory.cachedRequests.taskRequests;
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
    this.runCreeps();
    this.runSpawns();
  }

  runCreeps() {
    this.creeps.forEach((creep) => {
      creep.run();
    });
  }

  /**
   * On RUN, spawn any pendingRequests
   */
  runSpawns() {
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
      const needToSpawn = neededSpawns[0];

      // Can only spawn if we aren't spawning, and there is something to spawn
      if (notSpawning && needToSpawn) {
        const spawnRequest = neededSpawns[0];

        const bodyParts = spawnRequest.bodyParts;
        const spacerId = 'Person:' + getSpacerId();
        spawnRequest.creepSpacerId = spacerId;

        spawn.spawnCreep(
          bodyParts,
          spacerId
        );
      }
    });
  }
}
