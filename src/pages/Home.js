import React from 'react';
import './Home.css';
import Hero from '../components/Hero';
import ProductCard from '../components/Productcard';
import About from './About';
import Contact from './Contact';

const products = [
  { name: 'Flower Pots', image: '/images/Holy Nite.jpeg' },
  { name: 'Sparklers', image: '/images/heart sparkler.jpg' },
  { name: 'Rockets', image: '/images/rockets.jpeg' },
  { name: 'Chakkars', image: '/images/chakkars.jpg' },
  { name: 'Walas',image:'/images/Digital Wala.jpeg'}
];

const Home = () => (
  <div>
    <Hero />
    <section className="products">
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard key={index} name={product.name} image={product.image} />
        ))}
      </div>
    </section>
    <About/>
    <Contact/>
  </div>
);

export default Home;