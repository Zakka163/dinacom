const db = require('../config/db_config.js');
const {DataTypes} = require('sequelize');


const modelUser = db.define('user', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    freezeTableName: false
    // Other model options go here
  });
  
const modelWalletParent = db.define('walletParent',{
  saldo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  nameWallet: {
      type: DataTypes.STRING,
      allowNull: false
    },
  idWallet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true
    }
})
const modelWalletChild = db.define('walletChild',{
  idUser: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  idWallet: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  saldo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  nameWallet: {
      type: DataTypes.STRING,
      allowNull: false
    }
})

async function sinkron(){
  await db.sync()
}

sinkron()

module.exports = {modelUser,modelWalletParent,modelWalletChild};