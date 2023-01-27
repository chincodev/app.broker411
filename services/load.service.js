import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const loadService = {
    get,
    find,
    create,
    update,
    delete: _delete
};

function get(query = '') {
    return fetchWrapper.get(`${baseUrl}loads${query}`);
}

function find(id, token) {
    return fetchWrapper.get(`${baseUrl}loads/${id}`, token);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}loads`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}loads/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}loads/${id}`, params);
}