import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/notes",
    withCredentials: true,
});

export const upload = ({ title, body, state }) =>
    api.post("", { title, body, state });

export const list = () => {
    const res = api.get("");
    return res;
}

// Funció per obtenir una nota específica pel seu ID
// Es farà servir a la pàgina d'edició de notes per 
// carregar les dades de la nota a editar
export const getOne = (id) => api.get(`/${id}`);

export const edit = ({ _id, title, body, state }) =>
    api.put(`/${_id}`, { title, body, state });

export const del = (_id) => api.delete(`/${_id}`);