import { fetchWrapper } from '../utils/fetchWrapper'
const baseUrl = process.env.NEXT_PUBLIC_API_URI;

export const likeService = {
    create,
    delete: _delete,
};


function create(params) {
    return fetchWrapper.post(`${baseUrl}likes`, params);
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}likes/${id}`);
}
