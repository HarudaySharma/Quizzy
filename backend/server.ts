import express, { Application } from 'express';
import {config} from 'dotenv';

import testRoutes from './routes/test.route.js'
import quizRoutes from './routes/quiz.route.js'

import { errorMiddleware } from './utils/errorHandler.js';

config();

const app: Application = express();

const PORT: string = process.env.PORT || "3000";

app.listen(PORT, () => { 
    console.log(`server listening on http://localhost:${PORT}`);
})

app.use(express.json());

app.use('/api/quiz/test' , testRoutes);
app.use('/api/quiz' , quizRoutes);

app.use(errorMiddleware);
