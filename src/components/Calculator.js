import React, { useState } from 'react';
import { useDraggable } from '../hooks/useDraggable';
import { FaTimes } from 'react-icons/fa';

function Calculator({ isVisible, onClose }) {
  const { position, handleMouseDown } = useDraggable('calculator');
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  if (!isVisible) return null;

  const handleDigitClick = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setCurrentValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);
    if (currentValue === null || operator === null) return inputValue;

    const operations = {
      '/': (prev, next) => prev / next,
      '*': (prev, next) => prev * next,
      '+': (prev, next) => prev + next,
      '-': (prev, next) => prev - next,
      '=': (prev, next) => next,
    };

    return operations[operator](currentValue, inputValue);
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleEquals = () => {
    if (operator) {
      const result = performCalculation();
      setCurrentValue(result);
      setDisplay(String(result));
      setOperator(null);
    }
  };

  return (
    <div
      id="calculator"
      className="absolute top-1/4 right-1/4 w-64 bg-gray-100 dark:bg-dark-surface shadow-2xl rounded-lg flex flex-col z-50 border dark:border-gray-700"
      style={{ top: position.y, left: position.x }}
    >
      <div
        id="calculator-header"
        onMouseDown={handleMouseDown}
        className="w-full bg-gray-200 dark:bg-dark-primary p-2 cursor-move rounded-t-lg flex justify-between items-center"
      >
        <span className="font-bold text-text-secondary dark:text-dark-text-secondary text-sm">Calculator</span>
        <button onClick={onClose} className="text-text-secondary dark:text-dark-text-secondary hover:text-danger">
          <FaTimes />
        </button>
      </div>
      <div className="p-2">
        <div className="bg-white dark:bg-dark-background text-right rounded p-4 text-2xl font-mono text-text-primary dark:text-dark-text-primary mb-2">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9'].map(d => <button key={d} onClick={() => handleDigitClick(d)} className="calc-btn">{d}</button>)}
          <button onClick={() => handleOperatorClick('/')} className="calc-btn-op">/</button>
          
          {['4', '5', '6'].map(d => <button key={d} onClick={() => handleDigitClick(d)} className="calc-btn">{d}</button>)}
          <button onClick={() => handleOperatorClick('*')} className="calc-btn-op">*</button>

          {['1', '2', '3'].map(d => <button key={d} onClick={() => handleDigitClick(d)} className="calc-btn">{d}</button>)}
          <button onClick={() => handleOperatorClick('-')} className="calc-btn-op">-</button>

          <button onClick={() => handleClear()} className="calc-btn">C</button>
          <button onClick={() => handleDigitClick('0')} className="calc-btn">0</button>
          <button onClick={handleEquals} className="calc-btn-op">=</button>
          <button onClick={() => handleOperatorClick('+')} className="calc-btn-op">+</button>
        </div>
      </div>
    </div>
  );
}

// Add some styles to index.css for the calculator buttons for a cleaner look
/*
In src/index.css, add these utility classes:

@layer components {
  .calc-btn {
    @apply bg-gray-200 dark:bg-gray-600 p-3 rounded text-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors;
  }
  .calc-btn-op {
    @apply bg-accent dark:bg-dark-accent text-white p-3 rounded text-lg font-bold hover:bg-accent-hover dark:hover:bg-dark-accent-hover transition-colors;
  }
}
*/

export default Calculator;
