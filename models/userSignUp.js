const mongoose = require('mongoose');

const signUpSchema = mongoose.Schema({
        _id : mongoose.Schema.Types.ObjectId,  
        first_name:String,
        last_name:String,
        email: {
            type:String, 
            required: true, 
            unique: true, 
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        password: {type:String, required: true},
        address:String,
        is_Admin: String 

})

module.exports = mongoose.model("User", signUpSchema)










/*const Joi = require('joi');

const validateLogin = (api) => {
    const schema = {        
        id:Joi.number(),
        first_name:Joi.string(),
        last_name:Joi.string(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password:Joi.string().required(),
        address:Joi.string().required(),
        is_Admin: Joi.boolean().required()          
              
};
    return  Joi.validate(api, schema);    
}
 
module.exports = validateLogin;*/
