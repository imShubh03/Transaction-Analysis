import React, { useEffect, useState } from 'react';
import { fetchBarChartData } from '../services/api.js';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const BarChartComponent = ({ selectedMonth }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const response = await fetchBarChartData(selectedMonth);
            setData(response.data.data);
        };
        loadData();
    }, [selectedMonth]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
                Monthly Sales Distribution - {selectedMonth}
            </h2>
            <div className="flex justify-center items-center">
                <BarChart
                    width={600}
                    height={300}
                    data={data}
                    className="bg-gray-50 rounded-lg p-4"
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis dataKey="range" tick={{ fill: '#555', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#555', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#f9fafb',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                        }}
                        labelStyle={{ color: '#333' }}
                        itemStyle={{ color: '#555' }}
                    />
                    <Bar dataKey="count" fill="#8884d8" barSize={40} />
                </BarChart>
            </div>
        </div>
    );
};

export default BarChartComponent;
