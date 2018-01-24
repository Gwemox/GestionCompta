'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require(__dirname + '/baseModel.js');

class User extends BaseModel {
  constructor() {
    super();
    this.setFields({
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        birthDate: {type: Date, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        business: {type: Boolean, default: false},
        businessName: {type: String, required: false},
        number: {type: Number, required: true},
        street: {type: String, required: true},
        zip_code: {type: String, required: true},
        city: {type: String, required: true},
        country: {type: String, required: true}
      });
  }
}
// export the class
module.exports = User;
