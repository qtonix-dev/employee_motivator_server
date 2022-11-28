const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const mtSchema = new Schema({
  date:{
    type:String
  },
  employee_id:{
    type:mongoose.Schema.Types.ObjectId,ref:'Employee'
  },
  amount:{
    type:Number
  },
  service:{
    type:String
  },
  type:{
    type:String
  },
  customer_type:{
    type:String
  },
},{timestamps:true});

const SalesDailyRecord = mongoose.model('SalesDailyRecord',mtSchema);
module.exports = SalesDailyRecord;
