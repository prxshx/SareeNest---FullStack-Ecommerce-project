import React from 'react'
import Hero from '../components/Hero'
import Products from '../components/Products'
import ProductsDisplay from '../components/ProductsDisplay'
import Contact from '../components/Contact'
import About from '../components/About'

const Home = () => {
  return (
    <div>
      <Hero/>
      <ProductsDisplay/>
      <About/>
      <Contact/>
    
    </div>
  )
}

export default Home
