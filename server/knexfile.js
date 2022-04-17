// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database:'ddbkcvvc4q5c7u', 
      user:'bkitybpvxlquhd',
      ssl:{rejectUnauthorized:false},
      password:'fe89e24b7a441d3c683625fb4f35eba5ad95855b159cba2e744494d1d5810428',
      port:5432,
      host:"ec2-52-73-155-171.compute-1.amazonaws.com",
      uri:"postgres://bkitybpvxlquhd:fe89e24b7a441d3c683625fb4f35eba5ad95855b159cba2e744494d1d5810428@ec2-52-73-155-171.compute-1.amazonaws.com:5432/ddbkcvvc4q5c7u"
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
