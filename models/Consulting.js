const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const usersConsultingSchema = new Schema({
  email:{
    type:String
  },
  phone:{
    type:String
  },
  fname:{
    type:String
  },
  lname:{
    type:String
  },
  website:{
    type:String
  },
  datetime:{
    type:String
  },
},{timestamps:true});

const Consulting = mongoose.model('Consulting',usersConsultingSchema);
module.exports = Consulting;
