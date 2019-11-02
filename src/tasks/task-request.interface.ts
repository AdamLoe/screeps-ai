import { JobEnum } from '../spawning/job.enum';
import { TaskPriorityEnum } from './task-priority.enum';
import { TaskEnum } from './task.enum';

export interface ITaskRequest {
  spacerId: string;
  targetSpacerId: string;
  townshipId: string;
  job: JobEnum;
  task: TaskEnum;
  posX: number;
  posY: number;
  priority: TaskPriorityEnum;
  creepSpacerId?: string;
}
