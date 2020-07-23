const mongoose = require('mongoose')

const ProductsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  size: [{type: String}],
  sizedetails: [{type: String}],
  qty : [{type : String}],
  price: {
    type: Number,
    required: true
  },
  images: [{type: String}],
  sizechart:{type:String},
  rating: {
    type: Number, 
    min: 0,
    max: 5     
  },
  tags: [{type: String}],
  special:{type:Boolean},
  brands:[{type: String}],
  color: [{type: String}],
  description: String
})

const ModelProducts = mongoose.model('product', ProductsSchema)

module.exports = ModelProducts

