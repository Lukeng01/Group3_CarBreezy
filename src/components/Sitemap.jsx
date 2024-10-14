import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../img/logo.png";
import icon from "../img/person-svgrepo-com.svg";
import bigPicture from "../img/Sitemap.png"; 

function Sitemap() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const storedVisitorCount = localStorage.getItem('visitorCount');
    const count = storedVisitorCount ? parseInt(storedVisitorCount, 10) : 0;
    setVisitorCount(count + 1);
    localStorage.setItem('visitorCount', count + 1);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedTime = currentTime.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sitemap-page-container">
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
        <section className="big-picture-container">
          <img src={bigPicture} alt="Big Display" className="big-picture" />
        </section>
      </main>

      <button className="scroll-to-top" onClick={scrollToTop}>↑</button>

      <footer>
        <p>{formattedTime}</p>
      </footer>
    </div>
  );
}

export default Sitemap;
