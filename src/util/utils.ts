import { SpacersChoiceMemory } from '../memory';

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
