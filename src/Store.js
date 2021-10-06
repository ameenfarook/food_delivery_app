import {createStore} from 'redux';
import Reducers from './reducers';

const Store = createStore(Reducers);

export default Store;
