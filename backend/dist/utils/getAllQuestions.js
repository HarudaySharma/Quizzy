import { readFile } from "fs";
import { getQuestionFileLoc } from "./categories.js";
const getAllQuestions = async (category) => {
    return new Promise((resolve, reject) => {
        readFile(getQuestionFileLoc(category), 'utf-8', async (err, data) => {
            if (!err) {
                const parsedData = await JSON.parse(data);
                resolve(parsedData);
                return;
            }
            reject(err);
        });
    });
};
export default getAllQuestions;
