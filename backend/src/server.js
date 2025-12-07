import express from 'express';
import {ENV} from './lib/env.js';



const app = express();
const PORT = ENV.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});