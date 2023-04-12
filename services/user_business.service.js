import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const user_businessService = {
    find,
    list,
    create,
    update,
    delete: _delete,
};

function list(query = '', token) {
    return fetchWrapper.get(`${baseUrl}user_businesses${query}`, token);
}

function find(_id, token) {
    return fetchWrapper.get(`${baseUrl}user_businesses/${_id}`, token);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}user_businesses`, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}user_businesses/${id}`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}user_businesses/${id}`);
}