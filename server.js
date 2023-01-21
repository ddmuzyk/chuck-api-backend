const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const output = require('./controllers/output');

const db = knex({
    client: 'pg',
    connection: {
        host : 'dpg-cf625tda499d72tmn5mg-a.frankfurt-postgres.render.com',
        user : 'ddmuzyk',
        port: 5432,
        password : 'xJnELpoFQzG1cOcF0EuKUvSsZeg7qsqG',
        database : 'chuckdb'
    }
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