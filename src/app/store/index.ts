import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSagas from './rootSaga';

// const { reduxNativeDevTools } = global;

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(applyMiddleware(sagaMiddleware));

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
export const store = createStore(rootReducer, enhancer);
// export const store = createStore(persistedReducer, enhancer);

// Middleware: Redux Persist Persister
export const persistor = persistStore(store);

export default store;
sagaMiddleware.run(rootSagas);
