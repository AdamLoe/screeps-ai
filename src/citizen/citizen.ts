import {SpacersChoiceCreep} from '../base-classes/creep';

export class SpacersChoiceCitizen {
  spacerId: string;
  creep: SpacersChoiceCreep;

  constructor(creep: SpacersChoiceCreep) {
    this.creep = creep;
    this.spacerId = creep.name;
  }
}
