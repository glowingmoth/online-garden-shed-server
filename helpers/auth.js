module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('authenticated');
      next();
    } else {
      console.log('not authenticated');
      // res.redirect('/');
    }
  },
  ensureGuest: (req, res, next) => {
    console.log('ensureGuest');
    if (req.isAuthenticated()) {
      // res.redirect('/crawls');
    } else {
      next();
    }
  }
}