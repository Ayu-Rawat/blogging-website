import React from 'react';

function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="py-6 bg-[#0a0a0a] text-[#c9d1d9]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="mt-4 text-sm">
            &copy; {year}. Made for fun by{' '}
            <a
              href="linkdin.ayush.it"
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
              href="github.ayush.it"
              >
                Github
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-white transition-colors duration-200"
                href='instagram.ayush.it'
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-white transition-colors duration-200"
                href='https://github.com/Ayu-Rawat/blogging-website'
              >
                Source Code
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
