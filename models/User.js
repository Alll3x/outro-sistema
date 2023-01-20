const Sequelize = require('sequelize')
const db = require('./db')
const Address = require('./Address')

const User = db.define('user', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefone:{
    type: Sequelize.STRING,
    allowNull: false
  }
})

User.belongsTo(Address,{
  constraint: true,
  foreignKey: 'idEndereco'
})

//se não existir criar a tabela
// User.sync()
//recriar tabela
// User.sync({force: true})
 
module.exports = User