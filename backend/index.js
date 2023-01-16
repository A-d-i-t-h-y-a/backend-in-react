const connectToMongo = require("./db");
const express = require('express');
const app = express();
const port = 3000;

connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello World from backend')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
