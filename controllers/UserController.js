require('dotenv-safe').config();
const {response} = require('express');
const User = require('../models/User');
const Employee = require('../models/Employee');



const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

const nodemailer = require('nodemailer');
const Email = require('email-templates');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
  }
  });
  const email = new Email({
  transport: transporter,
  send: true,
  preview: false,
});

//SHOW ALL USERS
const index = (req,res) => {
  User.find().sort({createdAt:-1})
  .then(response=>{
    res.json({
      response:true,
      datas:response
    })
  })
  .catch({
    response:false
  })
}

//STORE USER DETAILS
const store = (req,res) => {


  User.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })

  //   sharp(req.file.path).rotate().resize(150, 150).toFile('uploads/userimages/' + 'small-' + req.file.filename, (err, resizeImage) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(resizeImage);
  //     }
  //   })
  //
  // var user = new User();
  // user.name = req.body.name;
  // user.email = req.body.email;
  // user.contact = req.body.contact;
  // user.password = req.body.password;
  // user.usertype = req.body.usertype;
  // user.email_verify='Verified';
  // user.email_code=Math.floor(100000 + Math.random() * 900000);
  // user.city = req.body.city;
  // user.state = req.body.state;
  // user.country = req.body.country;
  // user.image = req.file.path;
  // user.imagethumb = 'uploads/userimages/' + 'small-'+ req.file.filename;
  // // user.imagemedium = 'uploads/userimages/' + 'medium-'+ req.file.filename;
  // // user.imagelarge = 'uploads/userimages/' + 'large-'+ req.file.filename;
  //
  // user.save((err,doc)=>{
  //   if(!err){
  //     res.json({
  //       response:'true',
  //       message:'Successfully Registrated.'
  //     })
  //   }else{
  //     res.json({
  //       response:'false'
  //     })
  //   }
  // })

}


//userregister
const userregister = (req,res) => {
  User.find({email: req.body.email}, (err,doc)=>{
          if(!err){
            if(doc.length>0){
              res.json({
                response:false,
                message:'Email already exist'
              })
            }else{
              var user = new User();
              user.name=req.body.name;
              user.email=req.body.email;
              user.password=req.body.password;
              user.status=req.body.status;

              // user.email_verify='Not Verified';
              // user.email_code=Math.floor(100000 + Math.random() * 900000);
              // user.usertype='User';
              user.save((err,doc)=>{
                if(!err){
                  res.json({
                    response:true,
                    message:'success'
                  })
                }else{
                  res.json({
                    response:false,
                    message:'failed'
                  })
                }
              })
            }
          }else{
            res.json({
              message:'failed'
            })
          }
        })
}



//VIEW
const view = (req,res) => {

 User.findById(req.params.id, (err,doc) => {
   if(!err){
     res.json({
       response:true,
       data:doc
     })
   }else{
     res.json({
       response:false,

     })
   }
 })

}

//UPDATE
const update = (req,res) => {

console.log(req.body)

  Employee.findByIdAndUpdate(req.params.id, {$set: req.body})
  .then(response=>{

    Employee.findById(req.params.id)
    .then(dat=>{

      console.log(dat)

      res.json({
        response:true,
        data:dat
      })
    })




  })
}


const updatepassword = (req,res) => {
  console.log(req.body)

  Employee.findById(req.params.id)
  .then(data=>{

    if(data.password===req.body.current_password){

      let updatedData = {
        password:req.body.new_password,
      }

      Employee.findByIdAndUpdate(req.params.id, {$set: updatedData})
      .then(repos=>{
        res.json({
          response:true,
          message:'Success'
        })
      })

    }else{
      res.json({
        response:false,
        message:'incorrect old password'
      })
    }

    console.log(data)
  })

  // User.findById(req.params.id)
  // .then(data=>{
  //
  //   if(data.password===req.body.current_password){
  //
  //     let updatedData = {
  //       password:req.body.new_password,
  //     }
  //
  //     User.findByIdAndUpdate(req.params.id, {$set: updatedData})
  //     .then(repos=>{
  //       res.json({
  //         response:true,
  //         message:'Success'
  //       })
  //     })
  //
  //
  //
  //   }else{
  //     res.json({
  //       response:false,
  //       message:'incorrect old password'
  //     })
  //   }
  //
  //   console.log(data)
  // })


}





//UPDATE WEBSITE USER DETAILS
const userupdate = (req,res) => {

  let updatedData = {
    name:req.body.name,
    email:req.body.email,
    contact:req.body.contact,
    password:req.body.password,
    city:req.body.city,
    state:req.body.state,
    country:req.body.country,
  }

  User.findByIdAndUpdate(req.params.id, {$set: updatedData})
  .then(response=>{

    User.findById(req.params.id, (err,doc) => {
      if(!err){
        res.json({
          response:'true',
          data:doc
        })
      }else{
        res.json({
          response:'false',
        })
      }
    })

  })
}




const deleteuser = (req,res) => {

  User.findByIdAndRemove(req.params.id, (err,doc) => {
    if(!err){
      res.json({
        response:'true'
      })
    }else{
      res.json({
        response:'false'
      })
    }
  })


}


//LOGIN
const login = (req,res) => {
  Employee.findOne({
    email:req.body.email,
    password:req.body.password
  },function(err,doc){

    if(!err){
      if(doc === null){
        res.json({
          response:false,
          message:'Please check email and password'
        })
      }else{
        if(doc.isAdmin){
          res.json({
            response:true,
            message:'Success',
            data:doc
          })
        }else{
          res.json({
            response:false,
            message:'This account is not admin account'
          })
        }
      }
    }else{
      res.json({
        response:false,
        message:'Login failed'
      })
    }
  })
}








// **MODULE EXPORTS**
module.exports = {index,  update,deleteuser, login,  view, userregister,updatepassword}
