'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkInsert('Histories', [{
        customerId: 1,
        stakeHolderContacted: "Mr. Yogesh",
        contactedAt: new Date(),
        internalTeamMember: "Someone",
        issuePurpose: "Casual Call",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        customerId: 1,
        stakeHolderContacted: "Mr. ABC",
        contactedAt: new Date(),
        internalTeamMember: "Someone 1",
        issuePurpose: "Casual Call",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        customerId: 2,
        stakeHolderContacted: "Mr. XYZ",
        contactedAt: new Date(),
        internalTeamMember: "Someone 2",
        issuePurpose: "Casual Call",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        customerId: 2,
        stakeHolderContacted: "Mr. EFG",
        contactedAt: new Date(),
        internalTeamMember: "Someone 3",
        issuePurpose: "Casual Call",
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
      return queryInterface.bulkDelete('Histories', null, {});
    
  }
};
