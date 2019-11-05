import { SpacersChoiceCreep } from '../creep';
import { SpacersChoiceMemory } from '../memory';
import { Township } from '../township';
import { BuildTask } from './list/BuildTask';
import { HarvestTask } from './list/HarvestTask';
import { PickupTask } from './list/PickupTask';
import { TransferTask } from './list/TransferTask';
import { UpgradeTask } from './list/UpgradeTask';
import { TaskController } from './task-controller';
import { ITaskRequest } from './task-request.interface';
import { TaskConfig } from './task.config';

/**
 * Build new task requests for a township, and assign them to its creeps
 */
export function buildAssignTasksForTownship(township: Township) {

  // Get our current requests and build our new ones
  const currentRequests = getCurrentRequests(township);
  const validCurrentRequests = getValidRequests(currentRequests, township);
  const newRequests = buildNewRequests(township);

  // Combine these two list and update our memory
  const updatedRequests = upsertNewTasks(validCurrentRequests, newRequests);

  // Figure out which requests we can assign, and order them
  let pendingRequests = orderAvailableTasks(updatedRequests);

  // Try to assign each creep a task
  township.creeps.forEach((creep) => {
    const foundTask = findTaskForCreep(creep, pendingRequests);

    // If we found a task they can take, assign it, and remove task fromm pending list
    if (foundTask) {
      assignTaskToCreep(creep, foundTask);
      pendingRequests = pendingRequests.filter((task) => task.spacerId !== foundTask.spacerId);
    }
  });
}

/**
 * Get all of the tasks that currently exist for this township
 */
function getCurrentRequests(township: Township): ITaskRequest[] {

  const allTasks = SpacersChoiceMemory.get().taskRequests;
  return Object.keys(allTasks)
    .map((taskId) => allTasks[taskId])
    .filter((task) => task.townshipId === township.spacerId);
}

/**
 *
 */
function getValidRequests(tasks: ITaskRequest[], township: Township): ITaskRequest[] {

  return tasks.filter((task) => {
    if (task.creepSpacerId) {
      const creepIsAlive = township.creeps.some((creep) => {
        return creep.spacerId === task.creepSpacerId;
      });
      if (creepIsAlive) {
        return true;
      } else {
        TaskController.removeTask(task.spacerId);
        return false;
      }

    } else {
      return true;
    }
  });
}

/**
 * Build the list of tasks that we need done on this tick
 */
function buildNewRequests(township: Township): Array<Partial<ITaskRequest>> {
  return [
    ...HarvestTask.buildRequests(township),
    ...PickupTask.buildRequests(township),
    ...TransferTask.buildRequests(township),
    ...UpgradeTask.buildRequests(township),
    ...BuildTask.buildRequests(township)
  ];
}

/**
 * Update/Insert new tasks to our list, and return combined list
 */
function upsertNewTasks(
  oldTasks: ITaskRequest[],
  newTasks: Array<Partial<ITaskRequest>>
): ITaskRequest[] {

  const updatedList: ITaskRequest[] = oldTasks;

  // Upsert our new tasks
  newTasks.forEach((newTask) => {
    const foundOldTask = oldTasks.find((oldTask) => {
      return oldTask.targetSpacerId === newTask.targetSpacerId;
    });

    // If we found a matching old taskType, update it with new info
    if (foundOldTask) {
      foundOldTask.posX = newTask.posX || foundOldTask.posX;
      foundOldTask.posY = newTask.posY || foundOldTask.posY;
      foundOldTask.priority = newTask.priority || foundOldTask.priority;

    } else {
      // Otherwise insert new task
      const createdTask = TaskController.addTask(newTask);
      updatedList.push(createdTask);
    }
  });

  return updatedList;
}

/**
 * Figure out which tasks aren't taken, and order them by priority
 */
function orderAvailableTasks(taskRequests: ITaskRequest[]) {
  return taskRequests
    .filter((taskRequest) => !taskRequest.creepSpacerId)
    .sort((t1, t2) => t2.priority - t1.priority);
}

/**
 * Find the best tasks for a creep, if it can take one
 */
function findTaskForCreep(creep: SpacersChoiceCreep, tasks: ITaskRequest[]) {

  const availCreepTasks = tasks.filter((task) => TaskConfig.canTakeTask(creep, task));

  const hasAvailTask = availCreepTasks.length > 0;
  const noAssignedTask = !creep.memory.taskRequestIds || creep.memory.taskRequestIds.length === 0;

  if (hasAvailTask && noAssignedTask) {
    return availCreepTasks[0];

  } else {
    return null;
  }
}

/**
 * Assign a creep to task and vice versa
 */
function assignTaskToCreep(creep: SpacersChoiceCreep, task: ITaskRequest) {

  // Assign our taskType to our creep
  creep.memory.taskRequestIds = [task.spacerId];
  creep.memory.taskMemory = {};
  task.creepSpacerId = creep.spacerId;
}
