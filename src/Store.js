import {createStore, applyMiddleware} from 'redux';
import Reducers from './reducers';
import thunk from 'redux-thunk';

const Store = createStore(Reducers, applyMiddleware(thunk));

const getToken = () => Store?.getState()?.generalState?.token;

export {Store, getToken};
