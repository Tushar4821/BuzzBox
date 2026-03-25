import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Moon,
  Sun,
  ShieldPlus,
  Skull,
  Search,
  Users,
  Vote,
  Eye,
  EyeOff,
  Play,
  ArrowRight,
  TimerReset,
  Sparkles,
} from "lucide-react";

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getRoleDistribution(count) {
  if (count <= 5) {
    return ["mafia", "medic", ...Array(count - 2).fill("innocent")];
  }
  if (count <= 7) {
    return ["mafia", "medic", "detective", ...Array(count - 3).fill("innocent")];
  }
  return ["mafia", "mafia", "medic", "detective", ...Array(count - 4).fill("innocent")];
}

function getRoleMeta(role) {
  switch (role) {
    case "mafia":
      return {
        title: "Mafia",
        desc: "Wake in the dark and secretly choose a target.",
        icon: Skull,
        theme:
          "from-red-600/30 via-red-500/10 to-transparent border-red-400/30 shadow-red-500/20",
        glow: "bg-red-500/20",
        badge: "text-red-200 border-red-400/30 bg-red-500/10",
      };
    case "medic":
      return {
        title: "Medic",
        desc: "Save one player from the night’s danger.",
        icon: ShieldPlus,
        theme:
          "from-emerald-500/30 via-emerald-400/10 to-transparent border-emerald-400/30 shadow-emerald-500/20",
        glow: "bg-emerald-500/20",
        badge: "text-emerald-200 border-emerald-400/30 bg-emerald-500/10",
      };
    case "detective":
      return {
        title: "Detective",
        desc: "Inspect one player and learn if they are Mafia.",
        icon: Search,
        theme:
          "from-amber-500/30 via-yellow-400/10 to-transparent border-amber-300/30 shadow-amber-400/20",
        glow: "bg-amber-500/20",
        badge: "text-amber-200 border-amber-400/30 bg-amber-500/10",
      };
    default:
      return {
        title: "Innocent",
        desc: "Observe, discuss, vote, and survive the chaos.",
        icon: Users,
        theme:
          "from-white/15 via-white/5 to-transparent border-white/15 shadow-white/10",
        glow: "bg-white/10",
        badge: "text-white/80 border-white/15 bg-white/5",
      };
  }
}

function getPhaseTheme(phase) {
  if (phase === "mafiaTurn") {
    return {
      title: "Mafia, Open Your Eyes",
      subtitle: "The shadows move first. Choose one target.",
      accent: "from-red-600/25 via-red-500/10 to-transparent",
      border: "border-red-500/30",
      button: "from-red-500 to-pink-500",
      text: "text-red-200",
      icon: Skull,
    };
  }

  if (phase === "medicTurn") {
    return {
      title: "Medic, Wake Up",
      subtitle: "One life may still be saved tonight.",
      accent: "from-emerald-500/25 via-emerald-400/10 to-transparent",
      border: "border-emerald-500/30",
      button: "from-emerald-400 to-teal-500",
      text: "text-emerald-200",
      icon: ShieldPlus,
    };
  }

  if (phase === "detectiveTurn") {
    return {
      title: "Detective, Open Your Eyes",
      subtitle: "Choose one player and uncover the truth.",
      accent: "from-amber-500/25 via-yellow-300/10 to-transparent",
      border: "border-amber-400/30",
      button: "from-amber-400 to-yellow-500",
      text: "text-amber-200",
      icon: Search,
    };
  }

  return {
    title: "",
    subtitle: "",
    accent: "from-white/10 to-transparent",
    border: "border-white/10",
    button: "from-fuchsia-500 to-purple-500",
    text: "text-white",
    icon: Sparkles,
  };
}

function pickTargetName(players, id) {
  return players.find((p) => p.id === id)?.name || "";
}

function countVotes(votesObj) {
  return Object.entries(votesObj)
    .map(([id, count]) => ({ id: Number(id), count }))
    .sort((a, b) => b.count - a.count);
}

function CinematicCard({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)]" />
      {children}
    </div>
  );
}

function PlayerTile({
  player,
  selected,
  onClick,
  tone = "default",
  disabled = false,
  votesCount,
}) {
  const toneMap = {
    default: selected
      ? "border-fuchsia-400/60 bg-fuchsia-500/15 shadow-fuchsia-500/20"
      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
    red: selected
      ? "border-red-400/60 bg-red-500/15 shadow-red-500/20"
      : "border-white/10 bg-white/5 hover:border-red-300/30 hover:bg-red-500/10",
    green: selected
      ? "border-emerald-400/60 bg-emerald-500/15 shadow-emerald-500/20"
      : "border-white/10 bg-white/5 hover:border-emerald-300/30 hover:bg-emerald-500/10",
    yellow: selected
      ? "border-amber-400/60 bg-amber-500/15 shadow-amber-500/20"
      : "border-white/10 bg-white/5 hover:border-amber-300/30 hover:bg-amber-500/10",
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { y: -5, rotateX: 6, rotateY: -6, scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`group relative min-h-27.5 overflow-hidden rounded-3xl border p-4 text-left shadow-xl transition duration-300 ${toneMap[tone]} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_45%)]" />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-white">{player.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/45">
            {player.alive ? "Alive" : "Eliminated"}
          </p>
        </div>

        {typeof votesCount === "number" && (
          <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-sm font-semibold text-white/80">
            {votesCount} vote{votesCount !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </motion.button>
  );
}

function DiscussionTimer({ duration = 60, onDone }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onDone?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onDone]);

  const progress = (timeLeft / duration) * 100;

  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between text-sm text-white/65">
        <span>Discussion Timer</span>
        <span>{timeLeft}s</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-linear-to-r from-fuchsia-500 via-pink-500 to-red-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "linear" }}
        />
      </div>
    </div>
  );
}

function MafiaGame() {
  const [playerInputs, setPlayerInputs] = useState(["", "", "", ""]);
  const [players, setPlayers] = useState([]);
  const [phase, setPhase] = useState("setup");
  const [round, setRound] = useState(1);

  const [revealIndex, setRevealIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(false);

  const [selectedKill, setSelectedKill] = useState(null);
  const [selectedSave, setSelectedSave] = useState(null);
  const [selectedInspect, setSelectedInspect] = useState(null);

  const [inspectResult, setInspectResult] = useState("");
  const [nightSummary, setNightSummary] = useState("");
  const [voteSummary, setVoteSummary] = useState("");
  const [winner, setWinner] = useState(null);

  const [discussionDuration, setDiscussionDuration] = useState(60);
  const [discussionEnded, setDiscussionEnded] = useState(false);

  const [currentVoter, setCurrentVoter] = useState(0);
  const [votes, setVotes] = useState({});

  const alivePlayers = useMemo(
    () => players.filter((player) => player.alive),
    [players]
  );

  const aliveMafia = useMemo(
    () => players.filter((player) => player.alive && player.role === "mafia"),
    [players]
  );

  const aliveNonMafia = useMemo(
    () => players.filter((player) => player.alive && player.role !== "mafia"),
    [players]
  );

  const phaseTheme = getPhaseTheme(phase);

  const handleInputChange = (index, value) => {
    const updated = [...playerInputs];
    updated[index] = value;
    setPlayerInputs(updated);
  };

  const addPlayer = () => {
    if (playerInputs.length >= 12) return;
    setPlayerInputs((prev) => [...prev, ""]);
  };

  const removePlayer = (index) => {
    if (playerInputs.length <= 4) return;
    setPlayerInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const resetSelections = () => {
    setSelectedKill(null);
    setSelectedSave(null);
    setSelectedInspect(null);
    setInspectResult("");
    setNightSummary("");
    setVoteSummary("");
    setVotes({});
    setCurrentVoter(0);
    setDiscussionEnded(false);
  };

  const resetGame = () => {
    setPlayerInputs(["", "", "", ""]);
    setPlayers([]);
    setPhase("setup");
    setRound(1);
    setRevealIndex(0);
    setRoleVisible(false);
    setWinner(null);
    resetSelections();
  };

  const checkWinner = (updatedPlayers) => {
    const mafiaCount = updatedPlayers.filter((p) => p.alive && p.role === "mafia").length;
    const villageCount = updatedPlayers.filter((p) => p.alive && p.role !== "mafia").length;

    if (mafiaCount === 0) {
      setWinner("Villagers");
      setPhase("gameOver");
      return true;
    }

    if (mafiaCount >= villageCount) {
      setWinner("Mafia");
      setPhase("gameOver");
      return true;
    }

    return false;
  };

  const startGame = () => {
    const cleanedPlayers = playerInputs.map((p) => p.trim()).filter(Boolean);

    if (cleanedPlayers.length < 4) {
      alert("Enter at least 4 players.");
      return;
    }

    const roles = shuffleArray(getRoleDistribution(cleanedPlayers.length));

    const assignedPlayers = cleanedPlayers.map((name, index) => ({
      id: index + 1,
      name,
      role: roles[index],
      alive: true,
    }));

    setPlayers(assignedPlayers);
    setRevealIndex(0);
    setRoleVisible(false);
    setRound(1);
    setWinner(null);
    resetSelections();
    setPhase("reveal");
  };

  const nextReveal = () => {
    setRoleVisible(false);
    if (revealIndex < players.length - 1) {
      setRevealIndex((prev) => prev + 1);
    } else {
      setPhase("nightIntro");
    }
  };

  const beginNight = () => {
    resetSelections();
    setPhase("mafiaTurn");
  };

  const goToMedicOrResolve = () => {
    const medicAlive = players.some((p) => p.alive && p.role === "medic");
    const detectiveAlive = players.some((p) => p.alive && p.role === "detective");

    if (medicAlive) {
      setPhase("medicTurn");
      return;
    }

    if (detectiveAlive) {
      setPhase("detectiveTurn");
      return;
    }

    resolveNight();
  };

  const goToDetectiveOrResolve = () => {
    const detectiveAlive = players.some((p) => p.alive && p.role === "detective");
    if (detectiveAlive) {
      setPhase("detectiveTurn");
      return;
    }
    resolveNight();
  };

  const revealDetectiveResult = () => {
    const inspected = players.find((p) => p.id === selectedInspect);
    if (!inspected) return;

    if (inspected.role === "mafia") {
      setInspectResult(`${inspected.name} is Mafia.`);
    } else {
      setInspectResult(`${inspected.name} is not Mafia.`);
    }

    setPhase("detectiveResult");
  };

  const resolveNight = () => {
    let updatedPlayers = [...players];
    const target = updatedPlayers.find((p) => p.id === selectedKill);

    if (!target) {
      setNightSummary("The town survives another quiet night...");
      setPhase("day");
      return;
    }

    if (selectedKill === selectedSave) {
      setNightSummary(
        `${target.name} was attacked in the dark... but the Medic saved them just in time.`
      );
    } else {
      updatedPlayers = updatedPlayers.map((p) =>
        p.id === selectedKill ? { ...p, alive: false } : p
      );
      setNightSummary(`${target.name} did not survive the night.`);
    }

    setPlayers(updatedPlayers);

    if (!checkWinner(updatedPlayers)) {
      setPhase("day");
    }
  };

  const startVoting = () => {
    setVotes({});
    setCurrentVoter(0);
    setVoteSummary("");
    setPhase("voting");
  };

  const castVote = (targetId) => {
    const voter = alivePlayers[currentVoter];
    if (!voter) return;

    setVotes((prev) => ({
      ...prev,
      [targetId]: (prev[targetId] || 0) + 1,
    }));

    if (currentVoter < alivePlayers.length - 1) {
      setCurrentVoter((prev) => prev + 1);
    } else {
      setPhase("voteReveal");
    }
  };

  const resolveVoting = () => {
    const voteEntries = countVotes(votes);

    if (voteEntries.length === 0) {
      setVoteSummary("No votes were cast. The suspicion fades for now.");
      setRound((prev) => prev + 1);
      setPhase("nightIntro");
      return;
    }

    const highest = voteEntries[0].count;
    const tied = voteEntries.filter((v) => v.count === highest);

    if (tied.length > 1) {
      setVoteSummary("The town is split. The vote ends in a tie. No one is eliminated.");
      setRound((prev) => prev + 1);
      setPhase("nightIntro");
      return;
    }

    const eliminatedId = voteEntries[0].id;
    const eliminatedPlayer = players.find((p) => p.id === eliminatedId);

    const updatedPlayers = players.map((p) =>
      p.id === eliminatedId ? { ...p, alive: false } : p
    );

    setPlayers(updatedPlayers);
    setVoteSummary(
      `${eliminatedPlayer?.name} was voted out by the town. Their role was ${eliminatedPlayer?.role}.`
    );

    if (!checkWinner(updatedPlayers)) {
      setRound((prev) => prev + 1);
      setPhase("voteResult");
    }
  };

  const roleRevealPlayer = players[revealIndex];
  const roleMeta = roleRevealPlayer ? getRoleMeta(roleRevealPlayer.role) : null;
  const RoleIcon = roleMeta?.icon;
  const PhaseIcon = phaseTheme.icon;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#06070b] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-red-500/20 blur-3xl animate-pulse" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.75))]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60 backdrop-blur-xl">
              <Moon className="h-4 w-4" />
              Cinematic Mafia Mode
            </div>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Mafia Night
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              A host-driven mystery party game with secret roles, night actions,
              heated discussions, and dramatic voting.
            </p>
          </div>

          {phase !== "setup" && phase !== "gameOver" && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Round</p>
                <p className="mt-1 text-lg font-bold">{round}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Alive</p>
                <p className="mt-1 text-lg font-bold">{alivePlayers.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Mafia</p>
                <p className="mt-1 text-lg font-bold">{aliveMafia.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Town</p>
                <p className="mt-1 text-lg font-bold">{aliveNonMafia.length}</p>
              </div>
            </div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -26 }}
            >
              <CinematicCard className="p-6 sm:p-8">
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                      Setup
                    </p>
                    <h2 className="mt-2 text-3xl font-black">Create the lobby</h2>
                    <p className="mt-3 text-white/65">
                      Add at least 4 players. Roles are assigned automatically.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/65">
                    4–5 players: 1 Mafia, 1 Medic<br />
                    6–7 players: + Detective<br />
                    8+ players: 2 Mafia
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {playerInputs.map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-3xl border border-white/10 bg-black/20 p-3"
                    >
                      <input
                        value={player}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        placeholder={`Player ${index + 1}`}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-white/30"
                      />
                      {playerInputs.length > 4 && (
                        <button
                          onClick={() => removePlayer(index)}
                          className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-red-200 transition hover:bg-red-500/20"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={addPlayer}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold transition hover:bg-white/10"
                  >
                    Add Player
                  </button>
                  <button
                    onClick={startGame}
                    className="rounded-2xl bg-linear-to-r from-red-500 via-pink-500 to-purple-500 px-6 py-3 font-semibold shadow-lg shadow-pink-500/20 transition hover:scale-[1.02]"
                  >
                    Start Mafia Night
                  </button>
                </div>
              </CinematicCard>
            </motion.div>
          )}

          {phase === "reveal" && roleRevealPlayer && roleMeta && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="mx-auto max-w-3xl"
            >
              <CinematicCard className="p-6 sm:p-8">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/45">
                    Secret Role Reveal
                  </p>
                  <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                    Pass the device to {roleRevealPlayer.name}
                  </h2>
                  <p className="mt-3 text-white/65">
                    Only this player should look at the screen.
                  </p>

                  {!roleVisible ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRoleVisible(true)}
                      className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-fuchsia-500 to-purple-500 px-7 py-4 font-semibold"
                    >
                      <Eye className="h-5 w-5" />
                      Reveal My Role
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, rotateX: -15, y: 22 }}
                      animate={{ opacity: 1, rotateX: 0, y: 0 }}
                      transition={{ duration: 0.45 }}
                      className={`relative mt-10 overflow-hidden rounded-4xl border bg-linear-to-br p-8 shadow-2xl ${roleMeta.theme}`}
                    >
                      <div className={`absolute -top-10 right-0 h-40 w-40 rounded-full blur-3xl ${roleMeta.glow}`} />
                      <div className="relative z-10">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/25">
                          {RoleIcon && <RoleIcon className="h-10 w-10" />}
                        </div>

                        <div
                          className={`mx-auto mt-5 inline-flex rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] ${roleMeta.badge}`}
                        >
                          {roleMeta.title}
                        </div>

                        <p className="mt-6 text-lg text-white/85">{roleMeta.desc}</p>

                        <button
                          onClick={nextReveal}
                          className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-black/25 px-6 py-3 font-semibold transition hover:bg-black/35"
                        >
                          <EyeOff className="h-5 w-5" />
                          Hide & Pass On
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CinematicCard>
            </motion.div>
          )}

          {phase === "nightIntro" && (
            <motion.div
              key="nightIntro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-4xl"
            >
              <CinematicCard className="overflow-hidden p-10 text-center sm:p-14">
                <motion.div
                  animate={{ scale: [1, 1.04, 1], opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-2xl"
                >
                  <Moon className="h-12 w-12 text-red-200" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-8 text-5xl font-black tracking-[0.12em] sm:text-6xl"
                >
                  NIGHT FALLS
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg"
                >
                  The town goes silent. Everyone closes their eyes. The host guides
                  the roles one by one through the darkness.
                </motion.p>

                {!!voteSummary && (
                  <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-white/10 bg-black/20 p-5 text-white/75">
                    {voteSummary}
                  </div>
                )}

                <motion.button
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={beginNight}
                  className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-red-500 via-pink-500 to-purple-500 px-7 py-4 font-semibold shadow-lg shadow-red-500/20"
                >
                  <Play className="h-5 w-5" />
                  Begin Night
                </motion.button>
              </CinematicCard>
            </motion.div>
          )}

          {(phase === "mafiaTurn" ||
            phase === "medicTurn" ||
            phase === "detectiveTurn") && (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
            >
              <CinematicCard
                className={`border ${phaseTheme.border} bg-linear-to-br ${phaseTheme.accent} p-6 sm:p-8`}
              >
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className={`inline-flex rounded-full border px-4 py-2 text-xs uppercase tracking-[0.35em] ${phaseTheme.text} ${phaseTheme.border} bg-black/20`}>
                      Night Phase
                    </div>
                    <h2 className={`mt-4 text-3xl font-black sm:text-4xl ${phaseTheme.text}`}>
                      {phaseTheme.title}
                    </h2>
                    <p className="mt-3 text-white/65">{phaseTheme.subtitle}</p>
                  </div>

                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.3, repeat: Infinity }}
                    className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/20"
                  >
                    <PhaseIcon className={`h-9 w-9 ${phaseTheme.text}`} />
                  </motion.div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {(phase === "mafiaTurn"
                    ? alivePlayers.filter((p) => p.role !== "mafia")
                    : alivePlayers
                  ).map((player) => (
                    <PlayerTile
                      key={player.id}
                      player={player}
                      selected={
                        phase === "mafiaTurn"
                          ? selectedKill === player.id
                          : phase === "medicTurn"
                            ? selectedSave === player.id
                            : selectedInspect === player.id
                      }
                      onClick={() => {
                        if (phase === "mafiaTurn") setSelectedKill(player.id);
                        if (phase === "medicTurn") setSelectedSave(player.id);
                        if (phase === "detectiveTurn") setSelectedInspect(player.id);
                      }}
                      tone={
                        phase === "mafiaTurn"
                          ? "red"
                          : phase === "medicTurn"
                            ? "green"
                            : "yellow"
                      }
                    />
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {phase === "mafiaTurn" && (
                    <button
                      onClick={goToMedicOrResolve}
                      disabled={!selectedKill}
                      className={`rounded-2xl bg-linear-to-r ${phaseTheme.button} px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      Confirm Target
                    </button>
                  )}

                  {phase === "medicTurn" && (
                    <button
                      onClick={goToDetectiveOrResolve}
                      disabled={!selectedSave}
                      className={`rounded-2xl bg-linear-to-r ${phaseTheme.button} px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      Confirm Save
                    </button>
                  )}

                  {phase === "detectiveTurn" && (
                    <button
                      onClick={revealDetectiveResult}
                      disabled={!selectedInspect}
                      className={`rounded-2xl bg-linear-to-r ${phaseTheme.button} px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      Reveal Detective Result
                    </button>
                  )}
                </div>
              </CinematicCard>
            </motion.div>
          )}

          {phase === "detectiveResult" && (
            <motion.div
              key="detectiveResult"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-3xl"
            >
              <CinematicCard className="border border-amber-400/25 bg-linear-to-br from-amber-500/20 via-black/30 to-transparent p-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/25">
                  <Search className="h-10 w-10 text-amber-200" />
                </div>

                <h2 className="mt-6 text-3xl font-black text-amber-100">
                  Detective Result
                </h2>
                <p className="mt-4 text-xl text-white/85">{inspectResult}</p>

                <button
                  onClick={resolveNight}
                  className="mt-8 rounded-2xl bg-linear-to-r from-amber-400 to-yellow-500 px-6 py-3 font-semibold text-black"
                >
                  End Night
                </button>
              </CinematicCard>
            </motion.div>
          )}

          {phase === "day" && (
            <motion.div
              key="day"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
            >
              <CinematicCard className="p-6 sm:p-8">
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-yellow-300/20 bg-yellow-400/10"
                  >
                    <Sun className="h-12 w-12 text-yellow-200" />
                  </motion.div>

                  <h2 className="mt-6 text-4xl font-black sm:text-5xl">DAY BREAKS</h2>
                  <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/75">
                    {nightSummary}
                  </p>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-xl font-bold">Alive Players</h3>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/65">
                        {alivePlayers.length} alive
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {alivePlayers.map((player) => (
                        <div
                          key={player.id}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                        >
                          <p className="font-semibold">{player.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
                    <h3 className="text-xl font-bold">Discussion</h3>
                    <p className="mt-3 text-white/65">
                      Let the players argue, defend, accuse, and bluff before the vote.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {[30, 60, 90].map((sec) => (
                        <button
                          key={sec}
                          onClick={() => {
                            setDiscussionDuration(sec);
                            setDiscussionEnded(false);
                          }}
                          className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                            discussionDuration === sec
                              ? "border-fuchsia-400/50 bg-fuchsia-500/15 text-white"
                              : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          {sec}s
                        </button>
                      ))}
                    </div>

                    {!discussionEnded ? (
                      <DiscussionTimer
                        duration={discussionDuration}
                        onDone={() => setDiscussionEnded(true)}
                      />
                    ) : (
                      <div className="mt-6 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-3 text-white/85">
                        Time is up. The town must vote.
                      </div>
                    )}

                    <button
                      onClick={startVoting}
                      className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-fuchsia-500 to-purple-500 px-6 py-3 font-semibold"
                    >
                      <Vote className="h-5 w-5" />
                      Start Voting
                    </button>
                  </div>
                </div>
              </CinematicCard>
            </motion.div>
          )}

          {phase === "voting" && (
            <motion.div
              key="voting"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
            >
              <CinematicCard className="border border-fuchsia-400/20 bg-linear-to-br from-fuchsia-500/15 via-black/20 to-transparent p-6 sm:p-8">
                <div className="mb-8 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/20">
                    <Vote className="h-10 w-10 text-pink-200" />
                  </div>
                  <h2 className="mt-5 text-3xl font-black sm:text-4xl">Town Voting</h2>
                  <p className="mt-3 text-white/70">
                    Pass the device to{" "}
                    <span className="font-bold text-white">
                      {alivePlayers[currentVoter]?.name}
                    </span>
                  </p>
                </div>

                <div className="mb-6 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/65">
                  Vote {currentVoter + 1} of {alivePlayers.length}
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {alivePlayers.map((player) => (
                    <PlayerTile
                      key={player.id}
                      player={player}
                      onClick={() => castVote(player.id)}
                      tone="default"
                    />
                  ))}
                </div>
              </CinematicCard>
            </motion.div>
          )}

          {phase === "voteReveal" && (
            <motion.div
              key="voteReveal"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-4xl"
            >
              <CinematicCard className="p-6 sm:p-8">
                <div className="text-center">
                  <h2 className="text-3xl font-black sm:text-4xl">Votes Locked</h2>
                  <p className="mt-3 text-white/65">
                    The host can now reveal the town’s decision.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {alivePlayers.map((player) => (
                    <PlayerTile
                      key={player.id}
                      player={player}
                      votesCount={votes[player.id] || 0}
                      tone="default"
                      disabled
                    />
                  ))}
                </div>

                <button
                  onClick={resolveVoting}
                  className="mt-8 rounded-2xl bg-linear-to-r from-red-500 via-pink-500 to-purple-500 px-6 py-3 font-semibold"
                >
                  Reveal Vote Result
                </button>
              </CinematicCard>
            </motion.div>
          )}

          {phase === "voteResult" && (
            <motion.div
              key="voteResult"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-4xl"
            >
              <CinematicCard className="p-8 text-center">
                <h2 className="text-3xl font-black sm:text-4xl">The Town Has Spoken</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                  {voteSummary}
                </p>

                <button
                  onClick={() => setPhase("nightIntro")}
                  className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-fuchsia-500 to-purple-500 px-6 py-3 font-semibold"
                >
                  <ArrowRight className="h-5 w-5" />
                  Continue to Next Night
                </button>
              </CinematicCard>
            </motion.div>
          )}

          {phase === "gameOver" && (
            <motion.div
              key="gameOver"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <CinematicCard className="overflow-hidden border border-white/10 bg-linear-to-br from-[#11131b] via-[#120911] to-[#1b0b14] p-8 sm:p-10">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                    className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5"
                  >
                    {winner === "Mafia" ? (
                      <Skull className="h-12 w-12 text-red-300" />
                    ) : (
                      <Sun className="h-12 w-12 text-yellow-200" />
                    )}
                  </motion.div>

                  <h2 className="mt-6 text-5xl font-black sm:text-6xl">
                    {winner} Win
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-white/65">
                    The game is over. Reveal the truth, talk trash, and begin another round.
                  </p>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {players.map((player) => {
                    const meta = getRoleMeta(player.role);
                    return (
                      <div
                        key={player.id}
                        className="rounded-[28px] border border-white/10 bg-white/5 p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-lg font-bold">{player.name}</p>
                            <p className="mt-1 text-sm text-white/55">
                              {player.alive ? "Alive" : "Eliminated"}
                            </p>
                          </div>
                          <div
                            className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${meta.badge}`}
                          >
                            {meta.title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={resetGame}
                    className="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-3 font-semibold text-black"
                  >
                    <TimerReset className="h-5 w-5" />
                    Play Again
                  </button>
                </div>
              </CinematicCard>
            </motion.div>
          )}
        </AnimatePresence>

        {phase !== "setup" && phase !== "reveal" && phase !== "gameOver" && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <CinematicCard className="p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold">Live Game Status</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/65">
                  Current phase: {phase}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className={`rounded-2xl border px-4 py-4 ${
                      player.alive
                        ? "border-white/10 bg-white/5"
                        : "border-red-500/20 bg-red-500/10 opacity-70"
                    }`}
                  >
                    <p className="font-semibold">{player.name}</p>
                    <p className="mt-1 text-sm text-white/55">
                      {player.alive ? "Alive" : "Out"}
                    </p>
                  </div>
                ))}
              </div>

              {(phase === "mafiaTurn" || phase === "medicTurn" || phase === "detectiveTurn") && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/65">
                  {phase === "mafiaTurn" && selectedKill && (
                    <span>Selected target: {pickTargetName(players, selectedKill)}</span>
                  )}
                  {phase === "medicTurn" && selectedSave && (
                    <span>Selected save: {pickTargetName(players, selectedSave)}</span>
                  )}
                  {phase === "detectiveTurn" && selectedInspect && (
                    <span>Selected inspect: {pickTargetName(players, selectedInspect)}</span>
                  )}
                  {!selectedKill && phase === "mafiaTurn" && <span>No target selected yet.</span>}
                  {!selectedSave && phase === "medicTurn" && <span>No save selected yet.</span>}
                  {!selectedInspect && phase === "detectiveTurn" && <span>No inspection selected yet.</span>}
                </div>
              )}
            </CinematicCard>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default MafiaGame;