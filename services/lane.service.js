import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const laneService = {
    list,
    find,
    create,
    update,
    delete: _delete,
};


function list(query = '') {
    return fetchWrapper.get(`${baseUrl}lanes${query}`);
}

function find(_id, token) {
    return fetchWrapper.get(`${baseUrl}lanes/${_id}`, token);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}lanes`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}lanes/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}lanes/${id}`, params);
}
