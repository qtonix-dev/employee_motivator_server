const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const birthdayImageSchema = new Schema({
  image:{
    type:Object
  },
  fillTextDetails:{
    type:Object
  },
  fillTextFont:{
    type:String
  },
  fillStyle:{
    type:String,
    default:'White'
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

const BirthdayImage = mongoose.model('BirthdayImage',birthdayImageSchema);
module.exports = BirthdayImage;
