import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const businessService = {
    list,
    find,
    find_in_fmcsa,
    create,
    verify,
    update,
    resendVerification,
    delete: _delete
};


function list(query = '') {
    return fetchWrapper.get(`${baseUrl}businesses${query}`);
}

function verify(token) {
    return fetchWrapper.get(`${baseUrl}businesses/verify/${token}`);
}

function find(_id) {
    return fetchWrapper.get(`${baseUrl}businesses/${_id}`);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}businesses`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}businesses/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}businesses/${id}`, params);
}

function find_in_fmcsa(dot) {
    return fetchWrapper.get(`${baseUrl}businesses/fmcsa/${dot}`);
}

function resendVerification(params) {
  return fetchWrapper.post(`${baseUrl}businesses/resend_verification/`, params);
}

