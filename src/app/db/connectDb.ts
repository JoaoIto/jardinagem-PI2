import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const MONGO_URI = process.env.MONGO_URI || ''; // Defina no .env
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'jardinagem'; // Nome do banco

if (!MONGO_URI) {
    throw new Error('Defina a variável de ambiente MONGO_URI');
}

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = new MongoClient(MONGO_URI);
    await client.connect();

    const db = client.db(MONGO_DB_NAME);
    cachedClient = client;
    cachedDb = db;

    return { client, db };
}
