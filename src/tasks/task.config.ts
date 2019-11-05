import { SpacersChoiceCreep } from '../creep';
import { JobEnum } from '../spawning/job.enum';
import { ITaskRequest } from './task-request.interface';
import { TaskEnum } from './task.enum';

export interface ITaskConfig {
  type: TaskEnum;
  job: JobEnum;
  requiredFunc?: (c: SpacersChoiceCreep) => boolean;
}

export const taskConfigs: ITaskConfig[] = [{
  type: TaskEnum.HARVEST,
  job: JobEnum.HARVEST
}, {
  type: TaskEnum.GIVE_TO,
  job: JobEnum.CARRY,
  requiredFunc: (creep) => creep.carry.energy > 0
}, {
  type: TaskEnum.DROP_OFF,
  job: JobEnum.CARRY,
  requiredFunc: (creep) => creep.carry.energy > 0
}, {
  type: TaskEnum.PICKUP,
  job: JobEnum.CARRY,
  requiredFunc: (creep) => creep.carry.energy === 0
}, {
  type: TaskEnum.BUILD,
  job: JobEnum.BUILD
}, {
  type: TaskEnum.REPAIR,
  job: JobEnum.REPAIR
}, {
  type: TaskEnum.UPGRADE,
  job: JobEnum.UPGRADE
}, {
  type: TaskEnum.HEAL,
  job: JobEnum.HEAL
}];

export class TaskConfig {

  static getConfig(type: TaskEnum): ITaskConfig {
    return taskConfigs.find((config) => {
      return config.type === type;
    }) as ITaskConfig;
  }

  static canTakeTask(
    creep: SpacersChoiceCreep,
    task: ITaskRequest
  ): boolean {

    // First make sure this taskType is for our job
    const hasJob = creep.memory.job === task.job;
    if (hasJob) {

      // If so, see if our taskType has any specific requirements creeps need to pass
      const config = TaskConfig.getConfig(task.taskType);
      if (config) {
        if (config.requiredFunc) {
          return config.requiredFunc(creep);
        } else {
          return true;
        }
      } else {
        console.log(`Could not find task type`, task.taskType);
        return false;
      }

    } else {
      return false;
    }
  }
}

