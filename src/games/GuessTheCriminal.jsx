import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Search,
  User,
  Skull,
  Eye,
  Clock3,
  Vote,
  ChevronRight,
  RotateCcw,
  Users,
  FileWarning,
  Sparkles,
} from "lucide-react";
import { guessTheCriminalCases } from "../data/guessthecriminaldata";

const initialInputs = ["", "", ""];

const roleStyles = {
  Criminal: {
    icon: Skull,
    badge: "from-red-500/30 via-rose-500/20 to-red-900/10",
    border: "border-red-400/40",
    text: "text-red-300",
    glow: "shadow-[0_0_45px_rgba(239,68,68,0.22)]",
    roleDesc:
      "You are the Criminal. Blend in, stay believable, and make others doubt each other.",
    objective: "Mislead the discussion and avoid getting the most votes.",
  },
  Detective: {
    icon: Search,
    badge: "from-cyan-500/30 via-sky-500/20 to-blue-900/10",
    border: "border-cyan-400/40",
    text: "text-cyan-300",
    glow: "shadow-[0_0_45px_rgba(34,211,238,0.18)]",
    roleDesc:
      "You are the Detective. Use your clue smartly and guide the room toward the truth.",
    objective: "Spot contradictions and help the group catch the Criminal.",
  },
  Innocent: {
    icon: User,
    badge: "from-violet-500/30 via-fuchsia-500/20 to-purple-900/10",
    border: "border-violet-400/40",
    text: "text-violet-300",
    glow: "shadow-[0_0_45px_rgba(168,85,247,0.18)]",
    roleDesc:
      "You are Innocent. Share what you noticed, compare stories, and expose the liar.",
    objective: "Use your observation to help identify the Criminal.",
  },
};

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getVoteWinner(votesObj) {
  const counts = {};

  Object.values(votesObj).forEach((suspect) => {
    counts[suspect] = (counts[suspect] || 0) + 1;
  });

  const entries = Object.entries(counts);
  if (!entries.length) return { winner: null, counts: {} };

  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const topVotes = sorted[0][1];
  const tied = sorted.filter((entry) => entry[1] === topVotes);

  if (tied.length > 1) {
    return { winner: null, counts };
  }

  return { winner: sorted[0][0], counts };
}

function GuessTheCriminal() {
  const [step, setStep] = useState("setup");
  const [playerInputs, setPlayerInputs] = useState(initialInputs);
  const [players, setPlayers] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [playerInfo, setPlayerInfo] = useState({});
  const [currentRevealIndex, setCurrentRevealIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(false);
  const [discussionTime, setDiscussionTime] = useState(120);
  const [votes, setVotes] = useState({});
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [selectedVote, setSelectedVote] = useState("");
  const [finalResult, setFinalResult] = useState(null);

  const criminalName = useMemo(() => {
    return Object.keys(playerInfo).find(
      (name) => playerInfo[name]?.role === "Criminal"
    );
  }, [playerInfo]);

  const currentPlayer = players[currentRevealIndex];
  const currentPlayerInfo = playerInfo[currentPlayer];
  const currentRole = currentPlayerInfo?.role || "Innocent";
  const roleConfig = roleStyles[currentRole];
  const RoleIcon = roleConfig?.icon || User;

  useEffect(() => {
    if (step !== "discussion") return;
    if (discussionTime <= 0) return;

    const timer = setTimeout(() => {
      setDiscussionTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [discussionTime, step]);

  useEffect(() => {
    if (step === "discussion" && discussionTime === 0) {
      setStep("voting");
    }
  }, [discussionTime, step]);

  const handleInputChange = (index, value) => {
    const copy = [...playerInputs];
    copy[index] = value;
    setPlayerInputs(copy);
  };

  const addPlayerField = () => {
    if (playerInputs.length >= 10) return;
    setPlayerInputs([...playerInputs, ""]);
  };

  const removePlayerField = (index) => {
    if (playerInputs.length <= 3) return;
    setPlayerInputs(playerInputs.filter((_, i) => i !== index));
  };

  const setupRound = () => {
    const cleanedPlayers = playerInputs.map((p) => p.trim()).filter(Boolean);

    if (cleanedPlayers.length < 3) {
      alert("Enter at least 3 player names.");
      return;
    }

    const casePick =
      guessTheCriminalCases[
        Math.floor(Math.random() * guessTheCriminalCases.length)
      ];

    const shuffledPlayers = shuffleArray(cleanedPlayers);
    const shuffledInnocentClues = shuffleArray(casePick.innocentClues);
    const roundInfo = {};

    shuffledPlayers.forEach((name, index) => {
      if (index === 0) {
        roundInfo[name] = {
          role: "Criminal",
          secret: casePick.criminalSecret,
        };
      } else if (index === 1) {
        roundInfo[name] = {
          role: "Detective",
          secret: casePick.detectiveClue,
        };
      } else {
        const clueIndex = (index - 2) % shuffledInnocentClues.length;
        roundInfo[name] = {
          role: "Innocent",
          secret: shuffledInnocentClues[clueIndex],
        };
      }
    });

    setPlayers(cleanedPlayers);
    setSelectedCase(casePick);
    setPlayerInfo(roundInfo);
    setCurrentRevealIndex(0);
    setRoleVisible(false);
    setDiscussionTime(120);
    setVotes({});
    setCurrentVoterIndex(0);
    setSelectedVote("");
    setFinalResult(null);
    setStep("briefing");
  };

  const handleNextReveal = () => {
    setRoleVisible(false);

    if (currentRevealIndex < players.length - 1) {
      setCurrentRevealIndex((prev) => prev + 1);
    } else {
      setStep("discussion");
    }
  };

  const castVote = () => {
    if (!selectedVote) {
      alert("Select a suspect first.");
      return;
    }

    const voter = players[currentVoterIndex];
    const updatedVotes = {
      ...votes,
      [voter]: selectedVote,
    };

    setVotes(updatedVotes);
    setSelectedVote("");

    if (currentVoterIndex < players.length - 1) {
      setCurrentVoterIndex((prev) => prev + 1);
    } else {
      const result = getVoteWinner(updatedVotes);
      const groupWon = result.winner === criminalName;

      setFinalResult({
        criminal: criminalName,
        votedOut: result.winner,
        voteCounts: result.counts,
        groupWon,
        tie: result.winner === null,
      });

      setStep("result");
    }
  };

  const resetGame = () => {
    setStep("setup");
    setPlayerInputs(initialInputs);
    setPlayers([]);
    setSelectedCase(null);
    setPlayerInfo({});
    setCurrentRevealIndex(0);
    setRoleVisible(false);
    setDiscussionTime(120);
    setVotes({});
    setCurrentVoterIndex(0);
    setSelectedVote("");
    setFinalResult(null);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070d] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute right-0 top-28 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-red-200">
                <ShieldAlert size={14} />
                Mystery Party Mode
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Guess The Criminal
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                Read the case first, then reveal secret roles one by one, discuss
                contradictions, and vote out the real criminal.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:w-fit">
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Players
                </p>
                <p className="mt-1 text-lg font-bold">{players.length || "-"}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Cases
                </p>
                <p className="mt-1 text-lg font-bold">
                  {guessTheCriminalCases.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Roles
                </p>
                <p className="mt-1 text-lg font-bold">3 Types</p>
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <Users className="text-white/80" size={22} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">Enter Players</h2>
                  <p className="text-sm text-white/60">
                    Minimum 3 players. Best with 4 to 8.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {playerInputs.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-3"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 font-bold text-white/80">
                      {index + 1}
                    </div>

                    <input
                      type="text"
                      value={player}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder={`Player ${index + 1}`}
                      className="h-11 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-white/35 focus:border-violet-400/50"
                    />

                    {playerInputs.length > 3 && (
                      <button
                        onClick={() => removePlayerField(index)}
                        className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-200 transition hover:bg-red-500/20"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={addPlayerField}
                  className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
                >
                  Add Player
                </button>

                <button
                  onClick={setupRound}
                  className="rounded-2xl bg-linear-to-r from-red-500 via-fuchsia-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                >
                  Start Mystery
                </button>
              </div>
            </motion.div>
          )}

          {step === "briefing" && selectedCase && (
            <motion.div
              key="briefing"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-200">
                  <FileWarning size={14} />
                  Case File Opened
                </div>

                <h2 className="text-3xl font-black sm:text-4xl">
                  {selectedCase.title}
                </h2>

                <p className="mt-5 text-base leading-7 text-white/75">
                  {selectedCase.story}
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/30 p-5 text-left">
                    <p className="text-sm font-semibold text-white">
                      Read this first
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-white/65">
                      <li>• Everyone should understand the case before role reveal.</li>
                      <li>• Private clues will connect to this story.</li>
                      <li>• Pay attention to places, objects, and timing.</li>
                      <li>• After this, each player will secretly reveal their role.</li>
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-5 text-left">
                    <p className="text-sm font-semibold text-white">
                      What happens next
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-white/65">
                      <li>• Pass the phone one by one.</li>
                      <li>• Each player reveals their secret role card privately.</li>
                      <li>• Then discussion starts.</li>
                      <li>• Finally, everyone votes for one suspect.</li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setStep("reveal")}
                  className="mt-8 rounded-2xl bg-linear-to-r from-red-500 via-fuchsia-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                >
                  Continue to Role Reveal
                </button>
              </div>
            </motion.div>
          )}

          {step === "reveal" && currentPlayerInfo && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                  Secret Role Reveal
                </p>
                <h2 className="mt-2 text-3xl font-black">{currentPlayer}'s turn</h2>
                <p className="mt-2 text-white/60">
                  Only <span className="font-semibold text-white">{currentPlayer}</span>{" "}
                  should look at this screen
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                {!roleVisible ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRoleVisible(true)}
                    className="flex min-h-70 w-full max-w-2xl flex-col items-center justify-center rounded-[28px] border border-white/10 bg-linear-to-b from-white/10 to-white/5 p-8 text-center"
                  >
                    <Eye size={40} className="mb-4 text-white/70" />
                    <h3 className="text-2xl font-bold">Tap to reveal role card</h3>
                    <p className="mt-2 max-w-md text-sm text-white/55">
                      Your role and clue are secret. Read carefully and hide it
                      before passing the device.
                    </p>
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 18, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    className={`w-full max-w-2xl rounded-[28px] border bg-linear-to-br ${roleConfig.badge} ${roleConfig.border} ${roleConfig.glow} p-8`}
                  >
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-black/30">
                        <RoleIcon size={34} className={roleConfig.text} />
                      </div>

                      <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                        Your Role
                      </p>
                      <h3 className={`mt-2 text-4xl font-black ${roleConfig.text}`}>
                        {currentRole}
                      </h3>
                      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/75">
                        {roleConfig.roleDesc}
                      </p>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                      <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                          Objective
                        </p>
                        <p className="mt-3 text-sm leading-6 text-white/80">
                          {roleConfig.objective}
                        </p>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                          Private Information
                        </p>
                        <p className="mt-3 text-sm leading-6 text-white/80">
                          {currentPlayerInfo.secret}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                        Remember
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/75">
                        Your clue connects to the story everyone already read. Use
                        it during discussion to defend yourself or expose others.
                      </p>
                    </div>

                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={handleNextReveal}
                        className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
                      >
                        Hide & Pass
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {step === "discussion" && selectedCase && (
            <motion.div
              key="discussion"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                    Discussion Phase
                  </p>
                  <h2 className="mt-2 text-3xl font-black">Interrogate the room</h2>
                  <p className="mt-2 max-w-xl text-white/65">
                    Everyone knows the story. Now use your secret clue and compare
                    statements to catch the liar.
                  </p>
                </div>

                <div className="rounded-[28px] border border-red-400/20 bg-red-500/10 px-6 py-5 text-center shadow-lg">
                  <div className="flex items-center justify-center gap-2 text-red-200">
                    <Clock3 size={18} />
                    <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                      Time Left
                    </span>
                  </div>
                  <p className="mt-2 text-4xl font-black">{discussionTime}s</p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-violet-300" />
                    <p className="font-semibold text-white">Case Reminder</p>
                  </div>
                  <p className="text-sm leading-6 text-white/70">
                    {selectedCase.story}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                  <p className="font-semibold text-white">Question ideas</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      "Where were you standing?",
                      "What did you notice first?",
                      "Who moved during the incident?",
                      "Whose story feels fake?",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {players.map((player) => (
                  <div
                    key={player}
                    className="rounded-2xl border border-white/10 bg-black/30 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Suspect
                    </p>
                    <p className="mt-2 text-lg font-bold">{player}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setStep("voting")}
                  className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
                >
                  Skip to Voting
                </button>
              </div>
            </motion.div>
          )}

          {step === "voting" && (
            <motion.div
              key="voting"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <div className="text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                  <Vote size={14} />
                  Secret Voting
                </div>

                <h2 className="text-3xl font-black">
                  {players[currentVoterIndex]}'s vote
                </h2>
                <p className="mt-2 text-white/60">
                  Pass the device to{" "}
                  <span className="font-semibold text-white">
                    {players[currentVoterIndex]}
                  </span>
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {players
                  .filter((name) => name !== players[currentVoterIndex])
                  .map((player) => (
                    <button
                      key={player}
                      onClick={() => setSelectedVote(player)}
                      className={`rounded-3xl border p-5 text-left transition ${
                        selectedVote === player
                          ? "border-red-400/50 bg-red-500/10 shadow-[0_0_35px_rgba(239,68,68,0.15)]"
                          : "border-white/10 bg-black/30 hover:bg-white/10"
                      }`}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                        Suspect
                      </p>
                      <p className="mt-2 text-lg font-bold">{player}</p>
                    </button>
                  ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={castVote}
                  className="rounded-2xl bg-linear-to-r from-red-500 via-fuchsia-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                >
                  Confirm Vote
                </button>
              </div>
            </motion.div>
          )}

          {step === "result" && finalResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <div className="mx-auto max-w-4xl text-center">
                <div
                  className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] ${
                    finalResult.groupWon
                      ? "border border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                      : "border border-red-400/20 bg-red-500/10 text-red-200"
                  }`}
                >
                  {finalResult.groupWon
                    ? "Case Solved"
                    : finalResult.tie
                    ? "No Clear Verdict"
                    : "Criminal Escaped"}
                </div>

                <h2 className="text-3xl font-black sm:text-5xl">
                  {finalResult.groupWon
                    ? "The group caught the Criminal"
                    : finalResult.tie
                    ? "The room was split"
                    : "The Criminal fooled everyone"}
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/65">
                  {finalResult.groupWon
                    ? "The clues and contradictions pointed to the right suspect."
                    : finalResult.tie
                    ? "No suspect got a clear majority, so the Criminal escaped in the confusion."
                    : "The room voted wrong, and the real Criminal slipped away."}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/30 p-5 text-left">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Real Criminal
                    </p>
                    <p className="mt-2 text-2xl font-black text-red-300">
                      {finalResult.criminal}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-5 text-left">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Most Votes
                    </p>
                    <p className="mt-2 text-2xl font-black text-white">
                      {finalResult.votedOut || "Tie / No majority"}
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-5 text-left">
                  <p className="text-sm font-semibold text-white">
                    Vote Breakdown
                  </p>

                  <div className="mt-4 space-y-2">
                    {Object.entries(votes).map(([voter, suspect]) => (
                      <div
                        key={voter}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                      >
                        <span className="text-white/70">{voter}</span>
                        <span className="font-semibold text-white">{suspect}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-5 text-left">
                  <p className="text-sm font-semibold text-white">Vote Totals</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {Object.entries(finalResult.voteCounts).map(([name, count]) => (
                      <div
                        key={name}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                      >
                        <span className="font-semibold">{name}</span>: {count} vote
                        {count > 1 ? "s" : ""}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={resetGame}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
                  >
                    <RotateCcw size={18} />
                    Play Again
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default GuessTheCriminal;