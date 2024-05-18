import redisClient from "../services/redis.service.js";
import { Categories } from "./categories.js";
import { getUsedIndicesKey } from "./redis.util.js";

const clearUsedIndicesSet = async (sessionId: string, category: keyof typeof Categories): Promise<void> => {
    try {
        await redisClient.del(getUsedIndicesKey(sessionId, category));
        return;
    }
    catch (err) {
        console.log('Error at "clearUsedIndicesSet"');
        throw err;
    }
}

export default clearUsedIndicesSet;

