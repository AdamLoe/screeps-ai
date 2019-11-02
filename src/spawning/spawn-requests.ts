import { Township } from '../township';
import { JobPriorityEnum } from './job-priority.enum';
import { JobEnum } from './job.enum';

export interface ISpawnRequest {
  townshipId: string;
  job: JobEnum;
  bodyParts: BodyPartConstant[];
  priority: JobPriorityEnum;
  creepSpacerId?: string;
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
        priority: index === 0 ?
            JobPriorityEnum.FIRST_HARVESTER :
            JobPriorityEnum.PRIMARY_ROOM_HARVESTER + index
      });
      spawnRequests.push({
        townshipId: township.spacerId,
        job: JobEnum.CARRY,
        bodyParts: [MOVE, MOVE, CARRY, CARRY],
        priority: index === 0 ?
            JobPriorityEnum.FIRST_HAULER :
            JobPriorityEnum.PRIMARY_ROOM_HAULER + index
      });
    });

  spawnRequests.push({
    townshipId: township.spacerId,
    job: JobEnum.UPGRADE,
    bodyParts: [MOVE, CARRY, WORK, WORK],
    priority: JobPriorityEnum.FIRST_UPGRADER
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
