const express = require("express");
const app = express();
const passport = require('passport');
const session  = require('express-session');
const flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(session);
const hbs = require("express-handlebars");
const path = require('path');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("views", path.join(__dirname,'views'));
app.use("/cssFiles", express.static(__dirname + "/assets"));
app.use("/scriptFiles", express.static(__dirname + "/assets"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    //layoutsDir: __dirname + "/views/layouts"
  })
);


const mongoose = require("mongoose");
//const cloudinary = require('cloudinary').v2;
mongoose.connect("mongodb+srv://danrejsa:" + process.env.MONGO_ATLAS_PW +"@danrej-ann6l.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true
});
 
//mongodb+srv://danrejsa:<password>@danrej-ann6l.mongodb.net/test?retryWrites=true&w=majority
//var session = require('express-session');

const carApi = require("./api/car");
const flagApi = require("./api/flag");
const userApi = require("./api/users");
//const orderApi = require("./api/order");
const Homepage = require("./routes/carsRoute");
const orders = require("./routes/orderRoute");
const userq = require("./routes/userRoute");
//const flags = require("./routes/flagRoute");

const expressValidator = require('express-validator');
const router = express.Router(); 
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json'); 




/*cloudinary.config({ 
  cloud_name: 'danrejsa', 
  api_key: '838429296415295', 
  api_secret: 'WUUp71HOsCIKizakCrGvDtAfbRk' 
});*/


/*app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true
}));*/

app.get('/', (req,res){
        res.send('Hell world');
 })

var store = new MongoDBStore({
  uri: "mongodb+srv://danrejsa:" + process.env.MONGO_ATLAS_PW +"@danrej-ann6l.mongodb.net/test?retryWrites=true&w=majority",
 //uri:"mongodb+srv://danrejsa:" + process.env.MONGO_ATLAS_PW +"@danrej-ann6l.mongodb.net/test?retryWrites=true&w=majority",
  collection: 'users'
});
 
// Catch errors
/*store.on('error', function(error) {
  console.log(error);
});*/
 
app.use(require('express-session')({
  secret: 'This is a secret',
  /*cookie: {
    maxAge: 3600 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,*/
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));
 

app.use(passport.initialize());
app.use(passport.session());


  router.use(expressValidator())
  app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;
  
        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
  
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
  }));

  app.use(flash()); 
  
  app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  }); 

  
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v1', router);
app.use( '/', Homepage);
app.use( '/orders', orders);
//app.use( '/auth', userq);
app.use( '/auth', userq);
app.use( '/api', carApi);
app.use( '/api', flagApi);
//app.use( '/api', orderApi);
app.use( '/api', userApi);



module.exports = app;
