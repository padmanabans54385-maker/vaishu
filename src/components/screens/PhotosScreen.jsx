"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectCards } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import { Heart, Mail } from "lucide-react"
import GradientButton from "../GradientButton"
import { photos, photoScreenHeading, videos } from "@/data"

export default function PhotosScreen({ onNext }) {
  const swiperRef = useRef(null)

  return (
    <div className="px-4 md:px-6 py-10 pt-20">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow"
        >
          {photoScreenHeading}
        </motion.h2>
        <p className="text-sm text-rose-100/90 mt-1">(Pathu and Vaishu 😇🫂💙)</p>
      </div>

      <div className="relative flex justify-center">

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Swiper
            effect="cards"
            grabCursor
            modules={[EffectCards, Autoplay]}
            onSwiper={(sw) => (swiperRef.current = sw)}
            className="w-[280px] h-[360px] md:w-[340px] md:h-[420px]"
          >
            {photos.map((src, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  className="h-full w-full rounded-3xl p-2 bg-gradient-to-br from-pink-400/50 via-rose-400/50 to-purple-400/50 backdrop-blur-sm"
                >

                  <div className="relative h-full w-full rounded-xl overflow-hidden ">
                    {/* Top left corner decoration */}
                    <Heart className="absolute top-2 left-2 text-xl z-10 text-pink-500 fill-pink-500 opacity-90" />

                    {/* Top right corner decoration */}
                    <Heart className="absolute top-2 right-2 text-xl z-10 text-pink-500 fill-pink-500 opacity-90" />

                    {/* Image */}
                    <img
                      src={src}
                      alt={`Memory ${i + 1}`}
                      className="h-full w-full rounded-2xl object-cover"
                      style={{
                        filter: "drop-shadow(0 8px 16px rgba(244, 114, 182, 0.2))",
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/10 to-pink-100/10 pointer-events-none rounded-2xl" />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
            {videos.map((src, i) => (
  <SwiperSlide key={`video-${i}`}>
    <motion.div
      className="h-full w-full rounded-3xl p-2 bg-gradient-to-br from-pink-400/50 via-rose-400/50 to-purple-400/50 backdrop-blur-sm"
    >
      <div className="relative h-full w-full rounded-xl overflow-hidden">

        {/* Decorations */}
        <Heart className="absolute top-2 left-2 text-xl z-10 text-pink-500 fill-pink-500 opacity-90" />
        <Heart className="absolute top-2 right-2 text-xl z-10 text-pink-500 fill-pink-500 opacity-90" />

        <video
  src={src}
  controls
  className="h-full w-full rounded-2xl object-cover"
  style={{
    filter: "drop-shadow(0 8px 16px rgba(244, 114, 182, 0.2))",
  }}
/>

{/* Left drag zone */}
<div
  className="absolute left-0 top-0 h-full w-10 z-20"
  onTouchStart={() => {
    if (swiperRef.current) swiperRef.current.allowTouchMove = true;
  }}
/>

{/* Right drag zone */}
<div
  className="absolute right-0 top-0 h-full w-10 z-20"
  onTouchStart={() => {
    if (swiperRef.current) swiperRef.current.allowTouchMove = true;
  }}
/>


        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/10 to-pink-100/10 pointer-events-none rounded-2xl" />
      </div>
    </motion.div>
  </SwiperSlide>
))}
          </Swiper>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="mt-8 flex justify-center"
      >
        <GradientButton onClick={onNext}>
          <Mail size={20} className="mt-0.5" /> Open My Message
        </GradientButton>
      </motion.div>
    </div>
  )
}
