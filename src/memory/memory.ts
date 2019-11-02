import { ICreepMemory } from '../base-classes/creep';
import { IRoomMemory } from '../base-classes/room';
import { ISourceMemory } from '../base-classes/source';
import { ISpawnMemory } from '../base-classes/spawn';
import { ISpawnRequest } from '../spawning/spawn-requests';
import { ITaskRequest } from '../tasks/task-requests';
import { ITownshipMemory } from '../township/township';

export interface ISourceMemory {
  test: boolean;
}

export interface ISpacerMemory extends Memory {

  // Default Objects
  creeps: { [spacerId: string]: ICreepMemory };
  flags: { [spacerId: string]: {}};
  rooms: { [spacerId: string]: IRoomMemory };
  powerCreeps: { [spacerId: string]: {}};
  spawns: { [spacerId: string]: ISpawnMemory };

  // Added Objects
  nameClk: number;
  sources: { [spacerId: string]: ISourceMemory };
  spawnRequests: { [spacerId: string]: ISpawnRequest };
  taskRequests: { [spacerId: string]: ITaskRequest };
  townships: { [spacerId: string]: ITownshipMemory };
}

export class SpacersChoiceMemory {

  /**
   * Get our memory object
   */
  static get(): ISpacerMemory {
    return Memory as any;
  }

  /**
   * Handling initializing our SpacerMemory object
   */
  static loadMemory() {
    const memory = SpacersChoiceMemory.get();

    // If our colony failed for some reason, start over
    if (this.shouldHardReset() || this.shouldInit(memory)) {
      console.log('-----------------------------------');
      console.log('-------// resetting memory //------');
      console.log('-----------------------------------');
      const newMemory: ISpacerMemory = {
        creeps: {},
        flags: {},
        rooms: {},
        powerCreeps: {},
        spawns: {},

        nameClk: 1,
        sources: {},
        spawnRequests: {},
        taskRequests: {},
        townships: {}
      };
      Object.assign(memory, newMemory);
    }
  }

  /**
   * Has our memory already been initialized.
   */
  static shouldInit(memory: ISpacerMemory) {
    // Memory doesn't start out in memory, so if it is there, we must have initted memory
    return !memory.sources || !memory.townships || !memory.nameClk || !memory.taskRequests || !memory.spawnRequests;
  }

  /**
   * Determines if we should hard reset our colony (something went fatally wrong)
   */
  static shouldHardReset(): boolean {

    // Must only have one room
    const onlyOneRoom = Object.keys(Game.rooms).length === 1;
    if (onlyOneRoom) {

      // Our room must be level one
      const room = Game.rooms[Object.keys(Game.rooms)[0]];
      const roomIsLevelOne = room && room.controller && room.controller.level === 1;
      if (roomIsLevelOne) {

        // We also must have no creeps
        const noCreeps = Object.keys(Game.creeps).length === 0;
        if (noCreeps) {
          return true;
        }
      }
    }
    return false;
  }

  static getTownshipMemory(spacerId: string): ITownshipMemory {
    const memory = SpacersChoiceMemory.get();
    memory.townships[spacerId] = memory.townships[spacerId] || {};
    return memory.townships[spacerId];
  }

  static getSourceMemory(spacerId: string): ISourceMemory {
    const memory = SpacersChoiceMemory.get();
    memory.sources[spacerId] = memory.sources[spacerId] || {};
    return memory.sources[spacerId];
  }
}
