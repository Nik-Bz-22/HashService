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

    async getUnusedHash(numOfHash = 1) {
        try {
            const hash = (await this.#model.findOne({
                where: {used: false},
            })).dataValues.hash;

            await this.updateOneHash(hash);

            return hash;
        } catch (err) {
            console.error('Error fetching hash:', err);
            throw err;
        }
    }


    async insertToTable(listToInsert=[], used=false){
        const objectList = listToInsert.map(hash => ({ hash, used}));
        try {
            await this.#model.bulkCreate(objectList);
            return true;

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

    async getCountUnusedHash(){
        const count = await this.#model.count({
            where: {
                used: false
            }
        });
    }

    async updateOneHash(hs='') {
        try {
            await this.#model.sequelize.authenticate();
            console.log('Connection has been established successfully.');

            const result = await this.#model.update({ used: true }, {
                where: { hash: hs }
            });

            console.log(`Updated rows: ${result}`);
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default DB;