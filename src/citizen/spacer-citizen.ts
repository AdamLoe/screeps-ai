import {ITaskRequest} from '../township/task-requests';

export interface ISpacersChoiceCreepMemory {
  tasks: ITaskRequest[];
  nextTask: ITaskRequest;
  ticksToFinishNextTask: number;
  ticksToFinishAllTasks: number;
}

export class SpacersChoiceCreep extends Creep {
  memory: ISpacersChoiceCreepMemory;
}

export class Citizen {
  spacerId: string;
  creep: SpacersChoiceCreep;

  constructor(creep: SpacersChoiceCreep) {
    this.creep = creep;
    this.spacerId = creep.name;
  }
}
