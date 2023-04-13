import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const bondService = {
    find,
};

function find(id, token) {
    return fetchWrapper.get(`${baseUrl}bonds/${id}`, token);
}
