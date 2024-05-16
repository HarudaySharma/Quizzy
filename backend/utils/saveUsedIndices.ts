import redisClient from "../services/redis.service.js";
import { Categories } from "./categories.js";
import { getUsedIndicesKey } from "./redis.util.js";

const saveUsedIndices = async (indicesUsed: number[], sessionId: string, category: keyof typeof Categories) => {
    try {
        await redisClient.set(getUsedIndicesKey(sessionId, category), JSON.stringify(indicesUsed));
    }
    catch (err) {
        console.log('Error at "saveUsedIndices"');
        throw err;
    }
}

export default saveUsedIndices;
