const Customer = require('../models').Customer,
      PoInvoice = require('../models').PoInvoice,
      History = require('../models').History,
      Checklist = require('../models').CheckList,
      Op = require('sequelize').Op

module.exports = {
    createCustomer(req,res){
        return Customer
            .create(req.body)
            .then(result => {
                res.send({
                    status: true,
                    data: result
                })
            })
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    getCustomers(req,res){
        return Customer
            .findAll({
                attributes: ['id', 'name', 'salesRep', 'csm', 'overallHealth', 'key', 
                                [Customer.sequelize.literal('(SELECT COUNT(*) FROM CheckLists WHERE CheckLists.customerId = Customer.id AND status = false)'), 'pendingTasks'],
                                [Customer.sequelize.literal('(SELECT SUM(PoInvoices.poAmount) FROM PoInvoices WHERE PoInvoices.customerId = Customer.id AND deletedAt IS NULL)'), 'totalRevenue'],
                                [Customer.sequelize.literal('(SELECT Histories.contactedAt FROM Histories WHERE Histories.customerId = Customer.id AND deletedAt IS NULL ORDER BY Histories.contactedAt DESC LIMIT 1)'), 'lastContacted']
                            ],
                where: {
                        createdAt: {
                            [Op.lt]: req.query.dateTo,
                            [Op.gt]: req.query.dateFrom
                        }
                    }
                })
            .then(customers => {
                res.send({
                    status: true,
                    data: customers
                })
            })
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    getCustomerNames(req,res){
        return Customer
            .findAll({
                attributes: ['id', 'name']
            })
            .then(customers => {
                res.send({
                    status: true,
                    data: customers
                })
            })
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    getSpecificCustomer(req,res){
        return Customer
            .find({
                where: {
                    id: req.params.clientId
                }
            })
            .then(result => {
                res.send({
                    success: true,
                    data: result
                })
            })
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    getSingleCustomerName(req,res){
        return Customer
            .find({
                attributes: ['name'],
                where: {
                    id: req.params.customerId
                }
            })
            .then(customer => {
                res.send({
                    status: true,
                    data: customer
                })
            })
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    updateCustomer(req,res){
        return Customer
            .update(req.body, {
                where:{
                    id: req.body.id
                }
            })
            .then(result => {
                res.send({
                    status: true,
                    data: result
                })
            })
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    deleteCustomer(req,res){
        return Customer
            .destroy({
                where: {
                    id: req.params.customerId
                }
            })
            .then(result => {
                res.send({
                    status: true,
                    data: result
                })
            })
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    getDeletedCustomer(req,res){
        return Customer
            .restore({
                where: {
                    deletedAt: {
                        [Op.ne]: null
                    },
                    paranoid: false
                }
            })
            .then(result => {
                res.send({
                    status: true,
                    data: result
                })
            })
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    restoreCustomer(req,res){
        return Customer
            .restore({
                where: {
                    id: req.params.customerId
                }
            })
            .then(result => {
                res.send({
                    status: true,
                    data: result
                })
            })
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    searchCustomer(req,res){
        return Customer
            .findAll({
                where: {
                    createdAt: {
                        [Op.lt]: req.query.dateTo,
                        [Op.gt]: req.query.dateFrom
                    },
                    [Op.or]: [
                        {name: {[Op.like]: '%'+req.query.search+'%'}},
                        {salesRep: {[Op.like]: '%'+req.query.search+'%'}},
                        {csm: {[Op.like]: '%'+req.query.search+'%'}},
                        {overallHealth: {[Op.like]: '%'+req.query.search+'%'}}
                    ]
                },
                attributes: ['id', 'name', 'salesRep', 'csm', 'overallHealth', 'key', 
                                [Customer.sequelize.literal('(SELECT COUNT(*) FROM CheckLists WHERE CheckLists.customerId = Customer.id AND status = false)'), 'pendingTasks'],
                                [Customer.sequelize.literal('(SELECT SUM(PoInvoices.poAmount) FROM PoInvoices WHERE PoInvoices.customerId = Customer.id AND deletedAt IS NULL)'), 'totalRevenue'],
                                [Customer.sequelize.literal('(SELECT Histories.contactedAt FROM Histories WHERE Histories.customerId = Customer.id AND deletedAt IS NULL ORDER BY Histories.contactedAt DESC LIMIT 1)'), 'lastContacted']
                            ]
            })
            .then(customers => {
                res.send({
                    status: true,
                    data: customers
                })
            })
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    filterCustomer(req,res){

        return Customer
            .findAll({
                where: {
                    createdAt: {
                      [Op.lt]: req.body.dateTo,
                      [Op.gt]: req.body.dateFrom
                    }
                  }
            })
            .then(result=>{
                res.send({
                    success: true,
                    data: result
                })
            })
    },

    exportCustomers(req,res){
        return Customer
            .findAll({
                where: {
                    createdAt: {
                      [Op.lt]: req.body.dateTo,
                      [Op.gt]: req.body.dateFrom
                    }
                  }
            })
            .then(result=>{
                
            })
    },

    forecastTotal(req,res){
            var TotalSalesAmount = new Promise((resolve, reject) => {
                PoInvoice.sum('poAmount',
                    { where:
                        { 
                            createdAt: { [Op.gt]: req.query.dateFrom, [Op.lt]: req.query.dateTo }
                        }
                    },
                ).then(user => {
                    resolve(user);
                });
            });
            var TotalSalesForecast = new Promise((resolve, reject) => {
                Customer.sum('contractRenewalAmount',
                    { where:
                        { 
                            createdAt: { [Op.gt]: req.query.dateFrom, [Op.lt]: req.query.dateTo }
                        }
                    }
                ).then(user => {
                    resolve(user);
                });
            });
            var TotalRenewalAmount = new Promise((resolve, reject) => {
                Customer.count(
                    { where:
                        { 
                            createdAt: { [Op.gt]: req.query.dateFrom, [Op.lt]: req.query.dateTo },
                            deletedAt: null
                        }
                    }
                ).then(user => {
                    resolve(user);
                });
            });
            var TotalRenewalForecast = new Promise((resolve, reject) => {
                PoInvoice.count(
                    { where:
                        { 
                            createdAt: { [Op.gt]: req.query.dateFrom, [Op.lt]: req.query.dateTo },
                            deletedAt: null
                        }
                    }
                ).then(user => {
                    resolve(user);
                });
            });
            var all_promises = Promise.all([TotalSalesAmount, TotalSalesForecast, TotalRenewalAmount, TotalRenewalForecast]).then(function(data) {
                res.send({
                    TotalSalesAmount: data[0] ? data[0] : 0,
                    TotalSalesForecast: data[1] ? data[1] : 0,
                    TotalRenewalAmount: data[2] ? data[2] :0,
                    TotalRenewalForecast: data[3] ? data[3] : 0
                    });
            }).catch(err => {
                res.send(err);
            });
    }
}