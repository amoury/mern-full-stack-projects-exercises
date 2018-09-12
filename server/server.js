import express from 'express';
import devBundle from './devBundle'
import path from 'path'
import template from './../template'
import { MongoClient } from 'mongodb'

const app = express()

devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist'))) 

app.get('/', (req, res) => {
  res.status(200).send(template())
});

let port = process.env.PORT || 3000;

const mongoUrl = process.env.MONGODB_URI || `mongodb://localhost:27017/mernSimpleSetup`;
MongoClient.connect(mongoUrl, (err, db) => {
  console.log("connected to mongodb server");
  db.close();
})

app.listen(port, err => {
  if(err) console.log(err)
  console.info(`Server started on port ${port}`)
});