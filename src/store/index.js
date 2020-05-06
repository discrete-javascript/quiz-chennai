import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'; // defaults to localStorage for web
import rootReducer from './reducers';
import rootEpic from './epics';

const persistConfig = {
  key: 'primary',
  storage,
  version: 0,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialiseEpicMiddleware = createEpicMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  storeEnhancers(applyMiddleware(initialiseEpicMiddleware))
);

export const persistor = persistStore(store);

initialiseEpicMiddleware.run(rootEpic);
