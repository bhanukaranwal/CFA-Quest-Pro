import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash } from 'react-icons/fa';

function StudyPlanner() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review Ethics Reading 3', completed: true },
    { id: 2, text: 'Complete 20 Quantitative Methods practice questions', completed: false },
    { id: 3, text: 'Watch video on LIFO vs. FIFO', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    setTasks([...tasks, { id: newId, text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto max-w-3xl p-6 sm:p-8 mt-10"
    >
      <div className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2 text-center">My Study Planner</h1>
        <p className="text-center text-text-secondary dark:text-dark-text-secondary mb-8">Organize your tasks and stay on track.</p>
        
        <form onSubmit={handleAddTask} className="flex gap-4 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="e.g., Read Chapter 5 of FSA"
            className="flex-grow border-gray-300 dark:border-gray-600 bg-background dark:bg-dark-background p-3 rounded-lg shadow-sm focus:ring-accent focus:border-accent"
          />
          <button type="submit" className="bg-accent text-white p-3 rounded-lg hover:bg-accent-hover transition-colors shadow-md">
            <FaPlus />
          </button>
        </form>

        <div className="space-y-4">
          {tasks.map(task => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex items-center justify-between bg-background dark:bg-dark-background p-4 rounded-lg"
            >
              <div className="flex items-center cursor-pointer" onClick={() => toggleTask(task.id)}>
                <div className={`w-6 h-6 rounded-full border-2 ${task.completed ? 'bg-accent border-accent' : 'border-gray-400'} flex items-center justify-center mr-4`}>
                  {task.completed && <FaCheckCircle className="text-white" size={16} />}
                </div>
                <span className={`${task.completed ? 'line-through text-text-secondary dark:text-dark-text-secondary' : 'text-text-primary dark:text-dark-text-primary'}`}>
                  {task.text}
                </span>
              </div>
              <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-danger transition-colors">
                <FaTrash />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default StudyPlanner;
