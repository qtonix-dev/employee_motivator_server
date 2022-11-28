const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const departmentSchema = new Schema({
  name:{
    type:String
  },
  // teamleader:{
  //   type:mongoose.Schema.Types.ObjectId,ref:'Employee'
  // },
},{timestamps:true});

const Department = mongoose.model('Department',departmentSchema);
module.exports = Department;
