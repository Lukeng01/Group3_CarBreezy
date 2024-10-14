import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import NewCars from './components/NewCars';
import UsedCars from './components/UsedCars';
import Gallery from './components/Gallery';
import Brands from './components/Brands';
import Offers from './components/Offers';
import AboutUs from './components/AboutUs';
import CarDetail from './components/CarDetail';
import Sitemap from './components/Sitemap';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/NewCars.jsx" element={<NewCars />} />
        <Route path="/UsedCars.jsx" element={<UsedCars />} />
        <Route path="/Gallery.jsx" element={<Gallery />} />
        <Route path="/Brands.jsx" element={<Brands />} />
        <Route path="/Offers.jsx" element={<Offers />} />
        <Route path="/Sitemap.jsx" element={<Sitemap />} />
        <Route path="/AboutUs.jsx" element={<AboutUs />} />
        <Route path="/car/:id" element={<CarDetail />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
