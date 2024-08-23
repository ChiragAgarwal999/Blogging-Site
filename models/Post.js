const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    title: String,    
    description: String,
    file: String,
    email: String
});

const PostModel = new mongoose.model('posts', userSchema);
//Export the model
module.exports = PostModel;