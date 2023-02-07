const Sequelize = require('sequelize')
const db = require('./db')
const Item = require('./Item')
const Ticket = require('./Ticket')

const ItemTicket = db.define('ItemTickets',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false ,
    primaryKey: true
  },
  valorUn:{
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantidade:{
  type: Sequelize.INTEGER,
  allowNull: false
  }
})

ItemTicket.belongsTo(Ticket,{
  constraint: true,
  foreignKey:'idTicket'
})

ItemTicket.belongsTo(Item,{
  constraint: true,
  foreignKey:'idItem'
})


//se não existir criar a tabela
  // ItemTicket.sync()
//recriar tabela
  //  ItemTicket.sync({force: true})

module.exports = ItemTicket