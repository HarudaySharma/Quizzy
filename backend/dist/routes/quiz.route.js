import { Router } from "express";
import { getQuestions, getQuestionsWithTimer } from "../controllers/quiz.controller.js";
import sessionMiddleware from "../middlewares/session.middleware.js";
const router = Router();
router.post('/questions', getQuestions);
router.post('/questions/timer', sessionMiddleware, getQuestionsWithTimer);
export default router;
