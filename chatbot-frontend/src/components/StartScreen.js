import React from 'react'

function StartScreen({setScreen}) {


    return (
        <div>
            <h1>Virtual Interview Practice</h1>
            <button onClick={() => setScreen('selectInterviewDetails')}>Get Started</button>
        </div>
    )
}

export default StartScreen;