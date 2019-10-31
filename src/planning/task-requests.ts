import { JobEnum } from '../enums/job.enum';
import { getDroppedResourcePriority, TaskPriorityEnum } from '../enums/task-priority.enum';
import { TaskEnum } from '../enums/task.enum';
import { Township } from '../township/township';
import { getSpacerId } from '../util/utils';

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
  const taskRequests: ITaskRequest[] = existingRequests;

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
