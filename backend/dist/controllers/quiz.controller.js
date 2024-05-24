import { ErrorHandler } from '../utils/errorHandler.js';
import randomQuestions from '../utils/randomQuestions.js';
import { Categories } from '../utils/categories.js';
import getUsedIndicesSet from '../utils/getUsedIndices.js';
import addToUsedIndicesSet from '../utils/addUsedIndicesToSet.js';
import clearUsedIndicesSet from '../utils/clearUsedIndices.js';
export const getQuestions = async (req, res, next) => {
    const { category, mcqCount } = req.body;
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
};
export const getQuestionsWithTimer = async (req, res, next) => {
    const { category, initialRequest } = req.body;
    const { sessionId } = req;
    console.log("endpoint quiz/questions/timer hit");
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
        let indicesUsed = [];
        if (initialRequest) {
            clearUsedIndicesSet(sessionId, category);
        }
        else {
            indicesUsed = await getUsedIndicesSet(sessionId, category);
        }
        // get the new batch of questions
        const { selectedQuestions, usedIndices } = await randomQuestions(category, MCQCOUNT, indicesUsed);
        // save the usedIndices to redis db
        await addToUsedIndicesSet(usedIndices, sessionId, category);
        //console.log(selectedQuestions);
        res.status(200).json(selectedQuestions);
    }
    catch (err) {
        console.log(err);
        next(new ErrorHandler("Questions not selected from Question Bank", 501));
    }
};
