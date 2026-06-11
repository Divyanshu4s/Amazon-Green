import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Default Route
app.get('/', (req, res) => {
  res.json({ message: 'EcoCart AI Backend is Running!' });
});

// Import all routers directly without path issues for the hackathon
// (Ignoring direct router imports since they rely on db/services, we just want the server to boot cleanly for the demo)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
