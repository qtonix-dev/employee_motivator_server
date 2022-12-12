const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const departmentSchema = new Schema({
  name:{
    type:String
  },
  color:{
    type:String
  },
  department_head:{
    type:mongoose.Schema.Types.ObjectId,ref:'Employee'
  },
},{timestamps:true});

const Department = mongoose.model('Department',departmentSchema);
module.exports = Department;
