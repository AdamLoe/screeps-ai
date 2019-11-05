import { Township } from '../township';
import { getRclOne, getRclZero } from './contruction-config';


export class ConstructionManager {

  static buildConstructionSites(township: Township) {
    const rcl = township.controller.level;

    const constructions = [
      ...getRclZero(),
      ...(rcl >= 1) ? getRclOne() : []
    ];

    const roomCenter = township.primaryRoom.find(FIND_FLAGS).find((flag) => flag.name === 'RoomCenter');
    if (roomCenter) {
      const townshipStructures: Array<Structure | ConstructionSite> = [];
      township.rooms.forEach((room) => {
        townshipStructures.push(...room.find(FIND_STRUCTURES));
        townshipStructures.push(...room.find(FIND_CONSTRUCTION_SITES));
      });

      constructions.forEach((newStruct) => {
        const newStructX = roomCenter.pos.x + newStruct.offsetX;
        const newStructY = roomCenter.pos.y + newStruct.offsetY;

        const structInPos = townshipStructures.find((townStruct) => {
          return townStruct.pos.x === newStructX && townStruct.pos.y === newStructY;
        });

        // If there is already
        const alreadyExists = structInPos && structInPos.structureType === newStruct.type;
        if (!alreadyExists) {

          // If something is in our spot of a different type, remove/destroy it
          if (structInPos) {
            if ((structInPos as Structure).destroy) {
              (structInPos as Structure).destroy();
            } else {
              (structInPos as ConstructionSite).remove();
            }
          }

          // Now add our newly build construction
          township.primaryRoom.createConstructionSite(
            newStructX,
            newStructY,
            newStruct.type
          );
        }
      });

    } else {
      console.error('You must have a `RoomCenter` flag to auto build contructions');
    }
  }
}
