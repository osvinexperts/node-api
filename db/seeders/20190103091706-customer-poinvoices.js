'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('PoInvoices', [{
        poNumber: 'ABC123',
        poDate: new Date(),
        invoiceNumber: '123ABC',
        invoiceDate: new Date(),
        poAmount: 11.00,
        sku: '123aba',
        pricePerThreatModel: 5.50,
        poFile: 'somepath',
        invoiceFile: 'somepath',
        comments: 'Nothing special here',
        customerId:1,
        invoicePaid: true,
        createdAt:new Date(),
        updatedAt:new Date()
      },{
        poNumber: 'ADC234',
        poDate: new Date(),
        invoiceNumber: '23AB',
        invoiceDate: new Date(),
        poAmount: 13.00,
        sku: '123aca',
        pricePerThreatModel: 6.50,
        poFile: 'somepath',
        invoiceFile: 'somepath',
        comments: 'Nothing special here',
        customerId:2,
        invoicePaid: false,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('PoInvoices', null, {});
    
  }
};
