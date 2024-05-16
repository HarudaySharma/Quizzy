import { NextFunction, Response } from 'express'
import { ErrorHandler } from '../utils/errorHandler.js'
import randomQuestions from '../utils/randomQuestions.js'
import { Categories } from '../utils/categories.js'
import { CustomRequest } from '../types/types.js'
import getUsedIndices from '../utils/getUsedIndices.js'
import saveUsedIndices from '../utils/saveUsedIndices.js'

export const getQuestions = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { category, mcqCount } = req.body as { mcqCount: number, category: keyof typeof Categories };

    if (!Boolean(category) || !Boolean(Categories[category])) {
        next(new ErrorHandler("category of mcq's INVALID", 400));
        return;
    }

    try {
        const { selectedQuestions } = await randomQuestions(category, mcqCount);
        console.log(selectedQuestions);
        res.status(200).json(selectedQuestions);
    }
    catch (err) {
        console.log(err);
        next(new ErrorHandler("Questions not selected from Question Bank", 501));
    }
}

export const getQuestionsWithTimer = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { category } = req.body as { category: keyof typeof Categories };
    const { sessionId } = req;
    const MCQCOUNT = 30;

    // check if the user has a session id;
    if (!sessionId) {
        return next(new ErrorHandler('sessionId not found', 501));
    }

    if (!Boolean(category) || !Boolean(Categories[category])) {
        next(new ErrorHandler("category of mcq's INVALID", 400));
        return;
    }

    try {
        // get indices used from cache (redis db) associated with user session id;
        const indicesUsed = await getUsedIndices(sessionId, category);
        // get the new batch of questions
        const { selectedQuestions, usedIndices } = await randomQuestions(category, MCQCOUNT, indicesUsed);

        // save the usedIndices to redis db
        await saveUsedIndices(usedIndices, sessionId, category);

        console.log(selectedQuestions);
        res.status(200).json(selectedQuestions);
    }
    catch (err) {
        console.log(err);
        next(new ErrorHandler("Questions not selected from Question Bank", 501));
    }
}
