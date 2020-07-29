const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.TEXT,
      defaultValue: 'expense',
      allowNull: false,
    },
    category: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    paranoid: true,
    getterMethods: {
      createdAt() {
        return moment(this.getDataValue('createdAt')).format()
      },
      updatedAt() {
        return moment(this.getDataValue('updatedAt')).format()
      },
    },
  })

  Record.prototype.display = function () {
    return this.get({ plain: true })
  }

  return Record
}