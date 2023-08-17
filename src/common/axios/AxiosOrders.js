import axios from 'axios';
import { getItem } from "common/utils/Storage/Storage";

const token = getItem('login-token')

const instance = axios.create({
    baseURL: 'https://api.acpt.lk/api',
    headers: { Authorization : `Bearer ${token}`},
});

export default instance;