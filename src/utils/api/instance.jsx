import axios from 'axios';
import environment from 'environments/environment';

export default (options = {}) => {
  const axiosInstance = axios.create({
    ...options,
    baseURL: `${options.baseURL}`,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: environment.key,
    },
  });

  return axiosInstance;
};
