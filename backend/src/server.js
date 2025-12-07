import express from 'express';
import {ENV} from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';

const __dirname=path.resolve();

const app = express();
const PORT = ENV.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});




if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend','dist','index.html'));
    }
  );
}


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log("Server is running on port:", PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();