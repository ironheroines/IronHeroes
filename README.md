# IronHeroes

## TODO
x Write a better README file
  x Presentation of the project: screenshots, link, explanations
  x Instructions to execute the project: `git clone ...; npm install; npm run dev` and an example of a `.env` file
x Inside the route `GET /users/:id/delete`, delete the Helpcalls linked to the user
x Add favicon
x Download images
x Rerun the seeds file
- On the profile page, add a button for superheroes to claim/reject a Helpcall
- On the profile page, add a button for users to close a Helpcall
- Bonus: Statistic page to see the best super heroes




# Project Title

Ironhack Project #2: IronHeroes - Your Superhero Request Page

## What's this about?

Ever felt you needed help with something? Who you’re going to call? Exactly! 
First thing that came to our mind: a superhero request page!

### How To Install

Clone git repository:

```
$ git clone https://github.com/ironheroines/IronHeroes.git
```

Install dependencies:

```
$ npm install 
```

Create .env file in main directory. Example content:
```shell
PORT=3000
ENV=development
DATABASE_URI=mongodb://localhost:27017/ironheroes
GMAIL_EMAIL=...@gmail.com
GMAIL_PASSWORD=...
BASE_URL=localhost:3000
```

### Run seeds file to create database content:

```
$ node bin/seeds.js
```

### Run local server:

```
$ npm run dev
```



## Technologies Used:

* HTML & CSS
* SASS
* Express
* Node.js
* MongoDB
* Bootstrap
* Nodemailer
* Passport
* Git

## Link

http://ironheroes.herokuapp.com/

## Creators

* **Ksenia Danniker** - [Ksusch](https://github.com/ksusch)
* **Franziska Bath** - [fracado](https://github.com/fracado)