import { JobEnum } from './spawning/job.enum';
import { BaseTask } from './tasks/list/_BaseTask';
import { HarvestTask } from './tasks/list/HarvestTask';
import { TaskController } from './tasks/task-controller';
import { ITaskRequest } from './tasks/task-request.interface';
import { TaskEnum } from './tasks/task.enum';
import { Township } from './township';
import { isAdjacent } from './util/utils';
import { UpgradeTask } from './tasks/list/UpgradeTask';
import { BuildTask } from './tasks/list/BuildTask';
import { TransferTask } from './tasks/list/TransferTask';
import { PickupTask } from './tasks/list/PickupTask';

export interface ICreepMemory {
  townshipId: string;
  job: JobEnum;
  taskRequests: ITaskRequest[];
  taskMemory: any;
}

export class SpacersChoiceCreep extends Creep {

  spacerId: string;
  memory: ICreepMemory;
  role: BaseTask;

  constructor(creep: Creep) {
    super(creep.id);
    this.spacerId = creep.name;
    if (!this.memory.taskMemory) {
      this.memory.taskMemory = {};
    }
  }

  run(township: Township) {
    if (this.memory.taskRequests && this.memory.taskRequests.length) {
      const taskRequest = this.memory.taskRequests[0];
      this.runTask(taskRequest, township);
    }
  }

  runTask(taskRequest: ITaskRequest, township: Township) {
    this.say(taskRequest.task);
    const taskRole = this.getRole(taskRequest);

    if (isAdjacent(taskRequest.posX, taskRequest.posY, this.pos)) {
      taskRole.runTask(taskRequest, this);

    } else {
      this.moveTo(taskRequest.posX, taskRequest.posY);
    }
  }

  getRole(taskRequest: ITaskRequest): BaseTask {
    switch(taskRequest.task) {
      case TaskEnum.BUILD:    return new BuildTask();
      case TaskEnum.DROP_OFF: return new TransferTask();
      case TaskEnum.GIVE_TO:  return new TransferTask();
      case TaskEnum.HARVEST:  return new HarvestTask();
      case TaskEnum.PICKUP:   return new PickupTask();
      case TaskEnum.UPGRADE:  return new UpgradeTask();
      default:
        console.log('this task is not supported yet');
        return new BaseTask();
    }
  }

  endTask(endTask: ITaskRequest) {
    this.memory.taskRequests = [];
    TaskController.removeTask(endTask.spacerId);
  }
}
