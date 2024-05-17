import { NextFunction, Response } from 'express'
import saveSelectedQuestions from '../utils/saveSelectedQuestions.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import { CheckedQuestion, CustomRequest, MarkedQuestion } from '../types/types.js'
import getSelectedQuestions from '../utils/getSelectedQuestions.js'
import randomQuestions from '../utils/randomQuestions.js'
import { Categories } from '../utils/categories.js'
import getUsedIndicesSet from '../utils/getUsedIndices.js'
import addToUsedIndicesSet from '../utils/addUsedIndicesToSet.js'
import clearUsedIndicesSet from '../utils/clearUsedIndices.js'
import deleteSelectedQuestions from '../utils/deleteSelectedQuestions.js'
import clearSelectedQuestions from '../utils/clearSelectedQuestions.js'

export const getQuestions = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { category, mcqCount } = req.body as { mcqCount: number, category: keyof typeof Categories }
    const { sessionId } = req;

    if (!Boolean(category) || !Boolean(Categories[category])) {
        next(new ErrorHandler("category of mcq's INVALID", 400));
        return;
    }

    if (!sessionId) {
        return next(new ErrorHandler('sessionId not found', 501));
    }

    try {
        const { selectedQuestions } = await randomQuestions(category, mcqCount);
        //console.log(JSON.stringify(selectedQuestions));

        try {
            await saveSelectedQuestions({ selectedQuestions, sessionId, category });
        }
        catch (err) {
            console.log(err);
            next(new ErrorHandler("Questions not saved", 501));
        }

        const questionWithoutAnswers = selectedQuestions.map((question) => {
            const { answer, ...rest } = question;
            return rest;
        })
        res.status(200).json(questionWithoutAnswers);
    }
    catch (err) {
        console.log(err);
        next(new ErrorHandler("Questions not selected from Question Bank", 501));
    }
}

export const getQuestionsWithTimer = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { category, initialRequest } = req.body as { category: keyof typeof Categories, initialRequest: boolean };
    const { sessionId } = req;
    const MCQCOUNT = 10;

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
        let indicesUsed: string[] = [];
        if (initialRequest) {
            clearUsedIndicesSet(sessionId, category);
            clearSelectedQuestions(sessionId, category);
        }
        else {
            indicesUsed = await getUsedIndicesSet(sessionId, category);
        }
        // get the new batch of questions
        const { selectedQuestions, usedIndices } = await randomQuestions(category, MCQCOUNT, indicesUsed);

        // save the usedIndices to redis db
        await addToUsedIndicesSet(usedIndices, sessionId, category);
        // update the questions selected of the particular session
        await saveSelectedQuestions({ sessionId, selectedQuestions, category, options: { append: true } });

        //console.log(selectedQuestions);
        res.status(200).json(selectedQuestions);
    }
    catch (err) {
        console.log(err);
        next(new ErrorHandler("Questions not selected from Question Bank", 501));
    }
}

export const checkAnswers = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { category, markedQuestions } = req.body as { markedQuestions: MarkedQuestion[], category: keyof typeof Categories };
    const { sessionId } = req;

    if (!Boolean(category) || !Boolean(Categories[category])) {
        next(new ErrorHandler("category of mcq's INVALID", 400));
        return;
    }

    if (!markedQuestions) {
        return next(new ErrorHandler('client marked questions not found', 401));
    }
    if (!sessionId) {
        return next(new ErrorHandler('sessionId not found', 501));
    }

    try {
        const selectedQuestions = await getSelectedQuestions(sessionId, category);
        //console.log(selectedQuestions);
        try {
            const checkedQuestions: CheckedQuestion[] = markedQuestions.map((element) => {
                const selQuestion = selectedQuestions.find((mcq) => mcq.question === element.question);
                if (!selQuestion) {
                    throw new ErrorHandler("Questions didn't matched", 401);
                }
                return {
                    ...element,
                    correctAnswer: {
                        option: selQuestion.answer,
                        text: selQuestion[selQuestion.answer]
                    },
                }
            });

            try {
                deleteSelectedQuestions(sessionId, category);
            }
            catch (err) {
                console.log(err);
            }

            res.status(200).json(checkedQuestions);
            return;
        }
        catch (err) {
            return next(err);
        }
    }
    catch (err) {
        console.log(err)
        next(new ErrorHandler("try again", 501));
    }
}
