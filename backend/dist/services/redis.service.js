import redis from 'redis';
import { config } from 'dotenv';
config();
const redisClient = redis.createClient({
    url: process.env.REDIS_URI,
});
redisClient.on('error', (err) => console.log('Redis Client Error: ', err));
let retry = 10;
export const disconnectWithRedis = () => {
    redisClient.quit()
        .then(() => console.log("disconnected from redis"))
        .catch(err => {
        console.log("error disconnecting with redis", err);
    });
};
const establishRedisConnection = () => {
    retry--;
    redisClient.connect()
        .then(() => {
        console.log("connected to redis");
    })
        .catch(err => {
        console.log("Redis connection unsuccessfull");
        if (retry) {
            console.log("Trying to Reconnect to redis server");
            console.log("retries remaining: ", retry);
            establishRedisConnection();
            return;
        }
        console.log("failed to connect to redis");
        console.log(err);
    });
};
establishRedisConnection();
export default redisClient;
