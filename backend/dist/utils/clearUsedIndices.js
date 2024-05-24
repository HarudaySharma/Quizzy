import redisClient from "../services/redis.service.js";
import { getUsedIndicesKey } from "./redis.util.js";
const clearUsedIndicesSet = async (sessionId, category) => {
    try {
        await redisClient.del(getUsedIndicesKey(sessionId, category));
        return;
    }
    catch (err) {
        console.log('Error at "clearUsedIndicesSet"');
        throw err;
    }
};
export default clearUsedIndicesSet;
