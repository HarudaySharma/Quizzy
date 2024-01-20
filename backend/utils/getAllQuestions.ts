import { readFile } from "fs";
import { MCQ } from "../types/app";

const getAllQuestions = async (): Promise<Array<MCQ>> => {
    return new Promise((resolve,  reject) => {
        const parentDir: URL = new URL('../..', import.meta.url);
        const fileLoc: URL = new URL('files/questionBank.json', parentDir);

        readFile(fileLoc,'utf-8', async(err, data) => {
            if(!err){ 
                const parsedData = await JSON.parse(data);
                resolve(parsedData);
                return;
            }
            reject(err);
        })
    })
}

export default getAllQuestions;

