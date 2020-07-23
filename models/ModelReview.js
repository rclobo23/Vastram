//ReviewData.model.js
const mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    
        Name: {type: String, required:true},
        Review: {type: String, },
        rating: {type: Number, required:true},
        product: {type: String, },
    }
);
const ModelReview = mongoose.model('ReviewData', ReviewSchema)

module.exports = ModelReview;

