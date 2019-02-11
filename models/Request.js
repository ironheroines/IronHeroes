const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const requestSchema = new Schema({
 subject: {type: String, required: true},
 skillsRequired: String,
 status: {
   type: String,
   enum: ["Open", "Claimed", "Closed"],
   default: "Open",
 },
 address: {type: String, required: true},
 location: {
   type: {
     type: String,
     enum: ["Point"],
     default: "Point",
   },
   coordinates: {
     type: [Number],
     required: true,
   }
 },
 _owner: {type: Schema.Types.ObjectId, ref: "User”},
 }, {
 timestamps: {
   createdAt: "created_at",
   updatedAt: "updated_at"
 }
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;