import mongoose from 'mongoose';

import { mongoDbURI, ENV } from '../config';

const connection = {};
async function connect() {
  if (connection.isConnected) {
    console.log('Database connected');
    return;
  }

  if (mongoose.connection.length > 0) {
    connection.isConnected = mongoose.connection[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Used previous connection');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(mongoDbURI);
  console.log('New connection');
  //   console.log(db.connection);
  //   console.log(db.connection.readyState);
  connection.isConnected = db.connection.readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('Not disconnected');
    }
  }
}

export { connect, disconnect };
