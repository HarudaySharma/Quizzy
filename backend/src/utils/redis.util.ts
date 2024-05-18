import { Categories } from "./categories";

export const getSelectedQuestionsKey = (sessionId: string, category: keyof typeof Categories) => {
    // STRING: session:id:category:selectedQuestions => json strigified questions array
    return `session:${sessionId}:category:${category}:selectedQuestions`;
}

export const getUsedIndicesKey = (sessionId: string, category: keyof typeof Categories) => {
    // SET:  session:id:category:cat:usedIndices => set of indices
    return `session:${sessionId}:category:${category}:usedIndices`;
}

