import React, { useEffect, useState } from 'react';
import { fetchPieChartData } from '../services/api.js';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const PieChartComponent = ({ selectedMonth }) => {
    const [data, setData] = useState([]);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    useEffect(() => {
        const loadData = async () => {
            const response = await fetchPieChartData(selectedMonth);
            setData(response.data.data);
        };
        loadData();
    }, [selectedMonth]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">
                Category Distribution - {selectedMonth}
            </h2>
            <div className="flex justify-center items-center">
                <PieChart width={600} height={600}>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label={({ name, value }) => `${name}: ${value}`}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default PieChartComponent;
