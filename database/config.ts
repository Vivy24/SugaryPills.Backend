import { Pool } from 'pg';

require("dotenv").config();


const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const proConfig = process.env.DATABASE_URL

export const pool = new Pool({
    connectionString: proConfig,
    // process.env.NODE_ENV == "production" ? proConfig : devConfig,
    ssl: false
    // ssl: {
    //     rejectUnauthorized: process.env.NODE_ENV == "production" ? false : true,
    // },
})

exports.default = pool
