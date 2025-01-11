
import axios from "axios";
import Transaction from "../models/transaction.model.js";

// Constants
const EXTERNAL_API_URL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";


export const initializeDatabase = async (req, res) => {
    try {
        // Fetch data from external API
        const response = await axios.get(EXTERNAL_API_URL);
        
        // Validate API response
        if (!response.data || !Array.isArray(response.data)) {
            throw new Error("Invalid data received from external API");
        }

        // Clear existing data from database
        await Transaction.deleteMany({});
        console.log("Existing transactions cleared successfully");

        // Insert new data into database
        const insertedData = await Transaction.insertMany(response.data);
        console.log(`${insertedData.length} transactions inserted successfully`);

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Database initialized successfully",
            count: insertedData.length
        });
        
    } catch (error) {
        // Log error for debugging
        console.error("Database initialization failed:", error);

        // Determine error message and status code
        const statusCode = error.response?.status || 500;
        const errorMessage = error.message || "Internal server error";

        // Send error response
        return res.status(statusCode).json({
            success: false,
            message: "Failed to initialize database",
            error: errorMessage
        });
    }
};


export const listTransactions = async (req, res) => {
    try {
        const { month, search = '', page = 1, perPage = 10 } = req.query;

        // Validate month input
        if (!month || isNaN(new Date(`${month} 1`).getMonth())) {
            throw new Error("Invalid or missing month parameter");
        }

        const monthNumber = new Date(`${month} 1`).getMonth() + 1;

        // Build the query object
        let query = {
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, monthNumber],
            },
        };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: isNaN(search) ? undefined : Number(search) },
            ].filter(condition => condition);
        }

        // Fetch total count for pagination
        const total = await Transaction.countDocuments(query);

        // Fetch transactions for the requested page
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Transactions fetched successfully",
            total,
            page: Number(page),
            perPage: Number(perPage),
            transactions,
        });

    } catch (error) {
        // Log error for debugging
        console.error("Error listing transactions:", error);

        // Determine error message and status code
        const statusCode = error.response?.status || 500;
        const errorMessage = error.message || "Internal server error";

        // Send error response
        return res.status(statusCode).json({
            success: false,
            message: "Failed to fetch transactions",
            error: errorMessage,
        });
    }
};


export const getStatistics = async (req, res) => {
    try {
        const { month } = req.query;

        // Validate and parse the month parameter
        if (!month || isNaN(new Date(`${month} 1`).getMonth())) {
            throw new Error("Invalid or missing 'month' parameter");
        }
        const monthNumber = new Date(`${month} 1`).getMonth() + 1;

        // Match transactions within the specified month
        const match = {
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, monthNumber],
            },
        };

        // MongoDB Aggregation Pipeline
        const stats = await Transaction.aggregate([
            { $match: match }, // Filter transactions by month
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: '$price' }, // Sum of all prices
                    soldItems: { $sum: { $cond: ['$sold', 1, 0] } }, // Count of sold items
                    notSoldItems: { $sum: { $cond: ['$sold', 0, 1] } }, // Count of not sold items
                },
            },
        ]);

        // Default values if no matching data
        const response = stats[0] || {
            totalSaleAmount: 0,
            soldItems: 0,
            notSoldItems: 0,
        };

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Statistics fetched successfully",
            data: response,
        });

    } catch (error) {
        console.error("Error fetching statistics:", error);

        // Send error response
        return res.status(500).json({
            success: false,
            message: "Failed to fetch statistics",
            error: error.message || "Internal server error",
        });
    }
};


export const getBarChartData = async (req, res) => {
    try {
        const { month } = req.query;

        // Validate and parse the month parameter
        if (!month || isNaN(new Date(`${month} 1`).getMonth())) {
            throw new Error("Invalid or missing 'month' parameter");
        }
        const monthNumber = new Date(`${month} 1`).getMonth() + 1;

        // Define price ranges
        const ranges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity }
        ];

        // Match transactions within the specified month
        const match = {
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, monthNumber],
            },
        };

        // Count documents in each price range
        const rangeData = await Promise.all(
            ranges.map(async ({ min, max }) => {
                const count = await Transaction.countDocuments({
                    ...match,
                    price: { $gte: min, $lt: max === Infinity ? Number.MAX_VALUE : max },
                });
                return {
                    range: `${min}-${max === Infinity ? 'above' : max}`,
                    count,
                };
            })
        );

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Bar chart data fetched successfully",
            data: rangeData,
        });
    } catch (error) {
        console.error("Error fetching bar chart data:", error);

        // Send error response
        return res.status(500).json({
            success: false,
            message: "Failed to fetch bar chart data",
            error: error.message || "Internal server error",
        });
    }
};


export const getPieChartData = async (req, res) => {
    try {
        const { month } = req.query;

        // Validate and parse the month parameter
        if (!month || isNaN(new Date(`${month} 1`).getMonth())) {
            throw new Error("Invalid or missing 'month' parameter");
        }
        const monthNumber = new Date(`${month} 1`).getMonth() + 1;

        // Aggregation pipeline
        const categoryData = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: '$dateOfSale' }, monthNumber],
                    },
                },
            },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
        ]);

        // Format the response
        return res.status(200).json({
            success: true,
            message: "Pie chart data fetched successfully",
            data: categoryData.map(item => ({
                category: item._id,
                count: item.count,
            })),
        });
    } catch (error) {
        console.error("Error fetching pie chart data:", error);

        // Send error response
        return res.status(500).json({
            success: false,
            message: "Failed to fetch pie chart data",
            error: error.message || "Internal server error",
        });
    }
};




export const getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;

        // Validate the month parameter
        if (!month) {
            throw new Error("Missing 'month' parameter");
        }

        // Build the base URL for internal API calls
        const baseUrl = `${req.protocol}://${req.get('host')}/api/transactions`;

        // Fetch data in parallel
        const [statistics, barChart, pieChart] = await Promise.all([
            axios.get(`${baseUrl}/statistics?month=${month}`),
            axios.get(`${baseUrl}/bar-chart?month=${month}`),
            axios.get(`${baseUrl}/pie-chart?month=${month}`),
        ]);

        // Combine responses
        return res.status(200).json({
            success: true,
            message: "Combined data fetched successfully",
            data: {
                statistics: statistics.data,
                barChart: barChart.data,
                pieChart: pieChart.data,
            },
        });
    } catch (error) {
        console.error("Error fetching combined data:", error);

        // Send error response
        return res.status(500).json({
            success: false,
            message: "Failed to fetch combined data",
            error: error.message || "Internal server error",
        });
    }
};
