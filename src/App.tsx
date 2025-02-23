import './App.css';

import 'flowbite';
import { Bienvenida } from './Pages/Bienvenida';
import { Home } from './Pages/Home';
import { Navbar } from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        {/* <Bienvenida></Bienvenida> */}
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/home"
            element={<Home />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
