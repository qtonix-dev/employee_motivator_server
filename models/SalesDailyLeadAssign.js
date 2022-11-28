const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const mtSchema = new Schema({
  target_dollar:{
    type:Number
  },
  date:{
    type:String
  },
  employee_id:{
    type:mongoose.Schema.Types.ObjectId,ref:'Employee'
  },
},{timestamps:true});

const SalesDailyLeadAssign = mongoose.model('SalesDailyLeadAssign',mtSchema);
module.exports = SalesDailyLeadAssign;
