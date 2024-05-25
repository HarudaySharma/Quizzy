import generateSessionId from "../utils/generateSessionId.js";
const options = {
    maxAge: 1000 * 60 * 60 * 1, // calculated in ms (2hrs)
    secure: true,
    sameSite: 'none'
};
async function sessionMiddleware(req, res, next) {
    const sessionId = req.cookies.quiz_app_sessionId;
    if (!sessionId) {
        const newSessionId = generateSessionId();
        res.cookie('quiz_app_sessionId', newSessionId, options);
        req.sessionId = newSessionId;
    }
    else {
        req.sessionId = sessionId;
    }
    next();
}
export default sessionMiddleware;
