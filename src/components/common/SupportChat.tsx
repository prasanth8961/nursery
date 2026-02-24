'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaWhatsapp, FaMapMarkerAlt, FaTruck, FaLeaf, FaTimes as FaClose } from 'react-icons/fa';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
}

const CONSTANTS = {
  WHATSAPP_NUMBER: '917639874667',
  LOCATION_URL: 'https://goo.gl/maps/example', // Replace with real one if available
};

export const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 👋 Welcome to Prasanth Nursery Garden. How can I assist you today?',
      sender: 'bot',
      options: ['Order Status', 'Plant Care Advice', 'Bulk Orders', 'Store Location'],
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (option: string) => {
    // Add user message
    const userMsg: Message = { id: Date.now().toString(), text: option, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);

    // Bot response logic
    setTimeout(() => {
      let botMsg: Message;

      switch (option) {
        case 'Order Status':
          botMsg = {
            id: (Date.now() + 1).toString(),
            text: 'I can help you with that! Please ping us on WhatsApp with your Order ID for real-time tracking.',
            sender: 'bot',
            options: ['Contact via WhatsApp', 'Main Menu'],
          };
          break;
        case 'Plant Care Advice':
          botMsg = {
            id: (Date.now() + 1).toString(),
            text: 'Our experts are ready to help. You can send photos of your plants on WhatsApp for better advice!',
            sender: 'bot',
            options: ['Contact via WhatsApp', 'Main Menu'],
          };
          break;
        case 'Bulk Orders':
          botMsg = {
            id: (Date.now() + 1).toString(),
            text: 'We offer special pricing for bulk orders! Let us know your requirements on WhatsApp.',
            sender: 'bot',
            options: ['Contact via WhatsApp', 'Main Menu'],
          };
          break;
        case 'Store Location':
          botMsg = {
            id: (Date.now() + 1).toString(),
            text: 'We are located at 886/77 - Kallukkudieruppu, Pudukkottai. Would you like to view it on Google Maps?',
            sender: 'bot',
            options: ['View on Google Maps', 'Main Menu'],
          };
          break;
        case 'Contact via WhatsApp':
          const wpUrl = `https://wa.me/${CONSTANTS.WHATSAPP_NUMBER}?text=Hi, I need assistance with ${messages[messages.length - 1]?.text || 'something'}`;
          window.open(wpUrl, '_blank');
          return;
        case 'View on Google Maps':
          window.open(CONSTANTS.LOCATION_URL, '_blank');
          return;
        case 'Main Menu':
        default:
          botMsg = {
            id: (Date.now() + 1).toString(),
            text: 'Choose an option below to get started:',
            sender: 'bot',
            options: ['Order Status', 'Plant Care Advice', 'Bulk Orders', 'Store Location'],
          };
          break;
      }

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[340px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-green-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FaLeaf />
                </div>
                <div>
                  <h3 className="font-bold">Support Chat</h3>
                  <p className="text-xs text-green-100">Usually replies in seconds</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-2 rounded-full transition">
                <FaClose />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gray-50/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: msg.sender === 'user' ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                      msg.sender === 'user' ? 'bg-green-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Options Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {messages[messages.length - 1]?.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-100 rounded-full text-xs font-medium hover:bg-green-100 transition active:scale-95"
                  >
                    {option === 'Contact via WhatsApp' && <FaWhatsapp className="inline mr-1" />}
                    {option === 'View on Google Maps' && <FaMapMarkerAlt className="inline mr-1" />}
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 transition-colors relative group"
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
        {!isOpen && (
          <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1 bg-white text-green-700 text-xs font-bold rounded-lg shadow-md border border-green-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Need help?
          </span>
        )}
      </motion.button>
    </div>
  );
};
