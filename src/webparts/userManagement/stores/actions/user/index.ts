import { IPersonaProps } from 'office-ui-fabric-react';
import IAction from '../../IAction';

export type UserActionUnion = IPersonaProps[];

export default class UserAction {

  public static readonly GET: string = 'UserAction.GET';
  public static readonly SET: string = 'UserAction.SET';

  public static Get(): IAction<void> {
    return {
      type: UserAction.GET,
    };
  }
  public static Set(peopleList: IPersonaProps[]): IAction<IPersonaProps[]> {
    return {
      payload: peopleList,
      type: UserAction.SET,
    };
  }
}
