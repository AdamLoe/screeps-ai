import { SpacersChoiceSource } from '../base-classes/source';
import { SpacersChoiceMemory } from '../memory/memory';
import { JobEnum } from '../spawning/job.enum';
import { Township } from '../township/township';
import { getSpacerId, getStructureFreeRoom, transferrableStructureTypes } from '../util/utils';
import { TaskController } from './task-controller';
import { getDroppedResourcePriority, TaskPriorityEnum } from './task-priority.enum';
import { TaskEnum } from './task.enum';

export interface ITaskRequest {
  spacerId: string;
  targetSpacerId: string;
  townshipId: string;
  job: JobEnum;
  task: TaskEnum;
  posX: number;
  posY: number;
  priority: TaskPriorityEnum;
  creepSpacerId?: string;
}

export function buildTaskRequestsForTownship(
  township: Township
): ITaskRequest[] {

  const allTasks = SpacersChoiceMemory.get().taskRequests;
  const townshipTasks: ITaskRequest[] = Object.keys(allTasks)
    .map((taskId) => allTasks[taskId])
    .filter((task) => task.townshipId === township.spacerId);

  // TODO: This should be a global cleanup that lives in another file
  // First start by making sure our existing requests are valid
  townshipTasks.forEach((task) => {
    if (task.creepSpacerId) {
      const badRef = township.creeps.some((creep) => {
        return creep.spacerId === task.creepSpacerId;
      });
      if (badRef) {
        TaskController.removeTask(task.spacerId);
      }
    }
  });

  const newTaskRequests: ITaskRequest[] = [
    ...getDroppedResourceTasks(township),
    ...getTransferTasks(township),
    ...getHarvestTasks(township),
    ...getUpgradeTasks(township)
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
    }
  });

  return newTaskRequests;
}

function getHarvestTasks(township: Township): ITaskRequest[] {

  return township.sources.map((source: SpacersChoiceSource) => {
    return {
      spacerId: getSpacerId(),
      targetSpacerId: source.spacerId,
      townshipId: township.spacerId,
      job: JobEnum.HARVEST,
      task: TaskEnum.HARVEST,
      posX: source.pos.x,
      posY: source.pos.y,
      priority: TaskPriorityEnum.HARVEST
    };
  });
}

function getDroppedResourceTasks(township: Township): ITaskRequest[] {
  const droppedResources: Resource[] = [];
  township.rooms.forEach((room) => {
    const droppedResourcesInRoom = room.find(FIND_DROPPED_RESOURCES);
    droppedResources.push(...droppedResourcesInRoom);
  });

  return droppedResources.map((droppedResource) => {
    // Generate an ID that can be regenerated every tick (since resources dont have ID)
    const resourceId = 'Resource:' +
      droppedResource.pos.x.toString() + ':' +
      droppedResource.pos.y.toString();

    return {
      spacerId: getSpacerId(),
      targetSpacerId: resourceId,
      townshipId: township.spacerId,
      job: JobEnum.CARRY,
      task: TaskEnum.PICKUP,
      posX: droppedResource.pos.x,
      posY: droppedResource.pos.y,
      priority: getDroppedResourcePriority(droppedResource.resourceType)
    };
  });
}

function getTransferTasks(township: Township): ITaskRequest[] {
  const structures: Structure[] = [];
  township.rooms.forEach((room) => {
    const structuresInRoom = room.find(FIND_STRUCTURES);
    structures.push(...structuresInRoom);
  });

  const availableStructures = structures
    .filter((structure) => transferrableStructureTypes.includes(structure.structureType))
    .filter((structure) => getStructureFreeRoom(structure) > 0);

  return availableStructures.map((structure) => {
    return {
      spacerId: getSpacerId(),
      targetSpacerId: structure.id,
      townshipId: township.spacerId,
      job: JobEnum.CARRY,
      task: TaskEnum.DROP_OFF,
      posX: structure.pos.x,
      posY: structure.pos.y,
      priority: TaskPriorityEnum.DROP_OFF_RESOURCES
    };
  });
}

function getUpgradeTasks(township: Township): ITaskRequest[] {

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
