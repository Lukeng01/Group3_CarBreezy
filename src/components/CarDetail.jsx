import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data.json';
import logo from "../img/logo.png";
import icon from "../img/person-svgrepo-com.svg";

function CarDetail() {
  const { id } = useParams();
  const car = data.newCars.concat(data.usedCars).find(car => car.id === parseInt(id));

  const [visitorCount, setVisitorCount] = useState(() => {
    const count = localStorage.getItem('carDetailVisitorCount');
    return count ? parseInt(count) : 0;
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentShowcaseSlide, setCurrentShowcaseSlide] = useState(0);
  const [currentInteriorSlide, setCurrentInteriorSlide] = useState(0);

  const interiorImages = Array.isArray(car?.interiorImage) ? car.interiorImage : [car?.interiorImage];

  useEffect(() => {
    setVisitorCount(prevCount => {
      const newCount = prevCount + 1;
      localStorage.setItem('carDetailVisitorCount', newCount);
      return newCount;
    });

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    if (car) {
      const showcaseIntervalId = setInterval(() => {
        setCurrentShowcaseSlide(prev => (prev + 1) % (car.showcaseImages?.length || 1));
      }, 1500);

      const interiorIntervalId = setInterval(() => {
        setCurrentInteriorSlide(prev => (prev + 1) % (interiorImages.length || 1));
      }, 2000);

      return () => {
        clearInterval(showcaseIntervalId);
        clearInterval(interiorIntervalId);
      };
    }

    return () => clearInterval(intervalId);
  }, [car, interiorImages.length]);

  if (!car) {
    return <div>Car not found!</div>;
  }

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
        <section className="car-detail">
          <h2>{car.model}</h2>
          <img src={process.env.PUBLIC_URL + car.image} alt={car.model} className="car-main-image" />
          <p><strong>Type:</strong> {car.type}</p>
          <p><strong>Price:</strong> ${car.price}</p>
          <p><strong>Description:</strong> {car.description}</p>


          <h3>Exterior</h3>
          <div className="slideshow">
            <div className="slideshow-container" style={{ transform: `translateX(-${currentShowcaseSlide * 100}%)` }}>
              {car.showcaseImages.map((img, index) => (
                <div className="slide" key={index}>
                  <img src={process.env.PUBLIC_URL + img} alt={`${car.model} showcase ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="button-container">
              {car.showcaseImages.map((_, index) => (
                <button
                  key={index}
                  className={`round-button ${index === currentShowcaseSlide ? 'active' : ''}`}
                  onClick={() => setCurrentShowcaseSlide(index)}
                ></button>
              ))}
            </div>
          </div>


          <section className="car-features">
            <h3>Features</h3>
            <ul>
              <li><strong>Engine:</strong> {car.features.engine}</li>
              <li><strong>Horsepower:</strong> {car.features.horsepower} hp</li>
              <li><strong>Transmission:</strong> {car.features.transmission}</li>
              <li><strong>Fuel Efficiency:</strong> {car.features.fuelEfficiency}</li>
              <li><strong>Infotainment:</strong> {car.features.infotainment}</li>
              <li><strong>Safety:</strong> {car.features.safety}</li>
              <li><strong>Comfort:</strong> {car.features.comfort}</li>
            </ul>
          </section>


          <section className="car-design">
            <h3>Design</h3>
            <ul>
              <li><strong>Exterior:</strong> {car.design.exterior}</li>
              <li><strong>Interior:</strong> {car.design.interior}</li>
            </ul>
          </section>


          <section className="car-performance">
            <h3>Performance</h3>
            <ul>
              <li><strong>Acceleration:</strong> {car.performance.acceleration}</li>
              <li><strong>Handling:</strong> {car.performance.handling}</li>
              <li><strong>Driving Modes:</strong> {car.performance.drivingModes}</li>
            </ul>
          </section>


          <section className="car-technology">
            <h3>Technology</h3>
            <ul>
              <li><strong>Audio:</strong> {car.technology.audio}</li>
              <li><strong>Connectivity:</strong> {car.technology.connectivity}</li>
              <li><strong>Driver Assistance:</strong> {car.technology.driverAssistance}</li>
            </ul>
          </section>
        </section>

        <h3>Interior</h3>
        <div className="slideshow">
          <div className="slideshow-container" style={{ transform: `translateX(-${currentInteriorSlide * 100}%)` }}>
            {interiorImages.map((img, index) => (
              <div className="slide" key={index}>
                <img src={process.env.PUBLIC_URL + img} alt={`${car.model} interior ${index + 1}`} className="interior-image" />
              </div>
            ))}
          </div>
          <div className="button-container">
            {interiorImages.map((_, index) => (
              <button
                key={index}
                className={`round-button ${index === currentInteriorSlide ? 'active' : ''}`}
                onClick={() => setCurrentInteriorSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </main>
      <button className="scroll-to-top" onClick={scrollToTop}>↑</button>

      <footer>
        <p>{formattedTime}</p>
      </footer>
    </div>
  );
}

export default CarDetail;
