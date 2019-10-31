import { JobEnum } from '../enums/job.enum';
import { PriorityEnum } from '../enums/priority.enum';
import { Township } from '../township/township';

export interface ISpawnRequest {
  townshipId: string;
  job: JobEnum;
  bodyParts: BodyPartConstant[];
  priority: number;
}

export function buildSpawnRequestsForTownship(
  township: Township

): ISpawnRequest[] {
  // Get miners for sources
  // Get carriers for mines
  // Carriers and Miners should alternate top priority (want to get as much energy as possible)
  // Get upgraders (Upgraders should be next, at lower GCLs)
  // Get builders (Builders should be last, at Lower GCLs)
  const spawnRequests: ISpawnRequest[] = [];

  township.sources.forEach((source, index) => {
    spawnRequests.push({
      townshipId: township.spacerId,
      job: JobEnum.HARVEST,
      bodyParts: [MOVE, WORK, WORK],
      priority: index === 0 ? PriorityEnum.FIRST_HARVESTER : PriorityEnum.PRIMARY_ROOM_HARVESTER
    });
    spawnRequests.push({
      townshipId: township.spacerId,
      job: JobEnum.HARVEST,
      bodyParts: [MOVE, CARRY, CARRY],
      priority: index === 0 ? PriorityEnum.FIRST_HAULER : PriorityEnum.PRIMARY_ROOM_HAULER
    });
  });
  return [];
}
