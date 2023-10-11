const Pet = require('../models/pet.models');


module.exports.createPet = (req, res) => {
  const { name } = req.body;
  Pet.findOne({ name })
    .then(existingPet => {
      if (existingPet) {
        return res.status(400).json({ message: 'Name must be unique' });
      } else {
        Pet.create(req.body)
          .then(pet => {
            res.status(201).json(pet);
          })
          .catch(err => {
            res.status(400).json(err);
          });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports.deletePet = (req, res) => {
  const { id } = req.params;
  Pet.findByIdAndRemove(id)
    .then(deletedPet => {
      if (!deletedPet) {
        return res.status(404).json({ message: 'Pet not found' });
      }
      res.status(200).json(deletedPet);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};


module.exports.updatePet = (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const { name } = updateData;
  Pet.findOne({ name, _id: { $ne: id } })
    .then(existingPet => {
      if (existingPet) {
        return res.status(400).json({ message: 'Name must be unique' });
      } else {
        Pet.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
          .then(updatedPet => {
            if (!updatedPet) {
              return res.status(404).json({ message: 'Pet not found' });
            }
            res.status(200).json(updatedPet);
          })
          .catch(err => {
            res.status(400).json(err);
          });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
};


module.exports.likePet = (req, res) => {
  const { id } = req.params;
  const { attribute } = req.body;

  Pet.findById(id)
    .then(pet => {
      if (!pet) {
        return res.status(404).json({ message: 'Pet not found' });
      }
      if (attribute === 'likes') {
        pet.likes += 1;
      } else {
        console.log(likes)
      }

      return pet.save();
    })
    .then(updatedPet => {
      res.status(200).json(updatedPet);
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
};

module.exports.getPet = (req, res) => {
  const { id } = req.params;
  Pet.findById(id)
    .then(pet => {
      if (!pet) {
        return res.status(404).json({ message: 'Pet not found' });
      }
      res.status(200).json(pet);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};


module.exports.getAllPets = (req, res) => {
  Pet.find({})
    .then(pets => {
      res.status(200).json(pets);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
