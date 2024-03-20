import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Announcement from '../components/Announcement.jsx'
import Slider from '../components/Slider.jsx'
import Categories from '../components/categories.jsx'
import Products from '../components/Products.jsx'
import Nwesletter from '../components/Newsletter.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Announcement/>
      <Slider/>
      <Categories/>
      <Products/>
      <Nwesletter/>
      <Footer/>
    </div>
  )
}
