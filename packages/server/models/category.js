const moment = require('moment')
const { Model, DataTypes } = require('sequelize')

const { db } = require('./db')

class Category extends Model {
  display() {
    return this.get({ plain: true })
  }
}

Category.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.TEXT,
    defaultValue: 'expense',
    allowNull: false,
  },
  parentId: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
}, {
  sequelize: db,
  tableName: 'Category',
  getterMethods: {
    created_at() {
      return moment(this.getDataValue('created_at')).format()
    },
    updated_at() {
      return moment(this.getDataValue('updated_at')).format()
    },
  },
})

Category.associate = function (models) {
  Category.hasOne(models.Record, { as: 'record' })
}

module.exports = Category
