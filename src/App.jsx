import React from 'react';
import routes from './routes/Routes';
import { Routes } from 'react-router-dom';
import "../src/index.css";
import Admin from './pages/administrador/Administrador';


function App() {

  return (
    <>
    <Routes>
      {routes}
    </Routes>
  </>
  );
};

export default App
