import { Router } from "express";
import { checkAnswers, getQuestions } from "../controllers/questions.controller.js";
const router = Router();
router.post('/questions', getQuestions);
router.get('/questions/check', checkAnswers);
export default router;
