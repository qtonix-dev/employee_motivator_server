const {response} = require('express');
const Blog = require('../models/Blog');
const BlogCategory = require('../models/BlogCategory');
const BlogSubCategory = require('../models/BlogSubCategory');
const axios = require('axios');
const Page = require('../models/Page');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const sharp = require('sharp');
const fs = require('fs');




const clearcache = (req,res) => {
  myCache.flushAll();
  res.json({
    response:true,
    message:'done'
  })
}


//SHOW ALL BLOGS
const index = async (req,res) => {
  // Blog.find().sort({createdAt:-1})
  // .then(response=>{
  //   res.json({
  //     response:response
  //   })
  // })

  const blogs = await Blog.find().populate('category').populate('user_info').select('_id title contentreadtime status thumbnail_image createdAt').sort({createdAt:-1});
  const meta = await Page.findOne({url:'/blogs'})

    res.json({
      blogs:blogs,
      meta:meta
    })


}



const getallblogsweb = async (req,res) => {

  // const blogs = await Blog.find({}).populate(['user_info','category']).sort({createdAt:-1});
  // const meta = await Page.findOne({url:'/blogs'})
  //
  // res.json({
  //   blogs:blogs,
  //   meta:meta
  // })


  //new
  nav = myCache.get(`getallblogsweb_blogs`);

  if(nav){

    res.json({
      blogs:myCache.get(`getallblogsweb_blogs`),
      meta:myCache.get(`getallblogsweb_meta`)
    })

  }else{


    const blogs = await Blog.find({status:true}).populate(['user_info','category']).sort({createdAt:-1});
    const meta = await Page.findOne({url:'/blogs'})

    myCache.set(`getallblogsweb_blogs`, blogs, 10000 );
    myCache.set(`getallblogsweb_meta`, meta, 10000 );

    res.json({
      blogs:blogs,
      meta:meta
    })


  }






}




//HOME PAGE CONTENT
const homepage = async (req,res) => {


  // var latest4blog = await Blog.find().sort({_id:-1}).limit(4);
  // var random6blog = await Blog.aggregate([{$sample:{size:6}}]);
  // var blogcategory5random = await BlogCategory.aggregate([{$sample:{size:6}}]);
  // var blogcategory5random4getblog = await Blog.aggregate([{$match:{category:blogcategory5random[0].name}}]).sort({_id:-1}).limit(4);
  // var seohome = await Page.findOne({name:'Home'});
  //
  // res.json({
  //   latest4blog:latest4blog,
  //   random6blog:random6blog,
  //   blogcategory5random:blogcategory5random,
  //   blogcategory5random4getblog:blogcategory5random4getblog,
  //   seohome:seohome
  // })





  nav = myCache.get( "seohome" );
    if(nav){
      res.json({
        response:'cache',
        latest4blog:myCache.get( "latest4blog" ),
        random6blog:myCache.get( "random6blog" ),
        // blogcategory5random:myCache.get( "blogcategory5random" ),
        // blogcategory5random4getblog:myCache.get( "blogcategory5random4getblog" ),
        seohome:myCache.get( "seohome" ),
        seo8blog:myCache.get( "seo8blog" ),



      })

    }else{

      var latest4blog = await Blog.find({status:true}).select({"_id": 1, "contentreadtime":1 ,"title": 1,"description": 1,"blogurl": 1,"createdAt": 1,"thumbnail_image": 1,"banner_color": 1, }).sort({_id:-1}).limit(4);
      var random6blog = await Blog.aggregate([
        {
          $match:{'status':true}
        },
        {
          $lookup: {
            from: 'blogcategories',
            localField: 'category',
            foreignField: '_id',
            as: 'category'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_info',
            foreignField: '_id',
            as: 'user_info'
          }
        },
        {
        $sample:{size:6}
      },
        { $project: {
        "_id": 1,
        "title": 1,
        "description": 1,
        "contentreadtime":1,
        "blogurl": 1,
        "createdAt": 1,
        "thumbnail_image": 1,
        "banner_color": 1,


        "user_info.name": 1,
        "category.name": 1,


        }},
      ]);

      var seo8blog = await Blog.find({status:true,category:'636a04447234a86910a70b7d'})
            .populate('category',['name'])
            .populate('user_info',['name'])

            .select({"_id": 1,"title": 1,"description": 1,"blogurl": 1, "contentreadtime":1 ,"createdAt": 1,"thumbnail_image": 1,"banner_color": 1, }).sort({_id:-1}).limit(8);

      // var blogcategory5random = await BlogCategory.aggregate([
      //   {$sample:{size:6}},
      //   { $project: {
      //   "_id": 1,
      //   "name": 1,
      //   "description": 1,
      //   "url": 1,
      //   "image": 1,
      //   }},
      // ]);
      // var blogcategory5random4getblog = await Blog.aggregate([
      //   {$match:{category:blogcategory5random[0].name}},
      // ]).sort({_id:-1}).limit(4);
      var seohome = await Page.findOne({name:'Home'}).select({"metatitle": 1,"metadescription": 1 });


      myCache.set( "latest4blog", latest4blog, 10000 );
      myCache.set( "random6blog", random6blog, 10000 );
      // myCache.set( "blogcategory5random", blogcategory5random, 10000 );
      // myCache.set( "blogcategory5random4getblog", blogcategory5random4getblog, 10000 );
      myCache.set( "seohome", seohome, 10000 );
      myCache.set( "seo8blog", seo8blog, 10000 );




      res.json({
        response:'db',
        latest4blog:latest4blog,
        random6blog:random6blog,
        seo8blog:seo8blog,
        // blogcategory5random:blogcategory5random,
        // blogcategory5random4getblog:blogcategory5random4getblog,
        seohome:seohome
      })

    }














}


//LATEST BLOGS
const latestblog = (req,res) => {
  const no = Number(req.params.no);
  Blog.find({},{'_id':1,'totalurl':1,'imagethumb':1,'title':1,'description':1, "contentreadtime":1}).sort({_id:-1}).limit(no).exec(function(err,response){
    if(!err){
      res.json({
        message:'success',
        latestblogs:response
      })
    }else{
      res.json({
        message:'failed'
      })
    }
  })
}

//RELATED ARTICLE BY CATEGORY
const relatedarticle = (req,res) => {
  const no = Number(req.params.no);
  const getcategory = req.params.categoryname.replace(/\b\w/g, l => l.toUpperCase());

  Blog. aggregate([
    {$match:{category:getcategory}},
    {$sample:{size:no}}
  ]).sort({_id:-1}).exec(function(err,response){

    if(!err){
      res.json({
        response:true,
        data:response
      })
    }else{
      res.json({
        response:false
      })
    }
  })
}





const viewsubcategorylist = (req,res) => {

  nav = myCache.get(`/viewsubcategorylist-${req.params.subcategoryname}`);
  if(nav){

    res.json({
      response:true,
      data:nav,
    })

  }else{
    BlogSubCategory.findOne({url:req.params.subcategoryname},(err,doc)=>{
      if(!err){
        if(doc===null){
          res.json({
            response:false
          })
        }else{
          // Blog.find({subcategory:doc._id}).populate(['user_info','category','subcategory']).sort({createdAt:-1})
          Blog.find({status:true,subcategory:doc._id})
          // .select({"content": 0}).populate(['user_info','category','subcategory'])
          .populate('user_info',['name'])
          .populate('category',['name'])
          .select({
              "_id": 1,
              "title": 1,
              "description": 1,
              "thumbnail_image": 1,
              "banner_color": 1,
              "blogurl": 1,
              "createdAt": 1,
              "contentreadtime":1
          })


          .sort({createdAt:-1})
          .then(response=>{

            console.log(response)

            myCache.set(`/viewcategorylist-${req.params.subcategoryname}`, response, 10000 );

            res.json({
              response:true,
              data:response,
            })
          })
        }

      }else{
        res.json({
          response:false
        })
      }
    })

  }
}







const viewcategorylist = (req,res) => {


  nav = myCache.get(`/viewcategorylist-${req.params.categoryname}`);
  if(nav){

    res.json({
      response:true,
      data:nav,
    })


  }else{


    BlogCategory.findOne({url:req.params.categoryname},(err,doc)=>{
      if(!err){
        if(doc===null){
          res.json({
            response:false
          })
        }else{
          // Blog.find({status:true,category:doc._id})
          Blog.find({status:true,category:doc._id})
          // .populate(['user_info','category'])
          .populate('user_info',['name'])
          .populate('category',['name'])
          .select({
              "_id": 1,
              "title": 1,
              "description": 1,
              "thumbnail_image": 1,
              "banner_color": 1,
              "blogurl": 1,
              "createdAt": 1,
              "contentreadtime":1
          })
          .sort({createdAt:-1})

          .then(response=>{
            myCache.set(`/viewcategorylist-${req.params.categoryname}`, response, 10000 );


            res.json({
              response:true,
              data:response,
            })
          })
        }

      }else{
        res.json({
          response:false
        })
      }
    })



  }








  // BlogCategory.findOne({url:req.params.categoryname},(err,doc)=>{
  //   if(!err){
  //
  //     if(doc===null){
  //       res.json({
  //         response:false
  //       })
  //     }else{
  //       Blog.find({category:doc._id}).sort({createdAt:-1})
  //       .then(response=>{
  //         res.json({
  //           response:true,
  //           data:response,
  //         })
  //       })
  //     }
  //
  //   }else{
  //     res.json({
  //       response:false
  //     })
  //   }
  // })





}




//STORE BLOG
const store = (req,res) => {

    sharp(req.file.path).resize(400, 270).toFile('uploads/blogimages/' + 'thumbnails-' + req.file.filename, (err, resizeImage) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resizeImage);
      }
    })

    sharp(req.file.path).resize(120, 120).toFile('uploads/blogimages/' + 'imagesmall-' + req.file.filename, (err, resizeImage) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resizeImage);
      }
    })

    // var urlLower = req.body.title.toLowerCase();
    // var url = urlLower.replace(/ /g,'-');

    var blog = new Blog();
    blog.blogurl = req.body.blogurl;
    blog.categoryurl = '/blogs/'+req.body.category.toLowerCase();
    blog.totalurl = '/blogs/'+req.body.category.toLowerCase()+'/'+req.body.blogurl;
    blog.title= req.body.title;
    blog.description= req.body.description;
    blog.category= req.body.category;
    blog.imagethumb= 'uploads/blogimages/' + 'thumbnails-' + req.file.filename;
    blog.imagesmall= 'uploads/blogimages/' + 'imagesmall-' + req.file.filename;
    blog.image= req.file.path;
    blog.content= req.body.content;
    blog.metatitle= req.body.metatitle;
    blog.metadescription= req.body.metadescription;
    blog.metakey= req.body.metakey;
    blog.auth_email= req.body.auth_email;
    blog.auth_id= req.body.auth_id;
    blog.save((err,doc)=>{
      if(!err){
        res.json({
          response:'true',
          message:'Successfully Created'
        })
      }else{
        res.json({
          response:'false',
          message:'Failed'
        })
      }
    })


}



//store now
const createnew =(req,res) => {
  var blog=req.body;
  // console.log(blog)

  const data={
    "message":{
        "icons":"https://blog.qtonix.com/images/logowhite.png",
        "image":blog.thumbnail_image,
        "text":blog.description,
        "title":blog.title,
        "url":"https://blog.qtonix.com/blog/"+blog.url
    }
  };

  const headers = {
    'Authorization-Token': '2bdc402c64c2d95a2f6e60c5cde429cbb7751d680409013b',
  }

  axios.post('http://notix.io/api/send?app=1005478836377757d8139deae45da8c',data,{headers:headers})
  .then(ares=>{
    console.log('push notification send success')
  })


  Blog.create(blog)
  .then(response=>{
    res.json({
      response:true,
      message:'Successfully Created'
    })
  })

}



const updatenew =(req,res) => {

  console.log(req.body)

  var updateData=req.body;
  Blog.findByIdAndUpdate(req.body.id, {$set:updateData})
  .then(response=>{
    console.log(response)
    res.json({
      response:true
    })
  })
}



//VIEW BY URL
const viewbyurl = (req,res) => {
  Blog.findOne({blogurl:req.params.url}, (err,doc)=>{
    if(!err){
      res.json({
        response:true,
        data:doc,
      })
    }else{
      res.json({
        response:false
      })
    }
  })
}


const viewbyurlweb = (req,res) => {


  nav = myCache.get(`/viewbyurlweb-${req.params.url}`);
  if(nav){
    res.json({
      response:true,
      data:nav,
    })

  }else{
    Blog.findOne({blogurl:req.params.url}).populate(['user_info','category'])
    .then(response=>{
      myCache.set(`/viewbyurlweb-${req.params.url}`, response, 10000 );
      res.json({
        response:true,
        data:response,
      })
    })

  }

}




//VIEW
const view = (req,res) => {
  Blog.findById(req.params.id,(err,doc) => {
    if(!err){
      res.json({
        response:'true',
        data:doc
      })
    }else{
      res.json({
        response:'false'
      })
    }
  })
}


//UPDATE
const update = (req,res) => {

  if(req.file){
    sharp(req.file.path).resize(400, 270).toFile('uploads/blogimages/' + 'thumbnails-' + req.file.filename, (err, resizeImage) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resizeImage);
      }
    })

    sharp(req.file.path).resize(120, 120).toFile('uploads/blogimages/' + 'imagesmall-' + req.file.filename, (err, resizeImage) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resizeImage);
      }
    })
  }

  // var urlLower = req.body.title.toLowerCase();
  // var url = urlLower.replace(/ /g,'-');

  let updateData = {
    // blogurl : req.body.url,
    categoryurl : '/blogs/'+req.body.category.toLowerCase(),
    totalurl : '/blogs/'+req.body.category.toLowerCase()+'/'+req.body.blogurl,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    content: req.body.content,
    metatitle: req.body.metatitle,
    metadescription: req.body.metadescription,
    metakey: req.body.metakey,
    auth_email: req.body.auth_email,
    auth_id: req.body.auth_id,
  }

  if(req.file){
    updateData.image = req.file.path,
    updateData.imagethumb = 'uploads/blogimages/' + 'thumbnails-' + req.file.filename,
    updateData.imagesmall= 'uploads/blogimages/' + 'imagesmall-' + req.file.filename
  }

  Blog.findByIdAndUpdate(req.params.id, {$set:updateData})
  .then(response=>{
    res.json({
      response:'true'
    })
  })
}


const deleteblog = (req,res) => {


  // Blog.findById(req.params.id,(err,doc) => {
  //   if(!err){


      //REMOVE IMAMGES
      // fs.unlink(doc.image, (err) => {
      //     if (err) {
      //       console.log("failed to delete local image:"+err);
      //     } else {
      //       console.log('successfully deleted local image');
      //     }
      // });
      // fs.unlink(doc.imagethumb, (err) => {
      //     if (err) {
      //       console.log("failed to delete local image:"+err);
      //     } else {
      //       console.log('successfully deleted local image');
      //     }
      // });
      // fs.unlink(doc.imagesmall, (err) => {
      //     if (err) {
      //       console.log("failed to delete local image:"+err);
      //     } else {
      //       console.log('successfully deleted local image');
      //     }
      // });

      //DELETE DATA
      Blog.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
          res.json({
            response:'true'
          })
        }else{
          res.json({
            response:'false'
          })
        }
      })



  //   }else{
  //     res.json({
  //       response:'false'
  //     })
  //   }
  // })




}



// **MODULE EXPORTS**
module.exports = {
  index,viewsubcategorylist,getallblogsweb,store,view,update,deleteblog,viewcategorylist,latestblog,viewbyurl,relatedarticle,homepage,clearcache,createnew,updatenew,viewbyurlweb
}
