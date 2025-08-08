import React, { useState } from 'react';
import { FaTimes, FaCalculator, FaChartLine } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function Calculator({ isVisible, onClose }) {
  const [activeTab, setActiveTab] = useState('standard'); // 'standard' or 'financial'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          id="calculator"
          className="fixed top-1/4 right-4 w-72 bg-gray-100 dark:bg-dark-surface shadow-2xl rounded-lg flex flex-col z-50 border-2 border-gray-200 dark:border-gray-700"
        >
          {/* Header with tabs */}
          <div id="calculator-header" className="w-full bg-gray-200 dark:bg-dark-primary p-1 rounded-t-lg flex justify-between items-center">
            <div className="flex">
              <TabButton icon={<FaCalculator />} label="Standard" activeTab={activeTab} onClick={() => setActiveTab('standard')} />
              <TabButton icon={<FaChartLine />} label="Financial" activeTab={activeTab} onClick={() => setActiveTab('financial')} />
            </div>
            <button onClick={onClose} className="text-text-secondary dark:text-dark-text-secondary hover:text-danger pr-2 transition-colors">
              <FaTimes />
            </button>
          </div>
          
          {/* Render the active calculator tab */}
          <div className="p-2">
            {activeTab === 'standard' ? <StandardCalculator /> : <FinancialCalculator />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const TabButton = ({ icon, label, activeTab, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1 rounded-md text-sm font-medium flex items-center space-x-2 ${activeTab === label.toLowerCase() ? 'bg-surface dark:bg-dark-surface text-text-primary dark:text-dark-text-primary' : 'text-text-secondary dark:text-dark-text-secondary'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

// Standard Calculator Logic and UI
const StandardCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

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
      setCurrentValue(null); // Reset for new calculation
      setDisplay(String(result));
      setOperator(null);
      setWaitingForOperand(true);
    }
  };
  
  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="p-2">
      <div className="bg-white dark:bg-dark-background text-right rounded p-4 text-2xl font-mono text-text-primary dark:text-dark-text-primary mb-2 break-all">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={() => handleClear()} className="calc-btn col-span-2">AC</button>
        <button className="calc-btn">+/-</button>
        <button onClick={() => handleOperatorClick('/')} className="calc-btn-op">/</button>
        
        {['7', '8', '9'].map(d => <button key={d} onClick={() => handleDigitClick(d)} className="calc-btn">{d}</button>)}
        <button onClick={() => handleOperatorClick('*')} className="calc-btn-op">*</button>

        {['4', '5', '6'].map(d => <button key={d} onClick={() => handleDigitClick(d)} className="calc-btn">{d}</button>)}
        <button onClick={() => handleOperatorClick('-')} className="calc-btn-op">-</button>

        {['1', '2', '3'].map(d => <button key={d} onClick={() => handleDigitClick(d)} className="calc-btn">{d}</button>)}
        <button onClick={() => handleOperatorClick('+')} className="calc-btn-op">+</button>

        <button onClick={() => handleDigitClick('0')} className="calc-btn col-span-2">0</button>
        <button onClick={handleDecimal} className="calc-btn">.</button>
        <button onClick={handleEquals} className="calc-btn-op">=</button>
      </div>
    </div>
  );
};

// Financial Calculator Logic and UI
const FinancialCalculator = () => {
  const [cashFlows, setCashFlows] = useState('-100, 20, 30, 40, 50');
  const [discountRate, setDiscountRate] = useState('10');
  const [result, setResult] = useState(null);

  const calculateNPV = () => {
    try {
      const flows = cashFlows.split(',').map(Number);
      const rate = parseFloat(discountRate) / 100;
      if (flows.some(isNaN) || isNaN(rate)) {
        setResult('Error: Invalid Input');
        return;
      }

      const initialInvestment = flows[0];
      const npv = flows.slice(1).reduce((acc, val, i) => acc + val / Math.pow(1 + rate, i + 1), 0);
      setResult(`NPV: ${(npv + initialInvestment).toFixed(2)}`);
    } catch (error) {
      setResult('Error: Calculation Failed');
    }
  };

  return (
    <div className="p-2">
      <h4 className="font-bold text-center mb-2 text-text-primary dark:text-dark-text-primary">NPV Calculator</h4>
      <div>
        <label className="text-xs text-text-secondary dark:text-dark-text-secondary">Cash Flows (e.g., -100,20,30)</label>
        <input type="text" value={cashFlows} onChange={e => setCashFlows(e.target.value)} className="w-full p-2 rounded bg-white dark:bg-dark-background mt-1" />
      </div>
      <div className="mt-2">
        <label className="text-xs text-text-secondary dark:text-dark-text-secondary">Discount Rate (%)</label>
        <input type="number" value={discountRate} onChange={e => setDiscountRate(e.target.value)} className="w-full p-2 rounded bg-white dark:bg-dark-background mt-1" />
      </div>
      <button onClick={calculateNPV} className="w-full mt-3 bg-accent text-white p-2 rounded-lg hover:bg-accent-hover">Calculate NPV</button>
      {result && <div className={`mt-3 text-center font-bold text-lg p-2 rounded ${result.includes('Error') ? 'bg-danger/20 text-danger' : 'bg-success/20 text-success'}`}>{result}</div>}
    </div>
  );
};

export default Calculator;
