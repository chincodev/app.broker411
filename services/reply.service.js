import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const replyService = {
    create,
    update,
    delete: _delete,
    count
};


function create(params) {
    return fetchWrapper.post(`${baseUrl}replies`, params);
}

function count(_id, token) {
    return fetchWrapper.get(`${baseUrl}replies/${_id}/count`, token);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}replies/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}replies/${id}`, params);
}
