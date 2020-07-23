//variableData.model.js
const mongoose = require('mongoose');

var VariableSchema = new mongoose.Schema({
    
        logo: {type: String},
        bannertext: {type: String},    
        main_image: {type: String},
        title: {type: String },
        navcolor: {type: String },
        bg: {type: String},
        mbg: {type: String},
    }
);
const ModelVariable = mongoose.model('variableData', VariableSchema)

module.exports = ModelVariable;

