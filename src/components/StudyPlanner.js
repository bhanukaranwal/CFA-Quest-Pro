import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaCheckCircle } from 'react-icons/fa';

function StudyPlanner() {
  // State to hold the list of tasks. Pre-populated with examples.
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review Ethics Reading 3', completed: true },
    { id: 2, text: 'Complete 20 Quantitative Methods practice questions', completed: false },
    { id: 3, text: 'Watch video on LIFO vs. FIFO', completed: false },
  ]);
  
  // State to manage the input for a new task.
  const [newTask, setNewTask] = useState('');

  // Function to handle adding a new task.
  const handleAddTask = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    if (newTask.trim() === '') return; // Don't add empty tasks
    
    // Create a new task object with a unique ID.
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    setTasks([...tasks, { id: newId, text: newTask, completed: false }]);
    
    // Clear the input field after adding the task.
    setNewTask('');
  };

  // Function to toggle the completion status of a task.
  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };
  
  // Function to delete a task from the list.
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-3xl p-6 sm:p-8 mt-10"
    >
      <div className="bg-surface dark:bg-dark-surface p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2 text-center">My Study Planner</h1>
        <p className="text-center text-text-secondary dark:text-dark-text-secondary mb-8">Organize your tasks and stay on track.</p>
        
        {/* Form for adding a new task */}
        <form onSubmit={handleAddTask} className="flex gap-4 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="e.g., Read Chapter 5 of FSA"
            className="flex-grow border-gray-300 dark:border-gray-600 bg-background dark:bg-dark-background p-3 rounded-lg shadow-sm focus:ring-accent focus:border-accent"
          />
          <button type="submit" className="bg-accent text-white p-3 rounded-lg hover:bg-accent-hover transition-colors shadow-md flex-shrink-0">
            <FaPlus />
          </button>
        </form>

        {/* List of tasks */}
        <div className="space-y-4">
          <AnimatePresence>
            {tasks.map(task => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                className="flex items-center justify-between bg-background dark:bg-dark-background p-4 rounded-lg"
              >
                <div className="flex items-center cursor-pointer flex-grow" onClick={() => toggleTask(task.id)}>
                  <div className={`w-6 h-6 rounded-full border-2 ${task.completed ? 'bg-accent border-accent' : 'border-gray-400'} flex items-center justify-center mr-4 flex-shrink-0`}>
                    {task.completed && <FaCheckCircle className="text-white" size={16} />}
                  </div>
                  <span className={`transition-colors ${task.completed ? 'line-through text-text-secondary dark:text-dark-text-secondary' : 'text-text-primary dark:text-dark-text-primary'}`}>
                    {task.text}
                  </span>
                </div>
                <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-danger transition-colors ml-4 flex-shrink-0">
                  <FaTrash />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default StudyPlanner;
