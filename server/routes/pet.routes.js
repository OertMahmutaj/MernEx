const PetController = require('../controllers/pet.controller');

module.exports = (app) => {
    app.post('/api/pets/new', PetController.createPet);
    app.get('/api', PetController.getAllPets); 
    app.delete('/api/pets/:id', PetController.deletePet);
    app.get('/api/pets/:id', PetController.getPet);
    app.patch('/api/pets/:id/edit', PetController.updatePet);
    app.patch('/api/pets/:id', PetController.likePet);
}

