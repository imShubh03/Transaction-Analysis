import express from 'express';

const router = express.Router();

import {initializeDatabase, listTransactions, getStatistics, getBarChartData, getPieChartData, getCombinedData} from "../controllers/transaction.controller.js"

router.get('/initialize', initializeDatabase);
router.get('/list', listTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChartData);
router.get('/pie-chart', getPieChartData);
router.get('/combined-data', getCombinedData);

export default router;