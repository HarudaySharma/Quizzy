import express, { Application, Response } from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors';

import testRoutes from './routes/test.route.js'
import quizRoutes from './routes/quiz.route.js'

import { errorMiddleware } from './utils/errorHandler.js';

config();

const app: Application = express();
const PORT: string = process.env.PORT as string;

app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(cookieParser());


app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
})

app.get("/", (_, res: Response) => {
    res.json({status: "server running"});
})

app.use('/api/quiz/test', testRoutes);
app.use('/api/quiz', quizRoutes);

app.use(errorMiddleware);