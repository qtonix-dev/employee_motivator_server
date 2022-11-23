const {response} = require('express');
const Subscribe = require('../models/Subscribe');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();



const index = async (req,res) => {
  Subscribe.find().sort({createdAt:-1})
  .then(response=>{
    res.json({
      response:response
    })
  })
}


const store = (req,res) => {

  console.log('data',req.body)
  console.log(111)

  Subscribe.findOne({email:req.body.email},(err,doc)=>{
    if(doc===null){
      Subscribe.create(req.body,(err,doc)=>{
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
    }else{
      res.json({
        response:false
      })
    }
  })

}



// **MODULE EXPORTS**
module.exports = {
  index,store
}
