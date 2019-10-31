
export interface ISpawnMemory {
  test: boolean;
}

export class SpacersChoiceSpawn extends Spawn {

  spacerId: string;
  memory: ISpawnMemory;
  /**
   * Copied properties from our Base Room
   */
  energy: number;
  energyCapacity: number;
  name: string;
  spawning: Spawning | null;

  /**
   * Default Constructor. Sets all of the base spawn properties
   */
  constructor(spawn: StructureSpawn) {
    super(spawn.id);
    this.spacerId = spawn.name;
  }
}
