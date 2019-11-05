import { SpacersChoiceMemory } from './memory';

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

function hardReset() {
    const memory = SpacersChoiceMemory.get();
    for (const key in memory) {
        // @ts-ignore
        delete memory[key];
    }
    for (const creepId in Game.creeps) {
        const creep = Game.creeps[creepId];
        creep.suicide();
    }
}

export function setupScripts() {
    const globalObj = global as any;
    globalObj.clearTasks = clearTasks;
    globalObj.clearTownshipCache = clearTownshipCache;
    globalObj.hardReset = hardReset;
}
