const express = require('express')
const api = require('./api');
const utilities = require('./utilities');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const DB = {//example with const but can be saved in db
    
};
app.get('/a', (req, res) => {
  //res.send('Hello World!')
  res.json({
    message: "Hello World"

  })
})

app.get('/ListCountries', (req, res) => {
    let body={
    };
    body = utilities.encodeBase64Object(body);
    api.makeRequest('GET','/v1/data/countries',body).then(function(response) {
        if(response){
            res.json({
                body: response,
                message: response.message,
                status: response.status
            })
        }

    }).catch(function(e) {
        res.json({
            message: "An error has occurred",
        })
    })
  })
  
  app.post('/GetWalletBalance', jsonParser, (req, res) => {
    let body={
        wallet:req.body.wallet
    };
    body = utilities.encodeBase64Object(body);
    api.makeRequest('GET',`/v1/user/${req.body.wallet}/accounts`,body).then(function(response) {
        if(response){
            res.json({
                body: response,
                message: response.message,
                status: response.status
            })
        }

    }).catch(function(e) {
        res.json({
            message: "An error has occurred",
        })
    })
  })
  
  app.post('/CreateVirtualAccount', jsonParser, (req, res) => {
    let body={
        country:req.body.country, 
        currency:req.body.currency,
        ewallet:req.body.ewallet
    };
    api.makeRequest('POST','/v1/issuing/bankaccounts',body).then(function(response) {
        if(response){
            res.json({
                body: response,
                message: response.message,
                status: response.status
            })
        }

    }).catch(function(e) {
        res.json({
            message: "An error has occurred",
        })
    })
  })

  app.post('/BankTransfer', jsonParser, (req, res) => {
    let body={
        amount:req.body.amount, 
        currency:req.body.currency,
        issued_bank_account:req.body.issued_bank_account
    };
    api.makeRequest('POST','/v1/issuing/bankaccounts/bankaccounttransfertobankaccount',body).then(function(response) {
        if(response){
            res.json({
                body: response,
                message: response.message,
                status: response.status
            })
        }

    }).catch(function(e) {
        res.json({
            message: "An error has occurred",
        })
    })
  })

  app.post('/GetAccountHistory', jsonParser, (req, res) => {
    let body={
        ewallet:req.body.issued_bank_account
    };

    api.makeRequest('GET',`/v1/issuing/bankaccounts/${req.body.issued_bank_account}`,body).then(function(response) {
        if(response){
            res.json({
                body: response,
                message: response.message,
                status: response.status
            })
        }

    }).catch(function(e) {
        res.json({
            message: "An error has occurred",
        })
    })
  })

  app.post('/ListVirtualAccounts',jsonParser, (req, res) => {
    let body={
        //ewallet:"ewallet_77fcf35b60943fcd9988cd7a4ac614bf"
    };
    // let body={
    //     country:"SK", 
    //     currency:"EUR",
    //     ewallet:"ewallet_77fcf35b60943fcd9988cd7a4ac614bf"
    // };
    //body = utilities.encodeBase64Object(body);
    api.makeRequest('GET','/v1/issuing/bankaccounts/list?ewallet=' + req.body.ewallet, body).then(function(response) {
        if(response){
            res.json({
                body: response,
                message: response.message,
                status: response.status
            })
        }

    }).catch(function(e) {
        res.json({
            message: "An error has occurred",
        })
    })
  })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
