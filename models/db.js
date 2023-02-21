const Sequelize = require('sequelize')


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
})

sequelize.authenticate()
.then(() => {
  console.log("Conectado ao banco de dados: " + process.env.DB_NAME)
}).catch((err) => {
  console.log("Erro ao conectar com banco de dados " + err);
})

module.exports = sequelize