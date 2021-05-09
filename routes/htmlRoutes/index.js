const path = require('path');
/* use Router, which allows you to declare routes instead of app in any file 
as long as you use the proper middleware. */
const router = require('express').Router();

// route to generate index.html from server on load
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

/* We can assume that a route that has the term api 
    in it will deal in transference of JSON data, whereas a more 
    normal-looking endpoint such as /animals should serve an HTML page. 
    Express.js isn't opinionated about how routes should be named and organized, 
    so that's a system developers must create. The naming patterns we've used so 
    far in this project closely follow what you'd typically see in a professional setting. */

// route to generate animals.html from server on load
router.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/animals.html'));
});
// route to generate zookeeper.html from server on load
router.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

/* The * will act as a wildcard, meaning any route that wasn't previously defined 
    will fall under this request and will receive the homepage as the response. 
    Thus, requests for /about or /contact or /membership will essentially be the same now. 
    The order of your routes matters! The * route should always come last. 
    Otherwise, it will take precedence over named routes, and you won't 
    see what you expect to see on routes like /zookeeper. */
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
