import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import AccountReducer from './account';
import SearchReducer from './search';
import IStore from '../IStore';
import UserReducer from './user';

const combine = (): Reducer<IStore> => {
  const reducerMap: ReducersMapObject = {
    account: AccountReducer.reducer,
    search: SearchReducer.reducer,
    user: UserReducer.reducer,
  };

  return combineReducers(reducerMap);
};

export default combine as any;
