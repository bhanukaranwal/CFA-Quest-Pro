CFA Quest ProRepository DescriptionCFA Quest Pro is an original, passion-driven web application built to empower CFA (Chartered Financial Analyst) candidates with a robust platform for exam preparation. Developed using React.js, this open-source project ensures all content is created from scratch, free of any copyrighted materials, and adheres to legal and ethical guidelines, including CFA Institute policies. The platform offers a comprehensive suite of features tailored for CFA Levels I, II, and III preparation, including:Level and Topic Selection: Users can choose their CFA level (I, II, or III) and customize practice sessions by selecting topics (e.g., Ethics, Quantitative Methods, Portfolio Management).Timed Exams and Mock Exams: Practice with timed multiple-choice question (MCQ) exams or full-length mock exams designed to reflect CFA exam formats.Original Question Bank: A placeholder question bank with sample MCQs created for demonstration purposes, avoiding any reproduction of CFA Institute materials. Developers can extend this with their own or licensed questions.Mistake Review: Detailed feedback on incorrect answers with original explanations, helping users learn from mistakes without relying on copyrighted content.Achievements and Daily Streaks: Gamified features like badges (e.g., "100 Questions Master", "90% Accuracy") and daily streaks to encourage consistent practice.Formula Sheets: Original, downloadable formula sheets covering key CFA topics, created specifically for this project to avoid copyrighted material.Progress Dashboard: A visual dashboard to track performance, topic mastery, and exam readiness with charts and analytics.Responsive Design: Built with Tailwind CSS for a mobile-friendly, accessible interface.Deployment-Ready: Primed for deployment on Vercel, with clear instructions for linking to a GitHub repository for continuous integration.This repository provides a complete React application with modular components, state management, and a mock API for question data. All content is original, created solely for this project, and compliant with intellectual property laws.Repository Structure/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Achievements.js
│   │   ├── Dashboard.js
│   │   ├── ExamInterface.js
│   │   ├── FormulaSheets.js
│   │   ├── Home.js
│   │   └── Navbar.js
│   ├── data/
│   │   └── questions.json
│   ├── App.js
│   ├── index.css
│   └── index.js
└── README.md
Key Compliance NotesAll questions, explanations, and formula sheets are original placeholders created for this project to avoid infringing on CFA Institute’s copyrighted materials.Developers are responsible for ensuring any additional content (e.g., real CFA questions) is licensed or created independently to comply with CFA Institute guidelines and intellectual property laws.This project is a passion project, intended for educational purposes, and does not claim affiliation with the CFA Institute.Setup and InstallationPrerequisitesNode.js (v14 or later)npm (or yarn)1. Clone the Repositorygit clone https://github.com/your-username/cfa-quest-pro.git
cd cfa-quest-pro
2. Install Dependenciesnpm install
3. Run Locallynpm start
Open http://localhost:3000 to view the app in your browser.4. Build for Productionnpm run build
This command builds the app for production to the build folder.Deployment to VercelCreate a Vercel account at vercel.com.Install the Vercel CLI:npm install -g vercel
Link the project to Vercel:vercel
Follow the command-line prompts to connect your GitHub repository and deploy. Vercel will automatically detect the React app and configure it for production.GitHub IntegrationPush the repository to GitHub:git remote add origin https://github.com/your-username/cfa-quest-pro.git
git push -u origin main
In your Vercel project dashboard, link your GitHub repository for automatic deployments on each push to the main branch.LicenseThis project is licensed under the MIT License. See the LICENSE file for details.
