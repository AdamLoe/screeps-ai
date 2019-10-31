import { SpacersBoard } from '../spacers-board';

export interface ISpacerGlobalData {
  spacerBoard: SpacersBoard;
}

export function getGlobalObject(): ISpacerGlobalData {
  return global as any;
}
