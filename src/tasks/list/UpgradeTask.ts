import { SpacersChoiceCreep } from '../../creep';
import { JobEnum } from '../../spawning/job.enum';
import { Township } from '../../township';
import { getSpacerId } from '../../util/utils';
import { TaskPriorityEnum } from '../task-priority.enum';
import { ITaskRequest } from '../task-request.interface';
import { TaskEnum } from '../task.enum';
import { BaseTask } from './_BaseTask';

export class UpgradeTask extends BaseTask {

  static buildRequests(township: Township): ITaskRequest[] {

    return [{
      spacerId: getSpacerId(),
      targetSpacerId: township.controller.id,
      townshipId: township.spacerId,
      job: JobEnum.UPGRADE,
      task: TaskEnum.UPGRADE,
      posX: township.controller.pos.x,
      posY: township.controller.pos.y,
      priority: TaskPriorityEnum.UPGRADE_CONTROLLER
    }];
  }

  cancelTask(taskRequest: ITaskRequest): boolean {
    return false;
  }

  runTask(
    task: ITaskRequest,
    creep: SpacersChoiceCreep,
    township: Township
  ) {
    if (creep.carry.energy > 0) {
      creep.upgradeController(township.controller);
    } else {
      creep.say('No Energy :(');
    }
  }
}
