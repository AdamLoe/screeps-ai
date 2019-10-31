import { SpacersChoiceRoom } from '../base-classes/room';
import { SpacersChoiceSource } from '../base-classes/source';
import { SpacersChoiceSpawn } from '../base-classes/spawn';
import { SpacersChoiceCitizen } from '../citizen/citizen';
import { SpacersChoiceMemory } from '../memory/memory';
import { buildSpawnRequestsForTownship, ISpawnRequest } from '../planning/spawn-requests';
import { buildTaskRequestsForTownship, ITaskRequest } from '../planning/task-requests';
import { getSpacerId } from '../util/utils';
import {SpacersChoiceCreep} from "../base-classes/creep";

export interface ITownshipCachedRequests {
  gcl: number;
  maxEnergy: number;
  spawnRequests: ISpawnRequest[];
  taskRequests: ITaskRequest[];
}

export interface ITownshipMemory {
  cachedRequests?: ITownshipCachedRequests;
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

  /**
   * Default Constructor. Load our data from our room/creeps
   */
  constructor(data: {
    spacerId?: string,
    primaryRoom: SpacersChoiceRoom,
    rooms: SpacersChoiceRoom[],
    creeps: SpacersChoiceCreep[],
    sources: SpacersChoiceSource[],
    spawns: SpacersChoiceSpawn[]
  }) {
    const { spacerId, primaryRoom, rooms, creeps, sources, spawns } = data;

    // TODO: We are using these IDs in spawn/task so we can't be generating on every tick
    this.spacerId = spacerId || getSpacerId();
    this.primaryRoom = primaryRoom;
    this.rooms = rooms;
    this.creeps = creeps;
    this.sources = sources;
    this.spawns = spawns;
    this.memory = SpacersChoiceMemory.getTownshipMemory(this.spacerId);
    console.log(JSON.stringify(rooms));
    console.log(JSON.stringify(creeps));
    console.log(JSON.stringify(sources));
    console.log(JSON.stringify(spawns));
  }

  /**
   * Handle of all of the tasks/spawning our townships should be assigning on this tick
   */
  run() {
    if (this.areCachedRequestsOutOfDate()) {
      this.buildAndCacheRequests();
    }
    this.creeps.forEach((creep) => {
      creep.run();
    });
  }
  /**
   * Are we cached task && spawn requests list out of date
   */
  areCachedRequestsOutOfDate() {
    if (this.memory.cachedRequests) {
      const gclChanged = this.primaryRoom.gcl !== this.memory.cachedRequests.gcl;
      const energyCapacityChanged = this.primaryRoom.energyCapacity !== this.memory.cachedRequests.maxEnergy;
      return gclChanged || energyCapacityChanged;

    } else {
      return true;
    }
  }

  /**
   * Build and cache our new task/spawn request lists
   */
  buildAndCacheRequests() {
    this.spawnRequests = buildSpawnRequestsForTownship(this);
    this.taskRequests = buildTaskRequestsForTownship(this);
    this.memory.cachedRequests = {
      gcl: this.primaryRoom.gcl,
      maxEnergy: this.primaryRoom.energy,
      spawnRequests: this.spawnRequests,
      taskRequests:  this.taskRequests
    };
  }
}
