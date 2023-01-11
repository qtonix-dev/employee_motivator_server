require('dotenv-safe').config();
const {response} = require('express');
const EmployeeOfMonthImages = require('../models/EmployeeOfMonthImages');
const EmployeeofMonth = require('../models/EmployeeofMonth');


var moment = require('moment');


var mongoose = require('mongoose');
const ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINTKEY,
});

//SHOW ALL USERS
const index = (req,res) => {
  // EmployeeofMonth.find({})
  // .then(response=>{
  //   res.json({
  //     response:true,
  //     datas:response
  //   })
  // })

  EmployeeofMonth.aggregate([
      {$lookup:{
        from:'employees',
        localField:'employee_id',
        foreignField:'_id',
        as:'employees_info',
      }},
    ]).exec((err, doc) => {
      res.json({
        response:true,
        datas:doc
      })
    })


}


//UPLAOD BIRTHDAY IMAGE
const uploadimage = (req,res) => {
  const encoded = req.file.buffer.toString("base64");

  imagekit
    .upload({
      file: encoded,
      fileName: "employee_of_month.jpg",
      useUniqueFileName: true,
      folder: "employee_motivator",
    })
    .then((response) => {

      var tmpData={
        image:response
      }
      EmployeeOfMonthImages.create(tmpData)
      .then(respd=>{
        res.json({
          response: true,
          data: response,
        });
      })



    })
    .catch((error) => {
      res.json({
        response: error,
      });
    });

}


const update_status = (req,res) => {


  EmployeeOfMonthImages.update({},{isActive: false},{multi: true})
  .then(urur=>{
    EmployeeOfMonthImages.findByIdAndUpdate(req.body.id,req.body)
    .then(response=>{
      res.json({
        response:true
      })
    })
  })


}



const images = (req,res) => {
  EmployeeOfMonthImages.find({})
  .then(response=>{
    res.json({
      response:true,
      datas:response
    })
  })
}


const deleteimage = (req,res) => {
  EmployeeOfMonthImages.findByIdAndDelete(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const store_employee_of_month = (req,res) => {
  EmployeeofMonth.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const update_employee_of_month = (req,res) => {
  res.json({
    response:true
  })
}

const delete_employee_of_month = (req,res) => {
  EmployeeofMonth.findByIdAndDelete(req.body.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const update_image_info = (req,res) => {
  EmployeeOfMonthImages.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


// **MODULE EXPORTS**
module.exports = {index,update_image_info,uploadimage,update_status,images,deleteimage,update_employee_of_month,store_employee_of_month,delete_employee_of_month}
