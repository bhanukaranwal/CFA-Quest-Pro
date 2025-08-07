import React, { useContext, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, LineElement, PointElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, LineElement, PointElement);

function Dashboard() {
    const { examHistory } = useContext(AppContext);

    const analytics = useMemo(() => {
        if (examHistory.length === 0) return null;

        let totalQuestions = 0;
        let correctAnswers = 0;
        const topicPerformance = {};
        const confidenceAnalysis = { High: { correct: 0, total: 0 }, Medium: { correct: 0, total: 0 }, Low: { correct: 0, total: 0 } };

        examHistory.forEach(exam => {
            exam.answeredQuestions.forEach(q => {
                totalQuestions++;
                if (q.isCorrect) correctAnswers++;

                const topicName = q.topic || "Review";
                if (!topicPerformance[topicName]) topicPerformance[topicName] = { correct: 0, total: 0 };
                topicPerformance[topicName].total++;
                if (q.isCorrect) topicPerformance[topicName].correct++;

                const confidence = q.confidence || 'Not Set';
                if (confidenceAnalysis[confidence]) {
                    confidenceAnalysis[confidence].total++;
                    if (q.isCorrect) confidenceAnalysis[confidence].correct++;
                }
            });
        });

        const performanceOverTime = examHistory.map(exam => ({
            date: new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            score: exam.percentage,
        }));

        return {
            totalQuestions,
            correctAnswers,
            overallAccuracy: totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0,
            topicPerformance,
            performanceOverTime,
            confidenceAnalysis,
        };
    }, [examHistory]);

    if (!analytics) {
        return (
            <div className="text-center p-10 container mx-auto mt-10 bg-surface dark:bg-dark-surface rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">No Data Yet</h2>
                <p className="text-text-secondary dark:text-dark-text-secondary mt-2">Complete a practice exam to see your performance analytics.</p>
            </div>
        );
    }

    const lineChartData = {
        labels: analytics.performanceOverTime.map(p => p.date),
        datasets: [{
            label: 'Exam Score (%)',
            data: analytics.performanceOverTime.map(p => p.score),
            borderColor: '#1abc9c',
            backgroundColor: 'rgba(26, 188, 156, 0.1)',
            fill: true,
            tension: 0.4,
        }],
    };

    const confidenceData = {
        labels: ['Low', 'Medium', 'High'],
        datasets: [{
            label: 'Accuracy by Confidence',
            data: ['Low', 'Medium', 'High'].map(level => {
                const { correct, total } = analytics.confidenceAnalysis[level];
                return total > 0 ? (correct / total) * 100 : 0;
            }),
            backgroundColor: ['#e74c3c', '#f39c12', '#2ecc71'],
        }]
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto p-6 sm:p-8">
            <h1 className="text-4xl font-extrabold text-text-primary dark:text-dark-text-primary mb-8">Performance Dashboard</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <StatCard title="Overall Accuracy" value={`${analytics.overallAccuracy.toFixed(1)}%`} />
                <StatCard title="Total Questions" value={analytics.totalQuestions} />
                <StatCard title="Exams Completed" value={examHistory.length} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div whileHover={{ y: -5 }} className="bg-surface dark:bg-dark-surface p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Performance Over Time</h3>
                    <Line data={lineChartData} />
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="bg-surface dark:bg-dark-surface p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Accuracy by Confidence</h3>
                    <Bar data={confidenceData} options={{ indexAxis: 'y', scales: { x: { max: 100 } } }}/>
                </motion.div>
            </div>

            <motion.div whileHover={{ y: -5 }} className="mt-8 bg-surface dark:bg-dark-surface p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Topic Heatmap</h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">Your accuracy across all completed exams. Focus on the red areas!</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {Object.entries(analytics.topicPerformance).map(([topic, data]) => {
                        const accuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
                        let bgColor = 'bg-gray-200 dark:bg-gray-700';
                        if (accuracy > 85) bgColor = 'bg-green-500';
                        else if (accuracy > 70) bgColor = 'bg-green-300 dark:bg-green-800';
                        else if (accuracy > 50) bgColor = 'bg-yellow-300 dark:bg-yellow-800';
                        else if (accuracy > 0) bgColor = 'bg-red-300 dark:bg-red-800';

                        return (
                            <div key={topic} className="p-4 rounded-lg text-center text-white" style={{ backgroundColor: accuracy > 85 ? '#2ecc71' : accuracy > 70 ? '#1abc9c' : accuracy > 50 ? '#f39c12' : '#e74c3c' }}>
                                <div className="font-bold">{topic}</div>
                                <div className="text-2xl font-extrabold mt-1">{accuracy.toFixed(0)}%</div>
                                <div className="text-xs opacity-80">{data.correct}/{data.total}</div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
}

const StatCard = ({ title, value }) => (
    <motion.div whileHover={{ y: -5 }} className="bg-surface dark:bg-dark-surface p-6 rounded-xl shadow-md text-center">
        <h3 className="text-md font-medium text-text-secondary dark:text-dark-text-secondary">{title}</h3>
        <p className="text-4xl font-extrabold text-text-primary dark:text-dark-text-primary mt-2">{value}</p>
    </motion.div>
);

export default Dashboard;
