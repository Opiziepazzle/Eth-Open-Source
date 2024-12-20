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
const skillRoutes = require('./app/routes/Skill.routes')
const googleRoutes = require('./app/routes/GoogleAuth.routes')
const githubRoutes = require('./app/routes/GitHubAuth.routes')
const passport = require('passport');
const ErrorHandler = require('./app/middleware/ErrorHandler.middleware');

const session = require('express-session');

 require('./app/database/Mongo.database')
 require('dotenv').config();


//making upload folder publicly available and then passing the middleware
app.use('/uploads', express.static('uploads') )

 // Passport configuration
require('./app/config/passport');        //(passport);
 
 app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
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



 //Routes which should handle request
app.use('/user', userRoutes, verificationRoutes)
app.use('/contributor', contributorRoutes)
app.use('/maintainer', maintainerRoutes)
app.use('/', skillRoutes)
app.use('/',
  googleRoutes, 
  //githubRoutes
  )





 //Handling CORS Error
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization "
    );
    if ( req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
      return res.status(200).json({});
    }
    next();
  })




  //Error Handling 
  ErrorHandler(app)

  
  // Home Route (Login page)
app.get('/home', (req, res) => {
  res.send(`
    <h1>Server is running!</h1>
    <a href="/auth/google/">
      <button>Login with Google</button>
    </a>
  `);
});

// Profile Route (Displays user's details)
app.get('/profile', (req, res) => {
  console.log('User authenticated:', req.isAuthenticated());
  console.log('User details:', req.user);
  if (!req.isAuthenticated()) {
    return res.redirect('/home');
  }

  res.send(`
    <h1>Hello, ${req.user.displayName || req.user.username}!</h1>
    <p>Email: ${req.user.email || 'No email provided'}</p>
    <a href="/logout">Logout</a>
  `);
});


// Logout Route
app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return next(err);
    }
    res.redirect('/home');
  });
});

  
  
  app.listen(PORT, () => {
      console.log(`Server started running on port ${PORT}`);
    });
