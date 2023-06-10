const API = '37188095-ba760fd787fe26f9993fba281';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchQuery(q) {
    const options = new URLSearchParams({ key: API, 
        q: 'white+tiger',
        image_type: 'photo',
        orientation:'horizontal',
        safesearch: true
    });
    return fetch(`${BASE_URL}?${options}`).then((response) => {
        if(!response.ok) {
            throw new Error(response.status)
        }
        console.log(response)
        return response.json()
    })
    .catch((error) => console.log(error))
}