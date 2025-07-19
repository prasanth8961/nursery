'use client';

import { CONTACT, EMAIL, socialMedias } from '@/constants';
import { Media } from '@/types';
import { motion, Variants } from 'framer-motion';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const ContactSection = () => {
  return (
    <footer className="py-10 px-4 sm:px-10 lg:px-20 text-[var(--color-primary-dark)] font-serif">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={item}
          className="text-2xl sm:text-4xl font-bold text-center mb-4 text-[var(--color-primary)]"
        >
          Contact Prasanth Nursery 🌿
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={item}
          className="text-center text-[var(--foreground)] max-w-2xl mx-auto mb-10"
        >
          Whether you have a question about our plants, availability, services, or anything else —
          we’re here to help you grow green!
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-10 items-start mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {[
              {
                icon: <FaPhoneAlt className="text-xl mt-1 text-[var(--color-primary-light)]" />,
                title: 'Phone',
                value: CONTACT,
              },
              {
                icon: <FaEnvelope className="text-xl mt-1 text-[var(--color-primary-light)]" />,
                title: 'Email',
                value: EMAIL,
              },
              {
                icon: <FaMapMarkerAlt className="text-xl mt-1 text-[var(--color-primary-light)]" />,
                title: 'Address',
                value: `886/77 - Kallukkudieruppu,\nMelnilaivayal Post, Thirumayam Taluk,\nPudukkottai District, Tamil Nadu, India – 622 202`,
              },
            ].map((itemData, index) => (
              <motion.div
                key={index}
                variants={item}
                className="flex items-start gap-4 text-[var(--color-primary)]"
              >
                {itemData.icon}
                <div>
                  <h4 className="font-semibold">{itemData.title}</h4>
                  <p className="text-[var(--foreground)] whitespace-pre-line">{itemData.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex gap-2 items-center text-[var(--color-primary-dark)] mx-4"
          >
            {socialMedias.map((media: Media) => (
              <motion.a
                key={media.id}
                href={media.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={item}
                className="h-12 w-12 bg-[var(--color-accent-light)] text-[var(--color-primary)] rounded-tl-md rounded-br-md border border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] transition"
              >
                <media.icon />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={item}
          className="text-center text-sm text-[var(--foreground)] mt-10"
        >
          © {new Date().getFullYear()} Prasanth Nursery Garden 🌿 — All rights reserved. Designed
          with 💚 for plant lovers.
        </motion.p>
      </div>
    </footer>
  );
};
