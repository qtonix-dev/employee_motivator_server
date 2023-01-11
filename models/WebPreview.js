const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const dataSchema = new Schema({
  section_name:{
    type:String
  },
  name:{
    type:String
  },
  status:{
    type:Boolean,
    default:true
  },
  order:{
    type:Number
  }
},{timestamps:true});

const WebPreview = mongoose.model('WebPreview',dataSchema);
module.exports = WebPreview;
