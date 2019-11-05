import { SpacersChoiceMemory } from '../memory';
import { Township } from '../township';

/**
 * Returns a new spacer ID. Also handles incrementing our name counter
 */
export function getSpacerId(): string {
  const memory = SpacersChoiceMemory.get();
  memory.nameClk += 1;
  return memory.nameClk.toString();
}

export function isAdjacent(targetX: number, targetY: number, myPos: RoomPosition) {
  const adjacentX = Math.abs(targetX - myPos.x) <= 1;
  const adjactedY = Math.abs(targetY - myPos.y) <= 1;
  return adjactedY && adjacentX;
}

export function isOnPos(targetX: number, targetY: number, myPos: RoomPosition) {
  return targetX === myPos.x && targetY === myPos.y;
}

export function getAdjacentSpot(pos: RoomPosition, township: Township): RoomPosition | null {
  const structures = township.findStructures();
  const sites = township.findConstructionSites();

  const opts: Array<{ x: number, y: number }> = [
    { x: -1, y: -1 },
    { x: -1, y: 0  },
    { x: -1, y: 1  },
    { x:  0, y: -1 },
    { x:  0, y:  1 },
    { x:  1, y: -1 },
    { x:  1, y: 0  },
    { x:  1, y: 1  }
  ];

  const roomPositionOptions = opts.map((opt) => {
    return {
      x: pos.x + opt.x,
      y: pos.y + opt.y,
      roomName: pos.roomName
    } as RoomPosition;
  });

  const validPosition = roomPositionOptions.find((option) => {
    const structureInPos = structures.some((struct) => isOnPos(option.x, option.y, struct.pos));
    const siteInPos = sites.some((site) => isOnPos(option.x, option.y, site.pos));
    const terrainAtPos = township.terrainAtPos(option.x, option.y, option.roomName);
    console.log(option.x, option.y, structureInPos, siteInPos, terrainAtPos);
    return !structureInPos && !siteInPos && !terrainAtPos;
  });

  console.log(JSON.stringify(roomPositionOptions));
  return validPosition || null;
}

export const transferrableStructureTypes: StructureConstant[] = [
  STRUCTURE_EXTENSION,
  STRUCTURE_SPAWN,
  STRUCTURE_STORAGE,
  STRUCTURE_CONTAINER
];

export function getStructureFreeRoom(structure: any): number {
  switch (structure.structureType) {
    case STRUCTURE_EXTENSION:
      const extension: StructureExtension = structure;
      return extension.energyCapacity - extension.energy;
    case STRUCTURE_CONTAINER:
      const container: StructureContainer = structure;
      return container.storeCapacity - container.store.energy;
    case STRUCTURE_SPAWN:
      const spawn: StructureSpawn = structure;
      return spawn.energyCapacity - spawn.energy;
    case STRUCTURE_STORAGE:
      const storage: StructureStorage = structure;
      return storage.storeCapacity - storage.store.energy;
    default:
      console.log('This type of energy structure is not handled yet');
      return 0;
  }
}
