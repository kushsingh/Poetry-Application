import { API_URLS_AUTHOR } from './constents'

// API service request for get Author list Name
export const getAuthorList = () => {
    return fetch(`${API_URLS_AUTHOR}`)
        .then(res => res.json())
        .catch(err => err)
}

// API service request for get Title as per salected Author Name
export const getPoetryByAuthor = (authorName) => {
    return fetch(`${API_URLS_AUTHOR}/${authorName}/title`)
        .then(res => res.json())
        .catch(err => err)
}

// API service request for get Poemas per salected Author Name and poem title
export const getPoem = (authorName, poemName) => {
    return fetch(`${API_URLS_AUTHOR},title/${authorName};${poemName}`)
        .then(res => res.json())
            .catch(err => err)
}
