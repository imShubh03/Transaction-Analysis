import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api.js';

const TransactionTable = ({ selectedMonth }) => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            const response = await fetchTransactions(selectedMonth, search, page);
            setTransactions(response.data.transactions);
            setTotal(response.data.total);
        };
        loadData();
    }, [selectedMonth, search, page]);

    return (
        <div className="max-w-5xl mx-auto p-4 bg-white shadow-md rounded-lg">
            {/* Search Bar */}
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="p-2 text-left border border-gray-300">Title</th>
                            <th className="p-2 text-left border border-gray-300">Description</th>
                            <th className="p-2 text-left border border-gray-300">Price</th>
                            <th className="p-2 text-left border border-gray-300">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-gray-100">
                                    <td className="p-2 border border-gray-300">{transaction.title}</td>
                                    <td className="p-2 border border-gray-300">
                                        {transaction.description}
                                    </td>
                                    <td className="p-2 border border-gray-300">
                                        ${transaction.price}
                                    </td>
                                    <td className="p-2 border border-gray-300">
                                        {new Date(transaction.dateOfSale).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="p-4 text-center text-gray-500 border border-gray-300"
                                >
                                    No transactions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-lg ${
                        page === 1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600 transition'
                    }`}
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page * 10 >= total}
                    className={`px-4 py-2 rounded-lg ${
                        page * 10 >= total
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600 transition'
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionTable;
