import express from 'express'
import cors from 'cors';
import { json } from 'express';
import ai from './src/routes/ai.mjs';
import process from 'node:process';

const app = express();
const port =process.env.PORT || 4000;

app.use(cors())
app.use(json());
app.use(ai);

app.listen(port,()=>{
  console.log('====================================');
  console.log(`server on port ${port}`);
  console.log('====================================');
})