import redisClient from '../services/redis.service.js';
import { MCQ } from '../types/types.js';
import { Categories } from './categories.js';
import { getSelectedQuestionsKey } from './redis.util.js';

/* export default async function saveSelectedQuestions (data: object[]): Promise<string> {
   return new Promise((resolve, reject) => {
        writeFile(getQuestionFileLoc(Categories.SELECTED), JSON.stringify(data), 'utf-8', (err) => {
            if(!err) {
                resolve("data written successfully");
                return;
            }
            reject(err);
        })
   })
} */

// session:id:selectedQuestions
type PARAMS = {
    selectedQuestions: MCQ[],
    sessionId: string,
    category: keyof typeof Categories,
    options?: {
        append?: boolean
    }
}

export default async function saveSelectedQuestions({ selectedQuestions, category, sessionId, options }: PARAMS) {
    try {
        if (options?.append) {
            const savedQuestions = await redisClient.get(getSelectedQuestionsKey(sessionId, category));
            console.log(savedQuestions);
            if (savedQuestions) {
                const allQuestions = selectedQuestions.concat(JSON.parse(savedQuestions));
                await redisClient.set(getSelectedQuestionsKey(sessionId, category), JSON.stringify(allQuestions));
                return;
            }
        }
        await redisClient.set(getSelectedQuestionsKey(sessionId, category), JSON.stringify(selectedQuestions));
    }
    catch (err) {
        console.log('Error at "saveSelectedQuestions"');
        throw err;
    }
}
