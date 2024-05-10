import { Router } from "express";
import { checkAnswers, getQuestions } from "../controllers/test.controller.js"

const router = Router();

router.post('/questions', getQuestions);
router.post('/questions/check', checkAnswers);

export default router;
