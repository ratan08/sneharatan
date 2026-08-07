"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

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
  { id: 15, text: "The most perfect choice I have ever made in my life is loving you. Will you be mine forever?", image: "/images/travel2.png" }
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
  "Okay, last chance... please! 💘"
];

export default function ProposalPage() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [proposalAccepted, setProposalAccepted] = useState(false);
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStart = () => setStarted(true);

  const handleYes = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setNoCount(0);
    } else {
      triggerConfetti();
      setProposalAccepted(true);
    }
  };

  const handleNo = () => {
    if (noCount < pleadingMessages.length - 1) {
      setNoCount(noCount + 1);
    } else {
      // After 10 nos, force to next question
      if (currentQuestion < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setNoCount(0);
      }
    }
  };

  const triggerConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const currentNoMessage = pleadingMessages[Math.min(noCount, pleadingMessages.length - 1)];

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-500/30"
            initial={{ 
              y: "110vh", 
              x: `${Math.random() * 100}vw`,
              scale: Math.random() * 0.5 + 0.5,
              rotate: 0
            }}
            animate={{ 
              y: "-10vh",
              x: `${Math.random() * 100}vw`,
              rotate: 360
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            <Heart size={40} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!started && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-10 rounded-3xl max-w-lg w-full text-center relative z-10 shadow-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">
              For My Love, Sneha ❤️
            </h1>
            <p className="text-xl text-white/90 mb-8 italic">
              "तुम्हारी मुस्कान से ही शुरू होती है मेरी हर सुबह..."
            </p>
            <button 
              onClick={handleStart}
              className="floating bg-white text-pink-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-pink-50 hover:shadow-xl transition-all duration-300 text-lg cursor-pointer"
            >
              Begin Our Journey
            </button>
          </motion.div>
        )}

        {started && !proposalAccepted && currentQuestion < questions.length && (
          <motion.div 
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="glass-card p-6 md:p-10 rounded-3xl max-w-2xl w-full text-center relative z-10 shadow-2xl flex flex-col items-center"
          >
            <div className="text-sm font-semibold text-white/80 mb-2 uppercase tracking-widest">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            
            <div className="mb-6 w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-lg border-4 border-white/30 bg-black/10">
              <img 
                src={questions[currentQuestion].image} 
                alt="Romantic Illustration"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight min-h-[80px] flex items-center justify-center">
              {questions[currentQuestion].text}
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <button 
                onClick={handleYes}
                className="bg-white text-pink-600 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 text-xl w-full sm:w-auto border-2 border-transparent hover:border-pink-200 cursor-pointer"
              >
                Haan (Yes) ❤️
              </button>
              <motion.button 
                onClick={handleNo}
                onMouseEnter={() => setIsHoveringNo(true)}
                onMouseLeave={() => setIsHoveringNo(false)}
                animate={isHoveringNo && currentQuestion >= 3 ? {
                  x: Math.random() * 60 - 30,
                  y: Math.random() * 60 - 30,
                } : { x: 0, y: 0 }}
                className="bg-pink-600/30 text-white font-bold py-4 px-8 rounded-full shadow-lg backdrop-blur-sm border border-white/30 hover:bg-pink-600/50 transition-colors duration-300 text-lg w-full sm:w-auto cursor-pointer"
              >
                {currentNoMessage}
              </motion.button>
            </div>
          </motion.div>
        )}

        {started && !proposalAccepted && currentQuestion === questions.length && (
          <motion.div 
            key="proposal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-10 rounded-3xl max-w-2xl w-full text-center relative z-10 shadow-2xl border-4 border-white/50"
          >
            <div className="flex justify-center mb-6">
              <Heart className="text-red-500 floating" size={80} fill="currentColor" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">
              I love you, Sneha.
            </h1>
            <h2 className="text-4xl text-white font-medium mb-12">
              Will you marry me? 💍
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={handleYes}
                className="bg-white text-red-500 font-bold py-5 px-12 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 text-2xl w-full sm:w-auto cursor-pointer"
              >
                YES! A thousand times YES!
              </button>
              
              <motion.button 
                onClick={handleNo}
                onMouseEnter={() => setIsHoveringNo(true)}
                onMouseLeave={() => setIsHoveringNo(false)}
                animate={isHoveringNo ? {
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                } : { x: 0, y: 0 }}
                className="bg-transparent text-white/70 font-semibold py-3 px-6 rounded-full hover:bg-white/10 transition-colors text-lg cursor-pointer"
              >
                {noCount > 0 ? "You can't say no now 😉" : "No"}
              </motion.button>
            </div>
          </motion.div>
        )}

        {proposalAccepted && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-10 md:p-14 rounded-3xl max-w-3xl w-full text-center relative z-10 shadow-2xl"
          >
            <div className="mb-8">
              <p className="text-2xl text-yellow-300 font-medium mb-2 drop-shadow-md">
                मंगलम् भगवान विष्णुः मंगलम् गरुड़ध्वजः।
              </p>
              <p className="text-2xl text-yellow-300 font-medium drop-shadow-md">
                मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः॥
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              She said YES! 🎉
            </h1>
            
            <div className="bg-white/20 rounded-2xl p-6 mb-8 backdrop-blur-md border border-white/30 inline-block">
              <p className="text-3xl text-white font-semibold">
                We will get married on
              </p>
              <p className="text-4xl md:text-6xl font-bold text-yellow-200 mt-4 drop-shadow-md">
                14 March 2027
              </p>
            </div>
            
            <p className="text-2xl text-white/90 italic font-medium">
              "Forever and Always, Ratan & Sneha" ❤️
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
