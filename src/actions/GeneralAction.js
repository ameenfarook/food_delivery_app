import {AuthenicationService, StorageService} from '../services';
import UserService from '../services/UserService';
import BookmarkAction from './BookmarkAction';
import CartAction from './CartAction';

const types = {
  SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
  SET_TOKEN: 'SET_TOKEN',
  SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE',
  SET_USER_DATA: 'SET_USER_DATA',
};

const setIsAppLoading = isAppLoading => {
  return {
    type: types.SET_IS_APP_LOADING,
    payload: isAppLoading,
  };
};

const setToken = token => {
  return {
    type: types.SET_TOKEN,
    payload: token,
  };
};

const setIsFirstTimeUse = () => {
  return {
    type: types.SET_FIRST_TIME_USE,
    payload: false,
  };
};

const setUserData = userData => {
  return {
    type: types.SET_USER_DATA,
    payload: userData,
  };
};

const appStart = () => {
  return (dispatch, getState) => {
    StorageService.getFirstTimeUse().then(isFirstTimeUse => {
      dispatch({
        type: types.SET_FIRST_TIME_USE,
        payload: isFirstTimeUse ? false : true,
      });
    });
    StorageService.getToken().then(token => {
      if (token) {
        dispatch({
          type: types.SET_TOKEN,
          payload: token,
        });
        UserService.getUserData().then(userResponse => {
          if (userResponse?.status) {
            dispatch({
              type: types.SET_USER_DATA,
              payload: userResponse?.data,
            });
            dispatch(CartAction.getCartItems());
            dispatch(BookmarkAction.getBookmarks());
            dispatch({
              type: types.SET_IS_APP_LOADING,
              payload: false,
            });
          } else if (userResponse?.message === 'TokenExpiredError') {
            AuthenicationService.refreshToken().then(tokenResponse => {
              if (tokenResponse?.status) {
                dispatch({
                  type: types.SET_TOKEN,
                  payload: tokenResponse?.data,
                });
                UserService.getUserData().then(userResponse => {
                  if (userResponse?.status) {
                    dispatch({
                      type: types.SET_USER_DATA,
                      payload: userResponse?.data,
                    });
                    dispatch({
                      type: types.SET_IS_APP_LOADING,
                      payload: false,
                    });
                  }
                });
              } else {
                dispatch({
                  type: types.SET_TOKEN,
                  payload: '',
                });
                dispatch({
                  type: types.SET_IS_APP_LOADING,
                  payload: false,
                });
              }
            });
          }
        });
      }
      dispatch({
        type: types.SET_IS_APP_LOADING,
        payload: false,
      });
    });
  };
};

export default {
  setIsAppLoading,
  setToken,
  appStart,
  setIsFirstTimeUse,
  setUserData,
  types,
};
