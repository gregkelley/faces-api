const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'greg',
      email: 'john@pobox.com',
      password: 'pw',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'sally',
      email: 'sally@pobox.com',
      password: 'pw',
      entries: 0,
      joined: new Date()
    },
    {
      id: '125',
      name: 'steve',
      email: 'steve@pobox.com',
      password: 'pw',
      entries: 0,
      joined: new Date()
    },
  ]
}
app.get('/', (req, res)=> {
  //res.send('Smart Brain API is working, bitch.');
  res.send(database.users);
})

// sign in
app.post('/signin', (req, res) => {
  console.log(req.body.email);
  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
        res.json(database.users[0]);
        // res.json('success');
      } else {
        console.log('error loging in');
        res.status(400).json('error logging in');
      }

  // res.send('sign in');
  // res.json('sign in json');  // convert to json instead of just sending text.
})

app.post('/register', (req, res) => {
  // use destructuring to get data from body
  const { email, name, password } = req.body;
  database.users.push({
      id: '126',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
  })

  res.json(database.users[database.users.length-1]);
})

// these are referred to as 'routing'
// format of request: localhost:3000/profile/124
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach( user => {
    if(user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found ) res.status(404).json('no such user '+ id + ' dork.');
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach( user => {
    if(user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found ) res.status(400).json('no such user '+ id + ' dork.');
})

app.listen(3000, ()=> {
  console.log('run after we start listening on port 3000.');
});

/* 
/ --> res = this is working
/signin --> POST = success / fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT
*/