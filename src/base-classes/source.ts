import { SpacersChoiceMemory } from '../memory';

export interface ISourceMemory {
  distanceToController: number;
}

export class SpacersChoiceSource extends Source {

  spacerId: string;
  memory: ISourceMemory;

  constructor(source: Source) {
    super(source.id);
    this.spacerId = source.id;
    this.memory = SpacersChoiceMemory.getSourceMemory(this.spacerId);
  }
}
