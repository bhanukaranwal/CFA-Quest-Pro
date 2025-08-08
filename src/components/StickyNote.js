import React from 'react';
import { useDraggable } from '../hooks/useDraggable';
import { FaTimes } from 'react-icons/fa';

function StickyNote({ isVisible, onClose }) {
  const { position, handleMouseDown } = useDraggable('sticky-note');

  if (!isVisible) return null;

  return (
    <div
      id="sticky-note"
      className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-200 dark:bg-yellow-800 shadow-2xl rounded-lg flex flex-col z-50"
      style={{ top: position.y, left: position.x }}
    >
      <div
        id="sticky-note-header"
        onMouseDown={handleMouseDown}
        className="w-full bg-yellow-300 dark:bg-yellow-700 p-2 cursor-move rounded-t-lg flex justify-between items-center"
      >
        <span className="font-bold text-yellow-800 dark:text-yellow-200 text-sm">Scratch Pad</span>
        <button onClick={onClose} className="text-yellow-800 dark:text-yellow-200 hover:text-red-500">
          <FaTimes />
        </button>
      </div>
      <textarea
        className="w-full h-full bg-transparent p-2 resize-none focus:outline-none text-yellow-900 dark:text-yellow-100"
        placeholder="Your notes..."
      />
    </div>
  );
}

export default StickyNote;
