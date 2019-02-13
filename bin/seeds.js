// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const bcryptSalt = 10;

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

let users = [
  {
    username: "Spiderman",
    password: bcrypt.hashSync("spider", bcrypt.genSaltSync(bcryptSalt)),
    email: "spider@man.com",
    confirmationCode: "00001",
    status: 'Active',
    pictureUrl: 'images/spiderman.png',
    isSuperHero: true,
    skills: ["wrist web-shooters", "cling to most solid surfaces"],
  },{
    username: "Aaronman",
    password: bcrypt.hashSync("pepper", bcrypt.genSaltSync(bcryptSalt)),
    email: "iron@man.com",
    confirmationCode: "00002",
    status: 'Active',
    pictureUrl: "images/IH_Jan1930.jpg",
    // 'https://b.kisscc0.com/20180720/wve/kisscc0-iron-man-s-armor-spider-man-download-ironman-5b526c7f38b4b3.9306334015321283832323.jpg',
    isSuperHero: true,
    skills: ["supersonic flight", "regenerative life support", "energy repulsor", "recaps"]
  },{
    username: "Thor",
    password: bcrypt.hashSync("hammer", bcrypt.genSaltSync(bcryptSalt)),
    email: "thor@thor.com",
    confirmationCode: "00003",
    status: 'Active',
    pictureUrl:
      'https://scontent-lhr3-1.cdninstagram.com/vp/bc749ae7a0d25e13c953cc7062bcfaa2/5CFF01AA/t51.2885-15/e35/47692377_2004214382998139_1864336324419116359_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com&se=7&ig_cache_key=MTk1MzAwNDUyMzg5NTUwODI5OA%3D%3D.2',
    isSuperHero: true,
    skills: [
      'weather manipulation',
      'flight',
      'dimensional transportation',
      'electric manipulation',
      'jQuery'
    ]
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
