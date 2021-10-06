const types = {
  SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
  SET_TOKEN: 'SET_TOKEN',
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

export default {setIsAppLoading, setToken, types};
