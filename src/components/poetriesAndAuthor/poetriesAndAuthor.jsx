import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AutocompleteSearch from '../autoCompleteSearch/autoCompleteSearch';

import { getAuthorList } from '../../utils/api.service';
import { getPoetrtByAuthor } from '../../utils/api.service';
import CustomButton from '../custom-button/custom-button.component';
import globalContext from '../globalState/globalContext';

import './poetriesAndAuthor.scss';


const PoetryPage = (props) => {
    const [authors, setAuthorArr] = useState([]);

    const [poetry, setpoetry] = useState([]);
    const [selectedTitle, setselectedTitle] = useState(null);
    const [selectedAuthor, setselectedAuthor] = useState(null);

    const {setPoetryTitle, setAuthor} = useContext(globalContext);

    const  history  = useHistory();

    const getloadAuthor = async (key) => {
        const authorList = await getAuthorList();

        if ( authorList && authorList.authors.length ) {
            setAuthorArr(authorList.authors);
        } 
    }

    useEffect(() => {
            getloadAuthor();
    }, [])


    const loadData = async (key) => {
        const poetry = await getPoetrtByAuthor ( key );

        if ( poetry && poetry.length ) {
            const titles = poetry.map(i => i.title);
            setpoetry(titles);
        } 
    }

    const authorOnChange = (event) => {
        const searchKey = event;

        if( searchKey.length >= 3 ) {
            setAuthor(searchKey);
            setselectedAuthor(searchKey)
            loadData(searchKey);
        }
    }

    const onPoetrySelection = ( key ) => {
        setPoetryTitle(key)
        setselectedTitle(key)
    }

    const navigateToPoemPage = () => {
        history.push('poem')
    }   

    return (
        <div className="page-container">
            <h2 className="search-title">Search Filter</h2>

            <div className="form-control">
                <div className="autocomplete">
                    <label>Author</label>
                    <AutocompleteSearch options={authors} onChange={authorOnChange}/>
                </div>

                <div className="autocomplete">
                    <label>Poet Title</label>
                    <AutocompleteSearch options={poetry} onChange={onPoetrySelection} />
                </div>
                <div className="action-btn">
                    <CustomButton disabled={ !(selectedTitle && selectedAuthor) } onClick={navigateToPoemPage} />
                </div>
            </div>
        </div>
    )
};

export default PoetryPage;