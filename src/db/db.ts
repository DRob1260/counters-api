import { env } from "../env";
import { Client, QueryResult } from "pg";
import fs from "fs";
import { resolve } from "path";

const { DB_URL, DB_USER, DB_PASSWORD, DB_PORT } = env();

let client;

const getDB = async () => {
    if(!client) {
        client = new Client({
            database: "postgres",
            host: DB_URL,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT
        });
        await client.connect();
    }
    return client;
}

const getQuery = (queryFilename: string) => {
    return fs.readFileSync(resolve(__dirname, `sql/${queryFilename}`)).toString()
    .replace(/(\r\n|\n|\r)/gm," ") // remove newlines
    .replace(/\s+/g, ' '); // excess white space
}

export function executeQueryWithResults<ResultType>(queryFilename: string, params: any[]): Promise<QueryResult<ResultType>> {
    return getDB().then(db => {
        return db.query(getQuery(queryFilename), params);
    });
}
