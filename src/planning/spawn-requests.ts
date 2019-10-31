import { JobEnum } from '../enums/job.enum';
import { JobPriorityEnum } from '../enums/job-priority.enum';
import { Township } from '../township/township';

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
        priority: index === 0 ? JobPriorityEnum.FIRST_HARVESTER : JobPriorityEnum.PRIMARY_ROOM_HARVESTER
      });
      spawnRequests.push({
        townshipId: township.spacerId,
        job: JobEnum.HARVEST,
        bodyParts: [MOVE, CARRY, CARRY],
        priority: index === 0 ? JobPriorityEnum.FIRST_HAULER : JobPriorityEnum.PRIMARY_ROOM_HAULER
      });
    });

  return spawnRequests;
}
