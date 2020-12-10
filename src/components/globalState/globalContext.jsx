import { createContext } from 'react';

const appContext = {
    author : "",
    setAuthor : () => {},
    poetryTitle : "",
    setPoetryTitle : () => {},

};

const globalContext = createContext(appContext);

export default globalContext;