'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkInsert('Customers', [ { 
        name: "Honey",
        address: "address xyz, xyz city",
        phone: "1234567890",
        email: "john@example.com",
        keyContact: "XYZ",
        keyContactNumber: "1234567890",
        keyContactEmail: "contact@example.com",
        key: false,
        overallHealth: "Green",
        sourced: "Direct",
        partnerName: "Johny",
        salesRep: "Maria",
        csm: "xyz",
        uploadedQuotes: false,
        signedNda: false,
        signedEula: false,
        signedMsa: false,
        contractStartDate: new Date(),
        contractRenewalDate: new Date(),
        contractRenewalAmount: 10.50,
        totalThreatModelsPurchase: "xyz",
        consumptionNumber: "99229233FR",
        editionType: "AppSec - Standard Edition",
        supportPackage: "Standard",
        trainingPackage: "xyz",
        trainingTime: "1",
        DeploymentType: "Public",
        cloudProvider: "DigitalOcean",
        PlatformVersion: "1.0",
        comments: "test comment",
        createdAt: new Date(),
        updatedAt: new Date()
      },{ 
        name: "John Doe 2",
        address: "address xyz, xyz city",
        phone: "4563214",
        email: "john2@example.com",
        keyContact: "ABC",
        keyContactNumber: "1234567890",
        keyContactEmail: "contactjohn@example.com",
        key: false,
        overallHealth: "Green",
        sourced: "Direct",
        partnerName: "Johny",
        salesRep: "Maria",
        csm: "xyz",
        uploadedQuotes: false,
        signedNda: false,
        signedEula: false,
        signedMsa: false,
        contractStartDate: new Date(),
        contractRenewalDate: new Date(),
        contractRenewalAmount: 10.50,
        totalThreatModelsPurchase: "xyz",
        consumptionNumber: "99229233FR",
        editionType: "AppSec - Standard Edition",
        supportPackage: "Standard",
        trainingPackage: "xyz",
        trainingTime: "1",
        DeploymentType: "Public",
        cloudProvider: "DigitalOcean",
        PlatformVersion: "1.0",
        comments: "test comment",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkDelete('Customers', null, {});
  
  }
};
