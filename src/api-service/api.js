const API = '37188095-ba760fd787fe26f9993fba281';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchQuery(q, page) {
    const options = new URLSearchParams({ key: API, 
        q,
        image_type: 'photo',
        orientation:'horizontal',
        safesearch: true,
        page,
        per_page: 40
    });
    return fetch(`${BASE_URL}?${options}`).then((response) => {
        if(!response.ok) {
            throw new Error(response.status)
        }
        return response.json()
    })
    .catch((error) => console.log(error))
}