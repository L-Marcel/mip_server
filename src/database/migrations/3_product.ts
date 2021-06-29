import Knex from 'knex';

export async function up(knex: Knex) {
 return await knex.schema.createTable('products', function (table) {
  table.integer('job').references('id').inTable('jobs');
  table.enum('type', ["service", "item"]);
  table.increments('id');
  table.string('name').notNullable();
  table.string('description');
  table.integer('unit').defaultTo(1);
  table.double('price').defaultTo(0);
  table.boolean('delivery').defaultTo(false);
 });
};

export async function down(knex: Knex) {
 return await knex.schema.dropTable('products');
};
