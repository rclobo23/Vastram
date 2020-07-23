const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
  catname: [{
    type: String,
  }],
  hide:{type:Boolean},
  images: [{type: String}],
  subcats: [{type:String}]
})

const ModelCategorys = mongoose.model('category', CategorySchema)

module.exports = ModelCategorys

