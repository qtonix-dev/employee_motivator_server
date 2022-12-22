const {response} = require('express');

const sharp = require('sharp');
const fs = require('fs');


//SHOW ALL BLOGS
const index = async (req,res) => {
  res.json({
    response:true
  })
}


//STORE BLOG
const convertimage = (req,res) => {

    sharp(req.file.path).resize(400, 270).toFile('uploads/blogimages/' + 'thumbnails-' + req.file.filename, (err, resizeImage) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resizeImage);
      }
    })

    // sharp(req.file.path).resize(120, 120).toFile('uploads/blogimages/' + 'imagesmall-' + req.file.filename, (err, resizeImage) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(resizeImage);
    //   }
    // })

    // blog.imagethumb= 'uploads/blogimages/' + 'thumbnails-' + req.file.filename;
}



// **MODULE EXPORTS**
module.exports = {
  index,convert
}
