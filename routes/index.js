const express = require('express');
const router = express.Router();
const {checkConnectedAndActive} = require('../helpers/middlewares')
var User = require("../models/User")

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index');
});


router.get('/find-super-hero', (req,res,next)=> {
 //let user = req.user // When connected to database, req.user is a document with the information of the logged in user
 User.find()
  .then(user => {
     res.render('find-super-hero', {
  user}
  )}
  )
})
 



// find Superhero by ones ID
router.get("/users/offer/:id", (req, res, next)=> {
 console.log("DEBUG")
 User.findById(req.params.id)
   .then(user => {

     console.log("DEBUG profile page", user)
});
})


// //POST new request to the database
// router.post('/new-goal', isLoggedIn, (req,res,next)=> {
//   Goal.create({
//     title: req.body.title,
//     frequency: req.body.frequency,
//     history: [{date: tools.currentDate(), value: 0}],
//     _user: req.user._id,
//     lastUpdate: tools.currentDate(),
//     nextWeekUpdate: tools.startDayOfFollowingWeek()
//   })
//   .then(goal=> {
//     res.redirect('/')
//   })
//   .catch(err=> {
//     console.log("Error at POST /new-goal", err);
//   })
// })

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