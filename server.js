var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var db = require("./models");

var app = express();

var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}))



app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burgers_controller.js');

app.use('/', routes);
app.use("/update", routes);
app.use("/create", routes);


db.sequelize.sync().then(function(){
    app.listen(port);
    console.log("listening on port:" + port);
})