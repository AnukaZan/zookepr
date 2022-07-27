const router = require('express').Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

router.get('/animals', (req, res) => { 
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//get request is same as if we enter a url into browser 
router.get('/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});


router.post('/animals', (req, res) => { // req.body is what we tryna post
  
    req.body.id = animals.length.toString(); //set id based on what the next index of the array will be

    // if it doesn't pass validate check, send 400 error
    if (!validateAnimal(req.body)){
        res.status(400).send('The animal is not properly formatted!');
    } else {
       //use createNewAnimal function to add req.body to animals array and call the req.body animal
        const animal = createNewAnimal(req.body, animals);

        res.json(animal); //jsonify the req.body and send back to client as json
    }
});

module.exports = router;