import React, { useState } from 'react';
import { ArrowUpRight, Menu, Mountain, X } from 'lucide-react';

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
          <span className="site-navbar__brand-mark" aria-hidden="true">
            <Mountain size={20} color="#090c10" strokeWidth={2.5} />
          </span>
          <span className="site-navbar__brand-name">
            flavour<span>.</span>
          </span>
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
            Book a custom trip
            <span className="nav-book-btn__icon" aria-hidden="true">
              <ArrowUpRight size={13} />
            </span>
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
            Plan a custom trip <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
