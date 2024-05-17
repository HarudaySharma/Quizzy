import redisClient from '../services/redis.service.js';
import { MCQ } from '../types/types.js';
import applyTTL from './applyTTL.js';
import { Categories } from './categories.js';
import getTTL from './getTTL.js';
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
        const key = getSelectedQuestionsKey(sessionId, category);
        if (options?.append) {
            const savedQuestions = await redisClient.get(key);
            //console.log(savedQuestions);
            if (savedQuestions) {
                const allQuestions = selectedQuestions.concat(JSON.parse(savedQuestions));

                const ttl = await getTTL(key);
                await redisClient.set(key, JSON.stringify(allQuestions));
                await applyTTL(key, ttl);
                console.log(`appended questions for sessionId:${sessionId}`);
                return;
            }
        }
        const ttl = await getTTL(key);
        await redisClient.set(key, JSON.stringify(selectedQuestions));
        await applyTTL(key, ttl);
        console.log(`saved questions for sessionId:${sessionId}`);
    }
    catch (err) {
        console.log('Error at "saveSelectedQuestions"');
        throw err;
    }
}
