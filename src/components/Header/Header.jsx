import React, { useState } from 'react';
import { Container, LogoutBtn,Logo } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: !authStatus },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'Your Posts', slug: '/your-posts', active: authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className='py-3 shadow bg-[#0a0a0a]'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div><Logo/></div>
          <div className='md:hidden'>
            <button onClick={() => setMenuOpen(!menuOpen)} className='text-white'>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <ul className='hidden md:flex ml-auto space-x-4'>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='inline-block px-6 py-2 text-[#c9d1d9] hover:text-white hover:bg-[#21262d] rounded-full transition-colors duration-200'
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className='md:hidden mt-2 bg-[#0a0a0a] rounded-lg shadow-lg p-4'>
            <ul className='flex flex-col space-y-3'>
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setMenuOpen(false);
                        }}
                        className='w-full text-left text-[#c9d1d9] hover:text-white hover:bg-[#21262d] px-4 py-2 rounded-full transition-colors duration-200'
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
