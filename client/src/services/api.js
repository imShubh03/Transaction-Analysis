import axios from 'axios';

import { TRANSACTION_API_ENDPOINT } from '../utils/constant.js';


// Fetch transactions
export const fetchTransactions = (month, search = '', page = 1, perPage = 10) =>
    axios.get(`${TRANSACTION_API_ENDPOINT}/list`, { params: { month, search, page, perPage } });

// Fetch statistics
export const fetchStatistics = (month) =>
    axios.get(`${TRANSACTION_API_ENDPOINT}/statistics`, { params: { month } });

// Fetch bar chart data
export const fetchBarChartData = (month) =>
    axios.get(`${TRANSACTION_API_ENDPOINT}/bar-chart`, { params: { month } });

// Fetch pie chart data
export const fetchPieChartData = (month) =>
    axios.get(`${TRANSACTION_API_ENDPOINT}/pie-chart`, { params: { month } });

// Fetch combined data
export const fetchCombinedData = (month) =>
    axios.get(`${TRANSACTION_API_ENDPOINT}/combined-data`, { params: { month } });


