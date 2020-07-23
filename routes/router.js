const axios = require('axios')
const express = require('express');
const passport = require('passport');
const Authentication = require('../controllers/authentication');
const router = express.Router();
const ModelProducts = require('../models/ModelProducts');
const ModelLog = require('../models/ModelLog');
const ModelOrders = require('../models/ModelOrders');
const ModelCategories = require('../models/ModelCategory');
const ModelCarousel = require('../models/ModelCarouselData');
const ModelVariable = require('../models/ModelVariable');
const ModelReview = require('../models/ModelReview');
const config = require('../config');
const Razorpay = require('razorpay')
const SHA256 = require("crypto-js/hmac-sha256")
const instance = new Razorpay({
  key_id: config.RZPKEY,
  key_secret: config.RZPSECRET
})
passport.initialize();


router.post('/update/logo', (req, res, next)=> {
  const {logo, id } = req.body
  ModelVariable.findById(id, (err, model) => {
    if (err) return handleError(err);  
    model.set({ logo });
    model.save(function (err, updatedItem) {
      if (err) return console.log(err);
     return updatedItem;
    });
  })
})

router.post('/update/textbanner', (req, res, next)=> {
  const {bannertext, id } = req.body
  ModelVariable.findById(id, (err, model) => {
    if (err) return handleError(err);  
    model.set({ bannertext });
    model.save(function (err, updatedItem) {
      if (err) return console.log(err);
     return updatedItem;
    });
  })
})

router.post('/update/mainimage', (req, res, next)=> {
  const {main_image, id } = req.body
  ModelVariable.findById(id, (err, model) => {
    if (err) return handleError(err);  
    model.set({ main_image});
    model.save(function (err, updatedItem) {
      if (err) return console.log(err);
      return updatedItem;
    });
  })
})
router.post('/update/bg', (req, res, next)=> {
  const {bg, id } = req.body
  ModelVariable.findById(id, (err, model) => {
    if (err) return handleError(err);  
    model.set({bg});
    model.save(function (err, updatedItem) {
      if (err) return console.log(err);
      return updatedItem;
    });
  })
})

router.post('/update/mbg', (req, res, next)=> {
  const {mbg, id } = req.body
  ModelVariable.findById(id, (err, model) => {
    if (err) return handleError(err);  
    model.set({mobileLandingBackground:mbg});
    model.save(function (err, updatedItem) {
      if (err) return console.log(err);
      return updatedItem;
    });
  })
})
router.post('/update/navcolor', (req, res, next)=> {
  const {navcolor, id } = req.body
  ModelVariable.findById(id, (err, model) => {
    if (err) return handleError(err);  
    model.set({ navcolor });
    model.save(function (err, updatedItem) {
      if (err) return console.log(err);
      next();
    });
  })
})

router.get('/variables', (req, res, next)=> {  
  ModelVariable.find((err, x) => {
    err ? res.status(500).send(err) :
    res.json(x)
  })
})

router.get('/carouselData', (req, res)=>{
  ModelCarousel.find((err, x) => {
    err ? res.status(500).send(err) :
    res.json(x)
  })
});
//------------
router.post('/carouselData', (req, res, next)=> {
  const {src, mobilesrc,  caption  } = req.body
  const newItem = new ModelCarousel({ 
    src,
    caption,
  });
  newItem.save((err, saveditem) => {
    if (err) return console.log(err);
    res.send(saveditem);
    next();
  })
})
//-------------
router.post('/carousel/delete', (req, res, next)=> {
  const {id } = req.body
  ModelCarousel.findByIdAndRemove(id, (err, model) => {
    if (err) return console.log(err);
    res.send('item: '+id+' deleted');
})
})
//--------

router.get('/review', (req, res)=>{
  ModelReview.find((err, x) => {
    err ? res.status(500).send(err) :
    res.json(x)
  })
});
//------------
router.get('/review/:id', (req, res)=>{
  ModelReview.find({product: { $eq: req.params.id}},(err, x) => {
    err ? res.status(500).send(err) :
    res.json(x)
  })
});
//------------
router.post('/review', (req, res, next)=> {
  const { Name, rating, Review , product } = req.body
  const newItem = new ModelReview({ 
    Name,
    rating,
    Review,
    product
  });
  newItem.save((err, saveditem) => {
    if (err) return console.log(err);
    res.send(saveditem);
    next();
  })
})
//-------

router.get('/productsdata/', (req, res)=> {
  ModelProducts.find((err, x) => {
      err ? res.status(500).send(err) :
      res.json(x)
  }).sort({_id:-1})
})

router.get('/products/:id', (req, res)=> {      //this route required for individual item
  ModelProducts.findById(req.params.id)
    .then(x => {
      if (!x) return res.status(404).end()
      return res.json(x)
    })
    .catch(err => next(err))
})

router.get('/productsdata/:id', (req, res)=> {
  const { id } = req.params
  id===undefined? ModelProducts.find((err, x) => {
    err ? res.status(500).send(err) :
    res.json(x)
}):
  ModelProducts.find({tags:{$all:[id]}})
    .then(x => {
      if (!x) return res.status(404).end()
      return res.json(x)
    })
    .catch(err => next(err))
})

router.get('/brand/:id', (req, res)=> {
  const { id } = req.params
  id===undefined? ModelProducts.find((err, x) => {
    err ? res.status(500).send(err) :
    res.json(x)
}):
  ModelProducts.find({brands:{$all:[id]}})
    .then(x => {
      if (!x) return res.status(404).end()
      return res.json(x)
    })
    .catch(err => next(err))
})

//===========below required to get the image by giving tag name... ref:subcats-List.js

router.get('/category/imgfromtag/:id', (req, res)=> {
  const { id } = req.params
  id===undefined? ModelProducts.find((err, x) => {
    err ? res.status(500).send(err) :
    res.json(x)
}):
  ModelProducts.findOne({tags:{$all:[id]}} , {'images':1, 'tags':1})
    .then(x => {
      if (!x) return res.status(404).end()
      return res.json(x)
    })
    .catch(err => next(err))
})

//==============================



router.post('/update/item', (req, res, next)=> {
  const { id, title, price, color, size, tags, images, description, sizechart, sizedetails, special, brands } = req.body
  ModelProducts.findById(id, (err, model) => {
    if (err) return console.log(err);
  
    model.set({ title, price, color, size, tags, images, description, sizechart, sizedetails, special, brands  });
    model.save(function (err, updatedItem) {
      if (err) return console.log(err);
    });
  }).then(()=>{
    const logUpdate = new ModelLog({ 
      type: 'Update',
      time: new Date(),
      itemid: id,
      itemtitle: title
    });
    logUpdate.save(function(err, logSaved){
      if(err){return next(err);}
      res.end();
    });
  }).catch(err =>console.log(err));
})

router.post('/add/item', (req, res, next)=> {
  const { title, price, description, size, tags, images, color , sizechart,sizedetails,special, brands } = req.body
  const newItem = new ModelProducts({ 
    title,
    price,
    color,
    size,
    tags,
    images,
    description ,
    sizechart,
    sizedetails,
    special,
    brands
  });
  newItem.save((err, saveditem) => {
    if (err) return console.log(err);
    next();
  })
  const logAdd = new ModelLog({ 
    type: 'Create',
    time: new Date(),
    itemid: newItem._id,
    itemtitle: title
  });
  logAdd.save(function(err, logSaved){
    if(err){return next(err);}
    res.end();
  });
})

router.post('/add/orders', (req, res, next)=> {
  const {customerinfo, order, totalDelivery, totalAmount, giftCard, approved } = req.body
  instance.orders.create({amount:totalAmount, currency:'INR', receipt:'trabn_111', payment_capture:1, notes:''})
  .then((data)=>{
    
  const newOrder = new ModelOrders({ 
    ref:data.id,
    customerinfo,
    order,
    giftCard,
    totalDelivery,
    totalAmount,
    approved
  });
  newOrder.save((err, saveditem) => {
    if (err) return console.log(err);
  })
  res.send(data.id)
})
.catch(err=> console.log(err))
})

router.get('/orders', (req, res)=> {
  ModelOrders.find((err, x) => {
      err ? res.status(500).send(err) :
      res.json(x)
  })
})

router.post('/ordersdate', (req, res)=> {
  const { fromdate, todate} = req.body
  ModelOrders.find({createdAt:{$gt:fromdate, $lt:todate}},(err, x) => {
      err ? res.status(500).send(err) :
      res.json(x)
  })
})

router.get('/orders/:id', (req, res)=> {
  const { id } = req.params
  ModelOrders.findOne({ref:id}, (err, x) => {
      err ? res.status(500).send(err) :
      res.json(x)
  })
})

router.post('/approveorder/:id', (req, res)=>{
  const {status} = req.body
  const {id} = req.params
  ModelOrders.findById(id, (err, model) => {
    if (err) return handleError(err);  
    model.set({approved:status});
    model.save(function (err, updatedItem) {
      if (err) return console.log(err);
      console.log(updatedItem);
    });
  })
})

router.post('/confirmpayment/:order_id', (req, res)=>{
  const {order_id, razorpay_order_id, razorpay_payment_id}  = req.params
  const { razorpay_signature} = req.body
  console.log(req.body)
  ModelOrders.findOne({ref:order_id},(err, x)=>{
    err ? res.status(500).send(err) :
    console.log(x.totalAmount)
const gen_sign = SHA256( order_id+"|"+razorpay_payment_id, config.RZPSECRET)
console.log("sec", config.RZPSECRET);
console.log("their signature", razorpay_signature)
if (gen_sign == razorpay_signature){
x.set({payment:razorpay_payment_id})
x.save(function (err, updatedItem) {
  if (err) return console.log(err);
  console.log(updatedItem);
  next();
})
res.send("<p>Payment Successful</p><script>window.location.href='https://ariesfashion.herokuapp.com/order/"+order_id+"'</script>")
}
else
res.send("<p>Payment not Processed</p><script>window.location.href='https://ariesfashion.herokuapp.com/order/"+order_id+"'</script>")
  })
  .catch(err=>console.log(err))
})

router.get('/shopbyprice', (req, res)=> {
  ModelProducts.aggregate([{$group:{_id:{$arrayElemAt:["$tags",0]}, price:{$min:"$price"}, catimg:{$first:"$images"}}}],(err, x) => {
      err ? res.status(500).send(err) :
      res.json(x)
  })
})

router.get('/shopbybrand', (req, res)=> {
  ModelProducts.aggregate([{$group:{_id:{$arrayElemAt:["$brands",0]},catimg:{$first:"$images"}}}],(err, x) => {
      err ? res.status(500).send(err) :
      res.json(x)
  })
})

router.delete('/delete/item/:id', (req, res, next)=> {
  const { id } = req.params
  ModelProducts.findByIdAndRemove(id, (err, model) => {
    if (err) return console.log(err);
    res.send('item: '+id+' deleted');
  })
  .then(()=>{
    const logDelete = new ModelLog({ 
      type: 'Delete',
      time: new Date(),
      itemid: id
    });
    logDelete.save(function(err, logSaved){
      if(err){return next(err);}
      res.end();
    });
  }).catch(err => next(err));
});

router.get('/log', (req, res)=> {
  ModelLog.find((err, x) => {
      err ? res.status(500).send(err) :
      res.json(x)
  })
})

router.get('/category', (req, res)=> {
  ModelCategories.find((err, x) => {
    err ? res.status(500).send(err) :
    res.json(x).status()
})
})

router.get('/navcategory', (req, res)=> {
  ModelCategories.find((err, x) => {
    err ? res.status(500).send(err) :
    res.json(x).status()
}).limit(3).sort({_id:-1})
})

router.post('/update/category', (req, res, next)=> {
  const { id, catname, images, subcats, hide} = req.body
  ModelCategories.findById(id, (err, model) => {
    if (err) return handleError(err);
  
    model.set({ catname, images, subcats, hide});
    model.save(function (err, updatedItem) {
      if (err) return console.log(err);
      console.log(updatedItem);
      next();
    });
  })
})

router.get('/category/:id', (req, res)=> {
  ModelCategories.findById(req.params.id, )
    .then(x => {
      if (!x) return res.status(404).end()
      return res.json(x)
    })
    .catch(err => next(err))
})

router.get('/subcats/:id', (req, res)=> {
  ModelCategories.findById(req.params.id)
    .then(x => {
      if (!x) return res.status(404).end()
      return res.json(x)
    })
    .catch(err => next(err))
})

router.post('/category', (req, res, next)=> {
  const { catname} = req.body
  const newCategory = new ModelCategories({ 
    catname
  });
  newCategory.save((err, saveditem) => {
    if (err) return console.log(err);
    res.end();
  })
})

router.get('/secret', passport.authenticate('jwt', {session: false}), (req, res)=> {
  res.json({authorization: true});
});

router.post('/signin', passport.authenticate('local', {session:false}), Authentication.signin);

router.post('/signup', Authentication.signup);


module.exports = router;
