const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogsSchema = new Schema({
  status:{
    type:Boolean
  },
  blogurl:{
    type:String
  },
  categoryurl:{
    type:String
  },
  totalurl:{
    type:String
  },
  title:{
    type:String
  },
  description:{
    type:String
  },
  category:[{type:mongoose.Schema.Types.ObjectId,ref:'BlogCategory'}],
  subcategory:[{type:mongoose.Schema.Types.ObjectId,ref:'BlogSubCategory'}],
  // category:{
  //   type:String
  // },
  // imagethumb:{
  //   type:String
  // },
  // imagesmall:{
  //   type:String
  // },
  // image:{
  //   type:String
  // },

  thumbnail_image:{
    type:String,
  },
  breadcrumb_image:{
    type:String
  },
  banner_image:{
    type:String
  },
  banner_color:{
    type:String
  },
  content:{
    type:String
  },
  contentreadtime:{
    type:Number
  },
  metatitle:{
    type:String
  },
  metadescription:{
    type:String
  },
  metakey_array:{
    type:Object
  },
  metakey:{
    type:String
  },

  imagetitle:{
    type:String
  },
  imagealt:{
    type:String
  },

  user_info:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
},{timestamps:true});

const Blog = mongoose.model('Blog',blogsSchema);
module.exports = Blog;
