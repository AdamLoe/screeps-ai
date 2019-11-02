import { SpacersChoiceMemory } from '../memory/memory';
import { ITaskRequest } from './task-requests';


export class TaskController {

    static addTask(task: ITaskRequest) {
        const memory = SpacersChoiceMemory.get();
        memory.taskRequests[task.spacerId] = task;
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

