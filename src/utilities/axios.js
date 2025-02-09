import axios from 'axios';

const instance = axios.create();

const setAuth = (token) => {
  instance.defaults.headers.common.Authorization = token;
};

const getAuth = () => {
  return instance.defaults.headers.common.Authorization;
};

export default instance;
export { getAuth, setAuth };
