import { MCQ } from "../types/types.js";
import redisClient from "../services/redis.service.js";
import { getSelectedQuestionsKey } from "./redis.util.js";
import { Categories } from "./categories.js";

const getSelectedQuestions = async(sessionId: string, category: keyof typeof Categories): Promise<MCQ[]> => {
    try {
        const savedQuestions = await redisClient.get(getSelectedQuestionsKey(sessionId, category));
        if(!savedQuestions) {
            throw new Error('no savedQuestions found');
        }
        return JSON.parse(savedQuestions) as MCQ[];
    }
    catch(err) {
        console.log('Error at "getSelectedQuestions"');
        console.log(`sessionId: ${sessionId}`);
        throw err;
    }
}

export default getSelectedQuestions;
