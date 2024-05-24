import redisClient from "../services/redis.service.js";
import { getUsedIndicesKey } from "./redis.util.js";
const getUsedIndices = async (sessionId, category) => {
    try {
        const res = await redisClient.sMembers(getUsedIndicesKey(sessionId, category));
        if (!res) {
            return [];
        }
        return res;
    }
    catch (err) {
        console.log('Error at "getUsedIndices"');
        throw err;
    }
};
export default getUsedIndices;
