    import React, { useContext, useEffect, useState } from 'react';
    import { useHistory } from 'react-router-dom';
    import globalContext from '../components/globalState/globalContext';
    import { getPoem } from '../utils/api.service';
    import CustomButton from './../components/custom-button/custom-button.component';

    import './poempage.scss';

    const PoemPage = () => {
        const { author, poetryTitle } = useContext(globalContext);
        const [ poemLines, setPoem ] = useState([]);
        const [ rhymeStatus, setRhymeStatus ] = useState(false);
        const  history  = useHistory();

        // created method to get the poems and pass to UI as well as isRhymingScheme 
        const getPoemLineByLine = async () => {
            const poemLines = await getPoem ( author, poetryTitle );

            if ( poemLines && poemLines.length ) {
                const linesArr = poemLines.map(i => i.lines);
                isRhymingScheme(poemLines);

                setPoem(linesArr);
            }
        }

        // careted this method to send lines to isRhyming method for the validation
        const isRhymingScheme = (lines) => {
            let rhymeStatus = false;

            for( let i =0; i<lines[0].lines.length; i+=2 ) {
                if(rhymeStatus === true){
                    break;
                }
                rhymeStatus = rhymeStatus || isRhyming(i, lines[0].lines);
            }
            return setRhymeStatus(rhymeStatus);
        }
        
        // Created method to validated rhyme scheme as it contains at least one couplete
        const isRhyming = (currentIndes, linesArr) => {

            if (currentIndes === linesArr.length - 1) {
                return false;
            } 
            const curLineLastChar = linesArr[currentIndes].replace(/[\s+,.]/g, '').slice(-2);
            const nextLineLastChar = linesArr[currentIndes+1].replace(/[\s+,.]/g, '').slice(-2);
            
            return (curLineLastChar === nextLineLastChar)
        }

        // This method has been created to navigate homepage
        const navigateToPoemPage = () => {
            history.push('/')
        } 

        // In UseEffect called getPoemLineByLine method to get Poem 
        useEffect(() => {
            if (author && poetryTitle) {
                getPoemLineByLine()
            } 
        }, [author, poetryTitle])

        return (
            <div className="page-container">
                <div className="poetry-content">
                    {
                        poemLines && poemLines.length && poemLines.map(
                            p => (
                                <ul className="poetry-lines"> 
                                    {p.map( (l, index) => (
                                        <li key={index}>{l}</li>
                                    ))}
                                </ul>
                            )
                        )
                    }
                </div>

                <div className="footer-content">
                    <p className="not-found">
                        <em>
                            Rhyme scheme: 
                            { setRhymeStatus && <span> AA BB</span> } 
                            { !setRhymeStatus && <span> not found!</span> }
                        </em>
                    </p>
                    <div className="action-btn">
                        <CustomButton onClick={navigateToPoemPage}>Back to Home Page</CustomButton>
                    </div>
                </div>

                

                
            </div>
        )
    }

    export default PoemPage;
