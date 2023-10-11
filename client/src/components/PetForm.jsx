import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/petForm.css';

function PetForm() {
  const navigate = useNavigate();

  const [petData, setPetData] = useState({
    name: '',
    type: '',
    description: '',
    skill1: '',
    skill2: '',
    skill3: '',
  });
  const [val,setVal]= useState({})
  const [unique,setUnique]= useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/pets/new', petData)
      .then((response) => {
        if (response.status === 200) {

          console.log('Pet added successfully');
          setPetData({
            name: '',
            type: '',
            description: '',
            skill1: '',
            skill2: '',
            skill3: '',
          });
          setVal({})
          navigate('/');
        }
      })
      .catch(err=>{ err.response.data.message ? setUnique(err.response) : err.response.data.errors;err.response.data.errors? setVal(err.response.data.errors): console.log(err.response)& console.log(unique) & console.log(err.response)})
      
  } 


  return (
    <div>
      <Link to="/">Back to Home</Link>
      <h2>Know a pet needing a home?</h2>
      <form className='label-group' onSubmit={handleSubmit}>
        <div >
          <div className='label-group-item'>
            <label>Pet Name:</label>
            <input
              type="text"
              name="name"
              value={petData.name}
              onChange={handleChange}
            />
            
            { val.name? <p>{val.name.message}</p> : "" }
            { unique.data &&unique.data.message==='Name must be unique'? <p>{unique.data.message}</p> : "" }
          </div>
          <div className='label-group-item'>
            <label>Pet Type:</label>
            <input
              type="text"
              name="type"
              value={petData.type}
              onChange={handleChange}
            />
            { val.type? <p>{val.type.message}</p> : "" }
          </div>
          <div className='label-group-item'>
            
            <label>Pet Description:</label>
            <input
              type="text"
              name="description"
              value={petData.description}
              onChange={handleChange}
            />
            { val.description? <p>{val.description.message}</p> : "" }
          </div>
          <button type="submit"> <i class="fa-solid fa-upload"></i> Add Pet</button>
        </div>
        <div>
        <h2>Skills(optional):</h2>
          <div className='label-group-item'>
            <label >Skill 1:</label>
            <input
              type="text"
              name="skill1"
              value={petData.skill1}
              onChange={handleChange}
            />
          </div>
          <div className='label-group-item'>
            <label>Skill 2:</label>
            <input
              type="text"
              name="skill2"
              value={petData.skill2}
              onChange={handleChange}
            />
          </div>
          <div className='label-group-item'>
            <label>Skill 3:</label>
            <input
              type="text"
              name="skill3"
              value={petData.skill3}
              onChange={handleChange}
            />
          </div>
        </div>
        
      </form>
      
    </div>
  );
}

export default PetForm;
