const handleSign = (db,bcrypt) => (req, res) => {

  db.select('email', 'hash').from('login').where('email', '=', req.body.email)
    .then(data => {
      bcrypt.compare(req.body.password, data[0].hash, (err, result) => {
        if (result) {
          return db.select('*').from('users').where('email', '=', req.body.email)
            .then(user => {
              res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
          res.status(400).json('wrong credentials')
        }
      })
    })
    .catch(err => res.status(400).json('wrong credentialsa'))
};

module.exports = {
  handleSign: handleSign
};
