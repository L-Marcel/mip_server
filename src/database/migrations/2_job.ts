import { enumToStringArray, MarkerIcon } from '../../enums';

export async function up(knex: any) {
 return await knex.schema.createTable('jobs', function (table: any) {
  table.increments('id');
  table.integer('user').references('id').inTable('users');
  table.string('name').notNullable();
  table.string('CNPJ');
  table.string('description');
  table.double('lat').notNullable();
  table.double('lng').notNullable();
  table.enum('icon', enumToStringArray(MarkerIcon));
 });
};

export async function down(knex: any) {
 return await knex.schema.dropTable('jobs');
};
