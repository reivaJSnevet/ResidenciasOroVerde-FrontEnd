import React from 'react';
import "../../../stylesheets/Home.css";
import HomeIcon from '@mui/icons-material/Home';
import AddHomeIcon from '@mui/icons-material/AddHome';

function CardsHome({ totalAlquiladas, totalVendidas }) {
  return (

    <div className="stats-container">
    <div className="card">
      <div className="card-content">
      <div className="circle-icon-container">
            <AddHomeIcon className="green-icon" />
          </div>
          <h5 className="card-title">Casas de Alquiler</h5>
        <p className="card-text">{totalAlquiladas}</p>
      </div>
    </div>
    <div className="card">
      <div className="card-content">
      <div className="circle-icon-container">
            <HomeIcon className="green-icon" />
          </div>
          <h5 className="card-title">Casas en Venta</h5>
        <p className="card-text">{totalVendidas}</p>
      </div>
    </div>
  </div>

);
}

export default CardsHome;

