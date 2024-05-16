import { MCQ } from "../types/types.js";
import redisClient from "../services/redis.service.js";
import { getSelectedQuestionsKey } from "./redis.util.js";
import { Categories } from "./categories.js";

/* const getSelectedQuestions = async(): Promise<MCQ[]> => {
    return new Promise((resolve, reject) => {
        readFile(getQuestionFileLoc(Categories.SELECTED),'utf-8', async(err, data) => {
            if(!err){ 
                const parsedData = await JSON.parse(data);
                resolve(parsedData);
                return;
            }
            reject(err);
        })
    })
} */

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
        throw err;
    }
}

export default getSelectedQuestions;
