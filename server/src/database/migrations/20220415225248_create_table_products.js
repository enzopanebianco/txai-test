/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('products',(table)=>{
         table.increments("id")
         table.text("name").notNullable()
         table.float("price").notNullable()
         table.timestamp("register_dt")
         table.integer("quantity").notNullable()
         table.integer("user_id").references("users.id").notNullable().onDelete("CASCADE")
     })
   };
   
   /**
    * @param { import("knex").Knex } knex
    * @returns { Promise<void> }
    */
   exports.down = function(knex) {
      return knex.schema.dropTable("users");
   };
   