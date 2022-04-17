/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
 return knex.schema.createTable('products',(table)=>{
      table.increments("id")
      table.text("name").notNullable()
      table.float("price").notNullable()
      table.timestamp("register_dt").defaultTo(Date.now())
      table.integer("quantity").notNullable()
      table.foreign("id").references("users.id").withKeyName("fk_user_id")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable("users");
};
