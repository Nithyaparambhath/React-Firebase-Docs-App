import './App.css';
import LandingPage from './Pages/LandingPage';
import { app, database } from './firebaseConfig';

function App() {
  return (
    <div>
    <LandingPage database={database} />
    </div>
  );
}

export default App;
