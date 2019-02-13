const express = require('express');
const router = express.Router();
const {checkConnectedAndActive} = require('../helpers/middlewares')
var User = require("../models/User")

/* GET home page. */
router.get('/', (req, res, next) => {
 res.render('index', {user: req.user});
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
 



// goes to make a request, after checking if user is logged in & active
router.get("/new-request/:id", checkConnectedAndActive, (req, res, next)=> {
  res.render('new-request')
})

// Create new Helpcall request
router.post('/new-helpcall', (req, res) => { 
  const newHelpcall = {
   subject: req.body.subject,
   details: req.body.details,
   address: req.body.address,
   }
  new Helpcall(newHelpcall).save()
	 .then(user => {	
     res.redirect('/')	
   })
});


// Edit User
router.get('/users/:id/edit-user', checkConnectedAndActive, (req, res, next) => {
  User.findById(req.params.id)		
	.then(user => {    
    if(!(req.user._id == req.params.id))
      res.redirect('/');
    else
      res.render('edit-user', { user });
	})		
});

router.post('/users/:id/edit-user', (req, res, next) => { 
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