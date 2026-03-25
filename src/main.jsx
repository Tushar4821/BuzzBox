import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import HighMode from './pages/HighMode.jsx'
import About from './pages/About.jsx'
import Challenges from './pages/Challenges.jsx'
import Games from './pages/Games.jsx'
import TruthOrDare from './games/TruthOrDare.jsx'
import MostLikelyTo from './games/MostLikelyTo.jsx'
import CategoryRush from './games/CategoryRush.jsx'
import { GameProvider } from './games/GameContext.jsx'
import PassThePhone from './games/PassThePhone.jsx'
import GeneralKnowledge from './games/GeneralKnowledge.jsx'
import WouldYouRather from './games/WouldYouRather.jsx'
import NeverHaveIEver from './games/NeverHaveIEver.jsx'
import SipOrSpill from './games/SipOrSpill.jsx'
import HotTakes from './games/HotTakes.jsx'
import GuessTheLink from './games/GuessTheLink.jsx'
import DeepQuestions from './games/DeepQuestions.jsx'
import ThisOrThatCouples from './games/ThisOrThatCouples.jsx'
import HowWellDoYouKnowMe from './games/HowWellDoYouKnowMe.jsx'
import WhoIsTheImposter from './games/WhoIsTheImposter.jsx'
import RapBattle from './games/RapBattle.jsx'
import GroupChallenges from './challenges/GroupChallenges.jsx'
import SavageChallenges from './challenges/SavageChalleneges.jsx'
import DrinkChallenges from './challenges/DrinkChallenges.jsx'
import CoupleChallenges from './challenges/CoupleChallenges.jsx'
import GuessTheCriminal from './games/GuessTheCriminal.jsx'
import MafiaGame from './games/MafiaGame.jsx'
import BluffIq from './games/BluffIq.jsx'

const router = createBrowserRouter([{
    path : '/',
    element : <App/>,
    children : [
      {
        path : '/',
        element : <Home/>
      },
      {
        path : '/games',
        element : <Games/>
      },
      {
       path: "/games/truth-or-dare",
        element: <TruthOrDare />,
      },
      {
       path: "/games/most-likely-to",
      element: <MostLikelyTo />,
      },
      {
       path: "/games/category-rush",
      element: <CategoryRush/>,
      },
      {
       path: "/games/pass-the-phone",
      element: <PassThePhone/>,
      },
      {
       path: "/games/would-you-rather",
      element:<WouldYouRather/>,
      },
      {
       path: "/games/general-knowledge",
      element: <GeneralKnowledge/>,
      },
      {
       path: "/games/never-have-i-ever",
      element: <NeverHaveIEver/>,
      },
      {
       path: "/games/sip-or-spill",
      element: <SipOrSpill/>,
      },
       {
       path: "/games/hot-takes",
      element: <HotTakes/>,
      },
      {
       path: "/games/guess-the-link",
      element: <GuessTheLink/>,
      },
      {
       path: "/games/deep-questions",
      element: <DeepQuestions/>,
      },
      {
      path: "/games/this-or-that",
      element: <ThisOrThatCouples/>,
      },
      {
      path: "/games/how-well-do-you-know-me",
      element: <HowWellDoYouKnowMe/>,
      },
      {
      path: "/games/who-is-the-imposter",
      element: <WhoIsTheImposter/>,
      },
      {
      path: "/games/rap-battle",
      element: <RapBattle/>,
      },
      {
      path: "/games/guess-the-criminal",
      element: <GuessTheCriminal/>,
      },
      {
      path: "/games/mafia",
      element: <MafiaGame/>,
      },
      {
      path: "/games/bluff-iq",
      element: <BluffIq/>,
      },
      {
        path : '/Challenges',
        element : <Challenges/>
      },
      {
      path: "/challenges/group",
      element: <GroupChallenges/>,
      },
      {
      path: "/challenges/couple",
      element: <CoupleChallenges/>,
      },
      {
      path: "/challenges/drink",
      element: <DrinkChallenges/>,
      },
      {
      path: "/challenges/savage",
      element: <SavageChallenges/>,
      },
      {
        path : '/high-mode',
        element : <HighMode/>
      },
      {
        path : '/About',
        element : <About/>
      }
    ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameProvider>
  <RouterProvider router={router}/>
  </GameProvider>
  </StrictMode>,
)
