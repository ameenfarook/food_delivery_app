import {createStore, applyMiddleware} from 'redux';
import Reducers from './reducers';
import thunk from 'redux-thunk';

const Store = createStore(Reducers, applyMiddleware(thunk));

export default Store;
