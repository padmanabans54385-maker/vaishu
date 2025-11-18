"use client"
import { backgroundMusic } from "@/data"
import { useEffect, useRef } from "react"

export default function BackgroundMusic({ shouldPlay }) {
    const audioRef = useRef(null)

    useEffect(() => {
        if (shouldPlay && audioRef.current) {
            audioRef.current.volume = 0.7
            audioRef.current.play().catch(console.log)
        }
    }, [shouldPlay])

    return (
        <audio ref={audioRef}>
            <source src={backgroundMusic} type="audio/mpeg" />
        </audio>
    )
}