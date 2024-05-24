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
const appendSelectedQuestions = async (questions, sessionId, category) => {
    try {
        const storedQuestions = await redisClient.get(getSelectedQuestionsKey(sessionId, category));
        if (!storedQuestions) {
            await redisClient.set(getSelectedQuestionsKey(sessionId, category), JSON.stringify(questions));
            return;
        }
        const allQuestions = questions.concat(JSON.parse(storedQuestions));
        await redisClient.set(getSelectedQuestionsKey(sessionId, category), JSON.stringify(allQuestions));
    }
    catch (err) {
        console.log('Error at "getSelectedQuestions"');
        throw err;
    }
};
export default appendSelectedQuestions;
