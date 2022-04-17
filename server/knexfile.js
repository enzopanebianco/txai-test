// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database:'txai_test', 
      user:'postgres',
      password:'root',
      port:5432
    },

    useNullAsDefault:true,
    migrations:{
      directory:`${__dirname}/src/database/migrations`
    },
    seeds:{
      directory:`${__dirname}/src/database/seeds`
    },
    debug:true
  },


};
