import { SpacersChoiceCreep } from './base-classes/creep';
import { SpacersChoiceRoom } from './base-classes/room';
import { SpacersChoiceSource } from './base-classes/source';
import { SpacersChoiceSpawn } from './base-classes/spawn';
import { Township } from './township/township';

/**
 * The spacers board simply handles each of our townships by passing them their rooms and citizen data.
 */
export class SpacersBoard implements Partial<Game> {

  /**
   * Self Made Classes for handling game objects
   */
  townships: { [spacerId: string]: Township };

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
    const creeps = this.getCreepsList();
    const sources = this.getSourcesList();
    const spawns = this.getSpawnList();

    // TODO: Each room should not be a township
    for (const roomId in this.rooms) {

      const primaryRoom = new SpacersChoiceRoom(this.rooms[roomId]);
      const rooms = [primaryRoom];
      const townshipCreeps = creeps.filter((creep) => creep.pos.roomName === primaryRoom.name);
      const townshipSources = sources.filter((source) => source.pos.roomName === primaryRoom.name);
      const townshipSpawns = spawns.filter((spawn) => spawn.pos.roomName === primaryRoom.name);

      const township = new Township({
        primaryRoom,
        rooms,
        creeps: townshipCreeps,
        sources: townshipSources,
        spawns: townshipSpawns
      });
      this.townships[township.spacerId] = township;
    }
  }

  /**
   *
   */
  run() {
    for (const townshipId in this.townships) {
      this.townships[townshipId].run();
    }
  }

  getCreepsList(): SpacersChoiceCreep[] {
    return Object.keys(this.creeps)
      .map((spacerId) => {
        return new SpacersChoiceCreep(this.creeps[spacerId]);
      });
  }

  getSpawnList(): SpacersChoiceSpawn[] {
    return Object.keys(this.spawns)
      .map((spacerId) => {
        return new SpacersChoiceSpawn(this.spawns[spacerId]);
      });
  }

  getSourcesList(): SpacersChoiceSource[] {
    return [];
  }
}
