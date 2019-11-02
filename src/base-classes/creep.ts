import { JobEnum } from '../spawning/job.enum';
import { TaskController } from '../tasks/task-controller';
import { TaskPriorityEnum } from '../tasks/task-priority.enum';
import { ITaskRequest } from '../tasks/task-requests';
import { TaskEnum } from '../tasks/task.enum';
import { Township } from '../township/township';
import { getSpacerId, isAdjacent } from '../util/utils';

export interface ITaskMemoryUpgrade {
  carryRequestId?: string;
}

export interface ICreepMemory {
  townshipId: string;
  job: JobEnum;
  taskRequests: ITaskRequest[];
  taskMemory: any;
}

export class SpacersChoiceCreep extends Creep {

  spacerId: string;
  memory: ICreepMemory;

  constructor(creep: Creep) {
    super(creep.id);
    this.spacerId = creep.name;
    if (!this.memory.taskMemory) {
      this.memory.taskMemory = {};
    }
  }

  run(township: Township) {
    if (this.memory.taskRequests && this.memory.taskRequests.length) {
      const taskRequest = this.memory.taskRequests[0];
      this.runTask(taskRequest, township);
    }
  }

  runTask(taskRequest: ITaskRequest, township: Township) {
    this.say(taskRequest.task);

    if (isAdjacent(taskRequest.posX, taskRequest.posY, this.pos)) {
      switch (taskRequest.task) {
        case TaskEnum.HARVEST:  return this.runHarvest(taskRequest);
        case TaskEnum.PICKUP:   return this.runPickup(taskRequest);
        case TaskEnum.DROP_OFF: return this.runDropOff(taskRequest);
        case TaskEnum.GIVE_TO:  return this.runGiveTo(taskRequest);
        case TaskEnum.UPGRADE:  return this.runUpgradeController(taskRequest, township);
        default:
          console.log('That task is not supported yet');
      }

    } else {
      this.moveTo(taskRequest.posX, taskRequest.posY);
    }
  }

  endTask(endTask: ITaskRequest) {
    this.memory.taskRequests = [];
    TaskController.removeTask(endTask.spacerId);
  }

  runHarvest(task: ITaskRequest) {
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
  }

  runPickup(task: ITaskRequest) {
    const resources = this.room.find(FIND_DROPPED_RESOURCES);
    const adjacentResource = resources.find((resource) => {
      return isAdjacent(resource.pos.x, resource.pos.y, this.pos);
    });

    if (adjacentResource) {
      this.pickup(adjacentResource);
      this.endTask(task);

    } else {
      console.log('Error finding adjacent resource, though our position says we should be next to one');
      this.memory.taskRequests = [];
    }
  }


  runDropOff(task: ITaskRequest) {
    const structures = this.room.find(FIND_STRUCTURES);
    const targetStructure = structures.find((structure) => {
      return structure.pos.x === task.posX && structure.pos.y === task.posY;
    });

    if (targetStructure) {
      this.transfer(targetStructure, RESOURCE_ENERGY);
      this.endTask(task);

    } else {
      console.log('Error finding adjacent structure, though our position says we should be next to one');
      this.memory.taskRequests = [];
    }
  }

  runGiveTo(task: ITaskRequest) {
    const creeps = this.room.find(FIND_CREEPS);
    const targetCreep = creeps.find((creep) => {
      return creep.pos.x === task.posX && creep.pos.y === task.posY;
    });

    if (targetCreep) {
      this.transfer(targetCreep, RESOURCE_ENERGY);
      this.endTask(task);

    } else {
      console.log('Error finding adjacent creep, though our position says we should be next to one');
      this.memory.taskRequests = [];
    }
  }

  runUpgradeController(task: ITaskRequest, township: Township) {
    const taskMemory: ITaskMemoryUpgrade = this.memory.taskMemory;

    if (this.carry.energy > 0) {
      this.upgradeController(township.controller);
      taskMemory.carryRequestId = undefined;

    } else {
      // If we have not already requested for energy, make a request
      if (!taskMemory.carryRequestId) {
        const carryTask = {
          spacerId: getSpacerId(),
          townshipId: township.spacerId,
          job: JobEnum.CARRY,
          task: TaskEnum.GIVE_TO,
          posX: this.pos.x,
          posY: this.pos.y,
          priority: TaskPriorityEnum.GIVE_UPGRADER_ENERGY
        };
        township.taskRequests.push(task);
        taskMemory.carryRequestId = carryTask.spacerId;
      }
    }
  }
}
