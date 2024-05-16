export enum Categories{ 
    ALL = "questionBank.json",
    ANIME = "animeQuestions.json",
    BASKETBALL = "basketballQuestions.json",
    FOOTBALL = "footballQuestions.json",
    HISTORY = "historyQuestions.json",
    POLITICS = "politicsQuestions.json",
    SPORTS = "sportsQuestions.json",
};

export const getQuestionFileLoc = (category: Categories) => {
    return new URL(`../../files/${category}`, import.meta.url);
}
