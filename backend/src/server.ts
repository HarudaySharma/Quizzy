import express, { Application, Response } from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser'

import flagRoutes from './routes/flags.route.js'
import testRoutes from './routes/test.route.js'
import quizRoutes from './routes/quiz.route.js'

import { errorMiddleware } from './utils/errorHandler.js';

config();

const app: Application = express();

const PORT: string = process.env.PORT || "3000";

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
})

app.get("/", (_, res: Response) => {
    res.json({ status: "server running" });
})

app.use('/', flagRoutes);
app.use('/api/quiz/test', testRoutes);
app.use('/api/quiz', quizRoutes);

app.use(errorMiddleware);
