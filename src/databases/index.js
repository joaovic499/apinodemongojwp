const mongoose = require('mongoose');

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.j41wwnm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    console.log('Conectou ao Banco')
}).catch((err) => console.log(err))

mongoose.Promise = global.Promise;

module.exports = mongoose;