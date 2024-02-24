import React from 'react'

function EndScreen({setScreen}) {


    return (
        <div>
            <h1>Thank you for using the Virtual Interview Bot!</h1>
            <h1>You scored ____ out of 10.0</h1>
            {/* Some feedback?? */}
            <button onClick={() => setScreen('start')}>Go Back to Start</button>
        </div>
    )
}

export default EndScreen;