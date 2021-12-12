import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistMiddleware } from './middlewares/persistMiddlware';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);
