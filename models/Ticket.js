const Sequelize = require('sequelize')
const db = require('./db')
const User = require('./User')
const Vehicle = require('./Vehicle')

const Ticket = db.define('tickets',{
  id:{
  type: Sequelize.INTEGER,
  autoIncrement: true,
  allowNull: false ,
  primaryKey: true
  },
  status:{
  type: Sequelize.STRING,
  allowNull: false
  },
  garantia:{
  type: Sequelize.INTEGER,
  allowNull: false
  },
  valorFinal:{
  type: Sequelize.FLOAT,
  allowNull: true
  }
})

Ticket.belongsTo(User,{
constraint: true,
foreignKey: 'idUsuario'
})

Ticket.belongsTo(Vehicle,{
constraint: true,
foreignKey: 'idVeiculo'
})

//se não existir criar a tabela
  // Ticket.sync()
//recriar tabela
  //  Ticket.sync({force: true}) 

module.exports = Ticket