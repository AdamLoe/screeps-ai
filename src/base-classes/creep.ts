import { JobEnum } from '../enums/job.enum';
import { TaskEnum } from '../enums/task.enum';
import { buildDropoffTask, ITaskRequest } from '../planning/task-requests';
import { Township } from '../township/township';
import { isAdjacent } from '../util/utils';

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

  constructor(creep: Creep) {
    super(creep.id);
    this.spacerId = creep.name;
  }

  run(township: Township) {
    if (this.memory.taskRequests && this.memory.taskRequests.length) {
      const taskRequest = this.memory.taskRequests[0];
      switch (taskRequest.task) {
        case TaskEnum.HARVEST:
          return this.harvestTaskRequest(taskRequest);
        case TaskEnum.PICKUP:
          return this.carryTaskRequest(taskRequest, township);
        case TaskEnum.DROP_OFF:
          return this.dropOffTaskRequest(taskRequest);
        default:
          console.log('That task is not supported yet');
      }
    }
  }

  harvestTaskRequest(task: ITaskRequest) {
    this.say('HARVEST');

    if (isAdjacent(task.posX, task.posY, this.pos)) {
      const sources = this.room.find(FIND_SOURCES);
      const adjacentSource = sources.find((source) => {
        return isAdjacent(source.pos.x, source.pos.y, this.pos);
      });

      if (adjacentSource) {
        this.harvest(adjacentSource);
      } else {
        console.log('Error finding adjacent source, though our position says we should be next to one');
        this.memory.taskRequests = [];
      }

    } else {
      this.moveTo(task.posX, task.posY);
    }
  }

  carryTaskRequest(task: ITaskRequest, township: Township) {
    this.say('PICK UP');

    if (isAdjacent(task.posX, task.posY, this.pos)) {
      const resources = this.room.find(FIND_DROPPED_RESOURCES);
      const adjacentResource = resources.find((resource) => {
        return isAdjacent(resource.pos.x, resource.pos.y, this.pos);
      });
      console.log('POSS', JSON.stringify(resources.map((r) => r.pos)), task.posX, task.posY, JSON.stringify(this.pos));

      if (adjacentResource) {
        this.pickup(adjacentResource);
        const dropoffTask = buildDropoffTask(this, township);
        this.memory.taskRequests = dropoffTask ? [dropoffTask] : [];
      } else {
        console.log('Error finding adjacent resource, though our position says we should be next to one');
        this.memory.taskRequests = [];
      }

    } else {
      this.moveTo(task.posX, task.posY);
    }
  }


  dropOffTaskRequest(task: ITaskRequest) {
    this.say('DROP OFF');

    if (isAdjacent(task.posX, task.posY, this.pos)) {
      const structures = this.room.find(FIND_STRUCTURES);
      const targetStructure = structures.find((structure) => {
        return structure.pos.x === task.posX && structure.pos.y === task.posY;
      });

      if (targetStructure) {
        this.transfer(targetStructure, RESOURCE_ENERGY);
        this.memory.taskRequests = [];

      } else {
        console.log('Error finding adjacent structure, though our position says we should be next to one');
        this.memory.taskRequests = [];
      }

    } else {
      if (task.posX > 0 && task.posY > 0) {
        this.moveTo(task.posX, task.posY);
      }
    }

  }
}
