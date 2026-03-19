import React, { createContext, useContext, useMemo, useState } from "react";

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [players, setPlayersState] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [mode, setMode] = useState("");

  const currentPlayer = players[currentPlayerIndex] || "";

  const setPlayers = (playerList) => {
    const cleanedPlayers = playerList
      .map((name) => name.trim())
      .filter((name) => name !== "");

    setPlayersState(cleanedPlayers);
    setCurrentPlayerIndex(0);
  };

  const nextTurn = () => {
    if (!players.length) return;
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  };

  const prevTurn = () => {
    if (!players.length) return;
    setCurrentPlayerIndex((prev) =>
      prev === 0 ? players.length - 1 : prev - 1
    );
  };

  const resetGame = () => {
    setPlayersState([]);
    setCurrentPlayerIndex(0);
    setMode("");
  };

  const value = useMemo(
    () => ({
      players,
      setPlayers,
      currentPlayerIndex,
      currentPlayer,
      mode,
      setMode,
      nextTurn,
      prevTurn,
      resetGame,
    }),
    [players, currentPlayerIndex, currentPlayer, mode]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGameContext must be used inside GameProvider");
  }

  return context;
}