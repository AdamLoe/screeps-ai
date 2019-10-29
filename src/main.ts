import {SpacersChoiceMemory} from './memory/memory';
import {SpacersBoard} from './spacers-board';
import {getGlobalObject} from './util/global';

export function loop() {

  /**
   * Load our memory object (Only applicable on hard reset / init)
   */
  SpacersChoiceMemory.loadMemory();

  /**
   * Setup our board with our memory / game object
   */
  const global = getGlobalObject();
  global.spacerBoard = new SpacersBoard();
  global.spacerBoard.init();

  /**
   * Run our actions for this tick
   */
  global.spacerBoard.run();
}
