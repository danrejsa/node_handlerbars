const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const loginSchema = mongoose.Schema({
        _id : mongoose.Schema.Types.ObjectId, 
        firstName:{type:String},
        lastName:{type:String},
        address:{type:String},      
        username: {type:String, index: true, unique: true},      
        email: {
            type:String,            
            unique: true, 
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },       
        password: {type:String},
        image_url:{type:String},
        phone:{type:String}
        
})

let User = module.exports = mongoose.model("User", loginSchema)

module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser.save(callback)
        })
    })
}

module.exports.getUserByUsername = (username, callback) => {
    let query = {username:username};
    User.findOne(query, callback);
}


module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}


module.exports.comparePassword = (userPassword,hash, callback) => {
     bcrypt.compare(userPassword, hash, (err, isMatch) => {
         if(err) throw err;
         callback(null, isMatch)
     })
}










