import HashTable from "./DBconection.js";

class DB {
    #model;

    constructor() {
        this.#model = HashTable.model;

        this.#model.sequelize.authenticate().then(() => console.log('Connected to the database.'))
            .catch((err) => console.error('Unable to connect to the database:', err)
            );
    }

    async getAllTables() {
        try {
            const tables = await this.#model.sequelize.query(
                "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'"
            );
            return tables[0];
        } catch (error) {
            console.error('Error fetching tables:', error);
            throw error;
        }
    }

    async get_unused_N_hash(numOfHash = 1) {
        try {

            const hash = (await this.#model.findAll({
                where: {used: false},
                limit: numOfHash

            })).map(d => d.dataValues.hash);


            return hash;
        } catch (err) {
            console.error('Error fetching hashes:', err);
            throw err;
        }
    }


    async insertToTable(objsToInsert=[]){
        const objectList = objsToInsert.map(hash => ({ hash }));
        try {
            const createdHashes = await this.#model.bulkCreate(objectList);
            // console.log('Created hashes:', createdHashes.map(hash => hash.toJSON()));

        } catch (error) {
            console.error('Error creating hashes:', error);
        }

    }

    async getFullTable(){
        try{
            return (await this.#model.findAll()).map(d => d.dataValues);
        }
        catch (err){
            console.log(err);
            throw err;
        }
    }

    async closeDB(){
        try {
            this.#model.sequelize.close();
            return true;
        }
        catch (err){console.log("closee", err); return false;}
    }
}

export default DB;