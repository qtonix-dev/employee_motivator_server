const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const CompanySchema = new Schema({
  name:{
    type:String
  },
  website:{
    type:String
  },
  phone_number:{
    type:String
  },
  email:{
    type:String
  },
},{timestamps:true});

const Company = mongoose.model('Company',CompanySchema);
module.exports = Company;
