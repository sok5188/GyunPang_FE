import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

axios.defaults.headers.common['Content-Type'] = 'application/json';

const setAuthHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const token = localStorage.getItem("AccessToken");
if (token !== null) {
    setAuthHeader(token);
}

export default axios;

