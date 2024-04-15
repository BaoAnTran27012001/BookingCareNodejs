'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // email:DataTypes.STRING,
    // password:DataTypes.STRING,
    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    // address:DataTypes.STRING,
    // gender:DataTypes.BOOLEAN,
    // roleid:DataTypes.STRING
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password:'123456',
        firstName: 'John',
        lastName: 'Doe',
        address:'USA',
        gender:1,
        typeRole:'ROLE',
        keyRole:'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
