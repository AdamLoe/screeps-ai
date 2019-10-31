import { SpacersChoiceCreep } from '../base-classes/creep';
import { JobEnum } from '../enums/job.enum';
import { getDroppedResourcePriority, TaskPriorityEnum } from '../enums/task-priority.enum';
import { TaskEnum } from '../enums/task.enum';
import { Township } from '../township/township';
import { getSpacerId, getStructureFreeRoom, transferrableStructureTypes } from '../util/utils';

export interface ITaskRequest {
  spacerId: string;
  townshipId: string;
  job: JobEnum;
  task: TaskEnum;
  posX: number;
  posY: number;
  priority: TaskPriorityEnum;
  creepSpacerId?: string;
}

export function buildTaskRequestsForTownship(
  township: Township,
  existingRequests: ITaskRequest[]
): ITaskRequest[] {

  // First start by making sure our existing requests are valid
  const taskRequests: ITaskRequest[] = existingRequests
    .filter((taskRequest) => {
      if (taskRequest.creepSpacerId) {
        return township.creeps.some((creep) => {
          return creep.spacerId === taskRequest.creepSpacerId;
        });

      } else {
        return true;
      }
    });

  // Get a list of all of the dropped resources in our township
  const droppedResources: Resource[] = [];
  township.rooms.forEach((room) => {
    const droppedResourcesInRoom = room.find(FIND_DROPPED_RESOURCES);
    droppedResources.push(...droppedResourcesInRoom);
  });

  // Figure out which resource have not been tasked already
  const newDroppedResources = droppedResources
    .filter((resource) => {
      const taskAlreadyExists = existingRequests.some((taskRequest) => {
        return taskRequest.posX === resource.pos.x && taskRequest.posY === resource.pos.y;
      });
      return !taskAlreadyExists;
    });

  newDroppedResources.forEach((droppedResource) => {
    taskRequests.push({
      spacerId: getSpacerId(),
      townshipId: township.spacerId,
      job: JobEnum.CARRY,
      task: TaskEnum.PICKUP,
      posX: droppedResource.pos.x,
      posY: droppedResource.pos.y,
      priority: getDroppedResourcePriority(droppedResource.resourceType)
    });
  });

  return taskRequests;
}

export function buildDropoffTask(
  creep: SpacersChoiceCreep,
  township: Township
): ITaskRequest | null {

  const structure = getDropoffStructure(township);
  if (structure) {
    return {
      spacerId: getSpacerId(),
      townshipId: township.spacerId,
      job: JobEnum.CARRY,
      task: TaskEnum.DROP_OFF,
      posX: structure.pos.x,
      posY: structure.pos.y,
      priority: TaskPriorityEnum.DROP_OFF_RESOURCES,
      creepSpacerId: creep.spacerId
    };

  } else {
    // If we can't find a structure, don't assign a task
    return null;
  }
}

function getDropoffStructure(township: Township): Structure {
  const structures: Structure[] = [];
  township.rooms.forEach((room) => {
    const structuresInRoom = room.find(FIND_STRUCTURES);
    structures.push(...structuresInRoom);
  });

  const availableStructures = structures
  // Make sure its a type of structure we can drop into
    .filter((structure) => {
      return transferrableStructureTypes.includes(structure.structureType);
    })
    // Make sure it still has free room
    .filter((structure) => {
      return getStructureFreeRoom(structure) > 0;
    })
    // Is someone else already dropping off into this bucket (bad early, doesn't matter late)
    .filter((structure) => {
      const structureInUse = township.taskRequests.some((taskRequest) => {
        return taskRequest.posX === structure.pos.x && taskRequest.posY === structure.pos.y;
      });
      return !structureInUse;
    });

  return availableStructures[0];
}
