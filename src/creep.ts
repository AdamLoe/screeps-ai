import { JobEnum } from './spawning/job.enum';
import { BaseTask } from './tasks/list/_BaseTask';
import { BuildTask } from './tasks/list/BuildTask';
import { HarvestTask } from './tasks/list/HarvestTask';
import { PickupTask } from './tasks/list/PickupTask';
import { TransferTask } from './tasks/list/TransferTask';
import { UpgradeTask } from './tasks/list/UpgradeTask';
import { TaskController } from './tasks/task-controller';
import { ITaskRequest } from './tasks/task-request.interface';
import { TaskEnum } from './tasks/task.enum';
import { Township } from './township';
import { isAdjacent, isOnPos } from './util/utils';

export interface ICreepMemory {
  townshipId: string;
  job: JobEnum;
  taskRequestIds: string[];
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
    if (this.memory.taskRequestIds && this.memory.taskRequestIds.length) {
      const taskRequestId = this.memory.taskRequestIds[0];
      const taskRequest = TaskController.getTaskBySpacerId(taskRequestId);

      if (this.spacerId === 'PERSON:64703') {
        console.log(this.memory.taskRequestIds);
        console.log(JSON.stringify(taskRequest));
      }

      if (taskRequest) {
        this.runTask(taskRequest, township);

      } else {
        console.log(this.spacerId, 'has invalid task', taskRequestId);
        this.memory.taskRequestIds = [];
        TaskController.removeTask(taskRequestId);
      }
    } else {
      this.say('🚬');
    }
  }

  runTask(taskRequest: ITaskRequest, township: Township) {
    this.say(taskRequest.taskType);
    const taskRole = this.getRole(taskRequest, township);

    const shouldCancel = taskRole.shouldCancelTask();
    if (shouldCancel) {
      this.endTask(taskRequest);

    } else {
      if (taskRequest.moveOnPos) {
        if (isOnPos(taskRequest.posX, taskRequest.posY, this.pos)) {
          taskRole.runTask();
        } else {
          this.moveTo(taskRequest.posX, taskRequest.posY);
        }

      } else {
          if (isAdjacent(taskRequest.posX, taskRequest.posY, this.pos)) {
            taskRole.runTask();
          } else {
            this.moveTo(taskRequest.posX, taskRequest.posY);
          }
      }
    }
  }

  getRole(taskRequest: ITaskRequest, township: Township): BaseTask {
    switch(taskRequest.taskType) {
      case TaskEnum.BUILD:    return new BuildTask(taskRequest, this, township);
      case TaskEnum.DROP_OFF: return new TransferTask(taskRequest, this, township);
      case TaskEnum.GIVE_TO:  return new TransferTask(taskRequest, this, township);
      case TaskEnum.HARVEST:  return new HarvestTask(taskRequest, this, township);
      case TaskEnum.PICKUP:   return new PickupTask(taskRequest, this, township);
      case TaskEnum.UPGRADE:  return new UpgradeTask(taskRequest, this, township);
      default:
        console.log('Invalid Task Type! This task is probably not supported yet');
        return null as any;
    }
  }

  endTask(endTask: ITaskRequest) {
    this.memory.taskRequestIds = [];
    TaskController.removeTask(endTask.spacerId);
  }
}
