'use client';

import type { IconType } from 'react-icons';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoHeartSharp,
  IoMusicalNotesSharp,
  IoReloadSharp,
  IoRoseSharp,
  IoSparklesSharp,
  IoStarSharp,
  IoSunnySharp,
  IoVolumeHighSharp,
  IoVolumeMuteSharp,
} from 'react-icons/io5';

type LoveNote = {
  title: string;
  text: string;
  icon: IconType;
  background: string;
};

const DEFAULT_BACKGROUND = 'linear-gradient(135deg, #FFB6D9 0%, #D5A5FF 100%)';

const LOVE_NOTES: LoveNote[] = [
  {
    title: 'Hei kamu,',
    text: 'kalau cinta lagi bikin pusing, pelan-pelan aja yaa. yang tulus nggak pernah minta kamu berubah jadi orang lain.',
    icon: IoRoseSharp,
    background: 'linear-gradient(135deg, #A8DDFF 0%, #E0CFFC 100%)',
  },
  {
    title: 'Hei kamu,',
    text: 'semangat ya yang nggak dapet coklat valentine :P',
    icon: IoHeartSharp,
    background: 'linear-gradient(135deg, #FFCBA4 0%, #FFB6D9 55%, #D5A5FF 100%)',
  },
  {
    title: 'Hei kamu,',
    text: 'yang pernah ditinggal pas sayang-sayangnya... itu bukan akhir cerita kamu. itu cuma bagian bab yang selesai.',
    icon: IoMusicalNotesSharp,
    background: 'linear-gradient(135deg, #FFE799 0%, #FFB6D9 100%)',
  },
  {
    title: 'Hei kamu,',
    text: 'kalau hari ini kamu cuma bisa bertahan, itu udah hebat banget.',
    icon: IoSparklesSharp,
    background: 'linear-gradient(135deg, #B4F4D3 0%, #A0E7E5 100%)',
  },
  {
    title: 'Hei kamu,',
    text: 'cinta yang sehat itu nggak bikin kamu nebak-nebak. dia bikin kamu tenang.',
    icon: IoSunnySharp,
    background: 'linear-gradient(135deg, #FFCBA4 0%, #FFB6D9 100%)',
  },
  {
    title: 'Hei kamu,',
    text: 'yang lagi belajar ikhlas... kamu nggak harus buru-buru sembuh. kamu cuma perlu jujur sama perasaan kamu.',
    icon: IoStarSharp,
    background: 'linear-gradient(135deg, #D5A5FF 0%, #FFB6D9 100%)',
  },
  {
    title: 'Hei kamu,',
    text: 'suatu hari nanti, kamu bakal ketemuseseorang yang memilih kamu tanpa ragu. sampai saat itu... jangan berhenti sayang sama diri sendiri.',
    icon: IoHeartSharp,
    background: 'linear-gradient(135deg, #A0E7E5 0%, #A8DDFF 100%)',
  },
  {
    title: 'Satu hal terakhir...',
    text: 'tarik napas. peluk diri kamu sebentar. kamu pantas dicintai dengan lembut terutama oleh diri kamu sendiri. semangat, yaaa.',
    icon: IoSparklesSharp,
    background: 'linear-gradient(135deg, #FFB6D9 0%, #A8DDFF 100%)',
  },
];

const FINISH_CARD: LoveNote = {
  title: 'Selesai.',
  text: 'Makasih udah baca sampai sini.\n\nJujur gw gabut aja :P',
  icon: IoSparklesSharp,
  background: 'linear-gradient(135deg, #A0E7E5 0%, #FFB6D9 100%)',
};

const FLOATERS: Array<{ left: number; top: number; size: number; delay: number; duration: number; icon: IconType }> =
  [
    { left: 8, top: 12, size: 28, delay: 0.2, duration: 6.2, icon: IoHeartSharp },
    { left: 84, top: 14, size: 24, delay: 0.8, duration: 7.1, icon: IoSparklesSharp },
    { left: 14, top: 34, size: 22, delay: 0.4, duration: 6.6, icon: IoStarSharp },
    { left: 88, top: 38, size: 30, delay: 1.1, duration: 7.6, icon: IoRoseSharp },
    { left: 6, top: 58, size: 24, delay: 0.9, duration: 8.2, icon: IoSparklesSharp },
    { left: 90, top: 62, size: 22, delay: 0.1, duration: 6.9, icon: IoStarSharp },
    { left: 18, top: 78, size: 30, delay: 1.4, duration: 7.8, icon: IoHeartSharp },
    { left: 78, top: 82, size: 26, delay: 0.6, duration: 7.3, icon: IoSparklesSharp },
    { left: 50, top: 10, size: 20, delay: 1.7, duration: 8.5, icon: IoStarSharp },
    { left: 46, top: 88, size: 22, delay: 1.0, duration: 8.0, icon: IoRoseSharp },
  ];

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [noteIndex, setNoteIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const totalCards = LOVE_NOTES.length + 1;
  const lastIndex = totalCards - 1;

  const activeNote = noteIndex === lastIndex ? FINISH_CARD : LOVE_NOTES[noteIndex];
  const Icon = activeNote.icon;
  const isFinished = hasStarted && noteIndex === lastIndex;
  const isOnLastLoveNote = noteIndex === LOVE_NOTES.length - 1;
  const progress = (noteIndex + 1) / totalCards;

  const startExperience = () => {
    setHasStarted(true);
    setDirection(0);
    setNoteIndex(0);

    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio
      .play()
      .then(() => setIsMusicPlaying(true))
      .catch(() => setIsMusicPlaying(false));
  };

  const nextNote = () => {
    if (noteIndex >= lastIndex) return;
    setDirection(1);
    setNoteIndex((current) => Math.min(current + 1, lastIndex));
  };

  const previousNote = () => {
    if (noteIndex <= 0) return;
    setDirection(-1);
    setNoteIndex((current) => Math.max(current - 1, 0));
  };

  const restart = () => {
    setDirection(-1);
    setNoteIndex(0);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeDistanceThreshold = 80;
    const swipeVelocityThreshold = 500;

    if (info.offset.x < -swipeDistanceThreshold || info.velocity.x < -swipeVelocityThreshold) {
      nextNote();
      return;
    }

    if (info.offset.x > swipeDistanceThreshold || info.velocity.x > swipeVelocityThreshold) {
      previousNote();
    }
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

  return (
    <div className="relative w-screen h-[100svh] overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: "url('/wallpaper.jpg')" }}
        animate={{
          scale: hasStarted ? [1.06, 1.09, 1.06] : [1.12, 1.16, 1.12],
          x: hasStarted ? [0, -14, 0] : [0, -18, 0],
          y: hasStarted ? [0, 12, 0] : [0, 16, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        animate={{ background: hasStarted ? activeNote.background : DEFAULT_BACKGROUND }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{ mixBlendMode: 'soft-light', opacity: hasStarted ? 0.55 : 0.7 }}
      />
      <div aria-hidden className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-black/20 to-black/35" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0),rgba(0,0,0,0.45))]"
      />

      <audio ref={audioRef} loop preload="auto" playsInline>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Soft glow overlay */}
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_55%)]" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.7),transparent_55%)]" />
      {!hasStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto no-scrollbar overscroll-contain pt-[calc(env(safe-area-inset-top)+1.25rem)] pb-[calc(env(safe-area-inset-bottom)+1.25rem)]"
        >
          <div className="relative z-10 w-full max-w-md px-4 sm:px-5">
            <div className="rounded-[44px] bg-white/15 backdrop-blur-2xl border border-white/25 shadow-[0_30px_120px_rgba(0,0,0,0.35)] px-5 py-7 sm:px-8 sm:py-10 text-center">
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto mb-6 w-20 h-20 sm:w-28 sm:h-28 rounded-[26px] sm:rounded-[28px] bg-white/30 backdrop-blur-xl border-4 border-white/70 shadow-2xl flex items-center justify-center"
              >
                <IoHeartSharp className="text-white text-5xl sm:text-6xl drop-shadow-2xl" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-6xl font-black text-white text-shadow-cute"
              >
                Hei kamu.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-3 text-[15px] sm:text-lg md:text-xl text-white/90 font-semibold leading-relaxed"
              >
                Kalau hari ini urusan hati lagi berisik,
                <br />
                sini... aku titipin semangat kecil buat kamu.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-6 inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 py-2 rounded-full border-2 border-white/60 shadow-lg"
              >
                <IoMusicalNotesSharp className="text-white text-lg" />
                <span className="text-white font-bold text-sm sm:text-base">disaranin nyalain suara ya</span>
              </motion.div>

              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 220, damping: 18 }}
                whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
                whileTap={{ scale: 0.95 }}
                onClick={startExperience}
                className="mt-8 w-full bg-white/90 backdrop-blur-md text-slate-900 font-black text-xl sm:text-2xl px-8 py-5 rounded-full shadow-2xl border-4 border-white/80"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <IoSparklesSharp className="text-2xl" />
                  Mulai
                </span>
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ delay: 0.8 }}
                className="mt-4 text-white text-xs sm:text-sm font-semibold"
              >
                (nanti bisa tap “Lanjut” atau geser kartunya)
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Experience */}
      {hasStarted && (
        <>
          {/* Music */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleMusic}
            className="fixed top-[calc(env(safe-area-inset-top)+1rem)] right-[calc(env(safe-area-inset-right)+1rem)] sm:top-[calc(env(safe-area-inset-top)+1.5rem)] sm:right-[calc(env(safe-area-inset-right)+1.5rem)] z-50 bg-white/30 backdrop-blur-md p-3 sm:p-4 rounded-full border-2 border-white/70 shadow-lg"
            aria-label={isMusicPlaying ? 'Matikan musik' : 'Nyalakan musik'}>
            {isMusicPlaying ? (
              <IoVolumeHighSharp className="text-white text-xl sm:text-2xl" />
            ) : (
              <IoVolumeMuteSharp className="text-white text-xl sm:text-2xl" />
            )}
          </motion.button>

          {/* Floaters */}
          <div className="absolute inset-0 pointer-events-none">
            {FLOATERS.map((f, i) => {
              const FloaterIcon = f.icon;
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ left: `${f.left}%`, top: `${f.top}%` }}
                  animate={{
                    y: [0, -18, 0],
                    x: [0, 8, -8, 0],
                    rotate: [0, 10, -10, 0],
                    opacity: [0.12, 0.32, 0.12],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: f.duration,
                    delay: f.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}>
                  <FloaterIcon className="text-white drop-shadow-lg" style={{ fontSize: f.size }} />
                </motion.div>
              );
            })}
          </div>

          {/* Content */}
          <div className="relative z-10 h-full">
            <div className="h-full w-full overflow-y-auto no-scrollbar overscroll-contain pt-[calc(env(safe-area-inset-top)+1.25rem)] pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
              <div className="mx-auto min-h-full w-full max-w-md px-4 sm:px-5 overflow-visible flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4 sm:mb-7 text-center">
                  <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 py-2 rounded-full border-2 border-white/60 shadow-lg">
                    <IoSparklesSharp className="text-white text-lg" />
                    <span className="text-white font-black text-sm sm:text-base">
                      {noteIndex + 1} / {totalCards}
                    </span>
                  </div>
                  <div className="mt-3 h-2 w-[min(360px,84vw)] rounded-full bg-white/20 border border-white/30 overflow-hidden shadow-sm">
                    <motion.div
                      className="h-full rounded-full"
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                      style={{ background: activeNote.background }}
                    />
                  </div>
                </motion.div>

                <div className="w-full overflow-visible">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={noteIndex}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({
                          x: dir > 0 ? 90 : dir < 0 ? -90 : 0,
                          opacity: 0,
                          scale: 0.94,
                          rotate: dir > 0 ? -2 : dir < 0 ? 2 : 0,
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                          scale: 1,
                          rotate: 0,
                        },
                        exit: (dir: number) => ({
                          x: dir > 0 ? -90 : dir < 0 ? 90 : 0,
                          opacity: 0,
                          scale: 0.94,
                          rotate: dir > 0 ? 2 : dir < 0 ? -2 : 0,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                      drag="x"
                      dragConstraints={{ left: -24, right: 24 }}
                      dragElastic={0.12}
                      dragMomentum={false}
                      onDragEnd={handleDragEnd}
                      className="relative select-none cursor-grab active:cursor-grabbing rounded-[38px] p-[3px] shadow-[0_35px_90px_rgba(0,0,0,0.35)]"
                      style={{ touchAction: 'pan-y', background: activeNote.background }}>
                      <div className="relative rounded-[35px] bg-white/78 backdrop-blur-2xl border border-white/35 px-5 py-6 sm:px-8 sm:py-9 overflow-hidden">
                        {/* Shine */}
                        <motion.div
                          aria-hidden
                          animate={{ x: ['-60%', '140%'], opacity: [0, 0.32, 0] }}
                          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.8 }}
                          className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent" />

                        <div className="relative z-10">
                          <div aria-hidden className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-900/10" />
                          <motion.div
                            animate={{ y: [0, -8, 0], rotate: [0, 6, -6, 0] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                            className="mx-auto mb-5 w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cute-pink to-cute-purple shadow-xl flex items-center justify-center">
                            <Icon className="text-white text-3xl sm:text-4xl drop-shadow-2xl" />
                          </motion.div>

                          <h2 className="text-center text-[22px] sm:text-3xl font-black text-slate-900 mb-3 text-shadow-cute">
                            {activeNote.title}
                          </h2>

                          <p className="whitespace-pre-line text-center text-[15px] sm:text-lg md:text-xl font-semibold text-slate-800 leading-relaxed">
                            {activeNote.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

            {/* Controls */}
            <div className="mt-5 sm:mt-8 flex w-full flex-col items-center gap-3 sm:gap-4">
              {!isFinished ? (
                <motion.button
                  whileHover={{ scale: 1.06, rotate: [0, -2, 2, 0] }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextNote}
                  className="w-full bg-white/90 backdrop-blur-md text-slate-900 font-black text-lg sm:text-xl px-8 py-4 rounded-full shadow-2xl border-4 border-white/90">
                  <span className="inline-flex items-center justify-center gap-2">
                    {isOnLastLoveNote ? 'Selesai' : 'Lanjut'}
                    <IoChevronForwardSharp className="text-xl" />
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.06, rotate: [0, -2, 2, 0] }}
                  whileTap={{ scale: 0.95 }}
                  onClick={restart}
                  className="w-full bg-white/90 backdrop-blur-md text-slate-900 font-black text-lg sm:text-xl px-8 py-4 rounded-full shadow-2xl border-4 border-white/90">
                  <span className="inline-flex items-center justify-center gap-2">
                    <IoReloadSharp className="text-xl" />
                    Ulangi dari awal
                  </span>
                </motion.button>
              )}

              <motion.p
                animate={{ opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-white/80 text-xs sm:text-sm font-semibold text-shadow-cute text-center">
                {isFinished ? (
                  'makasih udah baca sampai sini.'
                ) : (
                  <span className="inline-flex items-center justify-center gap-1.5">
                    <IoChevronBackSharp className="text-base" />
                    geser kiri/kanan
                    <IoChevronForwardSharp className="text-base" />
                    atau tap “Lanjut”
                  </span>
                )}
              </motion.p>
            </div>
              </div>
            </div>

            {/* Finish celebration */}
            {isFinished && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(32)].map((_, i) => {
                  const icons: IconType[] = [IoHeartSharp, IoStarSharp, IoSparklesSharp, IoRoseSharp, IoSunnySharp];
                  const ConfettiIcon = icons[i % icons.length];
                  const left = (i * 7) % 100;
                  const delay = (i % 8) * 0.12;
                  const duration = 3.6 + (i % 6) * 0.25;

                  return (
                    <motion.div
                      key={`confetti-${i}`}
                      className="absolute -top-10"
                      initial={{ x: `${left}vw`, y: '-10vh', rotate: 0, opacity: 0 }}
                      animate={{ y: '110vh', rotate: 360, opacity: [0, 0.8, 0] }}
                      transition={{ duration, delay, ease: 'easeIn' }} >
                      <ConfettiIcon className="text-white/70 drop-shadow-lg" style={{ fontSize: 22 + (i % 4) * 6 }} />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
