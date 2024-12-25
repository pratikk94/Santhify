import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://testapi.studentpro.vils.ai/santhify/api/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    const jwtString = localStorage.getItem('jwt');
    // console.log(jwtString);
    if (jwtString) {
      const jwt = JSON.parse(jwtString);
      config.headers.Authorization = `Bearer ${jwt.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
