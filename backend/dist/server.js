import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import flagRoutes from './routes/flags.route.js';
import testRoutes from './routes/test.route.js';
import quizRoutes from './routes/quiz.route.js';
import { errorMiddleware } from './utils/errorHandler.js';
config();
const app = express();
const PORT = process.env.PORT;
app.use(cors({
    credentials: true,
    origin: `${process.env.WEB_CLIENT_URL}`,
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Include allowed headers
}));
// middleware to handle preflight requests
app.options('*', cors({
    credentials: true,
    origin: `${process.env.WEB_CLIENT_URL}`,
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(cookieParser());
app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
app.get("/", (_, res) => {
    res.json({ status: "server running" });
});
app.use('/', flagRoutes);
app.use('/api/quiz/test', testRoutes);
app.use('/api/quiz', quizRoutes);
app.use(errorMiddleware);
