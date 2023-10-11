import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PetList from './components/PetList';
import EditPet from './components/EditPet';
import Details from './components/Details';
import PetForm from './components/PetForm';
import '../src/styles/App.css'

function App() {
  return (
    <>
    <h1>Pet Shelter</h1>
      <BrowserRouter>
        <Routes>
          <Route element={<PetList />} path="/" />
          <Route element={<EditPet />} path="/pets/:id/edit" />
          <Route element={<Details />} path="/pets/:id" />
          <Route element={<PetForm />} path="/pets/new" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
