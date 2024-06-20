import fastify from 'fastify';
import { kv } from "@vercel/kv";
import dotenv from 'dotenv';
import hashGen from "./hashGen.js"
// import DB from "./postgres_db/postgresql.mjs"
// import sequelize from "./postgres_db/DBconection.js";

dotenv.config();

const server = fastify();

server.get('/', async (request, reply) => {
    return { message: 'Ok' };
});

// request format {"tocken": 2345678, "count": 3}
server.post('/getFreeHash', async (request, reply) => {

    const db = new DB(sequelize.sequelize);
    const response = await db.get_unused_N_hash(request.body["count"]);

    const content = [];
    response[0].forEach(async (it) => {content.push(it["hash"]);});

    // console.log(content);
    // console.log(request.body["tocken"]);
    return JSON.stringify(content);

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
