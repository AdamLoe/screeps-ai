import { SpacersChoiceCreep } from '../../creep';
import { Township } from '../../township';
import { ITaskRequest } from '../task-request.interface';

export class BaseTask {

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
