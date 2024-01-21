import {writeFile} from 'fs';
import { Categories, getQuestionFileLoc } from './categories.js';

export default async function saveSelectedQuestions (data: object[]): Promise<string> {
   return new Promise((resolve, reject) => {
        writeFile(getQuestionFileLoc(Categories.SELECTED), JSON.stringify(data), 'utf-8', (err) => {
            if(!err) {
                resolve("data written successfully");
                return;
            }
            reject(err);
        })
   })
}
