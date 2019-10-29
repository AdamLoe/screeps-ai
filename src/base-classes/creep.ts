import {ITaskRequest} from '../planning/task-requests';

export interface ICreepMemory {
  tasks: ITaskRequest[];
  nextTask: ITaskRequest;
  ticksToFinishNextTask: number;
  ticksToFinishAllTasks: number;
}

export class SpacersChoiceCreep extends Creep {
  memory: ICreepMemory;
}
