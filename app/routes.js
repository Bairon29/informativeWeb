var User            = require('../app/models/user');

module.exports = function(app, passport){

  app.get('/', function(req, res){
    res.render('index.ejs', {login: req.isAuthenticated()});
  });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

      app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

  app.get('/login', function(req, res){
    res.render('user/login.ejs', {message: req.flash('loginMessage')});
  });

  app.get('/signup', function(req, res){
    res.render('user/signup.ejs', {message: req.flash('signupMessage')});
  });

  app.get('/profile', isLoggedIn, function(req, res){
    if(req.user.local.this_database_admin == true){
      res.render('admin/profile.ejs', { user: req.user, login: req.isAuthenticated()});
    }
    else{
      res.render('user/profile.ejs', { user: req.user});
    }
  });
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/adminProfile', function(req, res){
    res.render('admin/profile.ejs', { user: req.user});
  });

  app.post('/assesments', function(req, res){
    var currentUser = req.user;
    console.log(req.body);
    var assesments_form = req.body;
    currentUser.local.assesments.push(assesments_form);
    currentUser.save(function(err) {
      if (err) throw err;

          console.log('User successfully updated!');
        });
    if(currentUser.local.this_database_admin === false){
      User.findOne({'local.this_database_admin': true}, function(err, user){
         if (err){
          return done(err);
         }
        user.local.assesments.push(assesments_form);

    user.save(function(err) {
      if (err) throw err;

          console.log('User successfully updated!');
        });
      });
    }
    res.redirect('/');
  });

};


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}








