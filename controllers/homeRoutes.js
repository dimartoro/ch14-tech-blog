const router = require('express').Router();
const {User, Post} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage',{
    logged_in:  req.session.logged_in
  });
});

router.post('/', async(req, res) => {
  try {
      const userData = await User.create(req.body);
      req.session.save(()=>{
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          res.status(200).json(userData);
      });
  } catch(err){
      res.status(400).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {

  console.log("11111::::::");
  try {
    const userData = await User.findByPk(req.session.user_id,{
      include:{model:Post},
    });
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include:{model:Post, include:{model:Comment}},
    //   order:[[Post,'created_at', 'ASC']]
    // });
    const user = userData.get({ plain: true });
    // return res.status(200).json(userData);
    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/api/posts');
    return;
  }
  res.render('login', {
    is_login: true
  });
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/api/posts');
    return;
  }
  res.render('login', {
    is_login: false
  });
});

module.exports = router;
