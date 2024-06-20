export enum Categories {
    ALL = "questionBank.json",
    ANIME = "animeQuestions.json",
    BASKETBALL = "basketballQuestions.json",
    FOOTBALL = "footballQuestions.json",
    HISTORY = "historyQuestions.json",
    POLITICS = "politicsQuestions.json",
    SPORTS = "sportsQuestions.json",
    FLAGS = "flags.json",
    CAPITALS_ASIAN = "capitals/asian_countries_captial.json",
    CAPITALS_EURPOEAN = "capitals/european_countries_capital.json",
    CAPITALS_AUSTRALIAN_OCEANIA = "capitals/australian_oceania_countries_capital.json",
    CAPITALS_AMERICAN = "capitals/american_countries_capital.json",
    CAPITALS_AFRICAN = "capitals/african_countries_capital.json",
    CAPITALS_ALL = "capitals/all_countries_capital.json"

};

export const getQuestionFileLoc = (category: Categories) => {
    return new URL(`../../static/${category}`, import.meta.url);

}
