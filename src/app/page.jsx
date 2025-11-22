"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Home() {
  const IMAGES = ["/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg", "/gallery/4.jpg"];

  const [step, setStep] = useState("intro");
  const [index, setIndex] = useState(0);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const targetDate = new Date("2025-11-22T18:02:00");

  const startFireworks = () => {
    const interval = setInterval(() => {
      confetti({ particleCount: 25, spread: 70, origin: { x: Math.random(), y: Math.random() * 0.4 } });
    }, 700);
    return interval;
  };

  useEffect(() => {
    if (step !== "countdown") return;

    const t = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(t);
        window.location.href = "/page2.jsx"; // redirect to local jsx file
      }

      setCountdown({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / 1000 / 60) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(t);
  }, [step]);

  const Hearts = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: [0, 1, 0], y: [-50, -220], x: [0, (Math.random() - 0.5) * 200] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.4 }}
          className="absolute text-pink-500 text-3xl"
          style={{ left: `${Math.random() * 90}%` }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );

  const startImages = () => {
    setStep("images");
    const fire = startFireworks();
    let i = 0;
    const loop = setInterval(() => {
      i++;
      if (i >= IMAGES.length) {
        clearInterval(loop);
        clearInterval(fire);
        setTimeout(() => setStep("afterImages"), 1000);
      } else {
        setIndex(i);
      }
    }, 3500);
  };

  const blast = () => {
    confetti({ particleCount: 300, spread: 120, origin: { y: 0.7 } });
  };

  useEffect(() => {
    if (step === "countdown") blast();
  }, [step]);

  const NeonDigit = ({ value, animate }) => (
    <motion.div
      key={value}
      initial={{ opacity: 0 }}
      animate={animate ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }}
      transition={animate ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
      className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"
    >
      {value}
    </motion.div>
  );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#1a0029] via-[#000] to-[#0f0020] flex items-center justify-center text-center relative overflow-hidden"
    >
      {step === "images" && <Hearts />}

      {/* INTRO */}
      {step === "intro" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6 z-10">
          <h1 className="text-4xl text-pink-400 font-bold tracking-wide">🎉 Welcome to the Celebration 🎉</h1>
          <button onClick={startImages} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-lg text-white shadow-[0_0_15px_rgba(255,0,255,0.6)]">
            Start
          </button>
        </motion.div>
      )}

      {/* IMAGES */}
      {step === "images" && (
        <AnimatePresence mode="wait">
          <motion.img
            key={IMAGES[index]}
            src={IMAGES[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-[320px] h-[420px] object-cover rounded-2xl shadow-2xl border-4 border-pink-400 z-10"
          />
        </AnimatePresence>
      )}

      {/* AFTER IMAGES */}
      {step === "afterImages" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-pink-600 rounded-xl z-10 text-white font-semibold shadow-[0_0_25px_rgba(255,0,255,0.8)]"
          onClick={() => setStep("countdown")}
        >
          Go to Countdown
        </motion.button>
      )}

      {/* COUNTDOWN */}
      {step === "countdown" && (
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-10 z-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]">
            🎂 BIRTHDAY COUNTDOWN 🎉
          </h1>
          <div className="flex gap-8 bg-black/50 px-8 py-6 rounded-2xl border-2 border-pink-400 shadow-[0_0_35px_rgba(255,0,200,0.6)]">
            {[{ label: "Days", value: countdown.d }, { label: "Hours", value: countdown.h }, { label: "Minutes", value: countdown.m }, { label: "Seconds", value: countdown.s }].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="flex gap-1">
                  {String(item.value).padStart(2, "0").split("").map((digit, di) => (
                    <NeonDigit key={di} value={digit} animate={item.label === "Seconds" ? true : false} />
                  ))}
                </div>
                <p className="text-pink-300 mt-2 text-sm md:text-base font-semibold tracking-widest uppercase">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.main>
  );
}
