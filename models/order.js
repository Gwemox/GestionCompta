'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require(__dirname + '/baseModel.js');

class Order extends BaseModel {
  constructor() {
    super();
    this.setFields({
        products: [{
            product: {type: mongoose.Schema.ObjectId, required: true, ref: 'Product'},
            quantity: {type: Number, required: true}
        }],
        user: {type: mongoose.Schema.ObjectId, ref: 'User'},
        paid: {type: Boolean, default: false}
    });
  }
}
// export the class
module.exports = Order;
