import React, { useEffect, useRef, useState } from 'react';
import Loader from '../components/loader';
import { Navbar } from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Feature from '../components/Feature';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Landing = () => {
  
  return (
    <div className="bg-black text-white">
      <Navbar/>
      <Loader />
      {/* Hero Section with Text Overlay */}
      <HeroSection/>

      {/* Features Section with Continuous Scrolling */}
      <Feature/>

      {/* FAQ Section */}
      <FAQ/>

    
      {/* Footer */}
      <Footer/>
      
    </div>
  );
};

export default Landing;
// 2 bugs -phone view width issue
// loader can be scroll down in phone view