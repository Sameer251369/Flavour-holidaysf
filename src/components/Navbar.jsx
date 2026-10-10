import React, { useState } from 'react';
import { ArrowUpRight, Compass, MapPin, Menu, Mountain, Snowflake, X } from 'lucide-react';
import BrandMark from './BrandMark';

const navItems = [
  { label: 'Tours', id: 'tours' },
  { label: 'Itinerary', id: 'checkpoints' },
  { label: 'Travel notes', id: 'blogs' },
  { label: 'Fleet', id: 'fleet' },
  { label: 'FAQs', id: 'faqs' }
];

const destinationIcons = {
  kashmir: Mountain,
  kargil: Compass,
  ladakh: Snowflake
};

const Navbar = ({ onOpenInquiry, onScrollTo, onSelectDestination, destinations = [] }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    onScrollTo(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="site-header">
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
            {navItems.map((item) => (
              <button
                key={item.id}
                className="site-navbar__link"
                type="button"
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="site-navbar__actions">
            <button className="nav-book-btn" type="button" onClick={() => onOpenInquiry()}>
              Plan a trip <ArrowUpRight size={15} aria-hidden="true" />
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
      </header>

      <nav className="destination-nav" aria-label="Explore destinations">
        <div className="destination-nav__inner content-shell">
          <span className="destination-nav__label">Explore</span>
          <div className="destination-nav__list">
            {destinations.map((destination) => {
              const Icon = destinationIcons[destination.key] || MapPin;
              return (
                <button
                  key={destination.key}
                  className="destination-nav__item"
                  type="button"
                  onClick={() => {
                    if (onSelectDestination) {
                      onSelectDestination(destination.filterValue, destination.anchor);
                    } else {
                      handleNavClick(destination.anchor);
                    }
                    setMobileMenuOpen(false);
                  }}
                  aria-label={`Browse ${destination.label} tours`}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{destination.label}</span>
                </button>
              );
            })}
            {destinations.length === 0 && <span className="destination-nav__empty">Tour destinations will appear here</span>}
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu-drawer" id="mobile-navigation" role="navigation" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="site-navbar__mobile-link"
              type="button"
              onClick={() => handleNavClick(item.id)}
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
