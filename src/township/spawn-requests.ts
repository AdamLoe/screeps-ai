import {JobEnum} from './job.enum';
import {SpacerTownship} from './spacer-township';

export interface ISpawnRequest {
  townshipId: string;
  job: JobEnum;
  bodyParts: BodyPartConstant[];
  priority: number;
}

export function buildSpawnRequestsForTownship(
  township: SpacerTownship,
): ISpawnRequest[] {
  // Get miners for sources
  // Get carriers for mines
  // Carriers and Miners should alternate top priority (want to get as much energy as possible)
  // Get upgraders (Upgraders should be next, at lower GCLs)
  // Get builders (Builders should be last, at Lower GCLs)
  return [];
}
