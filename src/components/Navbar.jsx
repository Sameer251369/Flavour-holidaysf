import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import BrandMark from './BrandMark';

const navItems = [
  { label: 'Home', id: 'hero' },
  { label: 'Destination', id: 'tours' },
  { label: 'Itinerary Checkpoints', id: 'checkpoints' },
  { label: 'Blog', id: 'blogs' },
  { label: '4x4 Fleet', id: 'fleet' },
  { label: 'FAQ', id: 'faqs' }
];

const Navbar = ({ onOpenInquiry, onScrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    onScrollTo(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="site-navbar" aria-label="Primary navigation">
        <button
          className="site-navbar__brand"
          type="button"
          onClick={() => handleNavClick('hero')}
          aria-label="Go to Flavour Holidays home"
        >
          <BrandMark />
        </button>

        <div className="desktop-links">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              className="site-navbar__link"
              type="button"
              onClick={() => handleNavClick(item.id)}
              aria-current={index === 0 ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="site-navbar__actions">
          <button className="nav-book-btn" type="button" onClick={() => onOpenInquiry()}>
            Plan a trip
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>

          <button
            className="mobile-toggle"
            type="button"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu-drawer" id="mobile-navigation" role="navigation" aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              className={`site-navbar__mobile-link${index === 0 ? ' site-navbar__mobile-link--active' : ''}`}
              type="button"
              onClick={() => handleNavClick(item.id)}
              aria-current={index === 0 ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}

          <button
            className="btn-primary"
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInquiry();
            }}
          >
            Plan a trip <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
