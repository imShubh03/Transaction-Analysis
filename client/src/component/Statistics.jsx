import React, { useEffect, useState } from 'react';
import { fetchStatistics } from '../services/api.js';

const Statistics = ({ selectedMonth }) => {
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        soldItems: 0,
        notSoldItems: 0,
    });

    useEffect(() => {
        const loadData = async () => {
            const response = await fetchStatistics(selectedMonth);
            setStatistics(response.data.data);
        };
        loadData();
    }, [selectedMonth]);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Sale Amount */}
                <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-blue-700">Total Sale Amount</h3>
                    <p className="text-xl font-bold text-blue-900">${statistics.totalSaleAmount}</p>
                </div>
                {/* Sold Items */}
                <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-green-700">Sold Items</h3>
                    <p className="text-xl font-bold text-green-900">{statistics.soldItems}</p>
                </div>
                {/* Not Sold Items */}
                <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-red-700">Not Sold Items</h3>
                    <p className="text-xl font-bold text-red-900">{statistics.notSoldItems}</p>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
