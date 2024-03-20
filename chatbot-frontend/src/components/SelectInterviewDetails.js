import React, { useState } from 'react'

function SelectInterviewDetails({setScreen}) {
    const [interviewType, setInterviewType] = useState('');
    const [interviewSkillLevel, setInterviewSkillLevel] = useState('');
    const [interviewIndustry, setInterviewIndustry] = useState('');
    const [error, setError] = useState('');
    const allInterviewTypes = ['Behavioral', 'Technical'];
    const allInterviewSkillLevels = ['Junior/Entry', 'Mid-level/Intermediate', 'Senior/Advanced'];
    // Add more below later :)
    const allInterviewIndustries = ['Healthcare Consulting', 'Startup Consulting', 'Frontend Developer', 'Backend Developer', 'Financial Analyst', 'Investment Banking', 'Other'];

    const dropdowns = (val, setVal, list) => {
        return (
            <select
                value={val}
                onChange={(e) => setVal(e.target.value)}
            >   
                <option value="" disabled>To be chosen ...</option>
                {list.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>
        );
    }

    const startInterview = () => {
        if (interviewType && interviewSkillLevel && interviewIndustry) {
            setError('');
            setScreen('interview');
        } else {
            setError('Please select the type, skill, and industry for the interview!');
        }
    }

    return (
        <div>
            <section>
                {dropdowns(interviewType, setInterviewType, allInterviewTypes)}
                {dropdowns(interviewSkillLevel, setInterviewSkillLevel, allInterviewSkillLevels)}
                {dropdowns(interviewIndustry, setInterviewIndustry, allInterviewIndustries)}
            </section>
            <button onClick={startInterview}>Start Interview</button>
            <p>{error}</p>
        </div>
    )
}

export default SelectInterviewDetails;