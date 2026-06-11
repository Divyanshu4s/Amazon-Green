# EcoCart AI

Scalable MERN Architecture with a separate Python FastAPI ML service.

## Services
- **Frontend**: React + Vite + Tailwind CSS (Port 5173 default)
- **Backend**: Node.js + Express + MongoDB (Port 5000)
- **ML Service**: Python + FastAPI (Port 8000)

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
