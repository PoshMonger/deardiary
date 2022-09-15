

import pg from 'pg';
const {Pool} = pg;

let localPoolConfig ={

  user:'postgres',
  password:'wahoff123',
  host:'localhost',
  port:'5432',
  database:'joesrecordcollection'
} 
const pool = new Pool(localPoolConfig)
export default pool