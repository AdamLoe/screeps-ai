import { SpacersChoiceMemory } from '../memory/memory';

function clearTasks() {
    const memory = SpacersChoiceMemory.get();
    memory.taskRequests = {};
}

function clearTownshipCache() {
    const memory = SpacersChoiceMemory.get();
    for (const townshipId in memory.townships) {
        const townshipMemory = memory.townships[townshipId];
        townshipMemory.cachedRequests = null as any;
    }
}

export function setupScripts() {
    const globalObj = global as any;
    globalObj.clearTasks = clearTasks;
    globalObj.clearTownshipCache = clearTownshipCache;
}
