'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require(__dirname + '/baseModel.js');

class Product extends BaseModel {
  constructor() {
    super();
    this.setFields({
        name: {type: String, required: true, index: { unique: true }},
        price: {type: Number, required: true},
        manufacturer: {type: String, required: true},
        category: {type: String, required: true},
        technicalDesc: {type: Array, required: true},
        generalDesc: {type: Array, required: true},
        commercialDesc: {type: Array, required: true}
      });
  }
}
// export the class
module.exports = Product;
