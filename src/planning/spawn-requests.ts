import { JobPriorityEnum } from '../enums/job-priority.enum';
import { JobEnum } from '../enums/job.enum';
import { TaskPriorityEnum } from '../enums/task-priority.enum';
import { TaskEnum } from '../enums/task.enum';
import { Township } from '../township/township';
import { getSpacerId } from '../util/utils';
import { ITaskRequest } from './task-requests';

export interface ISpawnRequest {
  townshipId: string;
  job: JobEnum;
  bodyParts: BodyPartConstant[];
  priority: JobPriorityEnum;
  creepSpacerId?: string;
  taskRequests?: ITaskRequest[];
}

export function buildSpawnRequestsForTownship(
  township: Township
): ISpawnRequest[] {
  const spawnRequests: ISpawnRequest[] = [];

  // Create a hauler and carrier for each source
  township.sources
    .forEach((source, index) => {
      spawnRequests.push({
        townshipId: township.spacerId,
        job: JobEnum.HARVEST,
        bodyParts: [MOVE, WORK, WORK],
        priority: index === 0 ? JobPriorityEnum.FIRST_HARVESTER : JobPriorityEnum.PRIMARY_ROOM_HARVESTER,
        taskRequests: [{
          spacerId: getSpacerId(),
          townshipId: township.spacerId,
          job: JobEnum.HARVEST,
          task: TaskEnum.HARVEST,
          posX: source.pos.x,
          posY: source.pos.y,
          priority: TaskPriorityEnum.HARVEST
        }]
      });
      spawnRequests.push({
        townshipId: township.spacerId,
        job: JobEnum.CARRY,
        bodyParts: [MOVE, MOVE, CARRY, CARRY],
        priority: index === 0 ? JobPriorityEnum.FIRST_HAULER : JobPriorityEnum.PRIMARY_ROOM_HAULER
      });
    });

  return spawnRequests;
}


export function getSpawnCost(spawnRequest: ISpawnRequest): number {
  let cost = 0;
  spawnRequest.bodyParts.forEach((part) => {
    cost += BODYPART_COST[part];
  });
  return cost;
}
