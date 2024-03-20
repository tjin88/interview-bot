import React, { useState } from 'react';
import MicTalking from '../assets/podcast.gif';
import MicNotTalking from '../assets/podcast.png';
import StopColour from '../assets/stop-button-colour.png';
import StopBlack from '../assets/stop-button-black.png';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function PracticeQuestion({setScreen}) {
    const [speaking, setSpeaking] = useState(false);
    const readQuestion = () => {
        setSpeaking(false);
        // TODO: API call to get and read the question
        setSpeaking(true);
    }

    const endSession = () => {
        // TODO: API call to get the "How well did u do" (tips, etc.)
        setScreen('endScreen');
    }

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <div className="timer">Too lale...</div>;
        }
        
        return (
            <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
            </div>
        );
    };

    return (
        <div>
            <button onClick={readQuestion}>Read Question</button>
            <section>
                {speaking ? <img className='icon' src={MicTalking} alt='microphone' /> : <img className='icon' src={MicNotTalking} alt='microphone' />}
                {speaking ? <img className='icon' src={StopColour} alt='microphone' onClick={() => setSpeaking(false)}/> : <img className='icon' src={StopBlack} alt='microphone' />}
            </section>
            <button onClick={() => setScreen('endScreen')}>End Session</button>
        </div>
    )
}

export default PracticeQuestion;