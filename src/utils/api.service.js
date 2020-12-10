import { API_URLS_AUTHOR } from './constents'

export const getAuthorList = () => {
    return fetch(`${API_URLS_AUTHOR}`)
        .then(res => res.json())
        .catch(err => err)
}


export const getPoetrtByAuthor = (authorName) => {
    return fetch(`${API_URLS_AUTHOR}/${authorName}/title`)
        .then(res => res.json())
        .catch(err => err)
}

export const getPoem = (authorName, poemName) => {
    return fetch(`${API_URLS_AUTHOR},title/${authorName};${poemName}`)
        .then(res => res.json())
            .catch(err => err)
}
