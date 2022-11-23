const {response} = require('express');
const Menu = require('../models/Menu');


const Page = require('../models/Page');
const Blog = require('../models/Blog');
const BlogCategory = require('../models/BlogCategory');
const BlogSubCategory = require('../models/BlogSubCategory');




const NodeCache = require( "node-cache" );
const myCache = new NodeCache();


const clearcache = (req,res) => {
  myCache.flushAll();
  res.json({
    response:true,
    message:'done'
  })
}


//SHOW ALL BLOGS
const index = (req,res) => {
  res.json({
    response:'Working'
  })
}


const menuinfo = (req,res) => {

  nav = myCache.get(`/menumenuinfo}`);
  if(nav){
    res.json({
      response:nav
    })
  }else{

    Menu.findById(req.params.id, (err,doc) => {

      BlogCategory.aggregate([
        {$lookup:
         {
           from: 'blogsubcategories',
           localField: '_id',
           foreignField: 'category_id',
           as: 'subcategories'
         }
        },
        { $sort: { "createdAt": -1 } }
      ])
      .then(response=>{
        myCache.set(`/menumenuinfo`, response, 10000 );

        res.json({
          response
        })
      })
      .catch({
        response:'false'
      })

    })
  }






}


//STORE
const store = (req,res) => {

  var menu = new Menu();
  menu.menu = req.body.items;
  menu.save((err,doc)=>{
    if(!err){
      res.json({
        response:true,
        message:'Success.'
      })
    }else{
      res.json({
        response:false
      })
    }
  })

}


const viewweb = (req,res) => {


  // **** backup
  nav = myCache.get(`/menu-${req.params.id}`);
  if(nav){
    res.json({
      response:true,
      message:'cache',
      data:nav
    })
  }else{

    Menu.findById(req.params.id, (err,doc) => {

      myCache.set(`/menu-${req.params.id}`, doc, 10000 );

      res.json({
        response:true,
        message:'db',
        data:doc
      })
    })
  }


  /////////////////////////////


  //   if(nav){
  //     res.json({
  //       response:'cache',
  //       latest4blog:myCache.get( "latest4blog" ),
  //       random6blog:myCache.get( "random6blog" ),
  //       blogcategory5random:myCache.get( "blogcategory5random" ),
  //       blogcategory5random4getblog:myCache.get( "blogcategory5random4getblog" ),
  //       seohome:myCache.get( "seohome" )
  //     })
  //
  //   }else{
  //
  //     var latest4blog = await Blog.find().sort({_id:-1}).limit(4);
  //     var random6blog = await Blog.aggregate([{$sample:{size:6}}]);
  //     var blogcategory5random = await BlogCategory.aggregate([{$sample:{size:6}}]);
  //     var blogcategory5random4getblog = await Blog.aggregate([{$match:{category:blogcategory5random[0].name}}]).sort({_id:-1}).limit(4);
  //     var seohome = await Page.findOne({name:'Home'});
  //
  //
  //     myCache.set( "latest4blog", latest4blog, 10000 );
  //
  //
  //
  //   }



}


//VIEW
const view = (req,res) => {


  // var links=[];
  // Menu.findById(req.params.id, (err,doc) => {
  //
  //   //1st menu
  //   doc.menu.forEach((item, i) => {
  //
  //
  //
  //     console.log(item)
  //
  //
  //     // if(item.type==='page'){
  //     //     Page.findById(item.id)
  //     //     .then(resp=>{
  //     //       var padata=item;
  //     //       padata.url=resp.url;
  //     //       links.push(padata)
  //     //     })
  //     //
  //     // }
  //     // if(item.type==='blogcategory'){
  //     //   var ppp=await BlogCategory.findById(item.id);
  //     //   var padata=item;
  //     //   padata.url=ppp.url;
  //     //   links.push(padata)
  //     // }
  //
  //
  //     //
  //     // console.log(doc.menu.length);
  //     // console.log(i);
  //
  //     if(doc.menu.length===i+1){
  //       res.json({
  //         links
  //       })
  //     }
  //
  //
  //
  //   });
  //
  //
  //
  // })
  //
  // console.log(links)




  // **** backup
  // nav = myCache.get(`/menu-${req.params.id}`);
  // if(nav){
  //   res.json({
  //     response:true,
  //     message:'cache',
  //     data:nav
  //   })
  // }else{

    Menu.findById(req.params.id, (err,doc) => {

      // myCache.set(`/menu-${req.params.id}`, doc, 10000 );

      res.json({
        response:true,
        message:'db',
        data:doc
      })
    })
  // }


  /////////////////////////////


  //   if(nav){
  //     res.json({
  //       response:'cache',
  //       latest4blog:myCache.get( "latest4blog" ),
  //       random6blog:myCache.get( "random6blog" ),
  //       blogcategory5random:myCache.get( "blogcategory5random" ),
  //       blogcategory5random4getblog:myCache.get( "blogcategory5random4getblog" ),
  //       seohome:myCache.get( "seohome" )
  //     })
  //
  //   }else{
  //
  //     var latest4blog = await Blog.find().sort({_id:-1}).limit(4);
  //     var random6blog = await Blog.aggregate([{$sample:{size:6}}]);
  //     var blogcategory5random = await BlogCategory.aggregate([{$sample:{size:6}}]);
  //     var blogcategory5random4getblog = await Blog.aggregate([{$match:{category:blogcategory5random[0].name}}]).sort({_id:-1}).limit(4);
  //     var seohome = await Page.findOne({name:'Home'});
  //
  //
  //     myCache.set( "latest4blog", latest4blog, 10000 );
  //
  //
  //
  //   }



}

//UPDATE
const update = (req,res) => {
  let updatedData = {
    menu:req.body.items,
  }

  Menu.findByIdAndUpdate(req.params.id, {$set: updatedData})
  .then(response=>{
    res.json({
      response:true
    })
  })
}


// **MODULE EXPORTS**
module.exports = {
  index,store,view,update,clearcache,viewweb,menuinfo
}
