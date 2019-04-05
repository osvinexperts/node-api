db = require('../dbconnection')
async = require('async')
Json2csvParser = require('json2csv').Parser;

CheckList = require('../models').CheckList

exports.get_check_lists = (req, res) => {
    if(req.query.customerId)
    {
        CheckList.findAll({
            attributes: ['id', 'taskName', 'assignedTo', 'dueDate', 'status'],
             where: {
                customerId: req.query.customerId
              }
          }).then(checklists => {
            res.json({success: 'true', checklists});
        }).catch((error) => { res.status(400).send(error); });
    }
    else
    {
        CheckList.findAll({
            attributes: ['id', 'taskName', 'assignedTo', 'customerId', 'dueDate', 'status']
          }).then(checklists => {
            res.json({success: 'true', checklists});
        }).catch((error) => { res.status(400).send(error); }); 
    }
}

exports.insert_checklist = (req, res) => {
    let form_data = {taskName: req.body.name, customerId: req.body.customerId, assignedTo: req.body.assignedTo, dueDate: req.body.dueDate, status: req.body.status, active: true}
    CheckList.create(form_data).then(user => {
        res.json({success: 'true', user});
    }).catch((error) => { res.status(400).send(error); });
}


exports.update_checklist = (req, res) => {
    CheckList.findById(req.params.taskId).then(check_list => {
        let form_data = {taskName: req.body.name, customerId: req.body.customerId, assignedTo: req.body.assignedTo, dueDate: req.body.dueDate, status: req.body.status, active: true}
        check_list.update(form_data).then(user => {
            res.json({success: 'true', user});
        }).catch((error) => { res.status(400).send(error); });
      }).catch((error) => { res.status(400).send(error); });
}
exports.update_status = (req, res) => {
    CheckList.findById(req.params.taskId).then(check_list => {
        let form_data = {status: req.body.status}
        check_list.update(form_data).then(user => {
            res.json({success: 'true', user});
        }).catch((error) => { res.status(400).send(error); });
    }).catch((error) => { res.status(400).send(error); });
}

exports.delete_checklist = (req, res) => {
    CheckList.findById(req.params.taskId).then(check_list => {
        let form_data = {status: req.body.status}
        check_list.destroy(form_data).then(user => {
            res.json({success: 'true', user});
        }).catch((error) => { res.status(400).send(error); });
    }).catch((error) => { res.status(400).send(error); });
}

exports.update_multiple_checklists = (req, res) => {
    let results = []
    async.forEach(req.body, (task, cb)=>{
        let qry = 'update checklist set taskName="'+task.name
                        +'", owner="'+task.owner
                        +'", dueDate="'+task.dueDate
                        +'", status="'+task.status
                        +'" where id='+task.id   
        db.query(qry, (err,result)=>{
            if(err){
                results.push({
                   "id": task.id,
                   "error": err,
                   "success": false 
                })
                cb(null)
            }

            else{
                results.push({
                    "id": task.id,
                    "success": true
                })
                cb(null)
            }
        })
    }, (err)=>{
        if(err)
            res.send({
                "success":false,
                "error":"Something went wrong"
            })
        else
            res.send({
                "results": results
            })
    })
}

exports.export_checklist = (req, res) => {
    CheckList.findAll({
        attributes: ['id', 'taskName', 'assignedTo', 'customerId', 'dueDate', 'status']
      }).then(checklists => {
        var result =[]
        checklists.forEach((d) => {
            result.push({
                'name':d.taskName,
                'owner':d.owner,
                'assignedTo': d.assignedTo,
                'dueDate':d.dueDate,
                'status':d.status
            })
        });
        const fields = ['name', 'owner', 'assignedTo', 'dueDate', 'status']
        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(result);

        const filename = Date.now()+'.csv'
        

        res.attachment(filename);
        res.status(200).send(csv);
    }).catch((error) => res.status(400).send(error));
}

