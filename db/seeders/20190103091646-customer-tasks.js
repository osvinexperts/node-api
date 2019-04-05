'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */

      return queryInterface.bulkInsert('CheckLists', [{
        taskName: 'Task 1',
        assignedTo: 'Someone',
        dueDate: new Date(),
        status: true,
        customerId: 1,
        createdBy: "abc",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        taskName: 'Task 2',
        assignedTo: 'SomeTwo',
        dueDate: new Date(),
        status: false,
        customerId: 1,
        createdBy: "abc",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        taskName: 'Task 3',
        assignedTo: 'SomeThree',
        dueDate: new Date(),
        status: true,
        customerId: 2,
        createdBy: "abc",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        taskName: 'Task 4',
        assignedTo: 'SomeFour',
        dueDate: new Date(),
        status: false,
        customerId: 2,
        createdBy: "abc",
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
      return queryInterface.bulkDelete('CheckLists', null, {});
    
  }
};
