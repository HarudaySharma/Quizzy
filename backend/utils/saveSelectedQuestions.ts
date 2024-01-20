import {writeFile} from 'fs';

export default async function saveSelectedQuestions (data: object[]): Promise<string> {
   return new Promise((resolve, reject) => {
        const parentDir: URL = new URL('../..', import.meta.url);
        const fileLoc: URL = new URL('files/selectedQuestions.json', parentDir);
        writeFile(fileLoc, JSON.stringify(data), 'utf-8', (err) => {
            if(!err) {
                resolve("data written successfully");
                return;
            }
            reject(err);
        })
   })
}
