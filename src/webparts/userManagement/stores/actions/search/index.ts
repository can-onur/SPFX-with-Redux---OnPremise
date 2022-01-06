import { IPersonaProps } from 'office-ui-fabric-react';
import IAction from '../../IAction';

export type SearchActionUnion = IPersonaProps[];

export default class SearchAction {

  public static readonly SELECT : string = 'SEARCHACTION.SELECT';
  public static readonly DESELECT : string = 'SEARCHACTION.DESELECT';

  public static Select (persona: IPersonaProps[]): IAction<IPersonaProps[]> {
      return {
        payload: persona,
        type: SearchAction.SELECT,
      };
  }

  public static Deselect (): IAction<IPersonaProps> {
    return {
      type: SearchAction.DESELECT,
    };
}
}
