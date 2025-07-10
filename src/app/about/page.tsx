'use client';

import { motion, Variants } from 'framer-motion';

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
const DEFULT_IMAGE = '/images/1.png';

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
            text: 'We’re on a mission to reconnect people with nature — making it easy, joyful, and fulfilling to bring plants into every home. Every green leaf we deliver helps grow a more sustainable world.',
          },
          {
            icon: '🪴',
            title: 'What We Offer',
            text: 'We provide more than just plants — from vibrant flowers to air-purifying greens and gardening kits, plus a smart platform that helps you discover what’s available nearby in real-time.',
          },
          {
            icon: '🌼',
            title: 'Why Choose Us',
            text: 'We combine expert care, eco-conscious practices, and local availability to make plant shopping effortless and delightful. Your plant’s health and your happiness are our priority.',
          },
          {
            icon: '🌍',
            title: 'Our Green Promise',
            text: 'Every purchase supports eco-friendly practices — including recyclable packaging, minimal water usage, and community-driven plant sharing. We grow green the responsible way.',
          },
          {
            icon: '🤝',
            title: 'Community & Support',
            text: 'Whether you’re a first-time plant parent or a garden enthusiast, we’re here to guide you. Get tips, support, and grow with a community that shares your love for green living.',
          },
        ]
          .map((item, i) => (
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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5 text-center"
      >
        {[
          { count: '1000+', label: 'Happy Customers' },
          { count: '200+', label: 'Plant Varieties' },
          { count: '15+', label: 'Years of Experience' },
          { count: '98%', label: 'Customer Satisfaction' },
          { count: '50+', label: 'Local Garden Partners' },
          { count: '300K+', label: 'Plants Delivered' },
          { count: '24/7', label: 'Support Availability' },
          { count: '4.9★', label: 'Average Rating' }
        ]
          .map((stat, idx: number) => (
            <div
              key={idx}
              className="border border-[var(--color-primary-light)] rounded-xs rounded-tl-xl rounded-br-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)]">
                {stat.count}
              </div>
              <div className="mt-2 text-[var(--foreground)] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
      </motion.div>

    </section>
  );
};
