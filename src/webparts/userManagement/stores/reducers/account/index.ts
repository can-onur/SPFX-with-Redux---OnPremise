import AccountAction, { AccountActionUnion } from "../../actions/account";
import IAction from "../../IAction";

export interface IAccountReducerState {
    readonly accountCreated : boolean;
}

export default class AccountReducer {

    private static readonly _initialState: IAccountReducerState = {
        accountCreated : false
    };

    public static reducer(state: IAccountReducerState = AccountReducer._initialState,
         action: IAction<AccountActionUnion>): IAccountReducerState {
        switch (action.type) {
            case AccountAction.CREATE: 
                return AccountReducer.reduceupdateSearchTexttAction(state,action);
            default:
                return state;
        }
    }
    private static reduceupdateSearchTexttAction= (state= AccountReducer._initialState, action: IAction<AccountActionUnion>) => {
        return {...state,accountCreated: action.payload}
    }
}


