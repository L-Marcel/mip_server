import Knex from 'knex';

export async function up(knex: Knex) {
 return await knex.schema.createTable('user_jobs', function (table) {
  table.integer('user').references('id').inTable('users');
  table.integer('job').references('id').inTable('jobs');
  table.primary(['user', 'job']);
 });
};

export async function down(knex: Knex) {
 return await knex.schema.dropTable('user_jobs');
};
