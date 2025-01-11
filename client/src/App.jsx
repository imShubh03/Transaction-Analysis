import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionTable from '../src/component/TransactionTable.jsx';
import Statistics from '../src/component/Statistics.jsx';
import BarChart from '../src/component/BarChart.jsx';
import PieChart from '../src/component/PieChart.jsx';
import { Link } from 'react-router-dom';

const App = () => {
    const [selectedMonth, setSelectedMonth] = useState('March');

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                {/* Navbar */}
                <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-lg">
                    <div className="container mx-auto flex justify-between items-center">
                        {/* Add a Link for "Dashboard" */}
                        <Link to="/" className="text-white text-2xl font-bold hover:text-yellow-300 transition">
                            TransactiFlow
                        </Link>
                        <div className="space-x-6">
                            <Link to="/" className="text-white hover:text-yellow-300 transition">
                                Statistics
                            </Link>
                            <Link to="/bar-chart" className="text-white hover:text-yellow-300 transition">
                                Bar Chart
                            </Link>
                            <Link to="/pie-chart" className="text-white hover:text-yellow-300 transition">
                                Pie Chart
                            </Link>
                            <Link to="/transactions" className="text-white hover:text-yellow-300 transition">
                                Transactions
                            </Link>
                        </div>
                    </div>
                </nav>


                {/* Header */}
                <header className="py-6 bg-white shadow-sm">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl font-extrabold text-gray-800">
                            Transaction Dashboard
                        </h1>
                        <p className="text-gray-500 mt-2">View and analyze your data effectively</p>
                    </div>
                </header>

                {/* Month Selector */}
                <div className="my-6 container mx-auto text-center">
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-md text-gray-700 focus:ring focus:ring-blue-300 transition"
                    >
                        {[
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ].map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Routes */}
                <main className="container mx-auto px-4 pb-6">
                    <Routes>
                        <Route
                            path="/"
                            element={<Statistics selectedMonth={selectedMonth} />}
                        />
                        <Route
                            path="/bar-chart"
                            element={<BarChart selectedMonth={selectedMonth} />}
                        />
                        <Route
                            path="/pie-chart"
                            element={<PieChart selectedMonth={selectedMonth} />}
                        />
                        <Route
                            path="/transactions"
                            element={<TransactionTable selectedMonth={selectedMonth} />}
                        />
                    </Routes>
                </main>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-4 mt-auto">
                    <div className="container mx-auto text-center">
                        <p>&copy; {new Date().getFullYear()} Transaction Dashboard. All rights reserved. with ❤️</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
};

export default App;
