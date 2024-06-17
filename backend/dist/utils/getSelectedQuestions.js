import redisClient from "../services/redis.service.js";
import { getSelectedQuestionsKey } from "./redis.util.js";
const getSelectedQuestions = async (sessionId, category) => {
    try {
        const savedQuestions = await redisClient.get(getSelectedQuestionsKey(sessionId, category));
        if (!savedQuestions) {
            throw new Error('no savedQuestions found');
        }
        return JSON.parse(savedQuestions);
    }
    catch (err) {
        console.log('Error at "getSelectedQuestions"');
        console.log(`sessionId: ${sessionId}`);
        throw err;
    }
};
export default getSelectedQuestions;
