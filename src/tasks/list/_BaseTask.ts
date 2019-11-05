import { SpacersChoiceCreep } from '../../creep';
import { Township } from '../../township';
import { ITaskRequest } from '../task-request.interface';

export class BaseTask {

  task: ITaskRequest;
  creep: SpacersChoiceCreep;
  township: Township;

  constructor(
    task: ITaskRequest,
    creep: SpacersChoiceCreep,
    township: Township
  ) {
    this.task = task;
    this.creep = creep;
    this.township = township;
  }

  static buildRequests(township: Township): Array<Partial<ITaskRequest>> {
    return [];
  }

  shouldCancelTask(): boolean {

    return false;
  }

  runTask() {

  }
}
