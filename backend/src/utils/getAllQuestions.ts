import { readFile } from "fs";
import { MCQ } from  "../types/types.js"
import { Categories, getQuestionFileLoc } from "./categories.js";

const getAllQuestions = async (category: Categories): Promise<Array<MCQ>> => {
    return new Promise((resolve,  reject) => {
        readFile(getQuestionFileLoc(category),'utf-8', async(err, data) => {
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

