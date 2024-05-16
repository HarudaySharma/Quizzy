import { Categories } from "./categories";

export const getSelectedQuestionsKey = (sessionId: string, category: keyof typeof Categories) => {
    return `session:${sessionId}:category:${category}:selectedQuestions`;
}

export const getUsedIndicesKey = (sessionId: string, category: keyof typeof Categories) => {
    return `session:${sessionId}:category:${category}:usedIndices`;
}

