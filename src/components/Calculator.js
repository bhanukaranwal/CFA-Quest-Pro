import React, { useState } from 'react';
import { FaTimes, FaCalculator, FaChartLine } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Main Calculator Component
function Calculator({ isVisible, onClose }) {
  const [activeTab, setActiveTab] = useState('standard');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-20 right-4 w-80 bg-gray-100 dark:bg-dark-surface shadow-2xl rounded-lg flex flex-col z-50 border-2 border-gray-200 dark:border-gray-700"
        >
          {/* Header with Tabs */}
          <div className="w-full bg-gray-200 dark:bg-dark-primary p-1 rounded-t-lg flex justify-between items-center">
            <div className="flex">
              <TabButton icon={<FaCalculator />} label="Standard" activeTab={activeTab} onClick={() => setActiveTab('standard')} />
              <TabButton icon={<FaChartLine />} label="Financial" activeTab={activeTab} onClick={() => setActiveTab('financial')} />
            </div>
            <button onClick={onClose} className="text-text-secondary dark:text-dark-text-secondary hover:text-danger pr-2 transition-colors">
              <FaTimes />
            </button>
          </div>
          
          <div className="p-2">
            {activeTab === 'standard' ? <StandardCalculator /> : <FinancialCalculator />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Reusable Tab Button
const TabButton = ({ icon, label, activeTab, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1 rounded-md text-sm font-medium flex items-center space-x-2 ${activeTab === label.toLowerCase() ? 'bg-surface dark:bg-dark-surface text-text-primary dark:text-dark-text-primary' : 'text-text-secondary dark:text-dark-text-secondary'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

// Standard Calculator Implementation
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

  const performCalculation = () => {
    const inputValue = parseFloat(display);
    if (currentValue === null || operator === null) return inputValue;
    const operations = { '/': (a, b) => a / b, '*': (a, b) => a * b, '+': (a, b) => a + b, '-': (a, b) => a - b };
    return operations[operator](currentValue, inputValue);
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

  const handleEquals = () => {
    if (operator) {
      const result = performCalculation();
      setCurrentValue(null);
      setDisplay(String(result));
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleDecimal = () => { if (!display.includes('.')) setDisplay(display + '.'); };
  const handleToggleSign = () => setDisplay(String(parseFloat(display) * -1));

  return (
    <div className="p-2">
      <div className="bg-white dark:bg-dark-background text-right rounded p-4 text-3xl font-mono text-text-primary dark:text-dark-text-primary mb-2 break-all">{display}</div>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={handleClear} className="calc-btn-op">AC</button>
        <button onClick={handleToggleSign} className="calc-btn-op">+/-</button>
        <button className="calc-btn-op">%</button>
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

// Financial Calculator Implementation
const FinancialCalculator = () => {
  const [mode, setMode] = useState('tvm'); // 'tvm' or 'cashflow'

  return (
    <div className="p-2">
      <div className="flex justify-center bg-gray-200 dark:bg-dark-background rounded-lg p-1 mb-4">
        <button onClick={() => setMode('tvm')} className={`fin-calc-tab ${mode === 'tvm' ? 'fin-calc-tab-active' : ''}`}>TVM</button>
        <button onClick={() => setMode('cashflow')} className={`fin-calc-tab ${mode === 'cashflow' ? 'fin-calc-tab-active' : ''}`}>Cash Flow</button>
      </div>
      {mode === 'tvm' ? <TVMCalculator /> : <CashFlowCalculator />}
    </div>
  );
};

// TVM Calculator Sub-component
const TVMCalculator = () => {
  const [n, setN] = useState('');
  const [i, setI] = useState('');
  const [pv, setPv] = useState('');
  const [pmt, setPmt] = useState('');
  const [fv, setFv] = useState('');

  const compute = (variable) => {
    const N = parseFloat(n);
    const I = parseFloat(i) / 100;
    const PV = parseFloat(pv);
    const PMT = parseFloat(pmt);
    const FV = parseFloat(fv);

    try {
      if (variable === 'pv') {
        const result = (FV / Math.pow(1 + I, N)) + (PMT / I) * (1 - 1 / Math.pow(1 + I, N));
        setPv(result.toFixed(2));
      } else if (variable === 'fv') {
        const result = PV * Math.pow(1 + I, N) + PMT * ((Math.pow(1 + I, N) - 1) / I);
        setFv(result.toFixed(2));
      }
      // Note: Solving for N, I, or PMT requires more complex formulas or iterative methods.
      // This implementation focuses on the most common PV and FV calculations.
    } catch (e) {
      alert('Calculation error. Ensure all other fields are valid numbers.');
    }
  };

  return (
    <div className="space-y-2">
      <TVMInput label="N" value={n} setValue={setN} onCompute={() => {}} />
      <TVMInput label="I/Y (%)" value={i} setValue={setI} onCompute={() => {}} />
      <TVMInput label="PV" value={pv} setValue={setPv} onCompute={() => compute('pv')} />
      <TVMInput label="PMT" value={pmt} setValue={setPmt} onCompute={() => {}} />
      <TVMInput label="FV" value={fv} setValue={setFv} onCompute={() => compute('fv')} />
    </div>
  );
};

const TVMInput = ({ label, value, setValue, onCompute }) => (
  <div className="flex items-center gap-2">
    <button onClick={onCompute} className="w-16 fin-calc-compute-btn">CPT {label.split(' ')[0]}</button>
    <input type="number" placeholder={label} value={value} onChange={e => setValue(e.target.value)} className="fin-calc-input" />
  </div>
);

// Cash Flow Calculator Sub-component
const CashFlowCalculator = () => {
  const [cashFlows, setCashFlows] = useState('-100,20,30,40,50');
  const [discountRate, setDiscountRate] = useState('10');
  const [result, setResult] = useState(null);

  const calculateNPV = () => {
    try {
      const flows = cashFlows.split(',').map(Number);
      const rate = parseFloat(discountRate) / 100;
      if (flows.some(isNaN) || isNaN(rate)) { setResult('Error: Invalid Input'); return; }
      const npv = flows.reduce((acc, val, i) => acc + val / Math.pow(1 + rate, i), 0);
      setResult(`NPV: ${npv.toFixed(2)}`);
    } catch (e) { setResult('Error: Calculation Failed'); }
  };

  return (
    <div>
      <h4 className="font-bold text-center mb-2 text-text-primary dark:text-dark-text-primary">NPV / IRR</h4>
      <div>
        <label className="text-xs text-text-secondary dark:text-dark-text-secondary">Cash Flows (CF0, CF1, ...)</label>
        <input type="text" value={cashFlows} onChange={e => setCashFlows(e.target.value)} className="w-full p-2 rounded bg-white dark:bg-dark-background mt-1" />
      </div>
      <div className="mt-2">
        <label className="text-xs text-text-secondary dark:text-dark-text-secondary">Discount Rate (%) for NPV</label>
        <input type="number" value={discountRate} onChange={e => setDiscountRate(e.target.value)} className="w-full p-2 rounded bg-white dark:bg-dark-background mt-1" />
      </div>
      <button onClick={calculateNPV} className="w-full mt-3 bg-accent text-white p-2 rounded-lg hover:bg-accent-hover">Calculate NPV</button>
      {result && <div className={`mt-3 text-center font-bold text-lg p-2 rounded ${result.includes('Error') ? 'bg-danger/20 text-danger' : 'bg-success/20 text-success'}`}>{result}</div>}
    </div>
  );
};

export default Calculator;
