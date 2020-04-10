const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const signin = require('./controllers/signin');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'gian',
    password : '210200',
    database : 'facerecognitionapp'
  }
});


const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send(database.users); });

app.post('/signin', signin.handleSign(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(db));

app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
