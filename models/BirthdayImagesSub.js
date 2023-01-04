const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const birthdayImageSub = new Schema({
  image:{
    type:Object
  },
},{timestamps:true});

const BirthdayImageSub = mongoose.model('BirthdayImageSub',birthdayImageSub);
module.exports = BirthdayImageSub;
