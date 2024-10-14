import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../img/logo.png";
import icon from "../img/person-svgrepo-com.svg";
import data from '../data.json';
import slideshowImage1 from "../img/HomePage/Slide1.png";
import slideshowImage2 from "../img/HomePage/Slide2.png";
import slideshowImage3 from "../img/HomePage/Slide3.png";
import slideshowImage4 from "../img/HomePage/Slide4.png";
import slideshowImage5 from "../img/HomePage/Slide5.png";

function Homepage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sortOrder, setSortOrder] = useState('A-Z');
  const slideshowImages = [
    slideshowImage1,
    slideshowImage2,
    slideshowImage3,
    slideshowImage4,
    slideshowImage5
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const storedVisitorCount = localStorage.getItem('visitorCount');
    const count = storedVisitorCount ? parseInt(storedVisitorCount, 10) : 0;
    setVisitorCount(count + 1);
    localStorage.setItem('visitorCount', count + 1);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshowImages.length);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearInterval(slideInterval);
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

  const filteredNewCars = data.newCars.filter(car =>
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsedCars = data.usedCars.filter(car =>
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortCars = (cars) => {
    switch (sortOrder) {
      case 'A-Z':
        return cars.sort((a, b) => a.model?.localeCompare(b.model) || 0);
      case 'Z-A':
        return cars.sort((a, b) => b.model?.localeCompare(a.model) || 0);
      case 'ascending':
        return cars.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'descending':
        return cars.sort((a, b) => (b.price || 0) - (a.price || 0));
      default:
        return cars;
    }
  };

  const sortedNewCars = useMemo(() => sortCars(filteredNewCars.slice(0, 12)), [filteredNewCars, sortOrder]);
  const sortedUsedCars = useMemo(() => sortCars(filteredUsedCars.slice(0, 12)), [filteredUsedCars, sortOrder]);

  return (
    <div className="homepage-container">
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
        <section className="slideshow">
          <div className="slideshow-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slideshowImages.map((image, index) => (
              <div className={`slide ${index === currentSlide ? 'active' : ''}`} key={index}>
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="button-container">
            {slideshowImages.map((_, index) => (
              <button
                aria-label={`Go to slide ${index + 1}`}
                key={index}
                className={`round-button ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        <section className="search-bar">
          <div className="sort-section">
            <label htmlFor="sortOrder" className="sort-label">Sort:</label>
            <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="ascending">Price: Low to High</option>
              <option value="descending">Price: High to Low</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search for cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* <button onClick={() => console.log("Search clicked")}>Search</button> */}
        </section>

        <section className="car-listings">
          <h2>Featured New Cars</h2>
          <div className="car-grid">
            {sortedNewCars.map(car => (
              <div className="car-item" key={car.id}>
                <img src={process.env.PUBLIC_URL + car.image} alt={car.model} />
                <div className="car-details">
                  <h3>{car.model}</h3>
                  <p>{car.type}</p>
                  <p>${car.price}</p>
                  <Link to={`/car/${car.id}`} className="view-details">View Details</Link>
                </div>
              </div>
            ))}
          </div>

          <h2>Featured Used Cars</h2>
          <div className="car-grid">
            {sortedUsedCars.map(car => (
              <div className="car-item" key={car.id}>
                <img src={process.env.PUBLIC_URL + car.image} alt={car.model} />
                <div className="car-details">
                  <h3>{car.model}</h3>
                  <p>{car.type}</p>
                  <p>${car.price}</p>
                  <Link to={`/car/${car.id}`} className="view-details">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <button className="scroll-to-top" onClick={scrollToTop}>↑</button>

      <footer>
        <p>{formattedTime}</p>
      </footer>
    </div>
  );
}

export default Homepage;
