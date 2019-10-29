import {SpacersChoiceCreep} from './citizen/spacer-citizen';
import {SpacerTownship} from './township/spacer-township';

/**
 * The spacers board simply handles each of our townships by passing them their rooms and citizen data.
 */
export class SpacersChoiceBoard implements Partial<Game> {

  /**
   * Self Made Classes for handling game objects
   */
  townships: { [spacerId: string]: SpacerTownship };

  /**
   * Properties copied from our game object
   */
  creeps: { [spacerId: string]: SpacersChoiceCreep };
  flags: { [spacerId: string]: Flag };
  rooms: { [spacerId: string]: Room };
  spawns: { [spacerId: string]: StructureSpawn };
  structures: { [spacerId: string]: Structure };
  constructionSites: { [spacerId: string]: ConstructionSite };

  constructor() {
    this.townships = {};
    this.creeps = Game.creeps as any;
    this.flags = Game.flags;
    this.rooms = Game.rooms;
    this.spawns = Game.spawns;
    this.structures = Game.structures;
    this.constructionSites = Game.constructionSites;
  }

  init() {
    // Build a township for each room
    // TODO: Each room should not be a township
    for (const roomId in this.rooms) {
      const room = this.rooms[roomId];

      // TODO: Pass a list of all creeps to handle for each room
      const township = new SpacerTownship(room, []);
      this.townships[township.spacerId] = township;
    }
  }

  run() {

  }

  handleSpawning() {

  }
}
