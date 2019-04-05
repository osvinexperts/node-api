'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Admins', [{
        email: 'admin@threatmodeler.com',
        password: 'admin@threatmodeler',
        name: "Threat Modeler",
        security_question_id: 1,
        security_question_ans: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        email: 'abc@xyz.com',
        password: 'admin',
        name: "ABC",
        security_question_id: 1,
        security_question_ans: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Admins', null, {});
    
  }
};
