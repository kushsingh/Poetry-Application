import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AutocompleteSearch from '../autoCompleteSearch/autoCompleteSearch';
import { getAuthorList } from '../../utils/api.service';
import { getPoetryByAuthor } from '../../utils/api.service';
import CustomButton from '../custom-button/custom-button.component';
import globalContext from '../globalState/globalContext';

import './poetriesAndAuthor.scss';


const PoetryPage = (props) => {
    const [authors, setAuthorArr] = useState([]); // store Authors in Array
    const [poetry, setpoetry] = useState([]); // store Poetry titles in Array
    const [selectedAuthor, setselectedAuthor] = useState(null); // store Author Name
    const [selectedTitle, setselectedTitle] = useState(null);// store Title 

    const {setPoetryTitle, setAuthor} = useContext(globalContext); // store Data in to context API to access another pages

    const  history  = useHistory();

    // This method has created been to get Author Name
    const getloadAuthor = async (key) => {
        const authorList = await getAuthorList();

        if ( authorList && authorList.authors.length ) {
            setAuthorArr(authorList.authors);
        } 
    }

    // In UseEffect called getloadAuthor method to get list of Author Name
    useEffect(() => {
            getloadAuthor();
    }, [])


    // This method has been created to get list of poem title as per salected Author
    const loadData = async (key) => {
        const poetry = await getPoetryByAuthor ( key );

        if ( poetry && poetry.length ) {
            const titles = poetry.map(i => i.title);
            setpoetry(titles);
        } 
    }

    // This method has been created to store selected Author name
    const authorOnChange = (event) => {
        const searchKey = event;

        if( searchKey.length >= 3 ) {
            setAuthor(searchKey);
            setselectedAuthor(searchKey)
            loadData(searchKey);
        }
    }

    // This method has been created to store selected title    
    const onPoetrySelection = ( key ) => {
        setPoetryTitle(key)
        setselectedTitle(key)
    }

    // This method has been created to navigate Poempage
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
                    <CustomButton disabled={ !(selectedTitle && selectedAuthor) } onClick={navigateToPoemPage}>Search Poem</CustomButton>
                </div>
            </div>
        </div>
    )
};

export default PoetryPage;