import Knex from 'knex';

export async function up(knex: Knex) {
 return await knex.schema.createTable('users', function (table) {
  table.increments('id');
  table.string('name').notNullable();
  table.string('email').notNullable();
  table.string('password').notNullable();
  table.string('phone').notNullable();
 });
};

export async function down(knex: Knex) {
 return await knex.schema.dropTable('users');
};
