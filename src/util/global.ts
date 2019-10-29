import {SpacersChoiceBoard} from '../spacers-choice-board';

export interface ISpacerGlobalData {
  spacerBoard: SpacersChoiceBoard;
}

export function getGlobalObject(): ISpacerGlobalData {
  return global as any;
}
