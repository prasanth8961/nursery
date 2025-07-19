'use client';

import { useState } from 'react';
import { AiFillPhone } from 'react-icons/ai';
import { MdMail } from 'react-icons/md';
import { FaBars, FaTimes, FaSeedling, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { BsPerson } from 'react-icons/bs';
import { ThemeContext } from '@/contexts/ThemeContext';
import Image from 'next/image';
import { CONTACT, EMAIL, LOGO_IMAGE, socialMedias } from '@/constants';
import { Media } from '@/types';
import { useRoute } from '@/routes';
import CartBadge from '../common/CartBadge';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { goToCart, goToPlants, goToWishlist, goToAuth } = useRoute();

  return (
    <header className="bg-[var(--background)] w-full relative sticky top-0 z-50 shadow-sm sm:shadow-none">
      <div className="hidden sm:flex px-4 sm:px-8 pt-2 pb-3 flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-[var(--color-dark)] text-center sm:text-left">
          <a
            href={`tel:${CONTACT}`}
            className="flex items-center gap-1 hover:text-[var(--color-primary)] transition"
          >
            <AiFillPhone size={18} color="var(--color-primary-light)" />
            {CONTACT}
          </a>
          <span className="hidden sm:inline text-gray-400">|</span>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2 hover:text-[var(--color-primary)] transition"
          >
            <MdMail size={18} color="var(--color-primary-light)" />
            {EMAIL}
          </a>
        </div>

        <div className="flex gap-2 items-center text-[var(--color-primary-dark)]">
          {socialMedias.map((media: Media) => (
            <a
              key={media.id}
              href={media.link}
              className="h-8 w-8 rounded-tl-md rounded-br-md border border-[var(--color-accent-light)] flex items-center justify-center hover:bg-[var(--color-accent-mid)] transition"
            >
              <media.icon />
            </a>
          ))}
        </div>
      </div>

      <div className="w-full border-b border-[var(--color-accent-ultralight)]" />
      <div className="px-4 sm:px-8 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src={LOGO_IMAGE}
            alt="Prasanth Nursery"
            width={40}
            height={40}
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full"
            priority
          />
          <div className="flex items-center gap-2 sm:flex-col sm:items-start sm:gap-0 leading-tight">
            <span
              className="text-[var(--color-primary)] text-base sm:text-lg md:text-xl font-bold capitalize"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Prasanth
            </span>
            <span
              className="text-[var(--color-primary)] text-sm sm:text-base md:text-lg font-medium capitalize"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Nursery Garden
            </span>
          </div>
        </div>

        <div
          className="hidden sm:flex gap-4 text-[var(--color-accent-dark)] font-medium text-sm sm:text-base sm:font-semibold"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <div className="flex gap-6 items-center text-[var(--color-primary-dark)] text-sm sm:text-base font-medium">
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-[var(--color-primary)] transition"
              onClick={() => {
                setMenuOpen(false);
                goToPlants();
              }}
            >
              <FaSeedling />
              <span>Plants</span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-[var(--color-primary)] transition"
              onClick={() => {
                setMenuOpen(false);
                goToWishlist();
              }}
            >
              <FaHeart />
              <span>Favorites</span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-[var(--color-primary)] transition"
              onClick={() => {
                setMenuOpen(false);
                goToCart();
              }}
            >
              <FaShoppingCart />
              <span>Cart</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <ThemeContext />
          <div
            className="hidden sm:flex border-2 border-[var(--color-accent-light)] bg-[var(--color-primary-light)] text-white px-3 py-2 rounded-tl-lg rounded-br-lg items-center gap-1 text-sm"
            onClick={() => {
              setMenuOpen(false);
              goToAuth();
            }}
          >
            <BsPerson /> <span>Welcome</span>
          </div>

          <div
            className="flex sm:hidden items-center justify-center gap-2 border-2 border-[var(--color-accent-light)] p-2 rounded-tl-md rounded-br-md cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars className="text-green-600" />
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-[75%] max-w-[320px] bg-[var(--background)] z-50 p-6 transition-transform duration-300 ease-in-out transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col overflow-y-auto`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <Image
                src={LOGO_IMAGE}
                alt="Prasanth Nursery"
                width={40}
                height={40}
                className="w-10 h-10 object-contain rounded-full"
                priority
              />
              <div className="flex flex-col">
                <span
                  className="text-[var(--color-primary)] font-bold text-base"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Prasanth Nursery
                </span>
                <p className="text-sm text-[var(--foreground)] italic font-[cursive] leading-snug">
                  Growing together, like family 🌿
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="absolute right-2 top-2 p-1 text-xl text-[var(--color-primary-light)] border border-2 border-[var(--color-accent-light)] flex items-center justify-center cursor-pointer rounded-tr-md rounded-bl-md shadow-sm"
          >
            <FaTimes />
          </button>
        </div>

        <div className="w-full border-b border-gray-300 mb-4" />

        <div
          className="flex flex-col gap-4 text-[var(--color-accent-mid)] font-medium text-base m-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <div
            className="flex items-center gap-2 cursor-pointer  hover:text-[var(--color-primary)] transition"
            onClick={() => {
              setMenuOpen(false);
              goToPlants();
            }}
          >
            <FaSeedling />
            <span className="bg-gradient-to-r from-green-500 to-lime-500 bg-clip-text text-transparent drop-shadow-md">
              Products
            </span>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer  hover:text-[var(--color-primary)] transition"
            onClick={() => {
              setMenuOpen(false);
              goToWishlist();
            }}
          >
            <FaHeart />
            <span className="bg-gradient-to-r from-green-500 to-lime-500 bg-clip-text text-transparent drop-shadow-md">
              Favorites
            </span>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer  hover:text-[var(--color-primary)] transition"
            onClick={() => {
              setMenuOpen(false);
              goToCart();
            }}
          >
            <FaShoppingCart />
            <span className="bg-gradient-to-r from-green-500 to-lime-500 bg-clip-text text-transparent drop-shadow-md">
              Cart
            </span>
            <CartBadge />
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div
            className="flex items-center justify-center gap-2 bg-[var(--color-primary-light)] text-white px-3 py-3 rounded-tl-lg rounded-br-lg"
            onClick={() => {
              setMenuOpen(false);
              goToAuth();
            }}
          >
            <BsPerson /> <span>Welcome</span>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 sm:hidden backdrop-blur-sm transition-opacity duration-300 ease-in-out ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} bg-black/40`}
        onClick={() => setMenuOpen(false)}
      />
    </header>
  );
};
