"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import { RotateCw } from "lucide-react"
import { finalScreenHeading, overlayMessage, overlayText } from "@/data"

export default function FinalSurpriseScreen({ onReplay }) {
    const [opened, setOpened] = useState(false)

    const fire = () => {
        confetti({
            particleCount: 100,
            angle: 90,
            spread: 180,
            startVelocity: 45,
            gravity: 1.2,
            origin: { y: 0.6 },
            colors: ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"]
        });

    }

    return (
        <div className="px-4 md:px-6 py-10 text-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-4 leading-tight"
            >
                {finalScreenHeading}
            </motion.h2>

            <div className="flex flex-col items-center gap-3">
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="group relative hover:scale-105 transition-transform duration-300 active:scale-95"
                    onClick={() => {
                        setOpened(true)
                        fire()
                        setTimeout(fire, 300)
                    }}
                >
                    <img
                        src="/gifs/gift.gif"
                        alt="Gift box"
                        className="h-44 w-44 md:h-52 md:w-52 object-cover"
                    />
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="text-pretty text-xl md:text-2xl font-semibold text-pink-200/90 drop-shadow">
                    Tap the gift
                </motion.div>
            </div>

            {/* overlay */}
            <AnimatePresence>
                {opened && (
                    <motion.div
                        className="fixed p-4 inset-0 z-10 grid place-items-center bg-black/65 backdrop-blur-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div
                            initial={{ scale: 0.75, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.97, opacity: 0 }}
                            transition={{ duration: 1, type: "spring", stiffness: 200 }}
                            className="relative z-10 max-w-xl rounded-2xl p-6 text-center bg-gradient-to-br from-pink-950 border-1 border-pink-300/80 via-purple-950 to-indigo-950 drop-shadow-2xl"
                        >
                            <img
                                src="/gifs/surprise.gif"
                                alt="surprise"
                                className="mx-auto w-44 md:w-52 object-cover"
                            />
                            <p className="text-xl text-pink-300 font-semibold mt-2 drop-shadow-xl">{overlayText}</p>
                            <div className="text-pretty text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-purple-200 drop-shadow-xl mt-5">
                                {overlayMessage}
                            </div>
                            <div className="mt-6 flex justify-center">
                                <GradientButton onClick={onReplay}><RotateCw size={20} className="mt-0.5" /> Replay</GradientButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
