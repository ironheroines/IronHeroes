const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const transporter = require('../helpers/transporter');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('/login', (req, res, next) => {
  res.render('auth/login', { message: req.flash('error') });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  console.log('Signup: Lookinhg for username and password');
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username === '' || password === '' || email === '') {
    res.render('auth/signup', {
      message: 'Indicate username, password and email'
    });
    return;
  }

  console.log('Signup: Detecting if username exists');
  // detect if username or email already exists
  User.findOne({ $or: [{ username }, { email }] }, 'username', (err, user) => {
    console.log('Signup: Well, does it?', user);
    if (user !== null) {
      res.render('auth/signup', {
        message: 'The username or the email already exists'
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const characters =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
    }

    //Saving the user with all given information
    const newUser = new User({
      username,
      password: hashPass,
      email, // same as: email:email
      confirmationCode: token
    });

    let message = `
    Hello ${username}.
    To confirm your account with IronHeroes, please click: <a href="${
      process.env.BASE_URL
    }/auth/confirm/${token}">here</a>
    `;

    console.log('Signup: Saving new user');
    newUser
      .save()
      .then(() => {
        // passport.authenticate('local', {
        //   successRedirect: "/",
        //   failureRedirect: "/auth/login",
        //   failureFlash: true,
        //   passReqToCallback: true
        transporter
          .sendMail({
            from: '"IronHeroes"',
            to: email,
            subject: 'Validate your account',
            text: message,
            html: `<b>${message}</b>`
          })
          .then(() => {
            res.redirect('/');
          });
      })
      .catch(err => {
        res.render('auth/signup', { message: 'Something went wrong' });
      });
  });
});

//  router.get("/signup-done", (req, res, next) => {
//   res.render("auth/signup-done");
//  });

router.get('/confirm/:confirmationCode', (req, res, next) => {
  User.findOneAndUpdate(
    { confirmationCode: req.params.confirmationCode }, //getting a certain info from the URL
    { status: 'Active' }
  )
    .then(user => {
      if (user) {
        // to log in the user found in the database:
        req.logIn(user, () => {
          res.render('/', {
            user,
            isConnectedAndActive: true //to override a value defined by a previous middleware
          });
        });
      } else res.render('/auth/signup');
    })
    .catch(err => next(err));
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
