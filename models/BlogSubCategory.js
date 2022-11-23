const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSubCategorySchema = new Schema({
  name:{
    type:String
  },
  category_id:{type:mongoose.Schema.Types.ObjectId,ref:'BlogCategory'},
  url:{
    type:String
  },
  description:{
    type:String
  },
  metatitle:{
    type:String
  },
  metadesc:{
    type:String
  },
  image:{
    type:String
  },
  imagethumb:{
    type:String
  },
  imagesmall:{
    type:String
  }
},{timestamps:true});

const BlogSubCategory = mongoose.model('BlogSubCategory',blogSubCategorySchema);
module.exports = BlogSubCategory;
