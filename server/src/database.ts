import { connect } from 'mongoose';

require('dotenv').config();

const server = process.env.server;
const database = process.env.database;

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error(`Database connection error: ${err}`)
       })
  }
}

export default new Database()