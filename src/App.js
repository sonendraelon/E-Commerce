import React, { useState, useEffect } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaShoppingCart } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import './App.css';

const apiUrl = 'https://fakestoreapi.com/products';

const handleAddToCart = () => {
  console.log('Item added to cart!');
};



const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch categories and products when the component mounts
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      setCategories(['all', ...response.data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      let url = apiUrl;
      if (selectedCategory !== 'all') {
        url = `${apiUrl}/category/${selectedCategory}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase())

  
      
  );

  return (
    <div>
      {/* Banner */}

      <div className="banner">
      <nav className="navbar">
        <div className="navbar-upper">
          <div className="navbar-links">
            <a href="/">New Releases</a>
            <a href="/">Today's Deals</a>
            <a href="/">Customer Service</a>
            <a href="/">Best Sellers</a>
            <a href="/">Gift Ideas</a>
          </div>
        </div>
        </nav>

        <a href="/" className="logo">
          Eflyer
        </a>
      {/* Category Selection */}

       <div className="category-selection">
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="options">
       <div className="search">
        <input
          type="text"
          placeholder="Search this blog"
          
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
          
        </div>
        <select className="language">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
          
          <div>
      {/* Your product content */}
      <button onClick={handleAddToCart}>
        <FaShoppingCart /> CART
      </button>
    </div>
       </div> 
    </div>
    <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={3000}>
      <div>
        <img src="/assets/image1.jpg" alt="Carousel 1" />
        

      </div>
      <div>
        <img src="/assets/image1.jpg" alt="Carousel 1" />
      </div>
      
      </Carousel>

      <div>
      <button className="buy-now-button"> Buy Now</button>
      </div>
    
      
      
    <h1 className="product-heading">Man & Woman Fashion</h1>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default App;
