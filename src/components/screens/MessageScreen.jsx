"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import GradientButton from "../GradientButton"
import { messageScreenHeading, specialMessage } from "@/data";
import { ArrowRight } from "lucide-react";

export default function MessageScreen({ onNext }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="px-4 md:px-6 py-10 pt-20 text-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-6 leading-tight"
            >
                {messageScreenHeading}
            </motion.h2>

            <div className="mx-auto relative w-full max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className={`card  w-[300px] h-[425px] max-[360px]:w-[250px] max-[360px]:h-[370px] md:w-[350px] md:h-[500px] mx-auto cursor-pointer flex items-center ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
                    <div className="back w-[300px] h-[425px] max-[360px]:w-[250px] max-[360px]:h-[370px] md:w-[350px] md:h-[500px] -ml-[10px]"></div>
                    <div className="front w-[300px] h-[425px] max-[360px]:w-[250px] max-[360px]:h-[370px] md:w-[350px] md:h-[500px] -ml-[10px]">
                        <div className="imgset h-full">
                            <img width="100%" className="h-full" src="/images/cover.webp" />
                        </div>
                        <p className="absolute left-1/2 bottom-4 md:bottom-6 -translate-x-1/2 bg-pink-500 text-pink-50 z-10 w-32 md:w-40 rounded-lg py-0.5">Tap to Open</p>
                    </div>
                    <div className="w-[85%] h-[80%] mx-auto text-[#301733] text-lg">
                        <p className="overflow-y-auto h-full pr-2">{specialMessage}</p>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="mt-8 flex justify-center"
            >
                <GradientButton onClick={() => { setFlipped(false); onNext(); }}>Next
                    <ArrowRight size={20} className="mt-0.5" />
                </GradientButton>
            </motion.div>
        </div>
    )
}