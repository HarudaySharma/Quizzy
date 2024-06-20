export var Categories;
(function (Categories) {
    Categories["ALL"] = "questionBank.json";
    Categories["ANIME"] = "animeQuestions.json";
    Categories["BASKETBALL"] = "basketballQuestions.json";
    Categories["FOOTBALL"] = "footballQuestions.json";
    Categories["HISTORY"] = "historyQuestions.json";
    Categories["POLITICS"] = "politicsQuestions.json";
    Categories["SPORTS"] = "sportsQuestions.json";
    Categories["FLAGS"] = "flags.json";
    Categories["CAPITALS_ASIAN"] = "capitals/asian_countries_captial.json";
    Categories["CAPITALS_EURPOEAN"] = "capitals/european_countries_capital.json";
    Categories["CAPITALS_AUSTRALIAN_OCEANIA"] = "capitals/australian_oceania_countries_capital.json";
    Categories["CAPITALS_AMERICAN"] = "capitals/american_countries_capital.json";
    Categories["CAPITALS_AFRICAN"] = "capitals/african_countries_capital.json";
    Categories["CAPITALS_ALL"] = "capitals/all_countries_capital.json";
})(Categories || (Categories = {}));
;
export const getQuestionFileLoc = (category) => {
    return new URL(`../../static/${category}`, import.meta.url);
};
