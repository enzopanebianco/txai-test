/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 * 
 */
const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  const password = await bcrypt.hash('123456789',16)
  // Deletes ALL existing entries
  await knex('users').insert([
   {name:"sistematxai",password,role:1}
  ]);
};
