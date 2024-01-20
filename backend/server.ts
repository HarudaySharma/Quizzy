import express, { Application } from 'express';
import {config} from 'dotenv';

import questionRoute from './routes/questions.route.js'
import { errorMiddleware } from './utils/errorHandler.js';

config();

const app: Application = express();

const PORT: string = process.env.PORT || "3000";

app.listen(PORT, () => { 
    console.log(`server listening on PORT:${PORT}`);
})

app.use(express.json());

app.use('/api/', questionRoute);
app.use('*', errorMiddleware);
