const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const checkAuth = require('./app/middleware/App.middleware')
const bodyParser  = require('body-parser')
const userRoutes = require('./app/routes/User.routes')
const verificationRoutes = require('./app/routes/Verification.routes')
const contributorRoutes = require('./app/routes/Contributor.routes')
const maintainerRoutes = require('./app/routes/Maintainer.routes')
const projectRoutes = require('./app/routes/Project.routes')
const googleRoutes = require('./app/routes/GoogleAuth.routes')
const githubRoutes = require('./app/routes/GitHubAuth.routes')
const passport = require('passport');
const ErrorHandler = require('./app/middleware/ErrorHandler.middleware');

const session = require('express-session');

 require('./app/database/Mongo.database')
 require('dotenv').config();


 // Passport configuration
require('./app/config/passport');        //(passport);
 
 app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // If using HTTPS, set `secure: true`
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());








//Configure Handlebars to Allow Prototype Property Access
 app.use(express.json())
const { engine } = require("express-handlebars");
app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "main",
   
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }

}));

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
 
 app.use(bodyParser.urlencoded({extended: false}))
 app.use(bodyParser.json());
app.use(cookieParser());


 //Handling CORS Error
 app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins (use specific domain in production)
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization" // Ensure Authorization is allowed
  );

  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // Allow these methods
      return res.status(200).json({});
  }

  next();
});


//making upload folder publicly available and then passing the middleware
app.use('/uploads', express.static('uploads') )




 //Routes which should handle request
app.use('/user', userRoutes)
app.use('/verify', verificationRoutes)
app.use('/contributor', contributorRoutes)
app.use('/maintainer', maintainerRoutes)
app.use('/project', projectRoutes)
app.use('/auth/google', googleRoutes )
app.use('/auth/github', githubRoutes )




  //Error Handling 
  ErrorHandler(app)

  
  
  
  
  app.listen(PORT, () => {
      console.log(`Server started running on port ${PORT}`);
    });