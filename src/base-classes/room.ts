
/**
 * A Spacers Choice Room is a Room with extra Spacers Choice Approved Functionality
 */
export class SpacersChoiceRoom extends Room {

  /**
   * Copied properties from our Base Room
   */
  controller?: StructureController;
  energyAvailable: number;
  energyCapacityAvailable: number;
  memory: RoomMemory;
  mode: string;
  name: string;
  storage?: StructureStorage;
  visual: RoomVisual;

  /**
   * Default Constructor. Sets all of the base room properties
   */
  constructor(room: Room) {
    super(room.name);
  }

  /**
   * Helper functions to get information about our room
   */
  get gcl(): number { return this.controller ? this.controller.level : 0;}
  get energy(): number { return this.energyAvailable; }
  get maxEnergy(): number { return this.energyCapacityAvailable; }
}
