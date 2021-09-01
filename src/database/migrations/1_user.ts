export async function up(knex: any) {
 return await knex.schema.createTable('users', function (table: any) {
  table.increments('id');
  table.string('name').notNullable();
  table.string('email').notNullable();
  table.string('password').notNullable();
  table.string('phone').notNullable();
 });
};

export async function down(knex: any) {
 return await knex.schema.dropTable('users');
};
