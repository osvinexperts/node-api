const adminController = require('../controllers').Admin


module.exports = (app) => {

  app.post('/admin/verify', adminController.verifyLoginDetails)
  app.post('/admin/reset', adminController.resetPassword)
  app.put('/admin/reset', adminController.updatePassword)
  app.get('/admin/questions', adminController.getQuestions)
  app.get('/admin', adminController.getAdmins)

}