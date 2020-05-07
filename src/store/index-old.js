import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers';
import rootEpic from './epics';

const initialiseEpicMiddleware = createEpicMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(initialiseEpicMiddleware))
);

initialiseEpicMiddleware.run(rootEpic);

export default store;
