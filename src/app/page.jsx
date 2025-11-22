"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
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

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [decorationsOn, setDecorationsOn] = useState(false)
  const [musicOn, setMusicOn] = useState(false)

  const screens = [
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(1)} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} onStartMusic={() => setMusicOn(true)} />,
    <CakeScreen key="cake" onNext={() => setCurrentScreen(3)} onDecorate={() => setDecorationsOn(true)} />,
    <BalloonGameScreen key="balloons" onNext={() => setCurrentScreen(4)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(5)} />,
    <MessageScreen key="message" onNext={() => setCurrentScreen(6)} />,
    <FinalSurpriseScreen key="final" onReplay={() => setCurrentScreen(1)} />,
  ]

  return (
    <main className="min-h-screen bg-gradient-to-tr from-rose-950/40 via-black to-rose-950/40 overflow-hidden relative">

      {/* Radial gradients for background */}
      <div className="fixed inset-0 z-0 -[80px] opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 20% 60%, rgba(255, 99, 165, 0.5), transparent 40%)",
      }} />
      <div className="fixed inset-0 z-0 -[80px] opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 80% 30%, rgba(99, 102, 241, 0.5), transparent 40%)",
      }} />
      <div className="fixed inset-0 z-0 -[100px] opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(228, 193, 255, 0.4), transparent 40%)",
      }} />

      {/* Grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

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
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute -top-2 inset-x-0 mx-auto max-w-2xl"
          >
            <Decoration />
          </motion.div>
        )}
      </div>

      <FloatingHearts />
      <BackgroundMusic shouldPlay={musicOn} />

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-sm text-white/40 pointer-events-none z-50 font-light">
        @pathu0509
      </motion.div>
    </main>
  )
}
