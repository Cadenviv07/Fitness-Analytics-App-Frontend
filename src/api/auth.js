import axios from "axios";

//Make sure this matches backend url
const API_URL =  "http://localhost:8080/api/auth";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = async (data) =>{
    return axios.post(`${API_URL}/register`, data);
};

export const verifyEmail = async (data) => {
  return axios.post(`${API_URL}/verify`, data);
};

export const sendVerificationEmail = async (email) => {
  return axios.post(`${API_URL}/sendVerification`, { email });
};

export const login = async (email) => {
  return axios.post(`${API_URL}/login`, { email });
};


