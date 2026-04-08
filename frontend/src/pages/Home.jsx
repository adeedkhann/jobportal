import React from 'react'
import Navbar from '@/components/shared/Navbar'
import HeroSection from '@/components/HeroSection'
import FeaturedOpportunities from '@/components/FeaturedOpportunities'
import FeaturesAndCTA from '@/components/FeaturesAndCTA'
import Footer from '@/components/shared/Footer'
function Home() {
  return (
    <div>
        <HeroSection/>
        <FeaturedOpportunities/>
        <FeaturesAndCTA/>
    </div>
  )
}

export default Home