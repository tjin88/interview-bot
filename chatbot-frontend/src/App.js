import React, { useState } from 'react'
import './App.css';
import StartScreen from './components/StartScreen';
import SelectInterviewDetails from './components/SelectInterviewDetails';
import PracticeQuestion from './components/PracticeQuestion';
import Interview from './components/Interview';
import EndScreen from './components/EndScreen';

function App() {
  const [screen, setScreen] = useState('start');
  return (
    <div className="App">
      {screen === 'start' && <StartScreen setScreen={setScreen} />}
      {screen === 'selectInterviewDetails' && <SelectInterviewDetails setScreen={setScreen} />}
      {screen === 'practiceQuestion' && <PracticeQuestion setScreen={setScreen} />}
      {screen === 'interview' && <Interview setScreen={setScreen} />}
      {screen === 'endScreen' && <EndScreen setScreen={setScreen} />}
    </div>
  );
}

export default App;
