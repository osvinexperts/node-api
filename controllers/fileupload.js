
var path = require('path')
var multer = require('multer');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var extensions = require('../whitelist')

const File = require('../models').File,
        Customer = require('../models').Customer


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if (extensions.includes(ext)) {
            return cb(null, true)
        }
        return cb(new Error())
    }
}).single('file');

module.exports = {
    upload_file(req, res){
        upload(req, res, function (err, result) {
            if (err) {
                res.json({
                    "status": false,
                    "error": err,
                    "message": 'Extention not allowed'
                }).send();
            }
            else {
                let form_data = {originalName: req.file.originalname,
                     storedName: req.file.filename, uploadedBy: req.query.uploadedBy,
                     fileSize: req.file.size, fileType: path.extname(req.file.originalname), savedPath: req.file.path, 
                    customerId: req.query.customerId}
                return File
                    .create(form_data)
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
            }
        });
    },

    get_file(req, res) {
        if (req.query.search){
            return File
            .findAll({
                where: {
                    [Op.or]: [
                        {originalName: {[Op.like]: '%'+req.query.search+'%'}},
                        {fileType: {[Op.like]: '%'+req.query.search+'%'}},
                        {uploadedBy: {[Op.like]: '%'+req.query.search+'%'}},
                    ]
                },
                include: [
                    {
                        model: Customer,
                        attributes: ['name']
                    }
                ]
            })
            .then(files => {
                files.map((file)=>{
                    let size = () => {
                        const units = ['bytes', 'KB', 'MB', 'GB']
                        let length = 0
                        let size = parseInt(file.fileSize,10) || 0
                        while(size>=1024 && ++length)
                            size/=1024
                        return size.toFixed(2)+' '+units[length]
                    }
                    return file.fileSize = size()
                })
                res.send({
                    status: true,
                    data: files
                })
            })
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
        }
        else{
            return File
            .findAll({
                include: [
                    {
                        model: Customer,
                        attributes: ['name']
                    }
                ]
            })
            .then(files => {
                files.map((file)=>{
                        let size = () => {
                            const units = ['bytes', 'KB', 'MB', 'GB']
                            let length = 0
                            let size = parseInt(file.fileSize,10) || 0
                            while(size>=1024 && ++length)
                                size/=1024
                            return size.toFixed(2)+' '+units[length]
                        }
                        return file.fileSize = size()
                    })
                res.send({
                    status: true,
                    data: files
                })
            })
            .catch(err => {
                let error= err.errors ? err.errors[0].message : err
                res.send({
                    status: false,
                    error: error
                })
            })
        }
        
    },

    update_file(req, res)  {
        let form_data = {originalName: req.body.newFileName, lastModifiedBy: req.body.user}
        return File
            .update(form_data, {
                where:{
                    id: req.body.fileId
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

    delete_file (req, res) {
        return File
            .destroy({
                where: {
                        id: req.params.fileId
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

    get_deleted_files(req, res) {
        return File
        .findAll({
            where: {
                deletedAt: {
                [Op.ne]: null
                }
          }, 
                include: [
                    {
                        model: Customer,
                        attributes: ['name']
                    }
                ],
          paranoid: false
        })
        .then(files => {
            res.send({
                status: true,
                data: files
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

    restore_deleted_files(req, res){
        return File
            .restore({
                where: {
                    id: req.params.fileId
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
    }

}


