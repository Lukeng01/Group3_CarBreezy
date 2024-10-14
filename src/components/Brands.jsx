import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import data from '../data.json'; 
import logo from "../img/logo.png";
import icon from "../img/person-svgrepo-com.svg";

const Brands = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const storedVisitorCount = localStorage.getItem('visitorCount');
    const count = storedVisitorCount ? parseInt(storedVisitorCount, 10) : 0;
    setVisitorCount(count + 1);
    localStorage.setItem('visitorCount', count + 1);

    return () => clearInterval(intervalId); 
  }, []);

  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });
  };

  const allCars = [...data.newCars, ...data.usedCars];
  const brands = [...new Set(allCars.map(car => car.brand))].sort();

  const filteredCars = allCars.filter(car =>
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <header>
        <img className="logo" src={logo} alt="Logo" />
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/NewCars.jsx">New</Link></li>
            <li><Link to="/UsedCars.jsx">Used</Link></li>
            <li><Link to="/Gallery.jsx">Gallery</Link></li>
            <li><Link to="/Brands.jsx">Brands</Link></li>
            <li><Link to="/Offers.jsx">Offers</Link></li>
            <li><Link to="/Sitemap.jsx">Site Map</Link></li> 
            <li><Link to="/AboutUs.jsx">About</Link></li>
          </ul>
        </nav>
        <div className="visitor-icon">
          <img src={icon} alt="Visitors" />
          <span className="visitor-count">{visitorCount}</span>
        </div>
      </header>

      <main>
        <div className="header-container">
          <h1>Available Car Brands</h1>
          <input
            type="text"
            placeholder="Search for a car model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="brands-container">
          {brands.map(brand => (
            <div className="brand-section" key={brand}>
              <h2>{brand}</h2>
              <div className="brand-cars">
                {filteredCars
                  .filter(car => car.brand === brand) 
                  .map(car => (
                    <div className="car-item" key={car.id}>
                      <img src={process.env.PUBLIC_URL + car.image} alt={car.model} />
                      <div className="car-details">
                        <h3>{car.model}</h3>
                        <p>Price: ${car.price}</p>
                        <Link to={`/car/${car.id}`}>
                          <button className="view-details">View Details</button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <button className="scroll-to-top" onClick={scrollToTop}>↑</button>
      </main>

      <footer>
        <p>{formatDateTime(currentTime)}</p>
      </footer>
    </div>
  );
};

export default Brands;
