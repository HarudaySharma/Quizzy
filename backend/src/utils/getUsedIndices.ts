import redisClient from "../services/redis.service.js";
import { Categories } from "./categories.js";
import { getUsedIndicesKey } from "./redis.util.js";

const getUsedIndices = async (sessionId: string, category: keyof typeof Categories): Promise<string[]> => {
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
}

export default getUsedIndices;
