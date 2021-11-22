
exports.up = function(knex) {
    return knex.schema.createTable('blogs_user', table => {
      table.integer('blog');
      table.integer('user');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('blogs_user');
  };