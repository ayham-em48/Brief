/* eslint-disable react/prop-types */
import React from 'react';
import './App.css'
import './ErrorModal.css'

export default function ErrorModal(props) {

    return (
        <div className='mainErrorContainer'>
            <div className='errorBackground'></div>
            <div className='errorContainer'>
                <div className='textContainer'>
                    <p>{props.errorMessage}</p>
                    <a onClick={props.closeModal} className='mainButton'>close</a>
                </div>
            </div>
        </div>
    );
}
