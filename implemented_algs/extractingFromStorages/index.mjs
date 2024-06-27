import hashGen from "../../hashGen.js";

async function getFromDB(inf, db) {
    if (inf.currentState > inf.maxState){
        const newHashs = hashGen.generateHashes(inf.currentState);
        await db.insertToTable(await newHashs)
        inf.currentState = 0;
    }
    const response = db.getUnusedHash();
    ++inf.currentState;
    return [await response];
}


async function getFromRedis(redisClient) {
    const responseString = JSON.stringify(await redisClient.popHash());
    await redisClient.disconnectRedis();

    return responseString
}

async function fillRedis(count=1, redisClient, db){
    const hashList = hashGen.generateHashes(count);
    await db.insertToTable(await hashList, true);
    await redisClient.setHash(await hashList);
}


export default {
    getFromDB,
    getFromRedis,
    fillRedis
}