module.exports = {
  development: {
    // username: 'sql9271664',
    // password: 'yFB6c5Jvv8',
    // database: 'sql9271664',
    // host: 'sql9.freemysqlhosting.net',
    host     : 'localhost',
    username     : 'root',
    password : 'root',
    database : 'csp',
    dialect: 'mysql'
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'mysql'
  }
}
