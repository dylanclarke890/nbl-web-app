import { connect } from 'mongoose';

require('dotenv').config();

const connectionString = process.env.connectionString;

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     connect(connectionString!)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error(`Database connection error: ${err}`)
       })
  }
}

export default new Database()