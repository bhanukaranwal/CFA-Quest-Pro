import React from 'react';
import { FaDownload, FaFilePdf } from 'react-icons/fa';

function FormulaSheets() {
  const sheets = [
    { title: "Quantitative Methods", file: "quantitative-methods.pdf" },
    { title: "Economics", file: "economics.pdf" },
    { title: "Financial Statement Analysis", file: "fsa.pdf" },
    { title: "Portfolio Management", file: "portfolio-management.pdf" },
  ];

  return (
    <div className="container mx-auto p-6 sm:p-8">
      <h1 className="text-4xl font-extrabold text-text-primary mb-4 text-center">Formula Sheets</h1>
      <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
        Download our original, high-quality formula sheets to aid in your studies. These are designed to be concise and cover the most critical formulas for each topic.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sheets.map((sheet, index) => (
          <a
            key={index}
            href={`/formula-sheets/${sheet.file}`}
            download
            className="bg-surface p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex items-center justify-between"
          >
            <div className="flex items-center">
              <FaFilePdf className="h-8 w-8 text-danger mr-4" />
              <span className="text-lg font-bold text-text-primary">{sheet.title}</span>
            </div>
            <FaDownload className="h-6 w-6 text-text-secondary" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default FormulaSheets;
