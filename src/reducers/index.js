import {combineReducers} from 'redux';

import GeneralReducer from './GeneralReducer';

export default combineReducers({
  generalState: GeneralReducer,
});
