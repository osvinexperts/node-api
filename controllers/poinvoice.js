const PoInvoice = require('../models').PoInvoice,
        Customer = require('../models').Customer,
        Op = require('sequelize').Op

module.exports = {
    getInvoice(req, res){
        return PoInvoice
            .findAll({
                include:[
                    {
                        model: Customer,
                        attributes: ['name']
                    }
                ],
                order: [[
                    'createdAt',
                    'DESC'
                ]]
            })
            .then(invoices=>
                res.send({
                    success:true,
                    data:invoices
                })
            )
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    getClientInvoices(req,res){
        return PoInvoice
            .findAll({
                where:{
                    customerId: req.params.customerId
                },
                include:[
                    {
                        model: Customer,
                        attributes: ['name']
                    }
                ],
                order: [[
                    'createdAt',
                    'DESC'
                ]]
            })
            .then(invoices => {
                res.send({
                    status: true,
                    data: invoices
                })
            })
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: err
                })
            })
    },

    updateInvoice(req,res){
        return PoInvoice
        .update(req.body,{
            where: {
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

    createInvoice(req,res){
        return PoInvoice
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

    deleteInvoice(req,res){
        return PoInvoice
            .destroy({
                where: {
                    [Op.or]: [
                        {id: req.params.number},
                        {poNumber: req.params.number},
                        {invoiceNumber: req.params.number}
                    ]
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

    getTotalRevenueForCustomer(id){
        return PoInvoice
            .findAll({
                where: {
                    customerId: id
                },
                include: [
                    [sequelize.fn('sum', sequelize.col('poAmount')), 'totalRevenue']
                ]
            })
            .then(result=>{
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

    getDeletedInvoices(req,res){
        return PoInvoice
            .findAll({
                where: {
                    deletedAt: {
                      [Op.ne]: null
                    }
                  },
                  paranoid: false,
                  include:[
                    {
                        model: Customer,
                        attributes: ['name']
                    }
                ]
            })
            .then(deleted => {
                res.send({
                    status: true,
                    data: deleted
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

    restoreInvoices(req,res){
        return PoInvoice
        .restore({
            where: {
                id: req.params.invoiceId
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

    searchInvoices(req,res){
        return PoInvoice
            .findAll({
                where: {
                    [Op.or]: [
                        {poNumber: {[Op.like]: '%'+req.query.search+'%'}},
                        {invoiceNumber: {[Op.like]: '%'+req.query.search+'%'}},
                        {sku: {[Op.like]: '%'+req.query.search+'%'}},
                        {comments: {[Op.like]: '%'+req.query.search+'%'}},
                        {poAmount: {[Op.like]: '%'+req.query.search+'%'}},
                    ]
                },
                include: [
                    {
                        model: Customer,
                        attributes: ['name']
                    }
                ]
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

    searchInvoices2(req, res) {

        if (req.query.scope && req.query.scope == "customers") {
            return Customer.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.search}%` } }
                    ]
                },
                attributes: ['id']
            }).then(customerIds => {

                if (customerIds.length > 0) {
                    let ids = customerIds.map(id => {
                        return id.id
                    })

                    PoInvoice
                        .findAll({
                            where: {
                                id: {
                                    [Op.in]: ids
                                }
                            },
                            include: [
                                {
                                    model: Customer,
                                    attributes: ['name'],
                                }
                            ]
                        })
                        .then(result => {
                            res.send({
                                status: true,
                                data: result
                            })
                        })
                        .catch(err => {
                            let error = err.errors ? err.errors[0].message : err
                            res.send({
                                status: false,
                                error: err
                            })
                        })
                } else {
                    res.send({
                        status: true,
                        data: []
                    })
                }

            })
        } else {
            return PoInvoice
                .findAll({
                    where: {
                        [Op.or]: [
                            {poNumber: {[Op.like]: '%'+req.query.search+'%'}},
                            {invoiceNumber: {[Op.like]: '%'+req.query.search+'%'}},
                            {sku: {[Op.like]: '%'+req.query.search+'%'}},
                            {comments: {[Op.like]: '%'+req.query.search+'%'}}
                        ]
                    },
                    include: [
                        {
                            model: Customer,
                            attributes: ['name'],
                        }
                    ]
                })
                .then(result => {
                    res.send({
                        status: true,
                        data: result
                    })
                })
                .catch(err => {
                    let error = err.errors ? err.errors[0].message : err
                    res.send({
                        status: false,
                        error: err
                    })
                })
        }

    }
}