const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');

const projectSchema = new Schema({
  name:{
    type:String
  },
  website:{
    type:String
  },
},{timestamps:true});

const Project = mongoose.model('Project',projectSchema);
module.exports = Project;
