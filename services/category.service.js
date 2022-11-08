import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const categoryService = {
    list,
    find,
    create,
    update,
    delete: _delete,
};


function list(query = '') {
    return fetchWrapper.get(`${baseUrl}categories${query}`);
}

function find(_id, token) {
    return fetchWrapper.get(`${baseUrl}categories/${_id}`, token);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}categories`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}categories/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}categories/${id}`, params);
}
