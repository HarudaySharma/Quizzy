import {NextFunction, Request, Response} from 'express'
import getRandomIndex from '../utils/getRandomIndex.js'
import saveSelectedQuestions from '../utils/saveSelectedQuestions.js'
import getAllQuestions from '../utils/getAllQuestions.js'
import { ErrorHandler} from '../utils/errorHandler.js'
import { MCQ } from '../types/app.js'
import getSelectedQuestions from '../utils/getSelectedQuestions.js'
import { Categories } from '../utils/categories.js'


const randomQuestions = async(category: string, mcqCount: number) =>{
    try {
        const questions: MCQ[] =  await getAllQuestions(Categories[category as keyof typeof Categories]);
        
        let selectedQuestions: MCQ[]  = [];
        let usedIndices: number[] = [];
        for(let i = 0; i < mcqCount; i++){
            usedIndices.push(getRandomIndex(usedIndices, questions.length));
        }
        while(usedIndices.length) {
            selectedQuestions.push(questions[usedIndices?.pop() ?? 1]); 
        }
        return selectedQuestions;
    }
    catch(err) {
        console.log("failed to read file", err);
        return [];
    }

}

export const getQuestions = async(req: Request, res: Response, next: NextFunction ) => {
    const {category, mcqCount} = req.body;
    try {
        const selectedQuestions: MCQ[] = await randomQuestions(category, mcqCount);
        console.log(selectedQuestions);
        try {
            const msg = await saveSelectedQuestions(selectedQuestions);
            console.log(msg);

            const questionWithoutAnswers = selectedQuestions.map((question) => {
                const {answer, ...rest} = question;
                return  rest;
            })
            res.status(200).json(questionWithoutAnswers);
        }
        catch(err) {
            console.log(err);
            next(new ErrorHandler("Questions not saved", 501));
        }
    }
    catch(err) {
        console.log(err); 
        next(new ErrorHandler("Questions not selected from Question Bank", 501));
    }
}

export const checkAnswers = async(req: Request, res: Response, next: NextFunction) => {
    const {questions} = req.body as { questions: MCQ[] };
    try {
        const selectedQuestions = await getSelectedQuestions();
        const checkedQuestions = questions.map((element)=> {
            element.isCorrect = selectedQuestions.find((mcq) => mcq.question == element.question)
                                                           ?.answer == element.answer ? true : false;
            return element;
        });
        res.status(200).json(checkedQuestions);
    }
    catch(err) {
        console.log(err)
        next();
    }
}
