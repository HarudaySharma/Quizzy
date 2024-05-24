import redisClient from '../services/redis.service.js';
import { getSelectedQuestionsKey } from './redis.util.js';
export default async function deleteSelectedQuestions(sessionId, category) {
    try {
        await redisClient.del(getSelectedQuestionsKey(sessionId, category));
    }
    catch (err) {
        console.log('Error at "deleteSelectedQuestions"');
        throw err;
    }
}
