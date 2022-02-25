"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Users", [
      {
        email: "admin@gmail.com",
        password: "123456",
        firstName: "Hoan",
        lastName: "Nguyen",
        address: "USA",
        phoneNumber: "0338305136",
        image: "",
        gender: 1,
        typeRole: "ROLE",
        keyRole: "R1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
