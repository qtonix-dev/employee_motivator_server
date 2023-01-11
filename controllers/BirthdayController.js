require('dotenv-safe').config();
const {response} = require('express');
const Company = require('../models/Company');
const BirthdayImages = require('../models/BirthdayImages');
const BirthdayImagesSub = require('../models/BirthdayImagesSub');
const Employee = require('../models/Employee');
const ScrollText = require('../models/ScrollText');

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

  res.json({
    response:true
  })

}




//UPLAOD BIRTHDAY IMAGE
const uploadimagesub = (req,res) => {
  const encoded = req.file.buffer.toString("base64");

  imagekit
    .upload({
      file: encoded,
      fileName: "birthday_images_sub.jpg",
      useUniqueFileName: true,
      folder: "employee_motivator",
    })
    .then((response) => {

      var tmpData={
        image:response
      }
      BirthdayImagesSub.create(tmpData)
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








//UPLAOD BIRTHDAY IMAGE
const uploadimage = (req,res) => {
  const encoded = req.file.buffer.toString("base64");

  imagekit
    .upload({
      file: encoded,
      fileName: "birthday_images.jpg",
      useUniqueFileName: true,
      folder: "employee_motivator",
    })
    .then((response) => {

      var tmpData={
        image:response
      }
      BirthdayImages.create(tmpData)
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



const images = (req,res) => {
  BirthdayImages.find({})
  .then(response=>{
    res.json({
      response:true,
      datas:response
    })
  })
}



const today_birthday_list = (req,res) => {
  res.json({
    response:true
  })
}


const update_status = (req,res) => {


  BirthdayImages.update({},{isActive: false},{multi: true})
  .then(urur=>{
    BirthdayImages.findByIdAndUpdate(req.body.id,req.body)
    .then(response=>{
      res.json({
        response:true
      })
    })
  })


}


const deleteimage = (req,res) => {
  BirthdayImages.findByIdAndDelete(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}



const web_birthday = (req,res)  => {

  const today = moment().startOf('day');
  const today1 = moment().endOf('day');

  BirthdayImages.find({isActive:true})
  .then(bday_image=>{

    Employee.find({dob:{$gte:today.toDate(),$lte:today1.toDate()}})
    .then(response=>{

        ScrollText.find({status:true}).distinct('name')
        .then(scrolltext=>{
          res.json({
            response:true,
            bday_image:bday_image.length>0?bday_image[0]:false,
            employees:response.length>0?response:false,
            scrol_text:scrolltext
          })
        })



      })


  })

//   var now = moment()
//   console.log('now ' + now.toString())
// console.log('start ' + now.startOf('day'))
// console.log('end ' + now.endOf('day'))
//
//


  console.log(today.toDate());
  console.log(today1.toDate());


  console.log(today.format("MM DD ddd, YYYY HH:mm:ss a"));
  console.log(today1.format("MM DD ddd, YYYY HH:mm:ss a"));


console.log(moment().format("MM DD ddd, YYYY HH:mm:ss a"));



}



const update_birthday_info = (req,res) => {

  BirthdayImages.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


// **MODULE EXPORTS**
module.exports = {index,update_birthday_info,uploadimage,images,uploadimagesub,today_birthday_list,update_status,deleteimage,web_birthday}
