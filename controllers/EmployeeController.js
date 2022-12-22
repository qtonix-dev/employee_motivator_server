require('dotenv-safe').config();
const {response} = require('express');
const Employee = require('../models/Employee');
const moment = require('moment')
const ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINTKEY,
});



//SHOW ALL USERS
const index = (req,res) => {
  Employee.find().populate('department_id',['_id', 'name']).populate('designation_id',['name']).populate('reporting_to',['name']).populate('team',['name']).sort({createdAt:-1})
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

//STORE Employee DETAILS
const store = (req,res) => {
  Employee.findOne({email:req.body.email},(err,doc)=>{
    if(doc===null){
      Employee.create(req.body)
      .then(response=>{
        res.json({
          response:true
        })
      })
    }else{
      res.json({
        response:false,
        message:'Email already exist.'
      })
    }
  })


}


//VIEW
const view = (req,res) => {
 Employee.findById(req.params.id, (err,doc) => {
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
  Employee.findByIdAndUpdate(req.params.id, {$set: req.body})
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
}


const deleteuser = (req,res) => {
  Employee.findByIdAndRemove(req.params.id, (err,doc) => {
    if(!err){
      res.json({
        response:true
      })
    }else{
      res.json({
        response:false
      })
    }
  })
}


//EMPLOYEE NAME SEARCH
const employeenamesearch = (req,res) => {


  Employee.find({'name' : new RegExp(req.params.name, 'i')}, function(err, docs){
    res.json({
      response:true,
      datas:docs
    })
  });


}




//UPDATE PROFILE IMAGE
const upload_profile_image = (req,res) => {

  const encoded = req.file.buffer.toString("base64");

  imagekit
    .upload({
      file: encoded,
      // fileName: "image.jpg",
      fileName: "image",
      useUniqueFileName: true,
      folder: "employee_motivator",
    })
    .then((response) => {
      Image.create(response);
      res.json({
        response: true,
        data: response,
      });
    })
    .catch((error) => {
      res.json({
        response: error,
      });
    });



}



//GET BIRTHDAY DETAILS
const birthdaydetails = (req,res) => {

  // const today = moment().startOf('day');
  now = moment();
  Employee.find({dob: {$gte: moment(now).startOf('day'), $lte: moment(now).endOf('day')}}).select('name picture email emp_number')
  .then(response=>{
    res.json({
      response:true,
      datas:response,
    })
  })



}


// **MODULE EXPORTS**
module.exports = {index,store,view,update,deleteuser,employeenamesearch,upload_profile_image,birthdaydetails}
