import redisClient from "../services/redis.service.js";
import { getSelectedQuestionsKey } from "./redis.util.js";
const clearSelectedQuestions = async (sessionId, category) => {
    try {
        await redisClient.del(getSelectedQuestionsKey(sessionId, category));
        return;
    }
    catch (err) {
        console.log('Error at "clearSelectedQuestions"');
        throw err;
    }
};
export default clearSelectedQuestions;
