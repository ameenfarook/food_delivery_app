import {GeneralAction} from '../actions';

const initialState = {
  isAppLoading: true,
  token: '',
  isFirstTimeUse: true,
};

const GeneralReducer = (state = initialState, action) => {
  switch (action.type) {
    case GeneralAction.types.SET_IS_APP_LOADING:
      return {...state, isAppLoading: action.payload};
    case GeneralAction.types.SET_TOKEN:
      return {...state, token: action.payload};
    case GeneralAction.types.SET_FIRST_TIME_USE:
      return {...state, isFirstTimeUse: action.payload};
    default:
      return state;
  }
};

export default GeneralReducer;
