const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    created_on: {type:Date, default: Date.now},
    manufacturer: {type:String},
    customerId: {type:String},
    status:{type:String},
    state: {type:String},
    price: {type:String},
    year:{type:String},
    transmission:{type:String},
    registered:{type:String},
    license:{type:String},
    description: {type:String},
    model: {type:String},
    image_url:{type:String}, 
    

})
 module.exports = mongoose.model("Cars", carSchema)

 



















/*const Joi = require("joi");

const validateCars = api => {
  const schema = {
    id: Joi.number(),
    Owner: Joi.number().integer(),
    created_on: Joi.string().alphanum(),
    status: Joi.string(),
    state: Joi.string(),
    price: Joi.number()
      .integer()
      ,
    manufacturer: Joi.string(),
    model: Joi.string(),
    body_type: Joi.string()
  };

  return Joi.validate(api, schema);
};

module.exports = validateCars;*/
