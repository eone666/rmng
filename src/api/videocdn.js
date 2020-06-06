const API_TOKEN = process.env.REACT_APP_VIDEOCDN_API_KEY
const BASE_URL = "https://videocdn.tv/api"

function objectToQuery(params) {

    if (params) {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    } else {
        return ''
    }

}

export async function movies(params) {

    return fetch(`${BASE_URL}/movies?api_token=${API_TOKEN}&${objectToQuery(params)}`)
        .then(res => res.json())
        .catch(error => error)

}

export async function short(params) {

    return fetch(`${BASE_URL}/short?api_token=${API_TOKEN}&${objectToQuery(params)}`)
        .then(res => res.json())
        .catch(error => error)

}