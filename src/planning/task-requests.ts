import { JobEnum } from '../enums/job.enum';
import { TaskPriorityEnum } from '../enums/task-priority.enum';
import { TaskEnum } from '../enums/task.enum';
import { Township } from '../township/township';

export interface ITaskRequest {
  townshipId: string;
  job: JobEnum;
  task: TaskEnum;
  posX: number;
  posY: number;
  priority: TaskPriorityEnum;
}

export function buildTaskRequestsForTownship(
  township: Township
): ITaskRequest[] {
  const taskRequests: ITaskRequest[] = [];

  // Create a hauler and carrier for each source
  township.sources
    .forEach((source) => {
      taskRequests.push({
        townshipId: township.spacerId,
        job: JobEnum.HARVEST,
        task: TaskEnum.HARVEST,
        posX: source.pos.x,
        posY: source.pos.y,
        priority: TaskPriorityEnum.HARVEST
      });
    });

  return taskRequests;
}
