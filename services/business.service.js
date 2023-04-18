import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const businessService = {
    get,
    find,
    find_broker_in_fmcsa,
    find_carrier_in_fmcsa,
    create,
    verify,
    update,
    resendVerification,
    resetVerification,
    delete: _delete
};


function get(query = '') {
    return fetchWrapper.get(`${baseUrl}businesses${query}`);
}

function verify(token) {
    return fetchWrapper.get(`${baseUrl}businesses/verify/${token}`);
}

function find(id, token) {
    return fetchWrapper.get(`${baseUrl}businesses/${id}`, token);
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

function find_broker_in_fmcsa(dot, token, query) {
    return fetchWrapper.get(`${baseUrl}businesses/broker_fmcsa/${dot}?${query}`, token);
}

function find_carrier_in_fmcsa(dot) {
    return fetchWrapper.get(`${baseUrl}businesses/carrier_fmcsa/${dot}`);
}

function resendVerification(params) {
  return fetchWrapper.post(`${baseUrl}businesses/resend_verification/`, params);
}

function resetVerification(id) {
    return fetchWrapper.post(`${baseUrl}businesses/reset_verification/${id}`);
  }