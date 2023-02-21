'use strict';

const { query } = require('express')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("addresses", {
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
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('users', {
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
      }, 
      idEndereco:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"addresses",
          key:'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('vehicles', {
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
      },
      idUsuario:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'users',
          key:'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('items', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false ,
        primaryKey: true
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('tickets', {
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
      },
      idUsuario:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'users',
          key:'id'
        }
      },
      idVeiculo:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'vehicles',
          key:'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('ItemTickets', {
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
      },
      valorTot:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      idTicket:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'tickets',
          key:'id'
        }
      },
      idItem:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:'items',
          key:'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ItemTickets')  
    await queryInterface.dropTable('tickets')
    await queryInterface.dropTable('items') 
    await queryInterface.dropTable('vehicles') 
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('addresses')
  }
};
