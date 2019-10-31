import { SpacersChoiceCreep } from '../base-classes/creep';

export class SpacersChoiceCitizen {
  spacerId: string;
  creep: SpacersChoiceCreep;

  constructor(creep: SpacersChoiceCreep) {
    this.spacerId = creep.name;
    this.creep = creep;
  }
}
