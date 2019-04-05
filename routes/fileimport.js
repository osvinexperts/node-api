var express = require('express'),
    router = express.Router(),
    db = require('../dbconnection'),
    auth = require('../auth'),
    multer = require('multer'),
    path = require('path'),
    exceljs = require('exceljs'),
    extensions = require('../whitelist')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './imports/')
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

router.post('/', (req, res) => {
    upload(req, res, function (err, result) {
        if (err) {
            res.json({
                "err": err,
                "message": 'Extention not allowed'
            }).send();
        }
        else {
            const excel = new exceljs.Workbook();
            excel.xlsx.readFile(req.file.path)
                .then(()=>{
                    let qry = "insert into forecast  (KeyAccount,TargetQuarter,Type,DirectChannel,"
                                                    +"PartnerName,Status,Webinar,AccountName,SKUs,RedFlags,"
                                                    +"NDA,Eula,MSA,PO,Invoice,QuoteSOWUploaded,SalesRep,"
                                                    +"CSTeamMemberRole,CurrentEnvironment,AnyUpdate,PathtoSiteLicense,"
                                                    +"ContentUpdateDate,ProductVersion,AWSAzureGCP,KeyContacts,"
                                                    +"TotalDealAmt,Consumption,TotalThreatModels,PricePerThreatModel,"
                                                    +"EditionType,SupportPackagePurchased,TrainingPackagePurchased,"
                                                    +"TrainingDetails,DeploymentType,OverallHealth,PainLevel,"
                                                    +"POInvoiceDate,ContractStartDate,ContractEndDate,LicenseType,"
                                                    +"RenewalFollowUpDate,Upsell,ContentUpdateFrequency,LastContacted,"
                                                    +"LastContactedBy,ActiveUsers,HistoricalBackground,"
                                                    +"Creds,FileTransfer,TimeZone,NosOfSupportTickets)"
                                                    +"values"
                    
                    var worksheet = excel.getWorksheet('Customers _ Forecasts');
                    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                        if(rowNumber>1){
                                    qry += `("${row.values[1]}","${row.values[2]}","${row.values[3]}","${row.values[4]}","${row.values[5]}","${row.values[6]}","${row.values[7]}","${row.values[8]}","${row.values[9]}","${row.values[10]}","${row.values[11]}","${row.values[12]}","${row.values[13]}","${row.values[14]}","${row.values[15]}","${row.values[16]}","${row.values[17]}","${row.values[18]}","${row.values[19]}","${row.values[20]}","${row.values[21]}","${row.values[22]}","${row.values[23]}","${row.values[24]}","${row.values[25]}","${row.values[26]}","${row.values[27]}","${row.values[28]}","${row.values[29]}","${row.values[30]}","${row.values[31]}","${row.values[32]}","${row.values[33]}","${row.values[34]}","${row.values[35]}","${row.values[36]}","${row.values[37]}","${row.values[38]}","${row.values[39]}","${row.values[40]}","${row.values[41]}","${row.values[42]}","${row.values[43]}","${row.values[44]}","${row.values[45]}","${row.values[46]}","${row.values[47]}","${row.values[48]}","${row.values[49]}","${row.values[50]}","${row.values[51]}"),`
                        }
                    })
                    qry = qry.slice(0,qry.length-1)
                    db.query(qry, (err, result)=>{
                        if(err)
                            res.send({
                                "success": false,
                                "error": err
                            })
                        else
                            res.send({
                                "success": true,
                                "message": 'Imported Successfully!'
                            })    
                    })
                })
        }
    })
})

module.exports = router