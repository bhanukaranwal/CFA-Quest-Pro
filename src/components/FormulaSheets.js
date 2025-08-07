import React from 'react';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import { motion } from 'framer-motion';

function FormulaSheets() {
  const sheets = [
    { title: "Quantitative Methods", file: "quantitative-methods.pdf" },
    { title: "Economics", file: "economics.pdf" },
    { title: "Financial Statement Analysis", file: "fsa.pdf" },
    { title: "Corporate Finance", file: "corp-fin.pdf" },
    { title: "Equity Investments", file: "equity.pdf" },
    { title: "Portfolio Management", file: "portfolio-management.pdf" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6 sm:p-8"
    >
      <h1 className="text-4xl font-extrabold text-text-primary dark:text-dark-text-primary mb-4 text-center">Formula Sheets</h1>
      <p className="text-center text-text-secondary dark:text-dark-text-secondary mb-12 max-w-2xl mx-auto">
        Download our original, high-quality formula sheets to aid in your studies. These are designed to be concise and cover the most critical formulas for each topic.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sheets.map((sheet, index) => (
          <motion.a
            key={index}
            href={`/formula-sheets/${sheet.file}`}
            download
            whileHover={{ y: -5, scale: 1.05 }}
            className="bg-surface dark:bg-dark-surface p-6 rounded-xl shadow-md hover:shadow-xl flex items-center justify-between"
          >
            <div className="flex items-center">
              <FaFilePdf className="h-8 w-8 text-danger mr-4" />
              <span className="text-lg font-bold text-text-primary dark:text-dark-text-primary">{sheet.title}</span>
            </div>
            <FaDownload className="h-6 w-6 text-text-secondary dark:text-dark-text-secondary" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

export default FormulaSheets;
