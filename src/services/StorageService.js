import AsyncSorage from '@react-native-async-storage/async-storage';

const setFirstTimeUse = () => {
  return AsyncSorage.setItem('isFirstTimeUse', 'true');
};

const getFirstTimeUse = () => {
  return AsyncSorage.getItem('isFirstTimeUse');
};

const setToken = token => {
  return AsyncSorage.setItem('token', token);
};

const getToken = () => {
  return AsyncSorage.getItem('token');
};

export default {setFirstTimeUse, getFirstTimeUse, setToken, getToken};
