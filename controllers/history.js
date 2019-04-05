const History = require('../models').History,
        Customer = require('../models').Customer,
        Op = require('sequelize').Op

module.exports = {
    getHistory(req, res){
        return History
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
            .then(history=>
                res.send({
                    success:true,
                    data:history
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

    getClientHistory(req,res){
        return History
            .findAll({
                where:{
                    customerId: req.params.clientId
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
            .then(history => {
                res.send({
                    status: true,
                    data: history
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

    createHistory(req,res){
        return History
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

    updateHistory(req,res){
        return History
            .update(req.body,{
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

    deleteHistory(req,res){
        return History
            .destroy({
                where: {
                    id: req.params.number
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

    getDeletedHistory(req,res){
        return History
            .findAll({
                where: {
                    deletedAt: {
                      [Op.ne]: null
                    }
                  },
                  paranoid:false,
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

    restoreHistory(req,res){
        return History
            .restore({
                where: {
                    id: req.params.historyId
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

    searchHistory(req, res) {

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

                    History
                        .findAll({
                            where: {
                                id: {
                                    [Op.in]: ids
                                }
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
            return History
                .findAll({
                    where: {
                        [Op.or]: [
                            {stakeHolderContacted: {[Op.like]: '%'+req.query.search+'%'}},
                            {internalTeamMember: {[Op.like]: '%'+req.query.search+'%'}},
                            {issuePurpose: {[Op.like]: '%'+req.query.search+'%'}}
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
                    let error = err.errors ? err.errors[0].message : err
                    res.send({
                        status: false,
                        error: err
                    })
                })
        }

    }
}