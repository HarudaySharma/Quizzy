import { Router } from "express";
import { checkAnswers, getQuestions, getQuestionsWithTimer } from "../controllers/test.controller.js";
import sessionMiddleware from "../middlewares/session.middleware.js";
const router = Router();
router.post('/questions', sessionMiddleware, getQuestions);
router.post('/questions/timer', sessionMiddleware, getQuestionsWithTimer);
router.post('/questions/check', sessionMiddleware, checkAnswers);
export default router;
