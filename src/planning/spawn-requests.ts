import {Township} from '../township/township';
import {JobEnum} from '../enums/job.enum';

export interface ISpawnRequest {
  townshipId: string;
  job: JobEnum;
  bodyParts: BodyPartConstant[];
  priority: number;
}

export function buildSpawnRequestsForTownship(
  township: Township,

): ISpawnRequest[] {
  // Get miners for sources
  // Get carriers for mines
  // Carriers and Miners should alternate top priority (want to get as much energy as possible)
  // Get upgraders (Upgraders should be next, at lower GCLs)
  // Get builders (Builders should be last, at Lower GCLs)
  const spawnRequests: ISpawnRequest[] = [];


  township.sources.forEach((source) => {
    // Closest Source get 100 Priority
    // Other sources in this room get 80 priority
  });
  return [];
}
