import redisClient from "../services/redis.service.js";

export default async function applyTTL(key: string, ttl?: number) {
    try {
        if(ttl) {
            await redisClient.expire(key, ttl);
        }
        else {
            await redisClient.expire(key, 3600, 'NX');
        }
    }
    catch (err) {
        console.log(`error setting TTL of key: ${key}`);
        throw err;
    }
}
