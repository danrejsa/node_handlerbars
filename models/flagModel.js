const mongoose = require('mongoose');

const flagSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    created_on: {type:Date, default: Date.now},
    //car_id:Joi.number(), 
    name:{type: String},
    email:{type:String},      
    reason:{type:String},
    Car_Id:{type:String},
    description:{type:String} 
    

})
 module.exports = mongoose.model("Flag", flagSchema)



 















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


