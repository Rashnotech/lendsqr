#!/usr/bin/env node
/**
 * @file Transaction.ts
 * @description Model for transaction
 * @access public
 */

import dbClient from "../utils/db";

const Transaction = async () => {
    return dbClient.hasTable('transaction')
    .then((exists) => {
        if (!exists) {
            return dbClient.conn.schema.createTable('transaction', (table) => {
                table.increments('id').primary();
                table.integer('amount').notNullable();
                table.string('description').notNullable();
                table.integer('user_id')
                    .references('id')
                    .onDelete('CASCADE')
                    .inTable('users');
                table.integer('accountId')
                    .references('id')
                    .onDelete('CASCADE')
                    .inTable('account_details');
                table.timestamps();
            })
        }
    })
    .catch((error) => {
        console.error('Error creating table:', error);
    })
    .finally(() => {
        dbClient.closeConnection();
    });
}

Transaction()
  .then(() => console.log('Table transaction created.'))
  .catch((error) => console.error('Error creating table:', error));