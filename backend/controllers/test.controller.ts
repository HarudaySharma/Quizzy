import {NextFunction, Request, Response} from 'express'
import saveSelectedQuestions from '../utils/saveSelectedQuestions.js'
import { ErrorHandler} from '../utils/errorHandler.js'
import { CheckedQuestion, MCQ } from '../types/types.js'
import getSelectedQuestions from '../utils/getSelectedQuestions.js'
import randomQuestions from '../utils/randomQuestions.js'


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
        const checkedQuestions: CheckedQuestion[] = questions.map((element)=> {
            const selQuestion  = selectedQuestions.find((mcq) => mcq.question === element.question);
            if(!selQuestion) {
                throw new ErrorHandler("Questions didn't matched", 401);
            }
            return {
                ...element,
                correctOption: selQuestion.answer,
                isCorrect: selQuestion.answer == element.answer ? true : false,
            }
        });
        res.status(200).json(checkedQuestions);
    }
    catch(err) {
        console.log(err)
        next(new ErrorHandler("try again", 501));
    }
}
