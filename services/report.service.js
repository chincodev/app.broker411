import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const reportService = {
    get,
    find,
    create,
    update,
    delete: _delete
};

function get(query = '') {
    return fetchWrapper.get(`${baseUrl}reports${query}`);
}

function find(id, token) {
    return fetchWrapper.get(`${baseUrl}reports/${id}`, token);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}reports`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}reports/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}reports/${id}`, params);
}