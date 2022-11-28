const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const designationSchema = new Schema({
  name:{
    type:String
  },
  // teamleader:{
  //   type:mongoose.Schema.Types.ObjectId,ref:'Employee'
  // },
},{timestamps:true});

const Designation = mongoose.model('Designation',designationSchema);
module.exports = Designation;
