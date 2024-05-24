export var Categories;
(function (Categories) {
    Categories["ALL"] = "questionBank.json";
    Categories["ANIME"] = "animeQuestions.json";
    Categories["BASKETBALL"] = "basketballQuestions.json";
    Categories["FOOTBALL"] = "footballQuestions.json";
    Categories["HISTORY"] = "historyQuestions.json";
    Categories["POLITICS"] = "politicsQuestions.json";
    Categories["SPORTS"] = "sportsQuestions.json";
})(Categories || (Categories = {}));
;
export const getQuestionFileLoc = (category) => {
    return new URL(`../../files/${category}`, import.meta.url);
};
