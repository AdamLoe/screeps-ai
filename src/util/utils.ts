import {SpacersChoiceMemory} from '../memory/spacer-memory';

/**
 * Returns a new spacer ID. Also handles incrementing our name counter
 */
export function getSpacerId(): string {
  const memory = SpacersChoiceMemory.get();
  memory.nameClk += 1;
  return memory.nameClk.toString();
}
