import generateSessionId from "../utils/generateSessionId.js";
/*
    * session:id {
    *   usedIndices: set<number>
    * }
    */
async function sessionMiddleware(req, res, next) {
    const sessionId = req.cookies.quiz_app_sessionId;
    if (!sessionId) {
        const newSessionId = generateSessionId();
        /* try {
            await redisClient.SADD('sessions', `id:${newSessionId}`);
        }
        catch(err) {
            next(err);
        } */
        res.cookie('quiz_app_sessionId', newSessionId, { maxAge: 1000 * 60 * 60 * 1 });
        req.sessionId = newSessionId;
    }
    else {
        req.sessionId = sessionId;
    }
    next();
}
export default sessionMiddleware;
