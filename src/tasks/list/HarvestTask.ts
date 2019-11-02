import { SpacersChoiceSource } from '../../base-classes/source';
import { SpacersChoiceCreep } from '../../creep';
import { JobEnum } from '../../spawning/job.enum';
import { Township } from '../../township';
import { getSpacerId, isAdjacent } from '../../util/utils';
import { TaskPriorityEnum } from '../task-priority.enum';
import { ITaskRequest } from '../task-request.interface';
import { TaskEnum } from '../task.enum';
import { BaseTask } from './_BaseTask';

export class HarvestTask extends BaseTask {

  static buildRequests(township: Township): ITaskRequest[] {

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

  cancelTask(task: ITaskRequest): boolean {
    return false;
  }

  runTask(task: ITaskRequest, creep: SpacersChoiceCreep) {
    const sources = creep.room.find(FIND_SOURCES);
    const adjacentSource = sources.find((source) => {
      return isAdjacent(source.pos.x, source.pos.y, creep.pos);
    });

    if (adjacentSource) {
      creep.harvest(adjacentSource);

    } else {
      console.log('Error finding adjacent source, though our position says we should be next to one');
      creep.memory.taskRequests = [];
    }
  }
}
