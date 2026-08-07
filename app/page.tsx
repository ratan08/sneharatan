"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Stars, Music, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
const questions = [
  { id: 1, text: "Are you ready to travel the world and make unforgettable memories with me?", image: "/images/travel1.png" },
  { id: 2, text: "Will you be my favorite travel partner for all our future adventures?", image: "/images/travel2.png" },
  { id: 3, text: "Do you promise to always hold my hand, whether we're exploring a new city or lost in the mountains?", image: "/images/travel3.png" },
  { id: 4, text: "Will you promise to share the responsibilities of our home and future together?", image: "/images/q1.png" },
  { id: 5, text: "Will you stand by me through all of life's challenges and celebrate our successes together?", image: "/images/q2.png" },
  { id: 6, text: "Will you promise to support me in our mutual growth and financial duties?", image: "/images/q3.png" },
  { id: 7, text: "Will you promise to share in both my joys and my sorrows unconditionally?", image: "/images/q4.png" },
  { id: 8, text: "Will you support me in caring for our family and raising our future with love?", image: "/images/q5.png" },
  { id: 9, text: "Will you be my partner in health and sickness, sharing a life of joy and peace?", image: "/images/q6.png" },
  { id: 10, text: "Will you be my best friend and soulmate for this life and beyond?", image: "/images/q7.png" },
  { id: 11, text: "Can you imagine us sitting side by side in our old age, still holding hands just like today?", image: "/images/q8.png" },
  { id: 12, text: "Why is it that I see your face in every beautiful moment of my life? Can you make it a reality forever?", image: "/images/q9.png" },
  { id: 13, text: "Will you give me the honor of becoming the luckiest person in the whole world?", image: "/images/q10.png" },
  { id: 14, text: "You've been my constant support through every joy and sorrow. Will you be my life partner for the rest of my days?", image: "/images/travel1.png" },
  { id: 15, text: "The most perfect choice I have ever made in my life is loving you. Will you be mine forever?", image: "/images/travel2.png" },
];

const pleadingMessages = [
  "No",
  "Please say yes! 🥺",
  "Maan jao na! 💕",
  "I beg you! 🙏",
  "Pretty please! 🌸",
  "Don't do this to me! 😭",
  "Sneha, please! 💖",
  "You're breaking my heart! 💔",
  "Just click yes! 😍",
  "Okay, last chance... please! 💘",
];

const loveLetterLines = [
  "Sneha, my love...",
  "From the moment you came into my life,",
  "everything changed.",
  "Your smile became my sunrise,",
  "your laughter became my favorite melody.",
  "Every moment with you feels like a gift,",
  "and I want to spend forever unwrapping them.",
  "तुम्हारी मुस्कान से ही शुरू होती है मेरी हर सुबह...",
  "— Ratan ❤️",
];

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

// Floating rose petals background
function RosePetals() {
  const petals = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 12 + 8,
    delay: Math.random() * 15,
    duration: Math.random() * 10 + 12,
    swayAmount: Math.random() * 80 + 30,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="petal absolute"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            rotate: p.rotation,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, p.swayAmount, -p.swayAmount / 2, p.swayAmount / 3, 0],
            rotate: [p.rotation, p.rotation + 360],
            opacity: [0, 0.7, 0.7, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Floating hearts with glow
function FloatingHearts() {
  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 16 + 14,
    delay: Math.random() * 12,
    duration: Math.random() * 12 + 14,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{ left: `${h.left}%` }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "linear",
          }}
        >
          <Heart
            size={h.size}
            fill="rgba(255,75,110,0.5)"
            color="rgba(255,75,110,0.3)"
          />
        </motion.div>
      ))}
    </div>
  );
}

// Countdown timer to wedding date
function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const weddingDate = new Date("2027-03-14T00:00:00").getTime();
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = weddingDate - now;
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-5 justify-center">
      {units.map((u) => (
        <motion.div
          key={u.label}
          className="glass-card rounded-2xl p-3 sm:p-5 min-w-[70px] sm:min-w-[90px] text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <motion.p
            className="text-2xl sm:text-4xl font-bold text-glow"
            style={{ color: "#ff4b6e" }}
            key={u.value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {String(u.value).padStart(2, "0")}
          </motion.p>
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 mt-1 font-medium">
            {u.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function ProposalPage() {
  const [phase, setPhase] = useState<
    "landing" | "envelope" | "letter" | "questions" | "proposal" | "celebration"
  >("landing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [letterLine, setLetterLine] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Letter animation: reveal lines one-by-one
  useEffect(() => {
    if (phase !== "letter") return;
    if (letterLine >= loveLetterLines.length) return;
    const timeout = setTimeout(() => {
      setLetterLine((prev) => prev + 1);
    }, 1200);
    return () => clearTimeout(timeout);
  }, [phase, letterLine]);

  const playMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleStart = () => {
    playMusic();
    setPhase("envelope");
  };

  const handleEnvelopeOpen = () => {
    setPhase("letter");
    setLetterLine(0);
  };

  const handleLetterDone = () => {
    setPhase("questions");
  };

  const handleYes = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setNoCount(0);
    } else {
      setPhase("proposal");
    }
  };

  const handleNo = () => {
    if (noCount < pleadingMessages.length - 1) {
      setNoCount(noCount + 1);
    } else {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setNoCount(0);
      }
    }
  };

  const handleProposalYes = () => {
    triggerConfetti();
    setPhase("celebration");
  };

  const triggerConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 100 };
    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff4b6e", "#f5c842", "#ff6b8a", "#ffeaa7", "#ffffff"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff4b6e", "#f5c842", "#ff6b8a", "#ffeaa7", "#ffffff"],
      });
    }, 250);
  };

  const currentNoMessage =
    pleadingMessages[Math.min(noCount, pleadingMessages.length - 1)];
  const progressPercent =
    ((currentQuestion + 1) / questions.length) * 100;

  if (!mounted) return null;

  return (
    <div className="min-h-screen starry-bg flex flex-col items-center justify-center relative overflow-hidden">
      {/* Stars */}
      <div className="stars-layer" />

      {/* Audio */}
      <audio ref={audioRef} src="/audio/backgroud.mp3" loop preload="auto" />

      {/* Music Toggle */}
      {phase !== "landing" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={toggleMute}
          className="fixed top-5 right-5 z-50 glass-card p-3 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX size={20} className="text-white/70" />
          ) : (
            <Music size={20} className="text-white/70" />
          )}
        </motion.button>
      )}

      {/* Rose Petals & Hearts */}
      <RosePetals />
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {/* ═══════════ PHASE 1: LANDING ═══════════ */}
        {phase === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-xl"
          >
            {/* Photo with glow ring */}
            <motion.div
              className="mb-8 relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1.5, bounce: 0.4 }}
            >
              <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white/20 pulse-glow relative">
                <img
                  src="/images/image.jpeg"
                  alt="Ratan & Sneha"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles size={28} className="text-yellow-400" />
              </motion.div>
            </motion.div>

            {/* Cursive Title */}
            <motion.h1
              className="text-5xl sm:text-7xl mb-3 text-glow"
              style={{
                fontFamily: "var(--font-great-vibes)",
                color: "#ff4b6e",
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              For My Love
            </motion.h1>

            <motion.h2
              className="text-3xl sm:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Sneha ✨
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-white/60 mb-10 italic"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              A digital keepsake created with love, just for you...
            </motion.p>

            <motion.button
              onClick={handleStart}
              className="btn-glow floating"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Heart size={18} fill="currentColor" />
                Open Your Surprise
                <Heart size={18} fill="currentColor" />
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* ═══════════ PHASE 2: ENVELOPE ═══════════ */}
        {phase === "envelope" && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            <motion.p
              className="text-xl sm:text-2xl text-white/70 mb-10 italic"
              style={{ fontFamily: "var(--font-playfair)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              You have a love letter waiting...
            </motion.p>

            {/* Envelope */}
            <motion.div
              className="cursor-pointer mb-10"
              onClick={handleEnvelopeOpen}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.5, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: "spring", duration: 1, bounce: 0.5 }}
            >
              <div className="relative w-[280px] h-[200px] sm:w-[340px] sm:h-[240px]">
                {/* Envelope body */}
                <div
                  className="w-full h-full rounded-2xl relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #d4585d 0%, #b02a3a 100%)",
                    boxShadow:
                      "0 20px 60px rgba(192, 57, 43, 0.4), 0 0 80px rgba(255, 75, 110, 0.2)",
                  }}
                >
                  {/* Flap triangle */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: "50%",
                      clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                      background:
                        "linear-gradient(180deg, #e74c3c 0%, #c0392b 100%)",
                    }}
                  />
                  {/* Bottom fold lines */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: "55%",
                      clipPath: "polygon(0 100%, 50% 20%, 100% 100%)",
                      background: "rgba(0,0,0,0.1)",
                    }}
                  />
                  {/* Heart seal */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Heart
                        size={40}
                        fill="#f5c842"
                        color="#f5c842"
                        className="drop-shadow-lg"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.p
              className="text-base text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap to open 💌
            </motion.p>
          </motion.div>
        )}

        {/* ═══════════ PHASE 3: LOVE LETTER ═══════════ */}
        {phase === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg w-full"
          >
            <div className="glass-card-bright rounded-3xl p-8 sm:p-12 w-full">
              <motion.div
                className="mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <Stars size={36} className="text-yellow-400 mx-auto" />
              </motion.div>

              <div className="space-y-4 mb-10 min-h-[300px]">
                {loveLetterLines.slice(0, letterLine).map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`${
                      idx === 0
                        ? "text-2xl sm:text-3xl text-glow"
                        : idx === loveLetterLines.length - 1
                        ? "text-xl font-bold text-glow-gold pt-4"
                        : "text-lg sm:text-xl"
                    } ${
                      idx === loveLetterLines.length - 2
                        ? "italic"
                        : ""
                    }`}
                    style={{
                      fontFamily:
                        idx === 0
                          ? "var(--font-great-vibes)"
                          : "var(--font-playfair)",
                      color:
                        idx === 0
                          ? "#ff4b6e"
                          : idx === loveLetterLines.length - 1
                          ? "#f5c842"
                          : "rgba(255,255,255,0.85)",
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {letterLine >= loveLetterLines.length && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleLetterDone}
                  className="btn-rose"
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Our Journey →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ═══════════ PHASE 4: QUESTIONS ═══════════ */}
        {phase === "questions" && (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl w-full"
          >
            {/* Progress */}
            <div className="w-full max-w-md mb-6">
              <div className="flex justify-between text-xs text-white/40 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="glass-card-bright rounded-3xl p-6 sm:p-10 w-full">
              {/* Image */}
              <motion.div
                className="photo-frame w-56 h-56 sm:w-72 sm:h-72 mx-auto mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <img
                  src={questions[currentQuestion].image}
                  alt="Our Moment"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Question Text */}
              <motion.h2
                className="text-xl sm:text-2xl font-semibold text-white/90 mb-8 leading-relaxed min-h-[64px] flex items-center justify-center"
                style={{ fontFamily: "var(--font-playfair)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                &ldquo;{questions[currentQuestion].text}&rdquo;
              </motion.h2>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <motion.button
                  onClick={handleYes}
                  className="btn-rose w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Haan (Yes) ❤️
                </motion.button>

                <motion.button
                  onClick={handleNo}
                  onMouseEnter={() => setIsHoveringNo(true)}
                  onMouseLeave={() => setIsHoveringNo(false)}
                  animate={
                    isHoveringNo && currentQuestion >= 3
                      ? {
                          x: Math.random() * 80 - 40,
                          y: Math.random() * 60 - 30,
                        }
                      : { x: 0, y: 0 }
                  }
                  className="px-8 py-4 rounded-full text-white/50 border border-white/10 hover:border-white/20 hover:text-white/70 transition-all cursor-pointer text-base w-full sm:w-auto bg-transparent"
                >
                  {currentNoMessage}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══════════ PHASE 5: FINAL PROPOSAL ═══════════ */}
        {phase === "proposal" && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl w-full"
          >
            <div className="glass-card-bright rounded-3xl p-8 sm:p-12 w-full relative overflow-hidden">
              {/* Background photo overlay */}
              <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                  backgroundImage: "url(/images/image.jpeg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(4px)",
                }}
              />
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

              <div className="relative z-10">
                {/* Heartbeat Heart */}
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                >
                  <Heart
                    size={80}
                    fill="#ff4b6e"
                    color="#ff4b6e"
                    className="mx-auto heartbeat drop-shadow-lg"
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(255,75,110,0.6))",
                    }}
                  />
                </motion.div>

                <motion.h1
                  className="text-4xl sm:text-6xl mb-4 text-glow"
                  style={{
                    fontFamily: "var(--font-great-vibes)",
                    color: "#ff4b6e",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  I love you, Sneha
                </motion.h1>

                <motion.h2
                  className="text-3xl sm:text-5xl font-bold text-white mb-10"
                  style={{ fontFamily: "var(--font-playfair)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Will you marry me? 💍
                </motion.h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                  <motion.button
                    onClick={handleProposalYes}
                    className="btn-glow text-xl px-12 py-5 w-full sm:w-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">
                      YES! A thousand times YES!
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={handleNo}
                    onMouseEnter={() => setIsHoveringNo(true)}
                    onMouseLeave={() => setIsHoveringNo(false)}
                    animate={
                      isHoveringNo
                        ? {
                            x: Math.random() * 120 - 60,
                            y: Math.random() * 100 - 50,
                            opacity: 1,
                          }
                        : { x: 0, y: 0, opacity: 1 }
                    }
                    className="px-6 py-3 text-white/40 hover:text-white/60 transition-colors cursor-pointer text-sm"
                    initial={{ opacity: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    {noCount > 0 ? "You can't say no now 😉" : "No"}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══════════ PHASE 6: CELEBRATION ═══════════ */}
        {phase === "celebration" && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl w-full"
          >
            <div className="glass-card-bright rounded-3xl p-8 sm:p-14 w-full relative overflow-hidden">
              {/* Gold shimmer overlay */}
              <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(245,200,66,0.1) 10px, rgba(245,200,66,0.1) 20px)",
                }}
              />

              <div className="relative z-10">
                {/* Sanskrit Shloka */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p
                    className="text-lg sm:text-xl font-medium mb-1 text-glow-gold"
                    style={{ color: "#f5c842" }}
                  >
                    मंगलम् भगवान विष्णुः मंगलम् गरुड़ध्वजः।
                  </p>
                  <p
                    className="text-lg sm:text-xl font-medium text-glow-gold"
                    style={{ color: "#f5c842" }}
                  >
                    मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः॥
                  </p>
                </motion.div>

                {/* Photo */}
                <motion.div
                  className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden mx-auto mb-8 border-4 pulse-glow"
                  style={{ borderColor: "rgba(245,200,66,0.4)" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.5 }}
                >
                  <img
                    src="/images/image.jpeg"
                    alt="Ratan & Sneha"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Title */}
                <motion.h1
                  className="text-5xl sm:text-7xl font-bold text-white mb-3"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", delay: 0.7 }}
                  style={{
                    textShadow:
                      "0 0 20px rgba(255,75,110,0.5), 0 4px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  She said YES! 🎉
                </motion.h1>

                <motion.p
                  className="text-xl sm:text-2xl text-white/70 mb-10 italic"
                  style={{ fontFamily: "var(--font-great-vibes)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  ...and two hearts became one forever
                </motion.p>

                {/* Wedding Date */}
                <motion.div
                  className="glass-card rounded-2xl p-6 sm:p-8 mb-8 inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className="text-lg text-white/60 font-medium mb-2 uppercase tracking-wider text-sm">
                    We will get married on
                  </p>
                  <p
                    className="text-3xl sm:text-5xl font-bold text-glow-gold"
                    style={{ color: "#f5c842" }}
                  >
                    14 March 2027
                  </p>
                </motion.div>

                {/* Countdown */}
                <motion.div
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <p className="text-sm text-white/40 mb-4 uppercase tracking-widest">
                    Countdown to our forever
                  </p>
                  <WeddingCountdown />
                </motion.div>

                {/* Footer signature */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <p
                    className="text-3xl sm:text-4xl text-glow"
                    style={{
                      fontFamily: "var(--font-great-vibes)",
                      color: "#ff4b6e",
                    }}
                  >
                    Forever and Always
                  </p>
                  <p className="text-lg text-white/50 mt-2 tracking-wider">
                    Ratan & Sneha ❤️
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
