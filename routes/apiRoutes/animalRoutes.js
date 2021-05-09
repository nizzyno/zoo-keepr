/* use Router, which allows you to declare routes instead of app in any file 
as long as you use the proper middleware. */
const router = require('express').Router();
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require('../../lib/animals');
const { animals } = require('../../data/animals');

// Returns animals with filter by query
router.get('/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// Returns one animal object by id
router.get('/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  // if no results send 404 error to user
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/animals', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  // req.body is where our incoming content will be
  // console.log(req.body);
  // res.json(req.body);

  // if any data in req.body is incorrect, send 400 error back -- Validation
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    // add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

module.exports = router;
