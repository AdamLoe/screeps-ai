import { JobEnum } from '../spawning/job.enum';
import { TaskPriorityEnum } from './task-priority.enum';
import { TaskEnum } from './task.enum';

export interface ITaskRequest {
  spacerId: string;
  targetSpacerId: string;
  townshipId: string;
  job: JobEnum;
  taskType: TaskEnum;
  posX: number;
  posY: number;
  moveOnPos?: boolean;
  priority: TaskPriorityEnum;
  creepSpacerId?: string;
}
