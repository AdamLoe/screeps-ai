import { SpacersChoiceCreep } from '../base-classes/creep';
import { SpacersChoiceRoom } from '../base-classes/room';
import { SpacersChoiceSource } from '../base-classes/source';
import { SpacersChoiceCitizen } from '../citizen/citizen';
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

  /**
   * The primary room of our township (Where our base lives)
   */
  primaryRoom: SpacersChoiceRoom;

  /**
   * All of the rooms assigned to our township. Primary Rooms + Remote Rooms
   */
  rooms: SpacersChoiceRoom[];

  /**
   * All of the sources assigned to our township. Primary/Remote sources
   */
  sources: SpacersChoiceSource[];

  /**
   * A list of all of the citizens who live in our township.
   */
  citizens: { [spacerId: string]: SpacersChoiceCitizen};

  /**
   * The memory object for our township
   */
  memory: ITownshipMemory;

  /**
   * A list of all of the creeps we should keep spawned
   */
  spawnRequests: ISpawnRequest[];

  /**
   * A list of all of the tasks that need to be completed
   */
  taskRequests: ITaskRequest[];

  /**
   * Default Constructor. Load our data from our room/creeps
   */
  constructor(
    room: Room,
    creeps: SpacersChoiceCreep[],
  ) {
    // TODO: We are using these IDs in spawn/task so we can't be generating on every tick
    this.spacerId = getSpacerId();
    this.primaryRoom = new SpacersChoiceRoom(room);
    this.rooms = [this.primaryRoom];
    this.sources = [];
    this.buildCurrentCitizenList(creeps);
    this.memory = SpacersChoiceMemory.getTownshipMemory(this.spacerId);
  }

  /**
   * Build our list of citizens from our list of creeps
   */
  buildCurrentCitizenList(creeps: SpacersChoiceCreep[]) {
    this.citizens = {};
    creeps.forEach((creep) => {
      const citizen = new SpacersChoiceCitizen(creep);
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
