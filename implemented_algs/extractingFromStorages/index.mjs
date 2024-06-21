import DB from "../../postgres_db/postgresql.mjs";
import hashGen from "../../hashGen.js";
import splitArray from "../splitArray/index.mjs"


async function getFromDB(needHashCount) {
    const db = new DB();

    const response = await db.get_unused_N_hash(needHashCount);


    const newHash = await hashGen.generateHashes(needHashCount);
    const [firstHalf, secondHalf] = splitArray(newHash);

    await db.insertToTable(firstHalf)
    return  {response, secondHalf};
}


async function getFromRedis(redisClient, needHashCount) {
    const responseString = JSON.stringify(await redisClient.get_N_hash(needHashCount));
    await redisClient.disconnectRedis();
    return responseString
}

export default {
    getFromDB,
    getFromRedis
}