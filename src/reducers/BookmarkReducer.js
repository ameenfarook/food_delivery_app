import {BookmarkAction} from '../actions';

const initialState = {
  bookmarks: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BookmarkAction.types.GET_BOOKMARKS:
      return {...state, bookmarks: action?.payload};
    case BookmarkAction.types.SET_IS_LOADING:
      return {...state, isLoading: action?.payload};
    default:
      return state;
  }
};
