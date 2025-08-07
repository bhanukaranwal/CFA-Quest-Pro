import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Dashboard() {
    const progressData = {
        correct: 68,
        incorrect: 23,
        total: 91,
        topicPerformance: {
            'Ethics': 0.85,
            'Quants': 0.65,
            'Econ': 0.72,
            'FSA': 0.78,
            'Equity': 0.91,
            'FI': 0.68,
        }
    };

    const pieData = {
        labels: ['Correct Answers', 'Incorrect Answers'],
        datasets: [{
            data: [progressData.correct, progressData.incorrect],
            backgroundColor: ['#1abc9c', '#e74c3c'],
            borderColor: '#FFFFFF',
            borderWidth: 4,
        }],
    };
    
    const barData = {
        labels: Object.keys(progressData.topicPerformance),
        datasets: [{
            label: 'Accuracy',
            data: Object.values(progressData.topicPerformance).map(v => v * 100),
            backgroundColor: '#2c3e50',
            borderRadius: 4,
        }]
    };
    
    const commonOptions = {
        plugins: {
            legend: { position: 'bottom' },
            title: { display: true, font: { size: 18, weight: 'bold' }, color: '#212529' }
        }
    };

    const studyFocusTopics = Object.entries(progressData.topicPerformance)
      .sort(([,a],[,b]) => a-b)
      .slice(0, 3);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto p-6 sm:p-8">
            <h1 className="text-4xl font-extrabold text-text-primary dark:text-dark-text-primary mb-8">Your Progress Dashboard</h1>
            <div className="grid lg:grid-cols-3 gap-8">
                <motion.div whileHover={{ y: -5 }} className="lg:col-span-1 bg-surface dark:bg-dark-surface p-6 rounded-xl shadow-md flex flex-col justify-center items-center">
                    <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Overall Performance</h3>
                    <div className="w-full max-w-xs">
                        <Pie data={pieData} options={{...commonOptions, title: { ...commonOptions.plugins.title, text: 'Answer Breakdown' }}} />
                    </div>
                    <p className="text-center mt-6 text-text-secondary dark:text-dark-text-secondary">Total Questions Answered: <span className="font-bold text-text-primary dark:text-dark-text-primary">{progressData.total}</span></p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="lg:col-span-2 bg-surface dark:bg-dark-surface p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Topic Mastery</h3>
                    <Bar data={barData} options={{...commonOptions, indexAxis: 'y', scales: { x: { ticks: { callback: value => `${value}%` } } }, title: { ...commonOptions.plugins.title, text: 'Accuracy by Topic' }}} />
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="lg:col-span-3 bg-surface dark:bg-dark-surface p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Recommended Study Focus</h3>
                    <p className="text-text-secondary dark:text-dark-text-secondary mb-4">Based on your performance, we recommend focusing on these topics:</p>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {studyFocusTopics.map(([topic, accuracy]) => (
                            <div key={topic} className="bg-background dark:bg-dark-background p-4 rounded-lg text-center">
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">{topic}</h4>
                                <p className="text-2xl font-bold text-danger mt-2">{(accuracy * 100).toFixed(0)}%</p>
                                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">Accuracy</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Dashboard;
