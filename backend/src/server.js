import express from 'express';
import {ENV} from './lib/env.js';
import path from 'path';

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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});