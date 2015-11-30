
var express = require("express");
var app = express();

app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public')); //any static files requested by src/href will be directed to the public directory through this method
app.set('views', __dirname + '/views');
app.set('port', process.env.PORT || 3000);

var bodyParser = require('body-parser');
//app.use instructs function to be run for all requests made to app.
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//Cookie-parser=================================================
var credentials = require('./credentials.js');
var MongoSessionStore = require('session-mongoose')(require('connect'));
var sessionStore = new MongoSessionStore({url:credentials.mongo.development.connectionString });
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
    secret: credentials.cookieSecret,
    resave: false,
    saveUninitialized: false, 
    store: sessionStore
}));
//Mongoose=============================================================
var mongoose = require('mongoose');

var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
switch(app.get('env')){
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, opts);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, opts);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}
//Routes =====================================================================
var route = require('./routes/routes.js');

app.get('/',route.root);
app.get('/inn',route.inn);
app.post('/process',route.process_wheat);
app.post('/rent',route.rent);

// custom 404 page
app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});
// custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
res.send('500 - Server Error');
});
app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});