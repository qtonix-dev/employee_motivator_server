const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sharp = require('sharp');
const { uuid } = require('uuidv4');

const ProjectSeoKeywordsSchema = new Schema({
  project_id:{
    type:String
  },
  name:{
    type:String
  },
},{timestamps:true});

const ProjectSeoKeywords = mongoose.model('ProjectSeoKeywords',ProjectSeoKeywordsSchema);
module.exports = ProjectSeoKeywords;
