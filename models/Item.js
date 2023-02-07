const Sequelize = require('sequelize')
const db = require('./db')

const Item = db.define('items',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false ,
    primaryKey: true
  },
  nome:{
    type: Sequelize.STRING,
    allowNull: false
  }
})
 
//se não existir criar a tabela
// Item.sync()
//recriar tabela
  //  Item.sync({force: true})

module.exports = Item