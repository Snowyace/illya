
//All routes to be called within town.js 
var fortunes = require('../lib/fortunes.js');
var itemdb = require('../models/item_model.js');
var loandb = require('../models/loan_model.js');
var seeding = require('../initdb.js');
exports.root = (function(req, res){
    res.cookie('journey', new Date().toLocaleTimeString());
    var log = req.cookies.journey;
    if(log){ console.log(log); };
    req.session.trade = 'apples';
    if(req.session.trade){ console.log('traded some: ' + req.session.trade); };
    //console.log(data.items); // JSON items array containing item objects  items:[ { name: 'Honey', coin: 5 } ]    
    
    res.render('town', {title: "Wheat Field", message: "Welcome", fortune: fortunes.randFortune()});
    
});

exports.inn = (function(req, res){
    var wheat = req.cookies.wheat;
    var days = req.cookies.loan;
    var storing;
    // Sift through DB given conditions.
   // loandb.find({name: "Makise"},function(err,temp){console.log("docs2:"+temp)});
    //loandb.find(function(err, loans) {if(loans.length){ days = loans[0].days}});
     if(wheat){
        console.log("Amount of wheat stored: " + wheat);
        console.log('Ate some: ' + req.session.trade);
        delete req.session.trade;
    }
    itemdb.find(function(err, items) {
        if(!items.length){seeding.initSeed()}
    });
    itemdb.find(function(err, items){        // created a new array where it added only the name and coin as an object element in the array "storing"
        // Stripped _id and __v by not including it in the return when mapping
        //temp holds each current loop instance element of items 
            storing = items.map(function(temp){
                return {
                    name: temp.name,
                    coin: temp.coin
                }
            })
        console.log(storing);
        res.render('inn', {title: "Thanks for staying", storage: storing, loan: days});
       
       
    });
});

//receives requests made on page matched by /process url
exports.process_wheat = (function(req, res){
    console.log('Amount of wheat (from visible form field): ' + req.body.wheat);
    res.cookie('wheat', req.body.wheat, {path: '/inn'});
    res.redirect(303, '/inn');
});

exports.rent = (function(req, res){
    console.log('Days Rented: ' + req.body.days);
    console.log(req.body.crops);
    /* var arr = ["wheat","barley"," ","","pumpkin"];
    var makise = arr.filter(Boolean && function(str){return /\S/.test(str)});
    returns --> ["wheat","barley,"pumpkin"]; filters both null/undefined + whitespaces
    */
    var planting = req.body.crops.filter(Boolean && function(str){return /\S/.test(str)});
    console.log(planting);
    
    loandb.update({name: req.body.name},{days: req.body.days,crops: planting},{runValidators: true},function(err){
        if(err){
            console.log("did not update");
        }else
        console.log("updated");
        
    });
    loandb.find(function(err, loans) {
       if(!loans.length){
            new loandb({name: req.body.name, days: req.body.days, crops: planting}).save();
       }
   
        res.cookie('loan', req.body.days, {path: '/inn'});
        res.redirect(303, '/inn');
    });
});