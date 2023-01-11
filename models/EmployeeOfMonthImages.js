const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const birthdayImageSchema = new Schema({
  image:{
    type:Object
  },
  fillText:{
   type: String
  },

  fillTextFontSizeforName:{
   type: String
  },
  fillTextFontforName:{
   type: String
  },
  fillStyleforName:{
   type: String
  },






  fillTextFontSize:{
     type:String
  },
  fillTextDetails:{
    type:Object
  },
  fillTextFont:{
    type:String
  },
  fillStyle:{
    type:String,
    default:'#ffffff'
  },
  arcDetails:{
    type:Object
  },
  strokeStyle:{
    type:String,
    default:'#2465D3'
  },
  drawImageDetails:{
    type:Object
  },
  subImage:{
    type:String
  },
  isActive:{
    type:Boolean,
    default:false
  },
},{timestamps:true});

const EmployeeOfMonthImages = mongoose.model('EmployeeOfMonthImages',birthdayImageSchema);
module.exports = EmployeeOfMonthImages;
