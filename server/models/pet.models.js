const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Name must be unique."],
    required: [true, "Name is required."],
    minlength: [3, "Name must be at least 3 characters long."],
    
  },
  type: {
    type: String,
    required: [true, "Type is required."],
    minlength: [3, "Type must be at least 3 characters long."],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
    minlength: [3, "Description must be at least 3 characters long."],
  },
  skill1: {
    type: String,    
  },
  skill2: {
    type: String,   
  },
  skill3: {
    type: String,   
  },
  likes :{
    type: Number,
    default: 0,
  }
});

// PetSchema.post('save', (error, doc, next) => {
//   if (error.name === 'MongoError' && error.code === 11000) {
//     next(new Error('Name must be unique.'));
//   } else {
//     next(error);
//   }
// });

module.exports = mongoose.model('Pet', PetSchema);

