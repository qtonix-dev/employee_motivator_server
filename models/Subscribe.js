const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const usersSubscribeSchema = new Schema({
  email:{
    type:String
  },
},{timestamps:true});

const Subscribe = mongoose.model('Subscribe',usersSubscribeSchema);
module.exports = Subscribe;
