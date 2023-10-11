import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/petList.css';

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api')
      .then((response) => {
        const sortedPets = response.data.sort((a, b) =>
          a.type.toLowerCase().localeCompare(b.type.toLowerCase())
        );
        setPets(sortedPets);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <Link id='link' to={`/pets/new`}>add a pet to the shelter</Link>
      <h2>These pets are looking for a good home</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td>{pet.name}</td>
              <td>{pet.type}</td>
              <td>
                <Link id='details' to={`/pets/${pet._id}`}>Details</Link>{'|'}
                <span className="divider"></span>
                <Link to={`/pets/${pet._id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default PetList;
