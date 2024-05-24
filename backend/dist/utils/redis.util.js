export const getSelectedQuestionsKey = (sessionId, category) => {
    // STRING: session:id:category:selectedQuestions => json strigified questions array
    return `session:${sessionId}:category:${category}:selectedQuestions`;
};
export const getUsedIndicesKey = (sessionId, category) => {
    // SET:  session:id:category:cat:usedIndices => set of indices
    return `session:${sessionId}:category:${category}:usedIndices`;
};
