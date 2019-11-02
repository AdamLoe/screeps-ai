import { SpacersChoiceRoom } from './base-classes/room';
import { SpacersChoiceSource } from './base-classes/source';
import { SpacersChoiceSpawn } from './base-classes/spawn';
import { SpacersChoiceCreep } from './creep';
import { Township } from './township';

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

  /*
  **********************************************
  *                    INIT                    *
  **********************************************
  */

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
    const spawns = this.getSpawnList();

    // TODO: Each room should not be a township
    for (const roomId in this.rooms) {

      // TODO: We might want to generate its own ID eventually? I don't think we will ever store them together tho
      const spacerId = roomId;
      const primaryRoom = new SpacersChoiceRoom(this.rooms[roomId]);
      const rooms = [primaryRoom];
      const townshipCreeps = creeps.filter((creep) => creep.pos.roomName === primaryRoom.name);
      const townshipSources = this.getSourcesForRooms(rooms);
      const townshipSpawns = spawns.filter((spawn) => spawn.pos.roomName === primaryRoom.name);

      this.townships[spacerId] = new Township({
        spacerId,
        primaryRoom,
        rooms,
        creeps: townshipCreeps,
        sources: townshipSources,
        spawns: townshipSpawns
      });
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

  getSourcesForRooms(rooms: SpacersChoiceRoom[]): SpacersChoiceSource[] {
    const sources: SpacersChoiceSource[] = [];
    rooms.forEach((room) => {
      room.find(FIND_SOURCES)
        .forEach((source) => {
          sources.push(new SpacersChoiceSource(source));
        });
    });
    return sources;
  }

  /*
  **********************************************
  *                    RUN                     *
  **********************************************
  */

  /**
   *
   */
  run() {
    for (const townshipId in this.townships) {
      this.townships[townshipId].run();
    }
  }
}
