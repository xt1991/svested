const axios = require('axios').default;

const headers = {
  'content-type': 'application/json',
  accept: 'application/json',
};

const apiClient = axios.create({
  baseURL: 'http://localhost:9696/',
  timeout: 30000,
  headers,
});

apiClient?.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Request made and server responded
      return Promise.reject(error.response.data);
    }

    if (error.request) {
      // The request was made but no response was received
      return Promise.reject(error.request);
    }
    // Something happened in setting up the request that triggered an Error
    return Promise.reject({ status: error.status, message: error.message });
  }
);

export default apiClient;
