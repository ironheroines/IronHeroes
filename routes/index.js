const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { checkConnectedAndActive } = require('../helpers/middlewares');
var Helpcall = require('../models/Helpcall');
var User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/find-super-hero', (req, res, next) => {
  User.find().then(allUsers => {
    res.render('find-super-hero', {
      allUsers
    });
  });
});

// goes to make a request, after checking if user is logged in & active
router.get('/new-request/:id', checkConnectedAndActive, (req, res, next) => {
  Helpcall.find({ _superhero: mongoose.Types.ObjectId(req.params.id) })
    .populate('_owner')
    .then(helpcalls => {
      User.findById(req.params.id).then(superhero => {
        res.render('new-request', {
          helpcalls,
          superhero
        });
      });
    });
});

router.post('/new-helpcall', (req, res, next) => {
  console.log('In new help call, req.user', req.user);
  console.log('In new help call, req.body', req.body);
  Helpcall.create({
    subject: req.body.subject,
    details: req.body.details,
    _superhero: req.body.superhero,
    _owner: req.user._id
    // address: req.body.address,
  }).then(user => {
    res.redirect('/new-request/'+req.body.superhero);
  });
});

// Edit User
router.get('/users/:id/profile', checkConnectedAndActive, (req, res, next) => {
  // If the connected user is not the one with the profile
  if (!(req.user._id == req.params.id)) {
    res.redirect('/');
    return;
  }

  Helpcall.find({ _owner: req.params.id }).then(outgoing => {
    Helpcall.find({ _superhero: req.params.id }).then(incoming => {
      User.findById(req.params.id).then(user => {
        res.render('profile', { user, incoming, outgoing });
      });
    });
  });
});

router.post('/users/:id/profile', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    email: req.body.email
  }).then(user => {
    res.redirect('/');
  });
});

// Delete User and helpcalls created by this user
router.get('/users/:id/delete', (req, res, next) => {
  if (!(req.user._id == req.params.id)) res.redirect('/');
  else
    Promise.all([
      Helpcall.remove({
        _owner: mongoose.Types.ObjectId(req.params.id)
      }),
      User.findByIdAndRemove(req.params.id)
    ])
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      next();
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
