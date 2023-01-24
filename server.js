const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const output = require('./controllers/output');



const db = knex({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    ssl: true
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!')})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/generate', (req, res) => { output.handleGenerate(req, res, db)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})