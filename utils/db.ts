#!/usr/bin/env node
/**
 * @file db.ts
 * @description Database connection
*/

import knex, {Knex} from 'knex';
import 'dotenv/config';

class DBClient {
  public conn: Knex;

  constructor () {
    this.conn = knex({
      client: 'mysql',
      connection: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
      }
    });
  }

  async hasTable(tableName: string): Promise<boolean> {
    return this.conn.schema.hasTable(tableName);
  }
  
  async getUserByEmail(email: string): Promise<any> {
    return this.conn('users').where('email', email).first();
  }

  async closeConnection(): Promise<void> {
    return this.conn.destroy();
  }
  
}
const dbClient = new DBClient();

export default dbClient;