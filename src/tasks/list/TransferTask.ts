import { SpacersChoiceCreep } from '../../creep';
import { JobEnum } from '../../spawning/job.enum';
import { Township } from '../../township';
import { getSpacerId, getStructureFreeRoom, transferrableStructureTypes } from '../../util/utils';
import { TaskPriorityEnum } from '../task-priority.enum';
import { ITaskRequest } from '../task-request.interface';
import { TaskEnum } from '../task.enum';
import { BaseTask } from './_BaseTask';

export class TransferTask extends BaseTask {

  static buildRequests(township: Township): ITaskRequest[] {

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

  cancelTask(taskRequest: ITaskRequest): boolean {
    return false;
  }

  runTask(task: ITaskRequest, creep: SpacersChoiceCreep) {
    if (task.task === TaskEnum.DROP_OFF) {

      const structures = creep.room.find(FIND_STRUCTURES);
      const targetStructure = structures.find((structure) => {
        return structure.pos.x === task.posX && structure.pos.y === task.posY;
      });

      if (targetStructure) {
        creep.transfer(targetStructure, RESOURCE_ENERGY);
        creep.endTask(task);

      } else {
        console.log('Error finding adjacent structure, though our position says we should be next to one');
        creep.memory.taskRequests = [];
      }
    }

    if (task.task === TaskEnum.GIVE_TO) {
      const creeps = creep.room.find(FIND_CREEPS);
      const targetCreep = creeps.find((findCreep) => {
        return findCreep.pos.x === task.posX && findCreep.pos.y === task.posY;
      });

      if (targetCreep) {
        creep.transfer(targetCreep, RESOURCE_ENERGY);
        creep.endTask(task);

      } else {
        console.log('Error finding adjacent creep, though our position says we should be next to one');
        creep.memory.taskRequests = [];
      }
    }
  }
}
