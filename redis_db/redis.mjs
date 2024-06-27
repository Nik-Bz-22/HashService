import CreateClient from 'ioredis';


class RedisClient {
    #arrayName;
    #client;
    constructor(arrayName="hash") {
        this.#client = new CreateClient({
            host: 'localhost',
            port: 6379})
        this.#arrayName = arrayName;
    }

    async popHash(count=1){
        return this.#client.spop(this.#arrayName, count);
    }

    async get_all_hash(){
        return this.#client.smembers(this.#arrayName);


    }

    async setHash(hashList=[]){
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
            console.log("(Redis)Disconnected success");
            return true;
        }
        catch (err){ console.log(err); return false;}
    }

    async get_len_hash_list(){
        return this.#client.scard(this.#arrayName);
    }

}


export default RedisClient;

