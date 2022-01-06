import {
   createStore, applyMiddleware
} from 'redux';
import thunk from "redux-thunk";
import combine from './reducers';

const configureStore = (initialState?) => {
  const middlewares = [
    thunk
  ];
  return createStore(
    combine(),
    initialState,
    applyMiddleware(...middlewares)
  );
}

export default configureStore as any;