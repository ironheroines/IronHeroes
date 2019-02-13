const express = require('express');
const mongoose = require("mongoose")
const router = express.Router();
const {checkConnectedAndActive} = require('../helpers/middlewares')
var Helpcall = require("../models/Helpcall")
var User = require("../models/User")

/* GET home page. */
router.get('/', (req, res, next) => {
 res.render('index', {user: req.user});
});


router.get('/find-super-hero', (req,res,next)=> {
 User.find()
  .then(allUser => {
     res.render('find-super-hero', {
  allUser}
  )}
  )
})
 

// goes to make a request, after checking if user is logged in & active
router.get("/new-request/:id", checkConnectedAndActive, (req, res, next)=> {
  const userId = mongoose.Types.ObjectId(req.params.id);
  Helpcall.find({
    superhero: userId,
  }) 
  .then(helpcalls => {
    console.log("DEBUG", helpcalls);
    res.render('new-request', {
      helpcalls,
      superhero: req.params.id,
    });
  })
  
})

router.post('/new-helpcall', (req, res, next) => { 
  // console.log('DEBUG')
  Helpcall.create({
  subject: req.body.subject,
  details: req.body.details,
  superhero: req.body.superhero,
  _owner: req.user._id,
  // address: req.body.address,
  })
	.then(user => {	
    res.redirect('/find-super-hero')	
  })
});


// Edit User
router.get('/users/:id/profile', checkConnectedAndActive, (req, res, next) => {
  // If the connected user is not the one with the profile
  if(!(req.user._id == req.params.id)) {
    res.redirect('/');
    return;
  }

  Helpcall.find({_owner: req.params.id})
    .then(hellpcalls => {
      User.findById(req.params.id)		
      .then(user => {    
        res.render('profile', { user, hellpcalls });
      })		
    })
});

router.post('/users/:id/profile', (req, res, next) => { 
  User.findByIdAndUpdate(req.params.id, {
  username: req.body.username,
  email: req.body.email,
  })
	.then(user => {	
    res.redirect('/')	
  })
});

// Delete User
router.get('/users/:id/delete', (req, res, next) => {
  if(!(req.user._id == req.params.id))
    res.redirect('/');
  else
    User.findByIdAndRemove(req.params.id)
    .then(user => {	
      res.redirect('/')
    })	
});


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