const fs = require('fs');
const {Pool} = require('pg');
const BEGIN = 'BEGIN';
const COMMIT = 'COMMIT';
const ROLLBACK = 'ROLLBACK';
class DBUtils {
    constructor() {
        this.pool = null;
    }
    async getPostgresConnection(){
        if(!this.pool){
            this.pool = new Pool({
                user: process.env.POSTGRES_USER || 'postgres',
                host: process.env.POSTGRES_HOST || 'localhost',
                database: process.env.POSTGRES_DB || 'testdb',
                password: process.env.POSTGRES_PASSWORD || 'postgres',
                port: process.env.POSTGRES_PORT || 5432,
                ssl:
                    process.env.POSTGRES_DISABLE_SSL === 'true'
                        ? false
                        : {
                            rejectUnauthorized: false,
                            ca: fs.readFileSync(process.env.POSTGRES_CA).toString(),
                        },
            });
        }
        return await this.pool.connect();
    }

    /**
     * @returns {Promise<Client>}
     */
    async createDBTransaction() {
        const client = await this.getPostgresConnection();
        await client.query(BEGIN);
        return client;
    }

    /**
     * @param client {Client}
     * @returns {Promise<void>}
     */
    async commitDBTransaction(client) {
        await client.query(COMMIT);
        client.release();
    }

    /**
     * @param client {Client}
     * @returns {Promise<void>}
     */
    async rollbackDBTransaction(client) {
        await client.query(ROLLBACK);
        client.release();
    }
}

module.exports = new DBUtils()