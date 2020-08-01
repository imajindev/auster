module.exports = {
  up: (queryInterface, Sequelize) => Promise.resolve()
    .then(async () => {
      await queryInterface.createTable('User', {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
        },
        email: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
        },
        password: {
          type: Sequelize.TEXT,
          allowNull: false,
          set(password) {
            this.setDataValue('password', sequelize.fn('crypt', password, sequelize.fn('gen_salt', 'md5')))
          },
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: true,
        },
      })
    }),
  down: (queryInterface) => {
    return queryInterface.dropTable('User')
  },
}
