'use client';

import { motion, Variants} from 'framer-motion';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};




export const About = () => {
  return (
    <section className="relative py-10 sm:py-16 px-4 sm:px-10 lg:px-24 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] drop-shadow-sm"
      >
        About Prasanth Nursery 🌿
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-[Lora,serif] text-base sm:text-lg lg:text-xl text-[var(--foreground)] leading-loose max-w-5xl mx-auto text-justify sm:text-center mb-6 sm:mb-12"
      >
        At <span className="font-semibold text-[var(--color-primary)]">Prasanth Nursery</span>, we don’t just grow plants — we nurture living stories.
        From soulful wooden greens to blooming florals and clean air companions,
        each leaf we raise carries care, love, and a breath of nature straight from the rich soil of Tamil Nadu to your home.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-10">
        {[
          {
            icon: '🌱',
            title: 'Our Mission',
            text: 'We aim to bring nature closer to hearts and homes, promoting a sustainable green lifestyle with every plant sold.',
          },
          {
            icon: '🪴',
            title: 'What We Offer',
            text: 'From flowering favorites to care kits, we provide healthy plants, garden essentials, and a real-time platform to find available greens nearby.',
          },
          {
            icon: '🌼',
            title: 'Why Choose Us',
            text: 'With quality-first cultivation, friendly support, and a commitment to eco-living, we make gardening simple, stylish, and sustainable.',
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={cardVariants}
            className="backdrop-blur-sm border-2 border-[var(--color-primary-light)] p-6 rounded-tl-3xl rounded-br-3xl shadow-md hover:shadow-[0_10px_40px_rgba(0,128,0,0.2)] transition duration-300 hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
              {item.icon} {item.title}
            </h3>
            <p className="text-[var(--foreground)]">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
