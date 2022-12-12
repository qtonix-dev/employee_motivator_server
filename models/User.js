const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const usersSchema = new Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  status:{
    type:String
  },
  type:{
    type:String
  },
  employee_id:{
    type:String
  }
},{timestamps:true});

const User = mongoose.model('User',usersSchema);
module.exports = User;
