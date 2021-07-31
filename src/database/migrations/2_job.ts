import Knex from 'knex';
import { enumToStringArray, MarkerIcon } from '../../enums';

export async function up(knex: Knex) {
 return await knex.schema.createTable('jobs', function (table) {
  table.increments('id');
  table.string('name').notNullable();
  table.string('CNPJ');
  table.string('description');
  table.double('x').notNullable();
  table.double('y').notNullable();
  table.enum('icon', enumToStringArray(MarkerIcon));
 });
};

export async function down(knex: Knex) {
 return await knex.schema.dropTable('jobs');
};
