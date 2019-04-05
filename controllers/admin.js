const Admin = require('../models').Admin,
        jwt = require('jsonwebtoken'),
        secret = "This is my secret",
        fs = require('fs'),
        path = require('path')

module.exports = {
    verifyLoginDetails(req,res){
        return Admin
            .find({
                where:{
                    email: req.body.email
                }
            })
            .then(result => {
                if(result){
                    if(result.password === req.body.password){
                        jwt.sign({ result: result.email }, secret, (err, token) => {
                            if (err)
                                res.send({
                                    success: false,
                                    error: err
                                })
                            else
                                res.status(200)
                                    .send({
                                        success: true,
                                        token: token,
                                        name: result.name
                                    });
                        });
                    }
                    else
                        res.send({
                            success: false,
                            error: "Password Does Not Match"
                        })
                }
                else
                    res.send({
                        success: false,
                        error: "No customer with this email"
                    })
            })
    },

    resetPassword(req,res){
        return Admin
            .find({
                where: {
                    email: req.body.email
                }
            })
            .then(result => {
                if(result){
                    if(result.security_question_id == req.body.id && result.security_question_ans == req.body.ans){
                        jwt.sign({ result: result.email }, secret, (err, JWTToken) => {
                            if (err)
                                res.send({
                                    success: false,
                                    error: err
                                })
                            else{
                                result.update({token: JWTToken})
                                    .then(result1 => {
                                        res.send({
                                            success: true,
                                            token: JWTToken
                                        })
                                    })
                            }
                        });
                    }
                    else
                        res.send({
                            success: false,
                            error: "Security Question-Answer does not match"
                        })
                }
                else
                    res.send({
                        success: false,
                        error: "No such email address"
                    })
            })
    },

    updatePassword(req,res){
        return Admin
            .find({
                where: {
                    token: req.body.token
                }
            })
            .then(result => {
                if(result){
                    result.update({password: req.body.newPassword, token:null})
                        .then(result1 => {
                            res.send({success: true, result1: result1})
                        })
                        .catch(err => {
                            res.send({success: false, err:err});
                        });
                }
                else
                    res.send({
                        success: false,
                        error: "No such email address"
                    })
            })
    },

    getAdmins(req,res){
        return Admin
            .findAll({
                })
            .then(admins => {
                res.send({
                    status: true,
                    data: admins
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

    getQuestions(req,res){
        fs.readFile(path.join(__dirname, "../routes/questions.js"), 'utf8', function (err, questionsJson) {
            if (err)
                res.send(err);
            questionsJson = JSON.parse(questionsJson);
            res.send({
                questionsJson
            })
    
        });
    }
}