const mongoose = require('mongoose')

UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    isAdmin:Boolean,
    isBlock:Boolean
})
UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel;