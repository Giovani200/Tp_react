const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

// User Schema
const userSchema = mongoose.Schema(
  {
    prenom: { 
      type: String, 
      required: true 
    },   
		avatar: { 
      type: String, 
      default: 'https://lorempicture.point-sys.com/400/300/',
      required: false
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    isActive: {
      type: Boolean,
      required : false, 
    }, 

    isVerified:{
      type: Boolean,
      required : false,
    },
    password: { 
      type: String, 
      required: true 
    },
    role: {
      type: String, 
      enum: ['user', 'admin', 'superAdmin'],
      default: 'user',
    }
  },
  { timestamps: { createdAt: true } }
)

userSchema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('User', userSchema);
