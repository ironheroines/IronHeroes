const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// creating a user schema
const userSchema = new Schema({
 username: String,
 password: String,
 email: {type: String, required: true},
 status: {
   type: String,
   enum: ['Pending Confirmation', 'Active'],
   default: 'Pending Confirmation'
 },
 pictureUrl: String,
 isSuperHero: Boolean,
 // confirmationCode: {type: String, required: true, unique: true},
 }, {
 timestamps: {
   createdAt: 'created_at',
   updatedAt: 'updated_at'
 }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
