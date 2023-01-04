const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');
const { uuid } = require('uuidv4');

const projectWebsiteDetailsSchema = new Schema({
  type:{
    type:String
  },
  project_id:{
    type:String
  },
  name:{
    type:String
  },
  url:{
    type:String
  },
  username:{
    type:String
  },
  password:{
    type:String
  },
},{timestamps:true});

const ProjectWebsiteDetails = mongoose.model('ProjectWebsiteDetails',projectWebsiteDetailsSchema);
module.exports = ProjectWebsiteDetails;
