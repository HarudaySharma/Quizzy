import redisClient from "../services/redis.service.js";
import applyTTL from "./applyTTL.js";
import { Categories } from "./categories.js";
import { getUsedIndicesKey } from "./redis.util.js";

const addToUsedIndicesSet = async (indicesUsed: string[], sessionId: string, category: keyof typeof Categories) => {
    try {
        if (Boolean(!indicesUsed.length))
            return;
        await redisClient.sAdd(getUsedIndicesKey(sessionId, category), indicesUsed);
        await applyTTL(getUsedIndicesKey(sessionId, category));
        console.log(`updated usedIndices for sessionId:${sessionId}`);
    }
    catch (err) {
        console.log('Error at "saveUsedIndices"');
        throw err;
    }
}

export default addToUsedIndicesSet;
