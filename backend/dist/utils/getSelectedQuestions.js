import redisClient from "../services/redis.service.js";
import { getSelectedQuestionsKey } from "./redis.util.js";
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
