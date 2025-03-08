const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const { logInfo, logError } = require('./src/utils/logger');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const incidentRoutes = require('./src/routes/incidentRoutes');
const pollRoutes = require('./src/routes/pollRoutes');
const documentRoutes = require('./src/routes/documentRoutes');
const feedbackRoutes = require('./src/routes/feedbackRoutes');

const aiRoutes = require('./src/routes/aiRoutes');
const { errorMiddleware } = require('./src/middleware/errorMiddleware');

dotenv.config();

const app = express();

app.use(cors({
  credentials: true,  
  origin: '*'
}));

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/ai', aiRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logInfo(`Server running on port ${PORT}`);
});
