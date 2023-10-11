import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/details.css'

function Details() {
  const { id } = useParams();
  const [pet, setPet] = useState('');
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pets/${id}`)
      .then(response => {
        setPet(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [id]);

  const handleAdopt = () => {
    axios.delete(`http://localhost:8000/api/pets/${id}`)
      .then(() => {
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleLike = () => {
    const updateData = { attribute: 'likes', newValue: pet.likes + 1 };
    axios
      .patch(`http://localhost:8000/api/pets/${id}`, updateData)
      .then((response) => {
        setPet(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    setIsLiking(true);
  };

  return (
    <div>
      <div className='justify-between'>
        <h2 className="details-heading">Details about: {pet.name}</h2>
        <div className='right-headings'>
          <Link to="/">Back to Home</Link>

          <button onClick={handleAdopt} className="adopt-button">

          <i class="fa-solid fa-house"></i> Adopt {pet.name}
          </button>
        </div>
      </div>
      <div className="details-container">

        {pet && (
          <div>

            <p id='details-id'>Name: <span id='pet-id'>{pet.name}</span></p>
            <p id='details-id'>Type: <span id='pet-id'>{pet.name}</span></p>
            <p id='details-id'>Description: <span id='pet-id'>{pet.name}</span></p>
            <p id='details-id'>Skills: <div id='skills-id'><span id='pet-id'>{pet.skill1}</span><span id='pet-id'>{pet.skill2}</span><span id='pet-id'>{pet.skill3}</span></div></p>
            

            <div className='justify-evenly'>
              <button onClick={handleLike} className="like-button" disabled={isLiking}>
              <i className="fas fa-thumbs-up"></i> Like {pet.name}
              </button>
              <h3>Likes: {pet.likes}</h3>


            </div>
          </div>
        )}


      </div>
    </div>
  );
}

export default Details;
