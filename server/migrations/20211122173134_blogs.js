
exports.up = function(knex) {
  return knex.schema.createTable('blogs', table => {
    table.increments('id');
    table.string('title');
    table.text('content', 'LONGTEXT');
    table.string('shortened_content', 100)
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('blogs');
};
