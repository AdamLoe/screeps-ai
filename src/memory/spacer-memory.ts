import {ITownshipMemory} from '../township/spacer-township';

export interface ISourceMemory {
  test: boolean;
}

export interface ISpacerMemory extends Memory {
  nameClk: number;
  sources: { [spacerId: string]: ISourceMemory };
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
    console.log('got memory', memory);

    // If our colony failed for some reason, start over
    if (this.shouldHardReset()) {
      memory.rooms = {};
      memory.spawns = {};
      memory.sources = {};
      memory.creeps = {};
      memory.nameClk = 1;

    } else {

      if (this.shouldInit(memory)) {
        memory.sources = {};
        memory.nameClk =  0;
      }
    }
  }

  /**
   * Has our memory already been initialized
   */
  static shouldInit(memory: ISpacerMemory) {
    return !memory.sources;
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

  static setTownshipMemory(spacerId: string, townshipMemory: ITownshipMemory) {
    const memory = SpacersChoiceMemory.get();
    memory.townships[spacerId] = townshipMemory;
  }
}
