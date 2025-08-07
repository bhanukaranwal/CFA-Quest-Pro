import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard() {
    // NOTE: In a real app, this data would come from user's history.
    const progressData = {
        correct: 15,
        incorrect: 5,
        total: 20,
        topicPerformance: {
            'Ethics': 0.8,
            'Quantitative Methods': 0.6,
            'Equity Valuation': 0.9,
            'Portfolio Management': 0.7
        }
    };

    const pieData = {
        labels: ['Correct Answers', 'Incorrect Answers'],
        datasets: [{
            data: [progressData.correct, progressData.incorrect],
            backgroundColor: ['#4CAF50', '#F44336'],
            hoverBackgroundColor: ['#66BB6A', '#EF5350']
        }],
    };

    const barData = {
        labels: Object.keys(progressData.topicPerformance),
        datasets: [{
            label: 'Accuracy by Topic',
            data: Object.values(progressData.topicPerformance).map(v => v*100),
            backgroundColor: '#0052CC',
        }]
    };

    const barOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value + '%'
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold text-text-dark mb-8">Your Dashboard</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-text-dark mb-4">Overall Performance</h3>
                    <div className="w-2/3 mx-auto">
                        <Pie data={pieData} />
                    </div>
                    <p className="text-center mt-4 text-text-light">Total Questions Answered: {progressData.total}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-text-dark mb-4">Topic Mastery</h3>
                    <Bar data={barData} options={barOptions} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
