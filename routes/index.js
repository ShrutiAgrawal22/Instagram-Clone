var express = require('express');
var router = express.Router();
var userModel = require('./users');
const passport = require('passport');
var localStrategy = require('passport-local')
var users = require('./users');
passport.use(new localStrategy(users.authenticate()))



router.get('/', function(req, res) {
  res.render('index', {footer: false});
});

router.get('/login', function(req, res) {
  res.render('login', {footer: false});
});

router.get('/feed', isLoggedIn, function(req, res) {
  res.render('feed', {footer: true});
});

router.get('/profile', isLoggedIn, async function(req, res) {
  const user = await userModel.findOne({username: req.session.passport.user})
  res.render('profile', {footer: true, user : user});
});

router.get('/search', isLoggedIn, function(req, res) {
  res.render('search', {footer: true});
});

router.get('/edit', isLoggedIn, function(req, res) {
  res.render('edit', {footer: true});
});

router.get('/upload', isLoggedIn, function(req, res) {
  res.render('upload', {footer: true});
});

router.post('/register', function(req, res){
  var userDets = new userModel({
    username : req.body.username,
    name : req.body.name,
    email : req.body.email
  })
  userModel.register(userDets, req.body.password)
  .then(function(reg){
    passport.authenticate('local')(req, res, () => {
      //destination after user register
      res.redirect('/feed');
    });
  })
  .catch((err) => {
    res.send(err);
  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect : '/feed',
  failureRedirect : '/login'
}), 
function(req, res){})

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else res.redirect('/login')
}

module.exports = router;
