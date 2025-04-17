import express from 'express'
import cors from 'cors';
import { json } from 'express';
import ai from './src/routes/airoute.mjs';
import updoc from './src/routes/upDocroute.mjs';
import process from 'node:process';
import adminRoute from './src/routes/adminRoute.mjs'
const app = express();
const port =process.env.PORT || 4000;

app.use(cors());
app.use(json());

app.use(ai);
app.use(updoc);
app.use(adminRoute);

app.listen(port,()=>{
  console.log('====================================');
  console.log(`server on port ${port}`);
  console.log('====================================');
})