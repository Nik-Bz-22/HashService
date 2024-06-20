// import { createClient } from 'redis';
import createClient from 'ioredis';


class RedisClient {
    #arrayName;
    #client;
    constructor(arrayName="hash") {
        // this.#client = createClient();
        // this.#arrayName = arrayName;
        // this.#client.connect();
        // this.#client.on('error', err => console.log('Redis Client Error', err));
        this.#client = new createClient({
            host: 'localhost',
            port: 6379})
        this.#arrayName = arrayName;
        this.#client.set("key", 222222);
    }

    // async getAllData(){
    //     return this.#client.lRange(this.#arrayName, 0, -1);
    // }

    async get_N_hash(numHash=1){
        console.log(numHash)
        return this.#client.srandmember(this.#arrayName, numHash);
    }

    async get_all_hash(){
        return this.#client.smembers(this.#arrayName);


    }

    async set_hash(hashList=[]){
        try{
            this.#client.sadd(this.#arrayName, hashList)
        }
        catch (err){ console.log(err) }
    }

    async delete_list_hash(hashList=[]){
        try {
            this.#client.srem(this.#arrayName, hashList);
        }
        catch (err){ console.log(err) }
    }

    async delete_all_db_data(){
        this.#client.flushall();
    }

    async delete_all_hash(){
        this.#client.del(this.#arrayName);
    }

    async disconnectRedis(){
        try {
            this.#client.disconnect();
            console.log("Disconnected success");
            return true;
        }
        catch (err){ console.log(err); return false;}
    }

}

const redis = new RedisClient();
await redis.set_hash(["j4rh4hek", "kdy6bs9n", "ffk5gsa3"])
console.log(await redis.get_all_hash())

await redis.delete_all_hash()
console.log(await redis.get_all_hash())
// console.log(await redis.get_N_hash(2))
//
//
await redis.disconnectRedis()
