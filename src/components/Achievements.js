import React from 'react';
import { FaFire, FaCheckCircle, FaBrain, FaStar } from 'react-icons/fa';

function Achievements() {
    const achievements = [
        { icon: <FaFire />, title: "5-Day Streak", description: "You've studied 5 days in a row!", unlocked: true },
        { icon: <FaCheckCircle />, title: "Ethics Master", description: "Answered 20 Ethics questions correctly.", unlocked: true },
        { icon: <FaBrain />, title: "Quant Whiz", description: "Achieved 90% in a Quants quiz.", unlocked: false },
        { icon: <FaStar />, title: "Perfect Score", description: "Scored 100% on a practice exam.", unlocked: true },
        { icon: <FaCheckCircle />, title: "FSA Specialist", description: "Answered 20 FSA questions correctly.", unlocked: false },
        { icon: <FaStar />, title: "Century Club", description: "Answered 100 total questions.", unlocked: true },
    ];

    return (
        <div className="container mx-auto p-6 sm:p-8">
            <h1 className="text-4xl font-extrabold text-text-primary mb-4 text-center">Achievements & Milestones</h1>
            <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">Track your progress and celebrate your hard work. Keep pushing forward!</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {achievements.map((ach, index) => (
                    <div key={index} className={`bg-surface p-6 rounded-xl shadow-md text-center transition-all duration-300 ${ach.unlocked ? 'border-2 border-warning' : 'opacity-60'}`}>
                        <div className={`text-6xl mx-auto mb-4 ${ach.unlocked ? 'text-warning' : 'text-gray-400'}`}>
                            {ach.icon}
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">{ach.title}</h3>
                        <p className="text-text-secondary text-sm">{ach.description}</p>
                        {ach.unlocked && <div className="mt-4 text-xs font-bold uppercase text-warning">Unlocked</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Achievements;
