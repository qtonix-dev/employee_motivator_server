const {response} = require('express');
const Consulting = require('../models/Consulting');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();



const index = async (req,res) => {
  Consulting.find().sort({createdAt:-1})
  .then(response=>{
    res.json({
      response:response
    })
  })
}


const store = (req,res) => {
  Consulting.create(req.body,(err,doc)=>{
    if(err){
      res.json({
        response:false
      })
    }else{
      res.json({
        response:true
      })
    }
  })
}



// **MODULE EXPORTS**
module.exports = {
  index,store
}
