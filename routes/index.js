const express = require(‘express’);
const router = express.Router();
const {checkConnectedAndActive} = require(‘../helpers/middlewares’)
var Comment = require(“../models/Comment”)
var User = require(“../models/User”)

/* GET home page. */
router.get(‘/’, function(req, res, next) {
 res.render(‘index’);
});

router.get(‘/profile’, checkConnectedAndActive, (req,res,next)=> {
 let user = req.user // When connected to database, req.user is a document with the information of the logged in user
 res.render(‘profile’, {
   user
 })
})



// find Superhero by ones ID
router.get(“/users/offer/:id”, (req, res, next)=> {
 console.log(“DEBUG”)
 User.findById(req.params.id)
   .then(user => {

     console.log(“DEBUG profile page”, user)
});
}

// comment sources
// var comment = new Comment({
//   username: req.body.username,
//   content: req.body.comment,
//   created: Date.now(),
// });

// Save a comment in the database
// comment.save()
//   .then(comment => {console.log(“The comment was created”)})
//   .catch(err => { console.log(“An error occured”, err)});

module.exports = router;