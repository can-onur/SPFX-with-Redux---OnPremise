import { Store } from "redux";
import { IAccountReducerState } from "./reducers/account";
import { ISearchReducerState } from "./reducers/search";
import { IUserReducerState } from "./reducers/user";

export default interface IStore extends Store<IStore> {
    readonly account: IAccountReducerState;
    readonly search: ISearchReducerState;
    readonly user: IUserReducerState;
  }

