import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Categories from './pages/Categories.jsx'
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
        path : '/Challenges',
        element : <Challenges/>
      },
      {
        path : '/Categories',
        element : <Categories/>
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
