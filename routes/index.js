const customerController = require('../controllers').Customer,
      invoiceController = require('../controllers').PoInvoices,
      historyController = require('../controllers').History,
      fileUploadController = require('../controllers').FileUpload,
      taskController = require('../controllers').Checklist


module.exports = (app) => {

  app.get('/customer', customerController.getCustomers)
  app.get('/single/customer/:clientId', customerController.getSpecificCustomer)
  app.get('/customer/names', customerController.getCustomerNames)
  app.get('/customer/names/:customerId', customerController.getSingleCustomerName)
  app.get('/search/customer', customerController.searchCustomer)
  app.post('/customer', customerController.createCustomer)
  app.patch('/customer', customerController.updateCustomer)
  app.delete('/delete/customer/:customerId', customerController.deleteCustomer)
  app.get('/deleted/customer', customerController.getDeletedCustomer)
  app.post('/restore/customer/:customerId', customerController.restoreCustomer)
  app.post('/filter/customer', customerController.filterCustomer)
  app.get('/forecast/total', customerController.forecastTotal)

  app.get("/invoices", invoiceController.getInvoice)
  app.post('/invoices', invoiceController.createInvoice)
  app.get('/invoices/:customerId', invoiceController.getClientInvoices)
  app.patch('/invoices', invoiceController.updateInvoice)
  app.delete('/invoices/:number', invoiceController.deleteInvoice)
  app.get('/deleted/invoices', invoiceController.getDeletedInvoices)
  app.post('/restore/invoices/:invoiceId', invoiceController.restoreInvoices)
  app.get('/search/invoices', invoiceController.searchInvoices)

  app.get('/history', historyController.getHistory)
  app.get('/history/:clientId', historyController.getClientHistory)
  app.post('/history', historyController.createHistory)

  app.get('/files/upload', fileUploadController.get_file)
  app.post('/files/upload', fileUploadController.upload_file)

  app.patch('/files/upload/:fileId', fileUploadController.update_file)
  app.delete('/files/upload/:fileId', fileUploadController.delete_file)

  app.get('/files/upload/deleted', fileUploadController.get_deleted_files)
  app.post('/files/upload/restore/:fileId', fileUploadController.restore_deleted_files)
  app.patch('/history', historyController.updateHistory)
  app.delete('/history/:number', historyController.deleteHistory)
  app.get('/deleted/history', historyController.getDeletedHistory)
  app.post('/restore/history/:historyId', historyController.restoreHistory)
  app.get('/search/history', historyController.searchHistory)

  app.get('/tasks', taskController.getTasks)
  app.get('/tasks/:customerId', taskController.getClientTasks)
  app.post('/tasks', taskController.createTask)
  app.patch('/tasks', taskController.updateSingleTask)
  app.patch('/tasks/status', taskController.updateTaskStatus)
  app.delete('/tasks/:number', taskController.deleteTask)
  app.get('/deleted/tasks', taskController.getDeletedTasks)
  app.get('/search/tasks', taskController.searchTasks)
  app.post('/restore/tasks/:taskId', taskController.restoreTask)
};