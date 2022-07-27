const fs = require('fs'); //to read and update zookeepers.json file when we post

const path = require('path'); //module that provides utilities for working with file and directory paths

function filterByQuery(query, zookeepers){
   let filteredResults = zookeepers;

    if (query.age){ 
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.age === Number(query.age)
            );
    }

    if (query.favoriteAnimal){
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.favoriteAnimal ===query.favoriteAnimal
            );
    }
    
    if (query.name){
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.name ===query.name
            );
    }

    return filteredResults;
}

function createNewZookeeper(body, zookeepers){
    const zookeeper = body;
    zookeepers.push(zookeeper);
    fs.writeFileSync(
        path.join(__dirname, "../data/zookeepers.json"),
        JSON.stringify({ zookeepers }, null, 2)
    );

    return zookeeper;
}

function validateZookeeper(zookeeper){
    if (!zookeeper.name || typeof zookeeper.name !== "string"){
        return false;
    }

    if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== "string"){
        return false;
    }

    if (!zookeeper.age || typeof zookeeper.age !== "number"){
        return false;
    }

    return true;
}

function findById(id, zookeepers) {
    const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
    return result;
  }
  

module.exports = {
    filterByQuery,
    createNewZookeeper,
    validateZookeeper,
    findById
};
