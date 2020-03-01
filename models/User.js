const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
      type: String
    },
    password:{ 
        type: String,
        required: true
    }
}, { timestamps: true })
module.exports = mongoose.model('users', UserSchema)

