import React, { useState, useEffect } from 'react';
import { Menu, X, Bot, Home, Info, Zap, LayoutDashboard, LogIn, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Demo state for login status
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsOpen(false); // Close mobile menu when link is clicked
    console.log(`Navigating to: ${linkName}`);
  };

  const handleAuthAction = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setActiveLink('Home');
      console.log('User logged out');
      alert('Logged out successfully!');
    } else {
      console.log('Navigating to login page');
      handleLinkClick('Login');
    }
  };

  const toggleLoginDemo = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const navLinks = [
    { name: 'Home', icon: Home },
    { name: 'About', icon: Info },
    { name: 'Features', icon: Zap },
    ...(isLoggedIn ? [{ name: 'Dashboard', icon: LayoutDashboard }] : [])
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleLinkClick('Home')}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Blog Summarizer
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.name)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeLink === link.name
                        ? 'bg-blue-50 text-blue-600 shadow-sm'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{link.name}</span>
                  </button>
                );
              })}
              
              {/* Auth Button */}
              <button
                onClick={handleAuthAction}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ml-2 ${
                  isLoggedIn
                    ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                }`}
              >
                {isLoggedIn ? <LogOut className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                <span>{isLoggedIn ? 'Logout' : 'Login'}</span>
              </button>

              {/* Demo Toggle (Remove in production) */}
              <button
                onClick={toggleLoginDemo}
                className="ml-4 px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                title="Demo: Toggle login state"
              >
                Demo: {isLoggedIn ? 'Logged In' : 'Guest'}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu 
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 transform ${
                      isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
                    }`} 
                  />
                  <X 
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 transform ${
                      isOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'
                    }`} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-100`}>
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.name)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeLink === link.name
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{link.name}</span>
                </button>
              );
            })}
            
            {/* Mobile Auth Button */}
            <button
              onClick={handleAuthAction}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 mt-2 ${
                isLoggedIn
                  ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {isLoggedIn ? <LogOut className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
              <span className="font-medium">{isLoggedIn ? 'Logout' : 'Login'}</span>
            </button>

            {/* Mobile Demo Toggle */}
            <div className="pt-4 border-t border-gray-200 mt-4">
              <button
                onClick={toggleLoginDemo}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Demo: Switch to {isLoggedIn ? 'Guest' : 'Logged In'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Demo Content (Remove in production) */}
      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to AI Blog Summarizer
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Your intelligent content summarization solution
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-2">Current State:</h3>
              <p className="text-gray-600">Active Link: <span className="font-medium text-blue-600">{activeLink}</span></p>
              <p className="text-gray-600">User Status: <span className="font-medium text-green-600">{isLoggedIn ? 'Logged In' : 'Guest'}</span></p>
            </div>
            
            {/* Spacer content for scroll testing */}
            <div className="mt-16 space-y-8">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Content Section {i + 1}</h4>
                  <p className="text-gray-600">
                    This is sample content to demonstrate the scrolling effect on the navbar. 
                    Notice how the navbar background becomes more opaque as you scroll down.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}