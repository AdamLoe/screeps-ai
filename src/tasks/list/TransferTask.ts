import { SpacersChoiceCreep } from '../../creep';
import { JobEnum } from '../../spawning/job.enum';
import { Township } from '../../township';
import { getStructureFreeRoom, transferrableStructureTypes } from '../../util/utils';
import { TaskPriorityEnum } from '../task-priority.enum';
import { ITaskRequest } from '../task-request.interface';
import { TaskEnum } from '../task.enum';
import { BaseTask } from './_BaseTask';

export class TransferTask extends BaseTask {

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

    return [
      ...this.buildStructureRequests(township),
      ...this.buildCreepRequests(township)
    ];
  }

  static buildStructureRequests(township: Township): Array<Partial<ITaskRequest>> {

    const availableStructures = township.findStructures(transferrableStructureTypes)
      .filter((structure) => getStructureFreeRoom(structure) > 0);

    return availableStructures.map((structure) => {
      return {
        targetSpacerId: structure.id,
        townshipId: township.spacerId,
        job: JobEnum.CARRY,
        taskType: TaskEnum.DROP_OFF,
        posX: structure.pos.x,
        posY: structure.pos.y,
        priority: TaskPriorityEnum.DROP_OFF_RESOURCES
      };
    });
  }

  static buildCreepRequests(township: Township): Array<Partial<ITaskRequest>> {

    return township.creeps
      .filter((creep) => !creep.carry.energy)
      .filter((creep) => creep.memory.job === JobEnum.UPGRADE)
      .map((creep) => {
        return {
          targetSpacerId: creep.spacerId,
          townshipId: township.spacerId,
          job: JobEnum.CARRY,
          taskType: TaskEnum.GIVE_TO,
          posX: creep.pos.x,
          posY: creep.pos.y,
          priority: TaskPriorityEnum.DROP_OFF_RESOURCES
        };
      });
  }

  shouldCancelTask(): boolean {
    return false;
  }

  runTask() {
    if (this.task.taskType === TaskEnum.DROP_OFF) {

      const structures = this.creep.room.find(FIND_STRUCTURES);
      const targetStructure = structures.find((structure) => {
        return structure.pos.x === this.task.posX && structure.pos.y === this.task.posY;
      });

      if (targetStructure) {
        this.creep.transfer(targetStructure, RESOURCE_ENERGY);
      } else {
        console.log('Error finding adjacent structure, though our position says we should be next to one');
      }
      this.creep.endTask(this.task);
    }

    if (this.task.taskType === TaskEnum.GIVE_TO) {
      const creeps = this.creep.room.find(FIND_CREEPS);
      const targetCreep = creeps.find((findCreep) => {
        return findCreep.pos.x === this.task.posX && findCreep.pos.y === this.task.posY;
      });

      if (targetCreep) {
        this.creep.transfer(targetCreep, RESOURCE_ENERGY);
      } else {
        console.log('Error finding adjacent creep, though our position says we should be next to one');
      }
      this.creep.endTask(this.task);
    }
  }
}
