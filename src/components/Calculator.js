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
  // ... (Add the standard calculator logic from the previous response here)
  return <div>... Standard Calculator UI ...</div>;
};

// Financial Calculator Logic and UI
const FinancialCalculator = () => {
  const [cashFlows, setCashFlows] = useState('-100, 20, 30, 40, 50');
  const [discountRate, setDiscountRate] = useState('10');
  const [result, setResult] = useState(null);

  const calculateNPV = () => {
    const flows = cashFlows.split(',').map(Number);
    const rate = parseFloat(discountRate) / 100;
    if (flows.length === 0 || isNaN(rate)) return;

    const initialInvestment = flows[0];
    const npv = flows.slice(1).reduce((acc, val, i) => acc + val / Math.pow(1 + rate, i + 1), 0);
    setResult(`NPV: ${(npv + initialInvestment).toFixed(2)}`);
  };

  return (
    <div className="p-2">
      <h4 className="font-bold text-center mb-2 text-text-primary dark:text-dark-text-primary">NPV Calculator</h4>
      <div>
        <label className="text-xs text-text-secondary dark:text-dark-text-secondary">Cash Flows (comma separated, e.g., -100,20,30)</label>
        <input type="text" value={cashFlows} onChange={e => setCashFlows(e.target.value)} className="w-full p-2 rounded bg-white dark:bg-dark-background mt-1" />
      </div>
      <div className="mt-2">
        <label className="text-xs text-text-secondary dark:text-dark-text-secondary">Discount Rate (%)</label>
        <input type="number" value={discountRate} onChange={e => setDiscountRate(e.target.value)} className="w-full p-2 rounded bg-white dark:bg-dark-background mt-1" />
      </div>
      <button onClick={calculateNPV} className="w-full mt-3 bg-accent text-white p-2 rounded-lg hover:bg-accent-hover">Calculate NPV</button>
      {result && <div className="mt-3 text-center font-bold text-lg text-text-primary dark:text-dark-text-primary bg-green-100 dark:bg-green-900 p-2 rounded">{result}</div>}
    </div>
  );
};

export default Calculator;
