import { ITaskRequest } from '../planning/task-requests';

export interface ICreepMemory {
  tasks: ITaskRequest[];
  nextTask: ITaskRequest;
  ticksToFinishNextTask: number;
  ticksToFinishAllTasks: number;
}

export class SpacersChoiceCreep extends Creep {

  spacerId: string;
  memory: ICreepMemory;

  constructor(creep: Creep) {
    super(creep.id);
    this.spacerId = creep.name;
  }

  run() {
    this.say('Hello World!');
  }
}
