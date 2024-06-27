import fastify from 'fastify';
import formbody from '@fastify/formbody';
import dotenv from 'dotenv';

import DB from "./postgres_db/postgresql.mjs"
import redis from "./redis_db/redis.mjs"
import utils from "./implemented_algs/extractingFromStorages/index.mjs"

// dotenv.config();

/////////////////////////////////////////////////////

let info = {
    postgres: {
        maxState: 3,
        currentState: 0,

    }
}

/////////////////////////////////////////////////////


const server = fastify();
server.register(formbody);



server.get('/', async (request, reply) => {
    return { message: 'Ok' };
});

// request format {"tocken": 2345678}
server.post('/getFreeHash', async (request, reply) => {
    console.log(222)
    const secTocken = request.body;
    console.log(secTocken)


    const redisClient = new redis()
    const db = new DB();

    // if all you need hash is in redis
    // console.log("hash count in Redis:", await redisClient.get_len_hash_list())
    if (1 <= await redisClient.get_len_hash_list()){
        console.log("redis");
        return await utils.getFromRedis(redisClient);
    }
    else {
        const response = await utils.getFromDB(info.postgres, db);
        await utils.fillRedis(100, redisClient, db)
        console.log("postgres");
        return JSON.stringify(response);
    }
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
