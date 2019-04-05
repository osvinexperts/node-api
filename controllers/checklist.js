const Checklist = require('../models').CheckList,
    Customer = require('../models').Customer,
    Op = require('sequelize').Op

module.exports = {
    getTasks(req, res) {
        return Checklist
            .findAll({
                include: [
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
            .then(tasks => {
                res.send({
                    status: true,
                    data: tasks
                })
            })
            .catch(err => {
                let error = err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    getClientTasks(req, res) {
        return Checklist
            .findAll({
                where: {
                    customerId: req.params.customerId
                },
                include: [
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
            .then(tasks => {
                res.send({
                    status: true,
                    data: tasks
                })
            })
            .catch(err => {
                let error = err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    createTask(req, res) {
        return Checklist
            .create(req.body)
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
                    error: error
                })
            })
    },

    updateSingleTask(req, res) {
        return Checklist
            .update(req.body, {
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
                let error = err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    updateTaskStatus(req, res) {
        return Checklist
            .update(req.body, {
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
                let error = err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    updateMultipleTasks(req, res) {
        let result = req.body.tasks.forEach(task => {
            CheckList.update(task, {
                where: {
                    id: task.id
                }
            }).then(r => {
                return r
            }).catch(err => {
                return err
            })
        })
        res.send({
            data: result
        })
    },

    deleteTask(req, res) {
        return Checklist
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
                let error = err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
    },

    getDeletedTasks(req, res) {
        return Checklist
            .findAll({
                where:{
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
            .then(tasks => {
                res.send({
                    status: true,
                    data: tasks
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

    restoreTask(req,res){
        return Checklist
            .restore({
                where: {
                    id: req.params.taskId
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

    searchTasks(req, res) {
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

                    Checklist
                        .findAll({
                            where: {
                                customerId: {
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
            return Checklist
                .findAll({
                    where: {
                        [Op.or]: [
                            {taskName: {[Op.like]: '%'+req.query.search+'%'}},
                            {assignedTo: {[Op.like]: '%'+req.query.search+'%'}},
                            {createdBy: {[Op.like]: '%'+req.query.search+'%'}},
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