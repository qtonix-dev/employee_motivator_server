const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const dataSchema = new Schema({
  // employee_id:{
  //   type:[mongoose.Schema.Types.ObjectId,ref:'Employee']
  // },
  employee_id:[{type:mongoose.Schema.Types.ObjectId,ref:'Employee'}],
  month:{
    type:String
  },
  year:{
    type:String
  }
},{timestamps:true});

const EmployeeofMonth = mongoose.model('EmployeeofMonth',dataSchema);
module.exports = EmployeeofMonth;
