import { NextFunction, Request, Response } from 'express'
import { ErrorHandler } from '../utils/errorHandler.js'
import { MCQ } from '../types/types.js'
import randomQuestions from '../utils/randomQuestions.js'
import { Categories } from '../utils/categories.js'

export const getQuestions = async (req: Request, res: Response, next: NextFunction) => {
    const { category, mcqCount } = req.body;
    if(!Boolean(category) || !Boolean(Categories[`${category as keyof typeof Categories}`])) {
        next(new ErrorHandler("category of mcq's INVALID", 400));
        return;
    }
    try {
        const selectedQuestions: MCQ[] = await randomQuestions(category, mcqCount);
        console.log(selectedQuestions);
        res.status(200).json(selectedQuestions);
    }
    catch (err) {
        console.log(err);
        next(new ErrorHandler("Questions not selected from Question Bank", 501));
    }
}
