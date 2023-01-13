const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim : true
    },
    email :{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },

    
    product : {type: mongoose.Schema.Types.ObjectId, ref: "product"}


},    {
    timestamps : true
});
userSchema.plugin(passportLocalMongoose, {usernameField: "email"});






const User = mongoose.model('User', userSchema);

module.exports = User;