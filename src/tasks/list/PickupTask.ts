import { SpacersChoiceCreep } from '../../creep';
import { JobEnum } from '../../spawning/job.enum';
import { Township } from '../../township';
import { getSpacerId } from '../../util/utils';
import { getDroppedResourcePriority } from '../task-priority.enum';
import { ITaskRequest } from '../task-request.interface';
import { TaskEnum } from '../task.enum';
import { BaseTask } from './_BaseTask';

export class PickupTask extends BaseTask {

  task: ITaskRequest;
  creep: SpacersChoiceCreep;
  township: Township;

  constructor(
    task: ITaskRequest,
    creep: SpacersChoiceCreep,
    township: Township
  ) {
    super(task, creep, township);
  }

  static buildRequests(township: Township): Array<Partial<ITaskRequest>> {

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
        targetSpacerId: resourceId,
        townshipId: township.spacerId,
        job: JobEnum.CARRY,
        taskType: TaskEnum.PICKUP,
        posX: droppedResource.pos.x,
        posY: droppedResource.pos.y,
        priority: getDroppedResourcePriority(droppedResource.resourceType)
      };
    });
  }

  shouldCancelTask(): boolean {
    const targetResource = this.getResource();
    return !targetResource;
  }

  runTask() {
    const targetResource = this.getResource();

    if (targetResource) {
      this.creep.pickup(targetResource);
    } else {
      console.log(`No resource found at that position! Cancelling task x:${this.task.posX}, y:${this.task.posY}`);
    }
    this.creep.endTask(this.task);
  }

  getResource(): Resource {

    const townshipResources: Resource[] = [];
    this.township.rooms.forEach((room) => {
      townshipResources.push(...room.find(FIND_DROPPED_RESOURCES));
    });

    return townshipResources.find((resource) => {
      return resource.pos.x === this.task.posX && resource.pos.y === this.task.posY;
    }) as Resource;
  }
}
