import redisClient from "../services/redis.service.js";
export default async function getTTL(redisKey) {
    try {
        const ttl = await redisClient.ttl(redisKey);
        if (ttl <= 0)
            return 3600;
        return ttl;
    }
    catch (err) {
        console.log(`error getting TTL of key:${redisKey}`);
        throw err;
    }
}
