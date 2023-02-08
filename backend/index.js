const connectToMongo = require("./db");
const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const port = process.env.BACKEND_PORT;
// const port = 5000;

connectToMongo();

app.use(cors())
app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World from backend')
})

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port http://localhost:${port}`)
})

module.exports = app;