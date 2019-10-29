
export interface ISourceMemory {
  distanceToController: number;
  // FUCK, I CANT SORT BY DISTANCE TO CONTROLLER, BECAUSE THAT IS NOT WHAT MATTERS
}

export class SpacersChoiceSource extends Source {

  /**
   *
   */
  memory: ISourceMemory;

  /**
   * Default Constructor
   */
  constructor(source: Source) {
    super(source.id);
  }
}
