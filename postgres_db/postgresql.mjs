import sequelize from "./DBconection.js";
// import dotenv from 'dotenv';
// dotenv.config();

class DB {
    #seq;

    constructor(sequelize) {
        this.#seq = sequelize;

        this.#seq.authenticate().then(() => console.log('Connected to the database.'))
            .catch((err) => console.error('Unable to connect to the database:', err)
            );
    }

    async getListTables(){
        try{
        const res = await this.#seq.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'");
        return res[0];
        }
        catch (err){
            console.log(err);
        }
    }

    async createTable(){
        try {
            const res = await this.#seq.query("CREATE TABLE IF NOT EXISTS hash_list (hash VARCHAR(8) NOT NULL UNIQUE, used BOOLEAN DEFAULT FALSE NOT NULL);");
            return res;
        }
        catch (err){
            console.log(err);
        }
    }

    async get_unused_N_hash(numOfHash=1){
        const rows = await this.#seq.query(`SELECT * FROM hash_list WHERE used=FALSE LIMIT ${numOfHash};`);
        // console.log(await rows)
        return rows;
    }


    async insertToTable(data){
        let valuesToInsert = Array();
        valuesToInsert = data;
        const temp = [];
        valuesToInsert.forEach((item)=>{
            const queryStr = `('${item["hash"]}', '${item["status"]}')`;
            temp.push(queryStr);
        })

        const rows = await this.#seq.query(`INSERT INTO hash_list (hash, used) VALUES ${temp} ON CONFLICT (hash) DO NOTHING;`);
        return rows;

    }


    async getFullTable(){
        try{
            const res = await this.#seq.query("SELECT * FROM hash_list;")
            return res[0];
        }
        catch (err){
            console.log(err);
        }
    }

    async closeDB(){
        try {
            this.#seq.close();
            return true;
        }
        catch (err){console.log(err); return false;}
    }


}


export default DB;