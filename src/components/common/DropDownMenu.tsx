'use client';
import { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface Props {
  quantityInput: number;
  setQuantityInput: (val: number) => void;
}

export const QuantityDropdown = ({ quantityInput, setQuantityInput }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(quantityInput.toString());

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (value: number) => {
    setInputValue(value.toString());
    setQuantityInput(value);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setInputValue(val);
      const num = Number(val);
      if (num > 0) setQuantityInput(num);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  useEffect(() => {
    const closeOnOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  return (
    <div className="flex items-center gap-3 text-green-700" ref={dropdownRef}>
      <label htmlFor="quantity" className="text-sm font-semibold text-[var(--color-primary-dark)]">
        Quantity
      </label>

      <div className="relative w-28">
        <div className="flex w-full rounded-tl-lg rounded-xs rounded-br-lg  border border-[var(--color-accent-light)] focus-within:ring-2 focus-within:ring-[var(--color-primary-dark)] transition">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 text-sm  rounded-tl-lg rounded-xs focus:outline-none"
          />
          <button
            type="button"
            onClick={toggleDropdown}
            className="px-3  flex items-center justify-center border-l border-[var(--color-accent-light)]"
          >
            <FaChevronDown className="text-sm text-gray-500" />
          </button>
        </div>

        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/10 text-sm">
            {[...Array(10)].map((_, i) => (
              <li
                key={i}
                onClick={() => handleSelect(i + 1)}
                className={`px-4 py-2 cursor-pointer hover:bg-[var(--color-primary-dark)] hover:text-white ${
                  quantityInput === i + 1 ? 'bg-[var(--color-accent-light)]' : ''
                }`}
              >
                {i + 1}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
