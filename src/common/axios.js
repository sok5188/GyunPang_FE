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


axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 응답 오류 발생 시
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized 오류가 발생한 경우
      console.log("401 Unauthorized 발생, 새 토큰을 갱신합니다...");

      try {
        const refreshResponse = await axios.put("gateway/refresh");

        // 새 토큰 저장
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem("AccessToken", newAccessToken);

        // 새로 받은 Access Token을 헤더에 설정
        setAuthHeader(newAccessToken);

        // 실패한 원래 요청을 새 토큰으로 재시도
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error("새 토큰을 가져오는 데 실패했습니다.", refreshError);
        // 리프레시 토큰 실패 시 로그아웃 처리 등 할 수 있음
        localStorage.removeItem("AccessToken");
        alert("로그인 정보가 유효하지 않습니다.")
      }
    }
    // 다른 오류는 그대로 반환
    return Promise.reject(error);
  }
);


export default axios;

