import { SpacersChoiceMemory } from '../memory';
import { Township } from '../township';
import { HarvestTask } from './list/HarvestTask';
import { PickupTask } from './list/PickupTask';
import { TransferTask } from './list/TransferTask';
import { UpgradeTask } from './list/UpgradeTask';
import { TaskController } from './task-controller';
import { ITaskRequest } from './task-request.interface';
import { BuildTask } from './list/BuildTask';
import { TaskConfig } from './task.config';

export function buildTaskRequestsForTownship(
  township: Township
): ITaskRequest[] {

  const allTasks = SpacersChoiceMemory.get().taskRequests;
  const townshipTasks: ITaskRequest[] = Object.keys(allTasks)
    .map((taskId) => allTasks[taskId])
    .filter((task) => task.townshipId === township.spacerId);

  // TODO: This should be a global cleanup that lives in another file
  // First start by making sure our existing requests are valid
  const taskRequests = townshipTasks.filter((task) => {
    if (task.creepSpacerId) {
      const badRef = township.creeps.some((creep) => {
        return creep.spacerId === task.creepSpacerId;
      });
      if (badRef) {
        TaskController.removeTask(task.spacerId);
        return false;
      }
    }
    return true;
  });

  const newTaskRequests: ITaskRequest[] = [
    ...HarvestTask.buildRequests(township),
    ...PickupTask.buildRequests(township),
    ...TransferTask.buildRequests(township),
    ...UpgradeTask.buildRequests(township),
    ...BuildTask.buildRequests(township)
  ];

  newTaskRequests.forEach((newTask) => {
    const oldTask = townshipTasks.find((townshipTask) => {
      return townshipTask.targetSpacerId === newTask.targetSpacerId;
    });
    // If we found a matching old task, update it with new info
    if (oldTask) {
      oldTask.posX = newTask.posX;
      oldTask.posY = newTask.posY;
      oldTask.priority = newTask.priority;

    } else {
      // Otherwise add a new task
      TaskController.addTask(newTask);
      taskRequests.push(newTask);
    }
  });

  return newTaskRequests;
}

export function assignTaskRequestsForTownship(
  township: Township,
  taskRequests: ITaskRequest[]
) {

  // Get our tasks that haven't been assigned, in order of priority
  const neededTasks = taskRequests
    .filter((taskRequest) => !taskRequest.creepSpacerId)
    .sort((t1, t2) => t2.priority - t1.priority);

  // For each creep, see if there is a task we can assign
  township.creeps.forEach((creep) => {
    const availCreepTasks = neededTasks.filter((task) => TaskConfig.canTakeTask(creep, task));

    const hasAvailTask = availCreepTasks.length > 0;
    const noAssignedTask = !creep.memory.taskRequests || creep.memory.taskRequests.length === 0;
    if (hasAvailTask && noAssignedTask) {

      // Assign our task to our creep
      const newCreepTask = availCreepTasks[0];
      creep.memory.taskRequests = [newCreepTask];
      creep.memory.taskMemory = {};
      newCreepTask.creepSpacerId = creep.spacerId;

      // Also remove it from list, so we don't assign it to next creep
      neededTasks.filter((task) => task.spacerId !== newCreepTask.spacerId);
    }
  });
}
