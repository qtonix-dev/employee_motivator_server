const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
// const expressip = require('express-ip');
var passport = require('passport');
const sharp = require('helmet');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//===ROUTE INCLUDE===
const RouteUser = require('./routes/user');
const RouteEmployee = require('./routes/employee');
const RouteDepartment = require('./routes/department');
const RouteDesignation = require('./routes/designation');
const RouteTeam = require('./routes/team');
const RouteSalesMonthlyTargetDollar = require('./routes/salesmonthlytargetdollar');
const RoutePreSalesMonthlyTargetNumber = require('./routes/presalesmonthlytargetnumber');
const RoutePreSalesDailyLeadAssign = require('./routes/salesdailyleadassign');
const RoutePreSalesDailyRecord = require('./routes/salesdailyrecord');
const RouteCompany = require('./routes/company');
const RouteImage = require('./routes/image');
const RouteProject = require('./routes/project');
const RouteBirthday = require('./routes/birthday');


//===ROUTE INCLUDE===


//===DATABASE CONNECTION===
// mongoose.connect('mongodb+srv://biswanath:XRfrMdwCBrwr8lRm@qtonix.t42ay.mongodb.net/qtonixblog?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true});



mongoose.connect('mongodb+srv://mongodb:i6QpsrcM04zFhSKQ@cluster0.xeudb.mongodb.net/employeemotivator?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true});



// mongoose.connect('mongodb+srv://userjohndoe:PLk9Yj806VnGTDXa@devsite.vi3aswm.mongodb.net/development?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true});




const db = mongoose.connection;
db.on('error',(err)=>{
    console.log('Failed to connect.')
    console.log(err);
});
db.once('open',()=>{
    console.log('Successfully Connected.');
})
//===DATABASE CONNECTION===


const app = express();
// app.use(cors({
//     origin: 'https://employee-motivator-admin.vercel.app'
// }));
// app.use(cors({ origin: ["https://employee-motivator-admin.vercel.app", "http://sssslocalhost:03000"] }));

// adding Helmet to enhance your Rest API's security
app.use(helmet());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(cors())
// app.use(expressip().getIpInfoMiddleware);


var whitelist = ['https://employee-motivator-admin.vercel.app','https://employee-motivator-web.vercel.app', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']
var corsOptions = {
  origin: function (origin, callback) {
    // if (whitelist.indexOf(origin) !== -1) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))

    }
  }
}

app.use(cors(corsOptions));

// app.use(cors())



app.get('/',(req,res)=>{
    // res.send({hi:'I am biswanath'});
    res.send('<h1>employee_motivator_server</h1>');
    console.log(req.ipInfo)
    // res.render('pages/home');
});




app.get('/googlelogin',(req,res)=>{
  var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     '74119569687-uve7kucug4mlhgom87srambv6c524ji9.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://yourdomain:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {

    console.log(profile)

    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));


})









// app.get('/ip',(req,res)=>{
//     res.send(req.ipInfo);
// });

app.get('/mergeimage', async (req,res)=>{

  const image = await fetch("https://via.placeholder.com/800X3000");
  const imageBuffer = await image.buffer();


  const imageSharp = await sharp()



  let resizedPhoto
    await sharp(imageBuffer)
      .resize({ width: 1200, height: 900, fit: 'fill' })
      .toBuffer()
      .then((data) => {
        resizedPhoto = data
      })
      .catch((err) => {})


  console.log(imageBuffer)





  res.json({
    imageBuffer
  })

});


const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})


//API ROUTES
app.use('/api/user',RouteUser);
app.use('/api/employee',RouteEmployee);
app.use('/api/department',RouteDepartment);
app.use('/api/designation',RouteDesignation);
app.use('/api/team',RouteTeam);
app.use('/api/salesmonthlytargetdollar',RouteSalesMonthlyTargetDollar);
app.use('/api/presalesmonthlytargetnumber',RoutePreSalesMonthlyTargetNumber);
app.use('/api/salesdailyleadassign',RoutePreSalesDailyLeadAssign);
app.use('/api/salesdailyrecord',RoutePreSalesDailyRecord);
app.use('/api/company',RouteCompany);
app.use('/api/image',RouteImage);
app.use('/api/project',RouteProject);
app.use('/api/birthday',RouteBirthday);
//API ROUTES





//GET IMAGES FROM DIR
app.use('/uploads/userimages/', express.static('uploads/userimages'));
app.use('/uploads/blogcategoryimages/', express.static('uploads/blogcategoryimages'));
app.use('/uploads/blogimages/', express.static('uploads/blogimages'));







// //////check protected RouteUser
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   else
//     // Return error content: res.jsonp(...) or redirect: res.redirect('/login')
// }
//
// app.get('/account', ensureAuthenticated, function(req, res) {
//   // Do something with user via req.user
// });
