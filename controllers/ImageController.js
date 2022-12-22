const { response } = require("express");

// const Image = require("../models/Image");

const ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINTKEY,
});

//***INDEX***
const index = (req, res) => {
  // Image.find()
  //   .sort({ createdAt: -1 })
  //   .then((response) => {
  //     res.json({
  //       response: true,
  //       data: response,
  //     });
  //   })
  //   .catch({});
  res.json({
      response: true,
  });
};

//***STORE***
const store = (req, res) => {
  const encoded = req.file.buffer.toString("base64");

  imagekit
    .upload({
      file: encoded,
      fileName: "images.jpg",
      useUniqueFileName: true,
      folder: "employee_motivator",
    })
    .then((response) => {
      res.json({
        response: true,
        data: response,
      });
      // Image.create(response);
      // res.json({
      //   response: true,
      //   data: response,
      // });
    })
    .catch((error) => {
      res.json({
        response: error,
      });
    });
};

//***DELETE***
const remove = (req, res) => {
  imagekit
    .deleteFile(req.params.fileId)
    .then((response) => {
      res.json({
          response: true,
        });
      // Image.findByIdAndRemove(req.params.id).then((response) => {
      //   res.json({
      //     response: true,
      //   });
      // });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { index, store, remove };
