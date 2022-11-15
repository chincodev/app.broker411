import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const reviewService = {
    list,
    find,
    create,
    update,
    delete: _delete,
};


function list(query = '', token) {
    return fetchWrapper.get(`${baseUrl}reviews${query}`, token);
}

function find(_id, token) {
    return fetchWrapper.get(`${baseUrl}reviews/${_id}`, token);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}reviews`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}reviews/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}reviews/${id}`, params);
}
