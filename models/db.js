const Sequelize = require('sequelize')

const sequelize = new Sequelize("ofmeclara","root",'',{
  host: "localhost",
  dialect: 'mysql'
})

sequelize.authenticate()
.then(() => {
  console.log("Conectado ao servidor")
}).catch((err) => {
  console.log("Erro ao conectar com banco de dados" + err);
})

module.exports = sequelize