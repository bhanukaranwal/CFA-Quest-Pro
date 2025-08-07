import React, { useContext } from 'react';
import { FaFire, FaCheckCircle, FaBrain, FaStar, FaTrophy } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';

function Achievements() {
    const { achievements } = useContext(AppContext);
    
    // Assign icons based on title or ID, making it more dynamic
    const getIcon = (id) => {
        switch(id) {
            case 1: return <FaCheckCircle />;
            case 2: return <FaBrain />;
            case 3: return <FaBrain />;
            case 4: return <FaStar />;
            case 5: return <FaFire />;
            default: return <FaTrophy />;
        }
    };

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
      },
    };

    return (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto p-6 sm:p-8"
        >
            <h1 className="text-4xl font-extrabold text-text-primary dark:text-dark-text-primary mb-4 text-center">Achievements & Milestones</h1>
            <p className="text-center text-text-secondary dark:text-dark-text-secondary mb-12 max-w-2xl mx-auto">Track your progress and celebrate your hard work. Keep pushing forward!</p>
            <motion.div 
              variants={containerVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {achievements.map((ach) => (
                    <motion.div 
                      key={ach.id} 
                      variants={itemVariants}
                      className={`bg-surface dark:bg-dark-surface p-6 rounded-xl shadow-md text-center transition-all duration-300 ${ach.unlocked ? 'border-2 border-warning dark:border-yellow-400' : 'opacity-60'}`}
                    >
                        <div className={`text-6xl mx-auto mb-4 ${ach.unlocked ? 'text-warning dark:text-yellow-400' : 'text-gray-400'}`}>
                            {getIcon(ach.id)}
                        </div>
                        <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-2">{ach.title}</h3>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-sm">{ach.description}</p>
                        {ach.unlocked && <div className="mt-4 text-xs font-bold uppercase text-warning dark:text-yellow-400">Unlocked</div>}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

export default Achievements;
