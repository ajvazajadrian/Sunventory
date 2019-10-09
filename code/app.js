require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require("express-session")
const MongoStore   = require("connect-mongo")(session);
const moment=   require("moment")
mongoose
  .connect('mongodb://localhost/sunventory', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// express-session Setup
app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 720000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 * 1000// 1 day
  })
}));

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
hbs.registerPartials(__dirname + '/views/partials');



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';
// we create a variable in locals "currentUser" and use the information of session.currentUsser
app.use((req,res,next)=>{
  if(req.session.currentUser){
    app.locals.currentUser = req.session.currentUser
  }else{
    delete app.locals.currentUser
  }

  next();
})

const index = require('./routes/index');
app.use('/', index);

const auth=require("./routes/auth");
app.use("/",auth);

const main= require("./routes/main")
app.use("/",main)

 
module.exports = app;
