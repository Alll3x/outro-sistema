const Sequelize = require('sequelize')
const db = require('./db')

 const Address = db.define("addresses", {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  cep:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  rua:{
    type: Sequelize.STRING,
    allowNull: false
  },
  numero:{
    type: Sequelize.STRING,
    allowNull:false
  },
  bairro:{
    type: Sequelize.STRING,
    allowNull:false
  },
  cidade:{
    type: Sequelize.STRING,
    allowNull:false
  },
  uf:{
    type: Sequelize.STRING,
    allowNull:false
  }
 })

//se não existir criar a tabela
 // Address.sync()
//recriar tabela
  //  Address.sync({force: true})

 module.exports = Address