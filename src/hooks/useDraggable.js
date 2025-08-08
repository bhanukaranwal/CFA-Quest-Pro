import { useState, useEffect, useCallback } from 'react';

// Custom hook to handle drag functionality for components.
export const useDraggable = (id) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [rel, setRel] = useState(null); // Relative position of the mouse inside the element

  const handleMouseDown = useCallback((e) => {
    // Only drag when the mousedown is on the header of the draggable element
    if (e.target.id === `${id}-header`) {
      setIsDragging(true);
      // Calculate the mouse's position relative to the top-left of the element
      const pos = e.target.getBoundingClientRect();
      setRel({
        x: e.pageX - pos.left,
        y: e.pageY - pos.top,
      });
      e.stopPropagation();
      e.preventDefault();
    }
  }, [id]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    // Update the position of the element based on the mouse movement
    setPosition({
      x: e.pageX - rel.x,
      y: e.pageY - rel.y,
    });
    e.stopPropagation();
    e.preventDefault();
  }, [isDragging, rel]);

  // Add and remove event listeners for mouse movements
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return { position, handleMouseDown };
};
