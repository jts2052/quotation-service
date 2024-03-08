const mongodb = require('mongodb');

const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;

let collection = undefined;

async function connect() {
  const client = await mongodb.MongoClient.connect(DBHOST);
  const db = client.db(DBNAME);
  quotations_collection = db.collection('quotations');
  return quotations_collection;
}

async function selectQuotation() {
    if (!collection) {
        collection = await connect();
    }

    console.log(collection);
    const result = await collection.findOne({});
    return result;
}

module.exports = { selectQuotation };