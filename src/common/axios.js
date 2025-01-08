import axios from "axios";

// 기본 URL을 환경변수로 설정
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// 추가적인 기본 설정도 여기서 할 수 있습니다
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axios;
