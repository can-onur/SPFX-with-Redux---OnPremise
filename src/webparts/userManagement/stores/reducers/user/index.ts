import IAction from "../../IAction";
import { IPersonaProps } from "office-ui-fabric-react";
import UserAction, { UserActionUnion } from "../../actions/user";

export interface IUserReducerState {
    readonly peopleList:  IPersonaProps[];
}

export default class UserReducer {

    private static readonly _initialState: IUserReducerState = {
      peopleList: []
    };

    public static reducer(state: IUserReducerState = UserReducer._initialState,
        action: IAction<UserActionUnion>): IUserReducerState {
        switch (action.type) {
            case UserAction.GET: 
              return UserReducer.reduceGetAction(state);
            case UserAction.SET: 
              return UserReducer.reduceSetAction(state,action);
            default:
                return state;
        }
    }
    private static reduceSetAction= (state= UserReducer._initialState, action: IAction<UserActionUnion>) => {
        return {...state,peopleList: action.payload}
    }

    private static reduceGetAction= (state= UserReducer._initialState) => {
      return {...state}
  }
}


