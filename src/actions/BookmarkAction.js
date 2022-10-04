import {BookmarkService} from '../services';

const types = {
  GET_BOOKMARKS: 'GET_BOOKMARKS',
  SET_IS_LOADING: 'SET_IS_LOADING',
};

const addBookmark = ({restaurantId}) => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    BookmarkService.addBookmark({restaurantId})
      .then(bookmarkResponse => {
        dispatch({
          type: types.GET_BOOKMARKS,
          payload: bookmarkResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const removeBookmark = ({restaurantId}) => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    BookmarkService.removeBookmark({restaurantId})
      .then(bookmarkResponse => {
        dispatch({
          type: types.GET_BOOKMARKS,
          payload: bookmarkResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const getBookmarks = () => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    BookmarkService.getBookmarks()
      .then(bookmarkResponse => {
        dispatch({
          type: types.GET_BOOKMARKS,
          payload: bookmarkResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

export default {types, addBookmark, removeBookmark, getBookmarks};
