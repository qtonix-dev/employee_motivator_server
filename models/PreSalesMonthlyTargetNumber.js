const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const mtSchema = new Schema({
  target_dollar:{
    type:Number
  },
  employee_id:{
    type:mongoose.Schema.Types.ObjectId,ref:'Employee'
  },
},{timestamps:true});

const PreSalesMonthlyTargetNumber = mongoose.model('PreSalesMonthlyTargetNumber',mtSchema);
module.exports = PreSalesMonthlyTargetNumber;
