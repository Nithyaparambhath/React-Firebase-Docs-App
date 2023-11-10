import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage';
import { app, database } from './firebaseConfig';
import EditDoc from './Pages/EditDoc';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage database={database} />}></Route>
        <Route path='/editDoc/:id' element={<EditDoc database={database} />}></Route>
      </Routes>
    
    </div>
  );
}

export default App;
