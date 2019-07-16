// lib/app.ts
import express = require('express');
import userRouter from './routers/user';
import bodyParser from 'body-parser';

// Create a new express application instance
const app: express.Application = express();

app.use(bodyParser.json());
app.use('/user', userRouter);
app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
