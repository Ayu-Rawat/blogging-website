import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="py-6 bg-[#161b22] text-[#c9d1d9]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="mt-4 text-sm">
            &copy; 2024. Made for fun by{' '}
            <a
              href="https://www.linkedin.com/in/ayush-rawat-480537307/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#58a6ff] hover:text-[#6ea9ff] transition-colors duration-200"
            >
              Ayush Rawat
            </a>.
          </p>
          <ul className="mt-4 flex space-x-6">
            <li>
              <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-white transition-colors duration-200"
              href="https://github.com/Ayu-Rawat"
              >
                Github
              </a>
            </li>
            <li>
              <Link
                className="text-sm hover:text-white transition-colors duration-200"
                to="/"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                className="text-sm hover:text-white transition-colors duration-200"
                to="/"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
