#!/usr/bin/env node
/**
 * @file server.ts
 * @description Entry point for server
 * @access public
 * @requires express
 */
import express from 'express';
import router from './routes';
import session from 'express-session';
import 'dotenv/config';



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET_KEY || 'secret-key',
  resave: true,
  saveUninitialized: true
}));
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
