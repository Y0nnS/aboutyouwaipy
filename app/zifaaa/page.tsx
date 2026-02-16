'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import {
  IoArrowForwardSharp,
  IoBedSharp,
  IoChevronForwardSharp,
  IoCloudSharp,
  IoFastFoodSharp,
  IoHeartSharp,
  IoIceCreamSharp,
  IoMoonSharp,
  IoPizzaSharp,
  IoRestaurantSharp,
  IoRoseSharp,
  IoSnowSharp,
  IoSparklesSharp,
  IoStarSharp,
  IoVolumeHighSharp,
  IoVolumeMuteSharp,
  IoWaterOutline,
  IoWaterSharp,
} from 'react-icons/io5';

const pages = [
  {
    id: 0,
    title: 'Hei Zifaaa.',
    subtitle: '',
    message: '',
    icon: IoSparklesSharp,
    bgColor: '#D5A5FF',
    buttonColor: 'bg-white',
    buttonTextColor: 'text-[#D5A5FF]',
    buttonText: 'Haloo!',
    decorIcons: [IoStarSharp, IoSparklesSharp, IoHeartSharp],
  },
  {
    id: 1,
    title: "Selamat Malam",
    subtitle: "Zifaaa!",
    message: "Selamat malam buat kamu yang baik hati~",
    icon: IoMoonSharp,
    bgColor: "#6B5B95",
    buttonColor: "bg-white",
    buttonTextColor: "text-[#6B5B95]",
    buttonText: "Hehe, iya nih",
    decorIcons: [IoStarSharp, IoMoonSharp, IoSparklesSharp],
  },
  {
    id: 2,
    title: "Jangan Lupa",
    subtitle: "Makan ya!",
    message: "Perut kenyang, hati senang, hidup tenang!",
    icon: IoFastFoodSharp,
    bgColor: "#FF6B9D",
    buttonColor: "bg-white",
    buttonTextColor: "text-[#FF6B9D]",
    buttonText: "Iyaaa",
    decorIcons: [IoPizzaSharp, IoRestaurantSharp, IoIceCreamSharp],
  },
  {
    id: 3,
    title: "Jangan Lupa",
    subtitle: "Mandi juga!",
    message: "Biar fresh, bersih, cantikk, wangiii!~",
    icon: IoWaterSharp,
    bgColor: "#4ECDC4",
    buttonColor: "bg-white",
    buttonTextColor: "text-[#4ECDC4]",
    buttonText: "Iyaaa",
    decorIcons: [IoWaterOutline, IoSnowSharp, IoSparklesSharp],
  },
  {
    id: 4,
    title: "Jangan Lupa",
    subtitle: "Skincarean!",
    message: "Rawat kulitmu biar makin glowing kayak bulan!",
    icon: IoSparklesSharp,
    bgColor: "#FFE66D",
    buttonColor: "bg-white",
    buttonTextColor: "text-[#FFE66D]",
    buttonText: "Iyaaa",
    decorIcons: [IoSparklesSharp, IoRoseSharp, IoStarSharp],
  },
  {
    id: 5,
    title: 'Lagi sakit ya?',
    subtitle: '',
    message:
      'Kalau kamu lagi sakit, istirahat yang cukup ya. Minum air, makan pelan-pelan, dan jangan maksa kuat sendirian. Semoga cepet sembuh ya Zifaaa.',
    icon: IoHeartSharp,
    bgColor: '#B4F4D3',
    buttonColor: 'bg-white',
    buttonTextColor: 'text-[#B4F4D3]',
    buttonText: 'Aamiin',
    decorIcons: [IoHeartSharp, IoSparklesSharp, IoStarSharp],
  },
  {
    id: 6,
    title: "Udah gtu aja",
    subtitle: "Selamat Bobo!",
    message: "Mimpi indah ya Zifaaa, sampai ketemu lagi besok~",
    icon: IoCloudSharp,
    bgColor: "#C06C84",
    buttonColor: "bg-white",
    buttonTextColor: "text-[#C06C84]",
    buttonText: "",
    decorIcons: [IoCloudSharp, IoMoonSharp, IoHeartSharp, IoBedSharp, IoStarSharp],
  },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [bgColor, setBgColor] = useState(pages[0].bgColor);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Smooth background color transition
  useEffect(() => {
    setBgColor(pages[currentPage].bgColor);
  }, [currentPage]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsMusicPlaying(true);
    const onPause = () => setIsMusicPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const currentPageData = pages[currentPage];
  const IconComponent = currentPageData.icon;

  const ensureMusicStarted = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) return;

    audio
      .play()
      .then(() => setIsMusicPlaying(true))
      .catch(() => setIsMusicPlaying(false));
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => setIsMusicPlaying(false));
      return;
    }

    audio.pause();
    setIsMusicPlaying(false);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeDistanceThreshold = 80;
    const swipeVelocityThreshold = 500;

    if (info.offset.x < -swipeDistanceThreshold || info.velocity.x < -swipeVelocityThreshold) {
      nextPage();
      return;
    }

    if (info.offset.x > swipeDistanceThreshold || info.velocity.x > swipeVelocityThreshold) {
      previousPage();
    }
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      ensureMusicStarted();
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      ensureMusicStarted();
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotate: direction < 0 ? 10 : -10,
    }),
  };

  return (
    <motion.div
      className="relative w-screen h-[100svh] overflow-hidden"
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.7),transparent_55%)]"
      />
      <div aria-hidden className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-black/20 to-black/35" />

      <audio ref={audioRef} loop preload="auto" playsInline>
        <source src="/music2.mp3" type="audio/mpeg" />
      </audio>

      <div className="absolute top-[calc(env(safe-area-inset-top)+0.75rem)] right-4 z-20">
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isMusicPlaying ? 'Matikan musik' : 'Nyalakan musik'}
          className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 shadow-[0_18px_70px_rgba(0,0,0,0.25)] flex items-center justify-center text-white"
        >
          {isMusicPlaying ? <IoVolumeHighSharp className="text-2xl" /> : <IoVolumeMuteSharp className="text-2xl" />}
        </button>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
            rotate: { duration: 0.4 },
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 max-w-2xl w-full">
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="mb-8"
              >
                <IconComponent className="text-white text-6xl md:text-9xl drop-shadow-2xl" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white text-center mb-2 sm:mb-3 text-shadow-cute px-2"
            >
              {currentPageData.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-3 sm:mb-4 text-shadow-cute px-2"
            >
              {currentPageData.subtitle}
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm sm:text-base md:text-xl lg:text-2xl text-white text-center mb-6 sm:mb-8 font-semibold text-shadow-cute max-w-lg px-4"
            >
              {currentPageData.message}
            </motion.p>

            {/* Button */}
            {currentPage < pages.length - 1 && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: 0.6,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
                onClick={nextPage}
                className={`${currentPageData.buttonColor} ${currentPageData.buttonTextColor} font-black text-base sm:text-lg md:text-2xl px-8 py-3 sm:px-10 sm:py-4 md:px-12 md:py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border-4 border-white flex items-center gap-2 sm:gap-3`}
              >
                <motion.span
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex items-center gap-2"
                >
                  {currentPageData.buttonText}
                  <IoChevronForwardSharp className="text-xl sm:text-2xl" />
                </motion.span>
              </motion.button>
            )}

            {/* Final Page Icons Animation */}
            {currentPage === pages.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="flex gap-3 sm:gap-4 items-center flex-wrap justify-center"
              >
                {currentPageData.decorIcons.map((IconComp, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  >
                    <IconComp className="text-white text-3xl sm:text-4xl md:text-5xl drop-shadow-lg" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Cute Floating Decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => {
              const IconComp = currentPageData.decorIcons[i % currentPageData.decorIcons.length];
              const randomX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920);
              const randomY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080);
              return (
                <motion.div
                  key={`${currentPage}-${i}`}
                  className="absolute"
                  initial={{
                    x: randomX,
                    y: randomY,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  <IconComp className="text-white text-xl sm:text-2xl" />
                </motion.div>
              );
            })}
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-white/30">
            {pages.map((page, index) => (
              <motion.div
                key={page.id}
                initial={{ scale: 0 }}
                animate={{
                  scale: currentPage === index ? 1.3 : 1,
                  opacity: currentPage === index ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white shadow-lg ${
                  currentPage === index ? 'ring-2 sm:ring-4 ring-white/50' : ''
                }`}
              />
            ))}
          </div>

          {/* Swipe Hint - Only show on first page */}
          {currentPage === 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: [0.5, 1, 0.5], x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-24 sm:bottom-28 right-4 sm:right-8 flex items-center gap-2 text-white/70"
            >
              <span className="text-xs sm:text-sm font-semibold text-shadow-cute">Geser</span>
              <IoArrowForwardSharp className="text-lg sm:text-xl" />
            </motion.div>
          )}

          {currentPage > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={previousPage}
              className="absolute top-[calc(env(safe-area-inset-top)+0.75rem)] left-4 z-20 bg-white/15 backdrop-blur-xl border border-white/25 text-white font-black px-4 py-2 rounded-full"
            >
              Balik
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
