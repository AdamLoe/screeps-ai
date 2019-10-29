import {JobEnum} from './job.enum';
import {SpacerTownship} from './spacer-township';
import {TaskEnum} from './task.enum';

export interface ITaskRequest {
  townshipId: string;
  job: JobEnum;
  task: TaskEnum;
  posX: number;
  posY: number;
  priority: number;
}

export function buildTaskRequestsForTownship(
  township: SpacerTownship,
): ITaskRequest[] {
  // Mine this shit
  // Pickup this shit from container
  // Put shit in this container/spawner/extension
  // Upgrade this
  return [];
}
