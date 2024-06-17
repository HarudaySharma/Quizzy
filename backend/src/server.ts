import express, { Application } from 'express';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser'

import testRoutes from './routes/test.route.js'
import quizRoutes from './routes/quiz.route.js'

import { errorMiddleware } from './utils/errorHandler.js';

config();


const app: Application = express();

const PORT: string = process.env.PORT || "3000";

app.use(express.static('files/images'));

app.listen(PORT, () => { 
    console.log(`server listening on http://localhost:${PORT}`);
})

app.use(express.json());
app.use(cookieParser());

app.use('/api/quiz/test' , testRoutes);
app.use('/api/quiz' , quizRoutes);

app.use(errorMiddleware);
