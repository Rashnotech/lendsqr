#!/usr/bin/env node
/**
 * @file Account.ts
 * @description Account model
*/
import dbClient from '../utils/db';


const Account = async () => {
    return dbClient.hasTable('account')
    .then((exists) => {
        if (!exists) {
            return dbClient.conn.schema.createTable('account', (table) => {
                table.integer('id').primary();
                table.float('balance').notNullable().defaultTo(0);
                table.integer('user_id')
                    .references('id')
                    .onDelete('CASCADE')
                    .inTable('user');
            })
            .then(() => {
                console.log('Table account created.');
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

const AccountDetailsTable = async () => {
    return dbClient.hasTable('account_details')
    .then((exists) => {
        if (!exists) {
            return dbClient.conn.schema.createTable('account_details', (table) => {
                table.integer('id').primary();
                table.integer('account_number').unique().notNullable();
                table.string('account_name').notNullable();
                table.string('bank_name').notNullable();
                table.integer('bvn').notNullable();
                table.integer('user_id')
                    .references('id')
                    .onDelete('CASCADE')
                    .inTable('users');
            })
            .then(() => {
                console.log('Table account_details created.');
            });
        } else {
            console.log('Table account_details already exists');
        }
    })
    .catch((error) => {
        console.error('Error creating table:', error);
    })
    .finally(() => {
        dbClient.closeConnection();
    });
}

Account()
    .then(() => console.log('Table account created.'))
    .catch((error) => console.error('Error creating table:', error));

AccountDetailsTable()
  .then(() => console.log('Table account_details created.'))
  .catch((error) => console.error('Error creating table:', error));
