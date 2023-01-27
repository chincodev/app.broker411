import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const cityService = {
    list,
    find,
};


function list(query = '', token) {
    return fetchWrapper.get(`${baseUrl}cities${query}`, token);
}

function find(id, token) {
    return fetchWrapper.get(`${baseUrl}cities/${id}`, token);
}