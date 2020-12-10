import React, { lazy, Suspense, useState } from 'react';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom'

import Header from './components/header/header';

import './App.scss';
import globalContext from './components/globalState/globalContext';

const Home = lazy(() => import('./pages/homepage'));
const Poem = lazy(() => import('./pages/poemPage'));

const App = () => {
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("")

    const pages = [
        {
          pageLink: '/',
          view: Home,
          displayName: 'Home',
          showInNavbar: true,
        }, {
            pageLink: '/poem',
            view: Poem,
            displayName: 'Poem',
            showInNavbar: true, 
        }
      ];

    return (
        <globalContext.Provider value={{poetryTitle: title, setPoetryTitle: setTitle, author:author, setAuthor:setAuthor}}>

            <div className="App">
                <Header pages={pages} />
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch location={location}>
                        {pages.map((page, index) => {
                            return (
                                <Route
                                    exact
                                    path={page.pageLink}
                                    render={({match}) => <page.view />}
                                    key={index}
                                />
                            );
                        })}

                        <Redirect to="/document" />
                    </Switch>
                </Suspense>
            </div>
        </globalContext.Provider>
    );
}

export default App;
