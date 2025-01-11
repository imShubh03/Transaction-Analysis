# About my project (TransactiFlow) 🚀

TransactiFlow is a comprehensive and dynamic **Transaction Dashboard** designed to streamline transaction tracking and data visualization. With an intuitive interface, users can seamlessly view, analyze, and explore transaction data. The dashboard features a **bar chart**, **pie chart**, and **transaction table**, giving users a detailed view of their transaction history and insights.

### Features:
- 📊 **Data Visualizations**: Interactive bar and pie charts.
- 📅 **Monthly Selection**: View data for any specific month.
- 🔄 **Dynamic Updates**: Data updates based on selected month.
- 📈 **Statistics**: See your transactions and insights clearly.

---

# Demo Video and Images 🎥📸


https://github.com/user-attachments/assets/d6f9e2be-01de-48f5-a38f-bcbeb49c2dd2


Here’s a quick preview of the TransactiFlow dashboard in action:



![image](https://github.com/user-attachments/assets/6d165667-ba03-4b53-987d-be2107601b4b)
![image](https://github.com/user-attachments/assets/79ddeeb2-29e0-4921-9576-c7b518474566)
![image](https://github.com/user-attachments/assets/b7fbd943-0ac8-44c5-91b1-bd86b218ed0d)
![image](https://github.com/user-attachments/assets/fbecf924-9c50-4c92-aa9b-62a5457fea00)




# Installation Instructions 📝

## Quick Start Guide

### Backend Setup
```bash
# Go to server directory
cd backend

# Install dependencies
npm install

# Create .env file
PORT=3000
MONGODB_URI=mongodb+srv://USERNAME:<PASSWORD>@cluster0.dai2p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# Start server
npm start
```

### Frontend Setup
```bash
# Go to client directory
cd frontend

# Install dependencies
npm install

# Create .env file
TRANSACTION_API_ENDPOINT =http://localhost:3000/api/transcation

# Start application
npm run dev
```



### Access Application
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## API Endpoints
- GET `/api/transactions/list` - List transactions
- GET `/api/transactions/statistics` - Get statistics
- GET `/api/transactions/bar-chart` - Get bar chart data
- GET `/api/transactions/pie-chart` - Get pie chart data
- GET `/api/transactions/combined-data` - Get all data

## Tech Stack
- Backend: Node.js, Express, MongoDB
- Frontend: React, Recharts, Tailwind CSS

## Features
- Transaction listing with search
- Monthly statistics
- Interactive charts
- Responsive design
