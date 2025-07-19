'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { HERO_IMAGE } from '@/constants';
import { useRoute } from '@/routes';
import { SeoHead } from '../common/Head';

const textFadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

const HeroSection = () => {
  const { goToPlants } = useRoute();
  return (
    <>
      <SeoHead
        title="Buy Indoor & Outdoor Plants Online | Local Nursery Finder India"
        description="Shop fresh plants online from trusted local nurseries. Discover indoor plants, outdoor trees, flowering plants & gardening supplies. Delivery near you!"
      />
      <main className="flex flex flex-col md:flex-row items-center justify-between px-6 py-10 xl:py-40 max-w-7xl mx-auto overflow-hidden">
        <motion.div
          className="max-w-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.8,
                ease: 'easeOut',
                when: 'beforeChildren',
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.span
            className="text-xs font-medium uppercase bg-green-700 text-green-200 px-4 py-2 rounded-xs rounded-tl-xl rounded-br-xl sm:rounded-tl-2xl rounded-xs sm:rounded-br-2xl inline-block"
            variants={textFadeIn}
            custom={0}
          >
            Fresh & Green Everyday
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight"
            variants={textFadeIn}
            custom={1}
          >
            WELCOME TO OUR
            <br /> BEAUTIFUL NURSERY IN
            <br /> THE 🌿 HEART OF NATURE
          </motion.h1>

          <motion.p className="mt-4 text-green-600" variants={textFadeIn} custom={2}>
            Where plants find homes and homes find life — explore green treasures, grow with ease, and
            bring nature closer, one leaf at a time.
          </motion.p>

          <motion.div className="mt-6 flex gap-4" variants={textFadeIn} custom={3}>
            <button
              className="bg-green-700 text-green-200 px-5 py-2 hover:bg-[var(--color-primary-dark)] hover:text-white rounded-tl-xl rounded-br-xl transition cursor-pointer"
              onClick={() => goToPlants()}
            >
              Explore Plants
            </button>
            <button
              className="border border-[var(--color-primary)] text-green-500 px-5 py-2 hover:bg-[var(--color-primary-light)] hover:text-white rounded-tl-xl rounded-br-xl transition cursor-pointer"
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }, 300);
              }}
            >
              Need Help? 🌱
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mt-10 md:mt-0 w-full max-w-[400px] aspect-square flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div className="absolute w-2/3 aspect-square rounded-[25%] bg-green-200 opacity-30 animate-ripple" />
          <div className="absolute w-2/3 aspect-square rounded-[25%] bg-green-300 opacity-20 animate-ripple delay-[200ms]" />
          <div className="absolute w-2/3 aspect-square rounded-[25%] bg-green-400 opacity-10 animate-ripple delay-[400ms]" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 w-full h-full"
          >
            <Image
              src={HERO_IMAGE}
              alt="Nursery showcase"
              fill
              className="object-contain drop-shadow-md"
            />
          </motion.div>
        </motion.div>
      </main>
    </>
  );
};

export default HeroSection;
