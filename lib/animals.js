const fs = require('fs'); //to read and update animals.json file when we post

const path = require('path'); //module that provides utilities for working with file and directory paths


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
            filteredResults = filteredResults.filter(
                //check if the index the trait is found is not equal to -1 (meaning it can be found)
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }

    if (query.diet){ //make new array that match parameter
        filteredResults = filteredResults.filter(animal => animal.diet ===query.diet);
    }

    if (query.species){//make new array that match parameter
        filteredResults = filteredResults.filter(animal => animal.species ===query.species);
    }
    
    if (query.name){//make new array that match parameter
        filteredResults = filteredResults.filter(animal => animal.name ===query.name);
    }

    return filteredResults;
}

function findById(id, animalsArray){
    //return the first item in the new array where animal.id matches id in findById parameter
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function validateAnimal(animal){
    if (!animal.name || typeof animal.name !== 'string'){
        return false; //if there is no name OR if its not all words, false
    }

    if (!animal.species || typeof animal.species !== 'string'){
        return false;
    } 

    if (!animal.diet || typeof animal.diet !== 'string'){
        return false;
    }

    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)){
        return false;
    }

    return true;
}



//function to take new data and add to our array and write new array data to animals.json
function createNewAnimal (body, animalsArray){ //body is req.body and animalsArray is the array we want to add data to
    const animal = body;

    animalsArray.push(animal); //push new data to array
    
    //update data file with the new post data
    fs.writeFileSync( //synchronous version of fs.writeFile() 
        path.join(__dirname, '../data/animals.json'), //join __dirname (directory of file we execute code in) with ./data/animals.json
        JSON.stringify({ animals: animalsArray }, null, 2) //save array as JSON, null= dont edit existing data, 2 = create white space between values
    );

    return animal;
}

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};