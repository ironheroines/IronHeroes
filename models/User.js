<<<<<<< HEAD
const mongoose = require("mongoose");
=======
const mongoose = require('mongoose');
>>>>>>> 8bbdf5e6dd224320ea4ea95c153aafc344b50579
const Schema   = mongoose.Schema;

// creating a user schema
const userSchema = new Schema({
 username: String,
 password: String,
 email: {type: String, required: true},
 name: String,
 status: {
   type: String,
<<<<<<< HEAD
   enum: ["Pending Confirmation", "Active"],
   default: "Pending Confirmation"
=======
   enum: ['Pending Confirmation', 'Active'],
   default: 'Pending Confirmation'
>>>>>>> 8bbdf5e6dd224320ea4ea95c153aafc344b50579
 },
 pictureUrl: String,
 isSuperHero: Boolean,
 // confirmationCode: {type: String, required: true, unique: true},
 }, {
 timestamps: {
<<<<<<< HEAD
   createdAt: "created_at",
   updatedAt: "updated_at"
 }
});

const User = mongoose.model("User", userSchema);
=======
   createdAt: 'created_at',
   updatedAt: 'updated_at'
 }
});

const User = mongoose.model('User', userSchema);
>>>>>>> 8bbdf5e6dd224320ea4ea95c153aafc344b50579
module.exports = User;
