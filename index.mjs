import fastify from 'fastify';
import dotenv from 'dotenv';
import hashGen from "./hashGen.js"
import DB from "./postgres_db/postgresql.mjs"
import redis from "./redis_db/redis.mjs"

import utils from "./implemented_algs/extractingFromStorages/index.mjs"

dotenv.config();

/////////////////////////////////////////////////////



/////////////////////////////////////////////////////


const server = fastify();

server.get('/', async (request, reply) => {
    return { message: 'Ok' };
});

// request format {"tocken": 2345678, "count": 3}
server.post('/getFreeHash', async (request, reply) => {
    const needHashCount = request.body["count"];
    const secTocken = request.body["tocken"];

    const redisClient = new redis()

    // if all you need hash is in redis
    console.log(await redisClient.get_len_hash_list())
    if (needHashCount <= await redisClient.get_len_hash_list()){
        return utils.getFromRedis(redisClient, needHashCount);
    }


    // if isn`t in redis => get from db
    const response = await utils.getFromDB(needHashCount);
    const resp = response.response;
    const newHash = response.secondHalf;
    await redisClient.set_hash(newHash);
    // await db.closeDB()

    return JSON.stringify(resp);
})


const start = async () => {
    try {
        await server.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server is running at http://localhost:3000');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
