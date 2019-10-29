import {Citizen, SpacersChoiceCreep} from '../citizen/spacer-citizen';
import {getSpacerId} from '../util/utils';
import {SpacersChoiceRoom} from './spacer-room';
import {buildSpawnRequestsForTownship, ISpawnRequest} from './spawn-requests';
import {buildTaskRequestsForTownship, ITaskRequest} from './task-requests';
import {SpacersChoiceBoard} from "../spacers-choice-board";
import {SpacersChoiceMemory} from "../memory/spacer-memory";

export interface ITownshipCachedRequests {
  gcl: number;
  maxEnergy: number;
  spawnRequests: ISpawnRequest[];
  taskRequests: ITaskRequest[];
}

export interface ITownshipMemory {
  cachedRequests?: ITownshipCachedRequests;
}

/**
 * Townships handle spawning citizens and delegating tasks based on objects inside of the room
 */
export class SpacerTownship {
  spacerId: string;
  primaryRoom: SpacersChoiceRoom;
  citizens: { [spacerId: string]: Citizen};
  memory: ITownshipMemory;
  spawnRequests: ISpawnRequest[];
  taskRequests: ITaskRequest[];

  /**
   * Default Constructor. Load our data from our room/creeps
   */
  constructor(room: Room, creeps: SpacersChoiceCreep[]) {
    // TODO: We need to get these IDs from somewhere. We are using these IDs in spawn/task so we can't be generating on every tick
    this.spacerId = getSpacerId();
    this.primaryRoom = new SpacersChoiceRoom(room);
    this.buildCurrentCitizenList(creeps);
    this.memory = SpacersChoiceMemory.getTownshipMemory(this.spacerId);
  }

  /**
   * Build our list of citizens from our list of creeps
   */
  buildCurrentCitizenList(creeps: SpacersChoiceCreep[]) {
    this.citizens = {};
    creeps.forEach((creep) => {
      const citizen = new Citizen(creep);
      this.citizens[citizen.spacerId] = citizen;
    });
  }

  /**
   * Handle of all of the tasks/spawning our townships should be assigning on this tick
   */
  run() {
    if (this.areCachedRequestsOutOfDate()) {
      this.buildAndCacheRequests();
    }
  }
  /**
   * Are we cached task && spawn requests list out of date
   */
  areCachedRequestsOutOfDate() {
    if (this.memory.cachedRequests) {
      const gclChanged = this.primaryRoom.gcl !== this.memory.cachedRequests.gcl;
      const energyCapacityChanged = this.primaryRoom.maxEnergy !== this.memory.cachedRequests.maxEnergy;
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
      maxEnergy: this.primaryRoom.maxEnergy,
      spawnRequests: this.spawnRequests,
      taskRequests:  this.taskRequests,
    };
  }
}
