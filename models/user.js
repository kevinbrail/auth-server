const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define the model
const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true }, 
    password: String
});

//On Save Hook,encrypt password
// Before saving a model,run this function
userSchema.pre('save', function(next){

    //access to the user model
    const user = this;

    //generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {return next(err); }

    //generate hash(encrupt our password using the salk)    
    bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {return next(err); }

        //overwrite plain text password with encrypted password
        user.password = hash;
        next();
        });    
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) { return callback(err);}
        callback(null, isMatch);
    });
}

//Create the model class
const ModelClass = mongoose.model('User', userSchema);

//Export the model
module.exports = ModelClass;