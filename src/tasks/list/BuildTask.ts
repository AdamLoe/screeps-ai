import { SpacersChoiceCreep } from '../../creep';
import { Township } from '../../township';
import { ITaskRequest } from '../task-request.interface';
import { BaseTask } from './_BaseTask';

export class BuildTask extends BaseTask {

  task: ITaskRequest;
  creep: SpacersChoiceCreep;
  township: Township;

  constructor(
    task: ITaskRequest,
    creep: SpacersChoiceCreep,
    township: Township
  ) {
    super(task, creep, township);
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
