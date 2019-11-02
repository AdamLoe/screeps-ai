import { SpacersChoiceCreep } from '../../creep';
import { Township } from '../../township';
import { ITaskRequest } from '../task-request.interface';
import { BaseTask } from './_BaseTask';

export class BuildTask extends BaseTask {

  static buildRequests(township: Township): ITaskRequest[] {

    return [];
  }

  cancelTask(taskRequest: ITaskRequest): boolean {
    return false;
  }

  runTask(
    task: ITaskRequest,
    creep: SpacersChoiceCreep,
    township?: Township
  ) {

  }
}
