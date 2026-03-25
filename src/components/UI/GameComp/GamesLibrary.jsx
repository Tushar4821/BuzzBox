import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import card1 from "../../../assets/homeImg/card2.jpg";
import card2 from "../../../assets/homeImg/card1.jpg";
import card3 from "../../../assets/homeImg/card3.jpg";
import card4 from "../../../assets/homeImg/card4.jpg";
import card5 from "../../../assets/homeImg/card5.jpg";
import card6 from "../../../assets/homeImg/card6.jpg";
import card7 from "../../../assets/gameImg/card7.jpg";
import card8 from "../../../assets/gameImg/card8.jpg";
import card9 from "../../../assets/gameImg/card9.jpg";
import card10 from "../../../assets/gameImg/card10.jpg";
import card11 from "../../../assets/gameImg/card11.jpg";
import card12 from "../../../assets/gameImg/card12.jpg";
import card13 from "../../../assets/gameImg/card13.jpg";
import card14 from "../../../assets/gameImg/card14.jpg";
import card15 from "../../../assets/gameImg/card15.gif";
import card16 from "../../../assets/gameImg/card16.jpg"
import card17 from "../../../assets/gameImg/card17.jpg"
import card18 from "../../../assets/gameImg/card18.jpg"

function GamesLibrary() {
  const categories = [
    "All",
    "Party",
    "Group",
    "Couple",
    "Drinking",
    "Non-Drinking",
    "Brain",
  ];

  const games = [
    {
      title: "Truth or Dare",
      desc: "Classic chaos with bold truths and wild dares.",
      category: "Party",
      players: "2+ Players",
      mode: "Drinking Optional",
      img: card1,
      path: "/games/truth-or-dare",
    },
    {
      title: "Never Have I Ever",
      desc: "Expose secrets and test how well you know each other.",
      category: "Drinking",
      players: "3+ Players",
      mode: "Drinking Optional",
      img: card2,
      path: "/games/never-have-i-ever",
    },
    {
      title: "Most Likely To",
      desc: "Point fingers, laugh hard, and call out your friends.",
      category: "Group",
      players: "3+ Players",
      mode: "Non-Drinking",
      img: card3,
      path: "/games/most-likely-to",
    },
    {
      title: "Would You Rather",
      desc: "Choose between two impossible and hilarious options.",
      category: "Non-Drinking",
      players: "2+ Players",
      mode: "Fun",
      img: card4,
      path: "/games/would-you-rather",
    },
    {
      title: "Sip or Spill",
      desc: "Answer honestly or take a sip. No escaping.",
      category: "Drinking",
      players: "2+ Players",
      mode: "Drinking",
      img: card5,
      path: "/games/sip-or-spill",
    },
    {
      title: "Hot Takes",
      desc: "Drop controversial opinions and defend them bravely.",
      category: "Party",
      players: "3+ Players",
      mode: "Non-Drinking",
      img: card6,
      path: "/games/hot-takes",
    },
    {
      title: "Guess The Link",
      desc: "Find the hidden connection between words.",
      category: "Group",
      players: "2+ Players",
      mode: "Non-Drinking",
      img: card7,
      path: "/games/guess-the-link",
    },
    {
      title: "Category Rush",
      desc: "Name items in a category before time runs out.",
      category: "Group",
      players: "2+ Players",
      mode: "Non-Drinking",
      img: card8,
      path: "/games/category-rush",
    },
    {
      title: "General Knowledge",
      desc: "Test your brain with fun and tricky questions.",
      category: "Non-Drinking",
      players: "Solo / Group",
      mode: "Quiz",
      img: card9,
      path: "/games/general-knowledge",
    },
    {
      title: "Deep Questions",
      desc: "Ask meaningful questions and connect deeper.",
      category: "Couple",
      players: "2 Players",
      mode: "Couple",
      img: card10,
      path: "/games/deep-questions",
    },
    {
      title: "This or That",
      desc: "Choose and see if your partner matches.",
      category: "Couple",
      players: "2 Players",
      mode: "Couple",
      img: card11,
      path: "/games/this-or-that",
    },
    {
      title: "How Well Do You Know Me",
      desc: "Test your bond and knowledge of each other.",
      category: "Couple",
      players: "2 Players",
      mode: "Couple",
      img: card12,
      path: "/games/how-well-do-you-know-me",
    },
    {
      title: "Who is The Imposter",
      desc: "One player is secretly the imposter. Find them before it's too late.",
      category: "Group",
      players: "4+ Players",
      mode: "Non-Drinking",
      img: card13,
      path: "/games/who-is-the-imposter",
    },
    {
      title: "Pass The Phone",
      desc: "Pass the phone to someone who fits the prompt. Expose your friends.",
      category: "Party",
      players: "3+ Players",
      mode: "Fun",
      img: card14,
      path: "/games/pass-the-phone",
    },
    {
      title: "Rap Battle",
      desc: "Get a word and drop a rap using it. Best flow wins.",
      category: "Party",
      players: "2+ Players",
      mode: "Fun",
      img: card15,
      path: "/games/rap-battle",
    },
    {
    title: "Guess The Criminal",
    desc: "One player is guilty, one is the detective, and the rest must expose the liar before they escape.",
    category: "Mystery",
    players: "3+ Players",
    mode: "Suspense",
    img: card16,
    path: "/games/guess-the-criminal",
     },
     {
   title: "Mafia Night",
   desc: "Lie, accuse, and survive. Mafia eliminates in the dark while the town fights back to uncover the truth.",
    category: "Mystery",
    players: "4+ Players",
    mode: "Suspense",
    img: card17, 
    path: "/games/mafia",
    },
    {
  title: "Bluff IQ",
  desc: "Read the options, catch the fake, and prove your brain sees through the bluff.",
  category: "Brain Game",
  players: "2+ Players",
  mode: "Mind Tricks",
  img: card18,
  path: "/games/bluff-iq",
   }

  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredGames =
    activeCategory === "All"
      ? games
      : games.filter((game) => game.category === activeCategory);

  return (
    <section className="bg-[#0b0b0f] px-4 py-16 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-sm text-pink-400">Game Library</p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Find your perfect game
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/65 sm:text-base">
            Pick a vibe, choose a game, and start the fun with your friends.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
                  : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-3">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl"
            >
              <div className="h-40 overflow-hidden sm:h-52">
                <img
                  src={game.img}
                  alt={game.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4 sm:p-5">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/70 sm:text-xs">
                    {game.players}
                  </span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-pink-300 sm:text-xs">
                    {game.mode}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                  {game.title}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-white/65">
                  {game.desc}
                </p>

                <NavLink
                  to={game.path}
                  className="block w-full rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 px-4 py-2.5 text-center text-sm font-semibold transition hover:scale-[1.02]"
                >
                  Play Now
                </NavLink>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GamesLibrary;