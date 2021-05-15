const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: [5, 'minimum length of username is 5'],
    maxlength: [15, 'maximum length for username is 15'],
    validate: {
      validator: function(v) {
        return /[A-Za-z0-9]/.test(v)
      },
      message: props => `${props.value} contains non-alphanumerical characters`
    },
    required: [true , 'username is required']
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User