import redisClient from "../services/redis.service.js";
import applyTTL from "./applyTTL.js";
import { getUsedIndicesKey } from "./redis.util.js";
const addToUsedIndicesSet = async (indicesUsed, sessionId, category) => {
    try {
        await redisClient.sAdd(getUsedIndicesKey(sessionId, category), indicesUsed);
        await applyTTL(getUsedIndicesKey(sessionId, category));
        console.log(`updated usedIndices for sessionId:${sessionId}`);
    }
    catch (err) {
        console.log('Error at "saveUsedIndices"');
        throw err;
    }
};
export default addToUsedIndicesSet;
