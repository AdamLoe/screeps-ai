import { SpacersChoiceCreep } from '../creep';
import { ITaskRequest } from './task-request.interface';
import { TaskEnum } from './task.enum';

export interface ITaskConfig {
  type: TaskEnum;
  requiredFunc?: (c: SpacersChoiceCreep) => boolean;
}

export const taskConfigs: ITaskConfig[] = [{
  type: TaskEnum.HARVEST
}, {
  type: TaskEnum.HEAL
}, {
  type: TaskEnum.GIVE_TO,
  requiredFunc: (creep) => creep.carry.energy > 0
}, {
  type: TaskEnum.DROP_OFF,
  requiredFunc: (creep) => creep.carry.energy > 0
}, {
  type: TaskEnum.BUILD
}, {
  type: TaskEnum.PICKUP,
  requiredFunc: (creep) => creep.carry.energy === 0
}, {
  type: TaskEnum.REPAIR
}, {
  type: TaskEnum.UPGRADE
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

    // First make sure this task is for our job
    const hasJob = creep.memory.job === task.job;
    if (hasJob) {

      // If so, see if our task has any specific requirements creeps need to pass
      const config = TaskConfig.getConfig(task.task);
      if (config.requiredFunc) {
        return config.requiredFunc(creep);
      } else {
        return true;
      }

    } else {
      return false;
    }
  }
}

