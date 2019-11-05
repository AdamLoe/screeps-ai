import { SpacersChoiceMemory } from '../memory';
import { getSpacerId } from '../util/utils';
import { ITaskRequest } from './task-request.interface';

export class TaskController {

    static getTaskBySpacerId(taskSpacerId: string): ITaskRequest {
        const memory = SpacersChoiceMemory.get();
        return memory.taskRequests[taskSpacerId];
    }

    static addTask(task: Partial<ITaskRequest>): ITaskRequest {
        const memory = SpacersChoiceMemory.get();
        task.spacerId = getSpacerId();
        memory.taskRequests[task.spacerId] = task as ITaskRequest;
        return task as ITaskRequest;
    }

    static removeTask(taskId: string) {
        const memory = SpacersChoiceMemory.get();
        delete memory.taskRequests[taskId];
    }

    static taskExists(taskId: string) {
        const memory = SpacersChoiceMemory.get();
        return !!memory.taskRequests[taskId];
    }
}

