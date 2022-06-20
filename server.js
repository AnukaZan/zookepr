
//connect the json file so front end can request data from the api we about to drop
const { animals } = require('./data/animals');

const express = require('express');

const app = express(); //instatiate server 

function filterByQuery(query, animalsArray){
    let personalityTraitsArray = []; //separate array for traits

    //create a copy of animalsArray (animals JSON) as filteredResults here:
    let filteredResults = animalsArray; 

    //FILTER THE TRAITS FIRST, THEN OTHER FILTERS
    if(query.personalityTraits){ //if query contains array of personalityTraits
        //make sure traits is in an array
        if (typeof query.personalityTraits === 'string'){ //if string, place in array
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }

        //after saving the traits in an array, loop thru each trait in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            
            // filteredResults array will contain only the entries that contain the trait,
            filteredResults = filteredResults.filter(//.filter creates new array that passes the test
                //check the first index the trait is found in each personalityTraits array
                //check if the index the trait is found is not equal to -1 (meaning it can be found)
                animal => animal.personalityTraits.indexOf(trait) !== -1
               
            );
        });
    }
}

//get( 1. string that describes route the client will fetch from,  
//2. callback function executes every time http://localhost:3001/api/animals is accessed with a get request)
app.get('/api/animals', (req, res) => { 
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(3001, () => { //host server on port 3001
    console.log('API server now on port 3001!');
})


