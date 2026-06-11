# EcoCart AI

EcoCart AI is an e-commerce sustainability application designed to evaluate, track, and encourage eco-friendly practices for both sellers and buyers.

## Features
- **EcoScore Evaluation**: Calculates sustainability scores and assigns "EcoGrades" to products based on material sourcing, packaging, durability, and locality.
- **Green Zone Audits**: Automated sustainability audits that approve, reject, or flag products for review based on their eco-credentials.
- **Seller Improvement System**: AI-driven insights providing actionable feedback to sellers to improve their product sustainability and reduce greenwashing.
- **Impact Tracking**: Tracks individual user environmental impact over time (carbon emissions saved, plastic reduced, trees planted equivalent).
- **Eco-Friendly Checkout**: Allows users to choose green delivery options (grouped shipping) and eco-packaging at checkout to earn rewards.
- **Reward System**: Incentivizes eco-friendly buyer choices and rewards highly sustainable sellers.

## Architecture
This project utilizes a scalable microservices-oriented MERN stack paired with a Python ML Service:

- **Frontend (React + Vite + Tailwind CSS)**: Handles the user interface for Customers, Sellers, and Admins. (Runs on Port 5173)
- **Backend (Node.js + Express + MongoDB)**: The core API handling product data, user profiles, reward calculations, and rule-based sustainability audits. (Runs on Port 5000)
- **Machine Learning Service (Python + FastAPI)**: A dedicated service designed to evaluate unstructured product data, detect greenwashing, and predict sustainability metrics using machine learning models. (Runs on Port 8000)

## Getting Started

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend
```bash
cd backend
npm install
npm run dev
```

### 3. ML Service
```bash
cd ml-service
python -m venv venv
# Activate on Windows:
venv\Scripts\activate
# Activate on Mac/Linux:
# source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Application Routes

### Frontend Routes (React / Port 5173)

**Customer / Buyer Routes:**
- `/` - Home Page
- `/products` - Browse Sustainability Products
- `/product/:id` - Individual Product Details
- `/cart` - Shopping Cart
- `/checkout` - Green Checkout Flow
- `/dashboard` - Customer Profile & Impact Dashboard

**Seller Routes:**
- `/seller/dashboard` - Seller Dashboard (Manage Products, View EcoScores, Seller Improvements)

**Admin Routes:**
- `/admin/dashboard` - Platform Admin Dashboard
