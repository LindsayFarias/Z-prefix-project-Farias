
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments('id');
      table.string('username').notNullable().unique();
      table.string('password_hash').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
