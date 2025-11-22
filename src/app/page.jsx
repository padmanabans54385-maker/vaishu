"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"

import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import BalloonGameScreen from "@/components/screens/BalloonGameScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import MessageScreen from "@/components/screens/MessageScreen"
import FinalSurpriseScreen from "@/components/screens/FinalSurpriseScreen"
import Decoration from "@/components/Decoration"
import FloatingHearts from "@/components/FloatingHearts"
import BackgroundMusic from "@/components/BackgroundMusic"

export default function Home() {
  const IMAGES = ["/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg", "/gallery/4.jpg", "/gallery/5.jpg"]

  const [step, setStep] = useState("intro")
  const [index, setIndex] = useState(0)
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const [showScreens, setShowScreens] = useState(false) // 👈 new: start 2nd part after countdown
  const [currentScreen, setCurrentScreen] = useState(0)
  const [decorationsOn, setDecorationsOn] = useState(false)
  const [musicOn, setMusicOn] = useState(false)

  const targetDate = new Date("2025-11-28T00:00:00")

  // 🎉 fireworks effect
  const startFireworks = () => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 25,
        spread: 70,
        origin: { x: Math.random(), y: Math.random() * 0.4 },
      })
    }, 700)
    return interval
  }

  // 🕒 countdown timer logic
  useEffect(() => {
    if (step !== "countdown") return

    const t = setInterval(() => {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()

      if (diff <= 0) {
        clearInterval(t)
        setShowScreens(true) // 👈 instead of redirect
        setStep("") // hide countdown
        return
      }

      setCountdown({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / 1000 / 60) % 60),
        s: Math.floor((diff / 1000) % 60),
      })
    }, 1000)

    return () => clearInterval(t)
  }, [step])

  // ❤️ floating hearts for images screen
  const Hearts = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: [0, 1, 0],
            y: [-50, -220],
            x: [0, (Math.random() - 0.5) * 200],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.4 }}
          className="absolute text-pink-500 text-3xl"
          style={{ left: `${Math.random() * 90}%` }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )

  // 🎞️ image slideshow
  const startImages = () => {
    setStep("images")
    const fire = startFireworks()
    let i = 0
    const loop = setInterval(() => {
      i++
      if (i >= IMAGES.length) {
        clearInterval(loop)
        clearInterval(fire)
        setTimeout(() => setStep("afterImages"), 1000)
      } else {
        setIndex(i)
      }
    }, 3500)
  }

  const blast = () => {
    confetti({ particleCount: 300, spread: 120, origin: { y: 0.7 } })
  }

  useEffect(() => {
    if (step === "countdown") blast()
  }, [step])

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
  )

  // 🎬 the second section of app (after countdown)
  const screens = [
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(1)} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} onStartMusic={() => setMusicOn(true)} />,
    <CakeScreen key="cake" onNext={() => setCurrentScreen(3)} onDecorate={() => setDecorationsOn(true)} />,
    <BalloonGameScreen key="balloons" onNext={() => setCurrentScreen(4)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(5)} />,
    <MessageScreen key="message" onNext={() => setCurrentScreen(6)} />,
    <FinalSurpriseScreen key="final" onReplay={() => setCurrentScreen(1)} />,
  ]

  // 💫 if countdown finished → start main surprise screens
  if (showScreens) {
    return (
      <main className="min-h-screen bg-gradient-to-tr from-rose-950/40 via-black to-rose-950/40 overflow-hidden relative">
        {/* Background gradients */}
        <div
          className="fixed inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 60%, rgba(255, 99, 165, 0.5), transparent 40%)",
          }}
        />
        <div
          className="fixed inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 30%, rgba(99, 102, 241, 0.5), transparent 40%)",
          }}
        />
        <div
          className="fixed inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(228, 193, 255, 0.4), transparent 40%)",
          }}
        />

        <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              transition={{ duration: 0.8 }}
              className={`w-full ${currentScreen === 4 ? "max-w-7xl" : "max-w-3xl md:max-w-4xl"}`}
            >
              {screens[currentScreen]}
            </motion.div>
          </AnimatePresence>

          {decorationsOn && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none absolute -top-2 inset-x-0 mx-auto max-w-2xl"
            >
              <Decoration />
            </motion.div>
          )}
        </div>

        <FloatingHearts />
        <BackgroundMusic shouldPlay={musicOn} />

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="fixed bottom-4 right-4 text-sm text-white/40 pointer-events-none z-50 font-light"
        >
          @pathu0509
        </motion.div>
      </main>
    )
  }

  // 🎈 main birthday intro + countdown UI
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#1a0029] via-[#000] to-[#0f0020] flex items-center justify-center text-center relative overflow-hidden"
    >
      {step === "images" && <Hearts />}

      {step === "intro" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6 z-10">
          <h1 className="text-4xl text-pink-400 font-bold tracking-wide">🎉 Let's Start the Celebration 🎉</h1>
          <button
            onClick={startImages}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-lg text-white shadow-[0_0_15px_rgba(255,0,255,0.6)]"
          >
            Start
          </button>
        </motion.div>
      )}

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

     {step === "countdown" && (
  <motion.div
    initial={{ scale: 0.7, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1 }}
    className="flex flex-col items-center gap-6 sm:gap-8 z-20 px-4 text-center"
  >
    {/* Title */}
    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-snug tracking-wide drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]">
      🎂 Advance Happy Birthday{" "}
      <span className="text-pink-400">Vaishu Eruma😍💙</span>
    </h1>

    {/* Subtitle */}
    <p className="text-base sm:text-xl md:text-2xl text-white font-semibold leading-normal max-w-[90%] sm:max-w-[700px] drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">
      (When Countdown Reach Zero the Surprise Gift Will be Open😁)
    </p>

    {/* Countdown container */}
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 bg-black/50 px-5 sm:px-8 py-4 sm:py-6 rounded-2xl border-2 border-pink-400 shadow-[0_0_35px_rgba(255,0,200,0.6)] w-fit">
      {[ 
        { label: "Days", value: countdown.d },
        { label: "Hours", value: countdown.h },
        { label: "Minutes", value: countdown.m },
        { label: "Seconds", value: countdown.s }
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
          <div className="flex gap-0.5 sm:gap-1 justify-center">
            {String(item.value).padStart(2, "0").split("").map((digit, di) => (
              <NeonDigit key={di} value={digit} animate={item.label === "Seconds"} />
            ))}
          </div>
          <p className="text-pink-300 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  </motion.div>
)}
    </motion.main>
  )
}
