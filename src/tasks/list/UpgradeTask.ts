import { SpacersChoiceCreep } from '../../creep';
import { JobEnum } from '../../spawning/job.enum';
import { Township } from '../../township';
import { TaskPriorityEnum } from '../task-priority.enum';
import { ITaskRequest } from '../task-request.interface';
import { TaskEnum } from '../task.enum';
import { BaseTask } from './_BaseTask';

export class UpgradeTask extends BaseTask {

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
    return [{
      targetSpacerId: township.controller.id,
      townshipId: township.spacerId,
      job: JobEnum.UPGRADE,
      taskType: TaskEnum.UPGRADE,
      posX: township.controller.pos.x,
      posY: township.controller.pos.y,
      priority: TaskPriorityEnum.UPGRADE_CONTROLLER
    }];
  }

  shouldCancelTask(): boolean {
    return false;
  }

  runTask() {
    if (this.creep.carry.energy > 0) {
      this.creep.upgradeController(this.township.controller);
    } else {
      this.creep.say('No Energy :(');
    }
  }
}
