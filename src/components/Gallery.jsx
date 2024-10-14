import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import data from '../data.json';
import logo from "../img/logo.png";
import icon from "../img/person-svgrepo-com.svg";

const Gallery = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const allCars = [...data.newCars, ...data.usedCars];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = currentTime.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });

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
                    <span className="visitor-count">{localStorage.getItem('visitorCount') || 0}</span>
                </div>
            </header>

            <main>
                <h1>Our Gallery</h1>
                <div className="gallery-container">
                    {allCars.map(car => (
                        <div className="gallery-item" key={car.id}>
                            <Link to={`/car/${car.id}`}>
                                <img src={process.env.PUBLIC_URL + car.image} alt={car.model} />
                                <div className="gallery-item-details">
                                    <h3>{car.model}</h3>
                                    <p>Price: ${car.price}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>

            <button className="scroll-to-top" onClick={scrollToTop} >
                ↑
            </button>

            <footer>
                <p>{formattedTime}</p>
            </footer>
        </div>
    );
};

export default Gallery;
