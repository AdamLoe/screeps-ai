import { ICreepMemory } from '../base-classes/creep';
import { IRoomMemory } from '../base-classes/room';
import { ISourceMemory } from '../base-classes/source';
import { ISpawnMemory } from '../base-classes/spawn';
import { ITownshipMemory } from '../township/township';

export interface ISourceMemory {
  test: boolean;
}

export interface ISpacerMemory extends Memory {
  creeps: { [spacerId: string]: ICreepMemory };
  flags: { [spacerId: string]: {}};
  rooms: { [spacerId: string]: IRoomMemory };
  powerCreeps: { [spacerId: string]: {}};
  spawns: { [spacerId: string]: ISpawnMemory };
  sources: { [spacerId: string]: ISourceMemory };
  townships: { [spacerId: string]: ITownshipMemory };
  nameClk: number;
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
      const newMemory: ISpacerMemory = {
        creeps: {},
        flags: {},
        rooms: {},
        powerCreeps: {},
        spawns: {},
        sources: {},
        townships: {},
        nameClk: 1
      };
      Object.assign(memory, newMemory);
    }
  }

  /**
   * Has our memory already been initialized.
   */
  static shouldInit(memory: ISpacerMemory) {
    // Memory doesn't start out in memory, so if it is there, we must have initted memory
    return !memory.sources || !memory.townships || !memory.nameClk;
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
