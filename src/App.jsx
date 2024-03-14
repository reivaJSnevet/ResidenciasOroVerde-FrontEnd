import React from 'react';
import routes from './routes/Routes';
import { Routes } from 'react-router-dom';
import "../src/index.css";
import Admin from './pages/administrador/Administrador';
import MapView from './components/map/Map';


function App() {

  return (
    <>
    <MapView />
   {/*  <Routes>
      {routes}
    </Routes> */}
  </>
  );
}

export default App
