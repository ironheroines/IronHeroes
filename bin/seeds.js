// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Helpcall = require("../models/Helpcall")
require('dotenv').config();

const bcryptSalt = 10;

mongoose
  .connect(process.env.DATABASE_URI, { useNewUrlParser: true })
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
    username: 'Spiderman',
    password: bcrypt.hashSync('spider', bcrypt.genSaltSync(bcryptSalt)),
    email: 'spider@man.com',
    confirmationCode: '00001',
    status: 'Active',
    pictureUrl: '/images/spiderman.png',
    isSuperHero: true,
    skills: ['wrist web-shooters', 'cling to most solid surfaces']
  },
  {
    username: 'Aaronman',
    password: bcrypt.hashSync('pepper', bcrypt.genSaltSync(bcryptSalt)),
    email: 'aaron@man.com',
    confirmationCode: '00002',
    status: 'Active',
    pictureUrl: '/images/IH_Jan1930.jpg',
    isSuperHero: true,
    skills: [
      'recaps',
      "console.log",
      'regenerative life support',
      'energy repulsor',
    ]
  },
  {
    username: 'Thor',
    password: bcrypt.hashSync('hammer', bcrypt.genSaltSync(bcryptSalt)),
    email: 'thor@thor.com',
    confirmationCode: '00003',
    status: 'Active',
    pictureUrl: '/images/Thor.jpg',
    isSuperHero: true,
    skills: [
      'hammer',
      'dimensional transportation',
      'jQuery',
      "confidant",
    ]
  },
  {
    username: 'Makes-Sense',
    password: bcrypt.hashSync('42', bcrypt.genSaltSync(bcryptSalt)),
    email: 'makes@sense.com',
    confirmationCode: '00004',
    status: 'Active',
    pictureUrl: '/images/Makes-Sense.jpg',
    isSuperHero: true,
    skills: ["Mastermind", 'solving complex tasks', 'coding trance']
  },
  {
    username: 'Batman',
    password: bcrypt.hashSync('bat', bcrypt.genSaltSync(bcryptSalt)),
    email: 'bat@man.com',
    confirmationCode: '00005',
    status: 'Active',
    pictureUrl: '/images/Batman.jpg',
    isSuperHero: true,
    skills: [
      'rich',
      'martial artist',
      'expert detective',
      'high-tech equipment'
    ]
  },
  {
    username: 'Luigi',
    password: bcrypt.hashSync('yoshi', bcrypt.genSaltSync(bcryptSalt)),
    email: 'super@luigi.com',
    confirmationCode: '00006',
    status: 'Active',
    pictureUrl: '/images/Luigi.png',
    isSuperHero: true,
    skills: ['plumbing', 'going wild on mushrooms']
  },
  {
    username: 'Wonderwoman',
    password: bcrypt.hashSync('feminism', bcrypt.genSaltSync(bcryptSalt)),
    email: 'wonder@woman.com',
    confirmationCode: '00007',
    status: 'Active',
    pictureUrl: '/images/Wonderwoman.jpg',
    isSuperHero: true,
    skills: ['woman who codes', 'Lasso of Truth']
  },
  {
    username: 'Superaxel',
    password: bcrypt.hashSync('axe', bcrypt.genSaltSync(bcryptSalt)),
    email: 'axel@ironhack.com',
    confirmationCode: '00008',
    status: 'Active',
    pictureUrl: '/images/Superaxel.jpeg',
    isSuperHero: true,
    skills: ['linux', 'canvas', 'google']
  },
  {
    username: 'Kong',
    password: bcrypt.hashSync('banana', bcrypt.genSaltSync(bcryptSalt)),
    email: 'donkey@kong.com',
    confirmationCode: '00009',
    status: 'Active',
    pictureUrl: '/images/Kong.png',
    isSuperHero: true,
    skills: ['strong', 'clumsy', "wreckful"]
  },
  {
    username: 'Ruby',
    password: bcrypt.hashSync('ruby', bcrypt.genSaltSync(bcryptSalt)),
    email: 'ruby@rub.com',
    confirmationCode: '00010',
    status: 'Active',
  },
  {
    username: 'Julia',
    password: bcrypt.hashSync('julia', bcrypt.genSaltSync(bcryptSalt)),
    email: 'julia@jul.com',
    confirmationCode: '00011',
    status: 'Active',
  },
  {
    username: 'Java',
    password: bcrypt.hashSync('java', bcrypt.genSaltSync(bcryptSalt)),
    email: 'java@jav.com',
    confirmationCode: '00012',
    status: 'Active',
  },
];

User.deleteMany()
  .then(() => Helpcall.deleteMany())
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));


    let helpcalls = [
      {
        subject: "No coffee on 20th floor",
        details: "Please check the water pipes",
        status: 'Claimed',
        //  reference to the superhero
        _superhero: usersCreated[5]._id, // The 5th user _id (mario)
        // reference to the requestor
        _owner: usersCreated[usersCreated.length - 1]._id, // The last user _id
      },
    ];

    return Helpcall.create(helpcalls);
  })
  .then(helpcallsCreated => {
    console.log(`${helpcallsCreated.length} helpcalls created with the following id:`);
    console.log(helpcallsCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
