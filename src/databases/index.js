const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME; //
const collectionName = process.env.COLLECTION_NAME;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.j41wwnm.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('Conectado ao banco de dados');
        const db = mongoose.connection;
        const collection = db.collection(collectionName);
    })
    .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

mongoose.Promise = global.Promise;

module.exports = mongoose;
