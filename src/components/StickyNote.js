import React, { useState } from 'react';
import { FaTimes, FaThumbtack } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function StickyNote({ isVisible, onClose }) {
  const [noteContent, setNoteContent] = useState('');
  const maxChars = 250;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          id="sticky-note"
          className="fixed top-1/3 left-4 w-72 bg-yellow-200 dark:bg-yellow-800 shadow-2xl rounded-lg flex flex-col z-50 border-2 border-yellow-300 dark:border-yellow-700"
        >
          {/* Header for the sticky note */}
          <div
            id="sticky-note-header"
            className="w-full bg-yellow-300 dark:bg-yellow-700 p-2 rounded-t-lg flex justify-between items-center"
          >
            <div className="flex items-center">
              <FaThumbtack className="text-yellow-800 dark:text-yellow-200" />
              <span className="ml-2 font-bold text-yellow-800 dark:text-yellow-200 text-sm">Scratch Pad</span>
            </div>
            <button onClick={onClose} className="text-yellow-800 dark:text-yellow-200 hover:text-red-500 transition-colors">
              <FaTimes />
            </button>
          </div>
          
          {/* Text area for notes */}
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            maxLength={maxChars}
            className="w-full h-48 bg-transparent p-3 resize-none focus:outline-none text-yellow-900 dark:text-yellow-100 placeholder-yellow-700 dark:placeholder-yellow-300"
            placeholder="Jot down your calculations or key points here..."
          />

          {/* Character counter */}
          <div className="text-right p-2 text-xs text-yellow-800 dark:text-yellow-200">
            {noteContent.length} / {maxChars}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StickyNote;
