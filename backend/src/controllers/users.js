const User = require('../models/User');
var bcrypt = require('bcrypt');

const usersCtrl= {};

usersCtrl.createUser = (req, res) => {

  const { username, email, password, language } = req.body;
  const newUser = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
    language
  });

  newUser.save((err, user) => {
    if(err) return res.status(500).json({ ok:false, err });

    localStorage.setItem('session', JSON.stringify(user));
    res.status(200).json({ user: user });

  });
}

usersCtrl.loginUser = (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {
    if(err) return res.status(500).send({ ok:false, err });

    if(!user) return res.status(400).send({ ok:false, err:'User not found' });

    if(!bcrypt.compareSync(req.body.password, user.password)){
      return res.status(500).send({ ok:false, err:'Incorrect password' });
    }

    localStorage.setItem('session', JSON.stringify(user));
    res.status(200).json({
      ok: true,
      user: user
    })

  });
}

usersCtrl.updateUser = (req, res) => {

    const { username, email, password, language } = req.body;

    User.findOneAndUpdate({_id: req.params.id}, { username, email, password: bcrypt.hashSync(password, 10), language },
    {new: true}, (err, user) => {
      if(err) return res.status(500).json({ message: 'Error updating the users'});

      if(!user) return res.status(400).send({ ok:false, err:'User not found' });

      localStorage.setItem('session', JSON.stringify(user));
      res.status(200).json({ user: user });

    });

}

module.exports = usersCtrl;
