import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/users",
    withCredentials: true,
});

export const login = ({ email, password }) =>
    api.post("/login", { email, password });

export const register = ({ name, surname, email, password }) =>
    api.post("/register", { name, surname, email, password });

export const getProfile = () => api.get("/profile");

export const logout = () => api.post("/logout");