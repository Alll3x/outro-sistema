const Sequelize = require('sequelize')
const db = require('./db')
const User = require('./User')

const Vehicle = db.define('vehicles',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false ,
    primaryKey: true
  },
  marca:{
    type: Sequelize.STRING,
    allowNull: false
  },
  modelo:{
    type: Sequelize.STRING,
    allowNull:false
  },
  ano:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  placa:{
    type: Sequelize.STRING,
    allowNull: false
  },
  anotacoes:{
    type: Sequelize.STRING,
   allowNull: true
  }
})

Vehicle.belongsTo(User,{
  constraint: true,
  foreignKey: 'idUsuario'
})

//se não existir criar a tabela
  // Vehicle.sync()
//recriar tabela
  //  Vehicle.sync({force: true})

module.exports = Vehicle