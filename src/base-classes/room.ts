export class IRoomMemory {
  test: boolean;
}

/**
 * A Spacers Choice Room is a Room with extra Spacers Choice Approved Functionality
 */
export class SpacersChoiceRoom extends Room {

  spacerId: string;
  memory: IRoomMemory;

  /**
   * Copied properties from our Base Room
   */
  controller?: StructureController;
  energyAvailable: number;
  energyCapacityAvailable: number;
  mode: string;
  name: string;
  storage?: StructureStorage;
  visual: RoomVisual;

  /**
   * Default Constructor. Sets all of the base room properties
   */
  constructor(room: Room) {
    super(room.name);
    this.spacerId = room.name;
  }

  /**
   * Helper functions to get information about our room
   */
  get gcl(): number { return this.controller ? this.controller.level : 0;}
  get energy(): number { return this.energyAvailable; }
  get energyCapacity(): number { return this.energyCapacityAvailable; }
}
