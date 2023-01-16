const connectToMongo = require("./db");
const express = require('express');
const app = express();
const port = 3000;

connectToMongo();

app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World from backend')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
