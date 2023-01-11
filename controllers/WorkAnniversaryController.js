require('dotenv-safe').config();
const {response} = require('express');

const WorkAnniversaryImages = require('../models/WorkAnniversaryImages');
const Employee = require('../models/Employee');


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


  const today = moment().startOf('day');
  const today1 = moment().endOf('day');


  Employee.find({doj:{$gte:today.toDate(),$lte:today1.toDate()}})
  .then(response=>{
      res.json({
        response:true,
        employees:response.length>0?response:false,
      })
    })

}


const work_anniversary_month = (req,res) => {

  const today = moment().startOf('day');
  const start=moment(today).startOf('months');
  const end=moment(today).endOf('months')

  Employee.find({doj:{$gte:start.toDate(),$lte:end.toDate()}})
  .then(response=>{
      res.json({
        response:true,
        employees:response.length>0?response:false,
      })
    })



}


const update_workanniversary_info = (req,res) => {
  WorkAnniversaryImages.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


//UPLAOD BIRTHDAY IMAGE
const uploadimage = (req,res) => {
  const encoded = req.file.buffer.toString("base64");

  imagekit
    .upload({
      file: encoded,
      fileName: "work_anniversary_image.jpg",
      useUniqueFileName: true,
      folder: "employee_motivator",
    })
    .then((response) => {

      var tmpData={
        image:response
      }
      WorkAnniversaryImages.create(tmpData)
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


const imagelist = (req,res) => {
  WorkAnniversaryImages.find({})
  .then(respd=>{
    res.json({
      response: true,
      data: respd,
    });
  })
}


const deleteimage = (req,res) => {
  WorkAnniversaryImages.findByIdAndDelete(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const update_status = (req,res) => {
  WorkAnniversaryImages.update({},{isActive: false},{multi: true})
  .then(urur=>{
    WorkAnniversaryImages.findByIdAndUpdate(req.body.id,req.body)
    .then(response=>{
      res.json({
        response:true
      })
    })
  })
}

// **MODULE EXPORTS**
module.exports = {index,work_anniversary_month,uploadimage,imagelist,deleteimage,update_workanniversary_info,update_status}
