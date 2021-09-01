import { enumToStringArray, ProductType } from '../../enums';

export async function up(knex: any) {
 return await knex.schema.createTable('products', function (table: any) {
  table.integer('job').references('id').inTable('jobs');
  table.enum('type', enumToStringArray(ProductType));
  table.increments('id');
  table.string('name').notNullable();
  table.string('description');
  table.integer('unit').defaultTo(1);
  table.double('price').defaultTo(0);
  table.boolean('delivery').defaultTo(false);
 });
};

export async function down(knex: any) {
 return await knex.schema.dropTable('products');
};
