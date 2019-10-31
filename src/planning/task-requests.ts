import { JobEnum } from '../enums/job.enum';
import { TaskEnum } from '../enums/task.enum';
import { Township } from '../township/township';

export interface ITaskRequest {
  townshipId: string;
  job: JobEnum;
  task: TaskEnum;
  posX: number;
  posY: number;
  priority: number;
}

export function buildTaskRequestsForTownship(
  township: Township
): ITaskRequest[] {
  // Mine this shit
  // Pickup this shit from container
  // Put shit in this container/spawner/extension
  // Upgrade this
  return [];
}
