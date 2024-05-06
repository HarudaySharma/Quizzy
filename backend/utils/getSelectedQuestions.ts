import { MCQ } from "../types/types.js";
import { readFile } from "fs";
import { Categories, getQuestionFileLoc } from "./categories.js";

const getSelectedQuestions = async(): Promise<MCQ[]> => {
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
}

export default getSelectedQuestions;
