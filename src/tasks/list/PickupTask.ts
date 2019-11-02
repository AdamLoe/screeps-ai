import { SpacersChoiceCreep } from '../../creep';
import { JobEnum } from '../../spawning/job.enum';
import { Township } from '../../township';
import { getSpacerId, isAdjacent } from '../../util/utils';
import { getDroppedResourcePriority } from '../task-priority.enum';
import { ITaskRequest } from '../task-request.interface';
import { TaskEnum } from '../task.enum';
import { BaseTask } from './_BaseTask';

export class PickupTask extends BaseTask {

  static buildRequests(township: Township): ITaskRequest[] {

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

  cancelTask(taskRequest: ITaskRequest): boolean {
    return false;
  }

  runTask(task: ITaskRequest, creep: SpacersChoiceCreep) {
    creep.say('PICKING UP');
    const resources = creep.room.find(FIND_DROPPED_RESOURCES);
    const adjacentResource = resources.find((resource) => {
      return isAdjacent(resource.pos.x, resource.pos.y, creep.pos);
    });

    if (adjacentResource) {
      creep.pickup(adjacentResource);
      creep.endTask(task);

    } else {
      console.log('Error finding adjacent resource, though our position says we should be next to one');
      creep.memory.taskRequests = [];
    }
  }
}
