import { Router } from "express";
import { getQuestions } from "../controllers/quiz.controller.js"

const router = Router();

router.post('/questions', getQuestions);

export default router;

