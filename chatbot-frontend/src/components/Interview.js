import React, { useState } from 'react';
import './Interview.css';
import MicTalking from '../assets/podcast.gif';
import MicNotTalking from '../assets/podcast.png';
import StopColour from '../assets/stop-button-colour.png';
import StopBlack from '../assets/stop-button-black.png';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function Interview({setScreen}) {
    const SPEAKING_TIMER = 60;
    const [resetTimer, setResetTimer] = useState(0);
    const [speaking, setSpeaking] = useState(false);
    const readQuestion = () => {
        setSpeaking(false);
        // TODO: API call to get and read the question
        setSpeaking(true);
        setResetTimer(prevKey => prevKey + 1)
    }

    const endSession = () => {
        // TODO: API call to get the "How well did u do" (tips, etc.)
        setScreen('endScreen');
    }

    const stopButtonClicked = () => {
        setSpeaking(false);
    }

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <div className="timer">Too late...</div>;
        }
        
        return (
            <div className="timer">
                <div className="value">{remainingTime}</div>
                <div className="text">seconds</div>
                <div className="text">remaining</div>   
            </div>
        );
    };

    return (
        <div className='Interview'>
            <button onClick={readQuestion}>Read Question</button>
            <section>
                {speaking ? <img className='icon' src={MicTalking} alt='Microphone icon' /> : <img className='icon' src={MicNotTalking} alt='Microphone icon' />}
                <div className='countdownTimer'>
                    <CountdownCircleTimer
                        key={resetTimer}
                        isPlaying={speaking}
                        duration={SPEAKING_TIMER}
                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[SPEAKING_TIMER, SPEAKING_TIMER*0.6, SPEAKING_TIMER*0.3, 0]}
                        size={100}
                        onComplete={stopButtonClicked}
                    >
                        {renderTime}
                    </CountdownCircleTimer>
                </div>
                {speaking ? <img className='icon' src={StopColour} alt='Stop Button' onClick={stopButtonClicked}/> : <img className='icon' src={StopBlack} alt='Stop Button' />}
            </section>
            <button onClick={() => setScreen('endScreen')}>End Session</button>
        </div>
    )
}

export default Interview;