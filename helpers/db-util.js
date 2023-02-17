import {MongoClient} from "mongodb";

export async function connectToDB () {
    const client = await MongoClient.connect(process.env.URL)
    return client;
}
export async function insertDocument(client, collection ,doc)
{
    const db = client.db()
    await db.collection(collection).insertOne(doc);
}

export async function getAllDocuments(client, collection, sort)
{
    const db = client.db()
    const documents = await db.collection(collection).find().sort(sort).toArray();
    return documents;
}