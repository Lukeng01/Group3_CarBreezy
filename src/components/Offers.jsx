import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import data from '../data.json'; 
import logo from "../img/logo.png";
import icon from "../img/person-svgrepo-com.svg";

const getRandomOffers = (cars, numberOfOffers) => {
    const shuffled = cars.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfOffers);
};

const Offers = () => {
    const [randomOffers, setRandomOffers] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        const offers = getRandomOffers(data.newCars, 8);
        setRandomOffers(offers);

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
        <div className="offers-container">
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
                <h1>Special Offers</h1>
                <section className="offers-list">
                    {randomOffers.map(car => (
                        <div className="offer-item" key={car.id}>
                            <Link to={`/car/${car.id}`}>
                                <img src={process.env.PUBLIC_URL + car.image} alt={car.model} />
                                <div className="offer-details">
                                    <h3>{car.model}</h3>
                                    <p>Price: ${car.price}</p>
                                    <p>Visit our showroom for details!</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </section>
            </main>

            <button className="scroll-to-top" onClick={scrollToTop}>↑</button>

            <footer>
                <p>{formattedTime}</p>
            </footer>
        </div>
    );
};

export default Offers;
