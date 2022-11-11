import { DATA_GRID_PROPS_DEFAULT_VALUES } from '@mui/x-data-grid';
import { authService } from '../services/auth.service';

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete,
}

function get(url, token) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',  
            ...(token ? { Authorization: `Bearer ${token}` } : {...authHeader()})
        }
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function authHeader() {
    const accessToken = authService.getToken();
    const isLoggedIn = accessToken ? true : false;
    if (isLoggedIn) {
        return { Authorization: `Bearer ${accessToken}` };
    } else {
        return {};
    }
}


function handleResponse(response) {

    if (!response.ok){
        if ([401, 403,].includes(response.status)) {
            authService.logout();
        }
        if ([429].includes(response.status)) {
            authService.logout();
        }
    }
    return response.text().then(text => {
        let data = text && JSON.parse(text);

        if (!response.ok) {
            if(data.data){
                data = data.data
            }
            let errors = data.errors && data.errors.length > 0 ? data.errors : data.data && data.data.message ? [{message:data.data.message}] : [{message:response.statusText}]
            console.log(errors)
            return Promise.reject({errors, code: response.status});
        }
        return data;
    });
}
