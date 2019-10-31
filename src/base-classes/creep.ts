import {JobEnum} from '../enums/job.enum';
import {TaskEnum} from '../enums/task.enum';
import {ITaskRequest} from '../planning/task-requests';
import {TaskPriorityEnum} from "../enums/task-priority.enum";
import {getSpacerId} from "../util/utils";

export interface ICreepMemory {
  townshipId: string;
  job: JobEnum;
  taskRequests?: ITaskRequest[];
  ticksToFinishNextTask?: number;
  ticksToFinishAllTasks?: number;
}

export class SpacersChoiceCreep extends Creep {

  spacerId: string;
  memory: ICreepMemory;
  tasks: ITaskRequest[];

  constructor(creep: Creep) {
    super(creep.id);
    this.spacerId = creep.name;
  }

  run() {
    if (this.memory.taskRequests && this.memory.taskRequests.length) {
      const taskRequest = this.memory.taskRequests[0];
      switch (taskRequest.task) {
        case TaskEnum.HARVEST:
          return this.harvestTaskRequest(taskRequest);
        case TaskEnum.PICKUP:
          return this.carryTaskRequest(taskRequest);
        case TaskEnum.DROP_OFF:
          return this.dropOffTaskRequest(taskRequest);
        default:
          console.error('That task is not supported yet');
      }
    }
  }

  isAdjacent(x: number, y: number) {
    const adjacentX = Math.abs(x - this.pos.x) <= 1;
    const adjactedY = Math.abs(y - this.pos.y) <= 1;
    return adjactedY && adjacentX;
  }

  harvestTaskRequest(task: ITaskRequest) {
    this.say('HARVEST');

    if (this.isAdjacent(task.posX, task.posY)) {
      const sources = this.room.find(FIND_SOURCES);
      const adjacentSource = sources.find((source) => {
        return this.isAdjacent(source.pos.x, source.pos.y);
      });

      if (adjacentSource) {
        this.harvest(adjacentSource);
      } else {
        console.error('Error finding adjacent source, though our position says we should be next to one');
      }

    } else {
      this.moveTo(task.posX, task.posY);
    }
  }

  carryTaskRequest(task: ITaskRequest) {
    this.say('PICK UP');

    if (this.isAdjacent(task.posX, task.posY)) {
      const resources = this.room.find(FIND_DROPPED_RESOURCES);
      const adjacentResource = resources.find((resource) => {
        return this.isAdjacent(resource.pos.x, resource.pos.y);
      });

      if (adjacentResource) {
        this.pickup(adjacentResource);
        this.startDropOff(task);
      } else {
        console.error('Error finding adjacent source, though our position says we should be next to one');
      }

    } else {
      this.moveTo(task.posX, task.posY);
    }
  }

  startDropOff(task: ITaskRequest) {
    this.memory.taskRequests = [{
      spacerId: getSpacerId(),
      townshipId: task.townshipId,
      job: JobEnum.CARRY,
      task: TaskEnum.DROP_OFF,
      posX: -1,
      posY: -1,
      priority: TaskPriorityEnum.DROP_OFF_RESOURCES,
      creepSpacerId: this.spacerId
    }];
  }

  dropOffTaskRequest(task: ITaskRequest) {
    this.say('DROP OFF');
  }
}
