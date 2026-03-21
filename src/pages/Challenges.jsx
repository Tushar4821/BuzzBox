import React from 'react'
import ChallengeHero from '../components/UI/ChallengeComp/ChallengeHero'
import DailyChallenge from '../components/UI/ChallengeComp/DailyChallenge'
import ChallengeCategories from '../components/UI/ChallengeComp/ChallengeCategories'
import TrendingChallenges from '../components/UI/ChallengeComp/TrendingChallenges'
import ChallengesCTA from '../components/UI/ChallengeComp/ChallengesCTA'


function Challenges() {
  return (
    <>
    <ChallengeHero/>
    <DailyChallenge/>
    <ChallengeCategories/>
    <TrendingChallenges/>
    <ChallengesCTA/>
    </>
  )
}

export default Challenges