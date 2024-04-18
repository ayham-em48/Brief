/* eslint-disable react/prop-types */
import React from 'react';
import './App.css'
import './ErrorModal.css'

export default function ErrorModal(props) {

    return (
        <div className='mainErrorContainer'>
            <div className='errorBackground'></div>
            <div className='errorContainer' data-test="error-container">
                <div className='textContainer'>
                    <p data-test="error-text">{props.errorMessage}</p>
                    <a onClick={props.closeModal} className='mainButton' data-test="error-button">close</a>
                </div>
            </div>
        </div>
    );
}
