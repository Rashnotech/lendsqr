#!/usr/bin/env node
/**
 * @file models/User.ts
 * @description User model
*/
import dbClient from "../utils/db";

async function createUsersTable(): Promise<any> {
    try {
        const exists = await dbClient.hasTable('users');
        if (!exists) {
            await dbClient.conn.schema.createTable('users', (table) => {
                table.increments('id').primary();
                table.string('first_name').notNullable();
                table.string('last_name').notNullable();
                table.string('email').unique().notNullable();
                table.string('password').notNullable();
                table.string('business_name');
                table.string('mobile').unique();
                table.timestamps();
            });
        } else {
            console.log('Table users already exists');
        }
    } catch (error) {
        console.error('Error creating table:', error);    
    } finally {
        await dbClient.closeConnection();
    }
}

createUsersTable();