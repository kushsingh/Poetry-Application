import React from 'react';

import PoetriesAndAuthor from './../components/poetriesAndAuthor/poetriesAndAuthor';

import './homepage.scss';


const HomePage = () => {
    return (
        <div className='main-container'>
            <PoetriesAndAuthor />
        </div>
    )  
};

export default HomePage;