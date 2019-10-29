import {SpacersChoiceMemory} from './memory/spacer-memory';
import {SpacersChoiceBoard} from './spacers-choice-board';
import {getGlobalObject} from "./util/global";

export function loop() {

  /**
   * Load our memory object (Only applicable on hard reset / init)
   */
  SpacersChoiceMemory.loadMemory();

  /**
   * Setup our board with our memory / game object
   */
  const global = getGlobalObject();
  global.spacerBoard = new SpacersChoiceBoard();
  global.spacerBoard.init();

  /**
   * Run our actions for this tick
   */
  global.spacerBoard.run();
}
