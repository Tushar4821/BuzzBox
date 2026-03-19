import React from 'react'
import HeroSection from '../components/UI/HomeComp/HeroSection'
import FeaturedGames from '../components/UI/HomeComp/FeaturedGames'
import HowItWorks from '../components/UI/HomeComp/HowItWorks'
import GameModes from '../components/UI/HomeComp/GameModes'
import DailyChallenge from '../components/UI/HomeComp/DailyChallenges'
import WhyBuzzBox from '../components/UI/HomeComp/WhyBuzzBox'
import CTASection from '../components/UI/HomeComp/CTASection'

function Home() {
  return (
    <>
    <HeroSection/>
    <FeaturedGames/>
    <HowItWorks/>
    <GameModes/>
    <DailyChallenge/>
    <WhyBuzzBox/>
    <CTASection/>
    </>
  )
}

export default Home