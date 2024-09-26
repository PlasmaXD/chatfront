// services/api.ts
import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true, // セッションを含めたリクエストを送信
});

export default api;
