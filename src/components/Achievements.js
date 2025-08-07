import React from 'react';
import { FaFire, FaCheckCircle, FaBrain } from 'react-icons/fa';

function Achievements() {
    // NOTE: This is mock data. In a real app, this would be dynamic.
    const achievements = [
        { icon: <FaFire />, title: "5-Day Streak", description: "You've studied 5 days in a row!", unlocked: true },
        { icon: <FaCheckCircle />, title: "Ethics Master", description: "Answered 10 Ethics questions correctly.", unlocked: true },
        { icon: <FaBrain />, title: "Quant Whiz", description: "Achieved 90% in a Quant quiz.", unlocked: false },
    ];

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold text-text-dark mb-8">Your Achievements</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {achievements.map((ach, index) => (
                    <div key={index} className={`bg-white p-6 rounded-lg shadow-md text-center transition duration-300 ${!ach.unlocked ? 'opacity-50' : ''}`}>
                        <div className={`text-5xl mx-auto mb-4 ${ach.unlocked ? 'text-accent' : 'text-gray-400'}`}>
                            {ach.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-text-dark mb-2">{ach.title}</h3>
                        <p className="text-text-light">{ach.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Achievements;
