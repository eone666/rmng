const API_TOKEN = process.env.REACT_APP_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

function objectToQuery(params) {

    if (params) {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    } else {
        return ''
    }

}

export async function find(id, params) {

    return fetch(`${BASE_URL}/find/${id}?api_key=${API_TOKEN}&${objectToQuery(params)}`)
        .then(res => res.json())
        .catch(error => error)

}