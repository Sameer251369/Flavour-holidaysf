import React, { useState } from 'react';
import { CalendarDays, Menu, Phone, X } from 'lucide-react';
import BrandMark from './BrandMark';

const PHONE_DISPLAY = '+91 99066 66336';
const PHONE_HREF = 'tel:+919906666336';

const topLinks = [
  { label: 'Upcoming Trips', id: 'tours', icon: CalendarDays },
  { label: 'Itinerary', id: 'checkpoints' },
  { label: 'Blogs', id: 'blogs' },
  { label: 'FAQs', id: 'faqs' }
];

const barLinks = [
  { label: 'Tours', id: 'tours' },
  { label: 'Fleet', id: 'fleet' }
];

const Navbar = ({ onOpenInquiry, onScrollTo, onSelectDestination, destinations = [] }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (id) => {
    onScrollTo(id);
    setMobileOpen(false);
  };

  const selectDestination = (destination) => {
    if (onSelectDestination) onSelectDestination(destination.filterValue, destination.anchor);
    else go(destination.anchor);
    setMobileOpen(false);
  };

  const openInquiry = () => {
    if (onOpenInquiry) onOpenInquiry();
    setMobileOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-header__masthead">
        <div className="page-shell site-header__masthead-inner">
          <button
            type="button"
            onClick={() => go('hero')}
            aria-label="Go to Flavour Holidays home"
            className="site-header__brand"
          >
            <BrandMark />
          </button>

          <nav className="site-header__links" aria-label="Primary navigation">
            {topLinks.map(({ label, id, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                className="site-header__link"
              >
                {label}
                {Icon && <Icon size={16} aria-hidden="true" />}
              </button>
            ))}
          </nav>

          <div className="site-header__actions">
            <a href={PHONE_HREF} className="site-header__call" aria-label={`Call Flavour Holidays on ${PHONE_DISPLAY}`}>
              <Phone size={16} aria-hidden="true" />
              <span>{PHONE_DISPLAY}</span>
            </a>

            <button
              type="button"
              className="site-header__menu-toggle"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <nav className="destination-bar" aria-label="Browse destinations">
        <div className="page-shell destination-bar__inner">
          <div className="destination-bar__group destination-bar__group--scroll">
            {destinations.length > 0 && (
              <span className="destination-bar__label">Destinations</span>
            )}
            {destinations.map((destination) => (
              <button
                key={destination.key}
                type="button"
                onClick={() => selectDestination(destination)}
                className="destination-bar__link"
                aria-label={`Browse ${destination.label} tours`}
              >
                {destination.label}
              </button>
            ))}
          </div>

          <div className="destination-bar__group destination-bar__group--end">
            {barLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className="destination-bar__link"
              >
                {item.label}
              </button>
            ))}
            <button type="button" onClick={openInquiry} className="destination-bar__cta">
              Plan a trip
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-navigation" className="nav-drawer">
          <p className="nav-drawer__label">Destinations</p>
          {destinations.map((destination) => (
            <button
              key={destination.key}
              type="button"
              onClick={() => selectDestination(destination)}
              className="nav-drawer__link"
            >
              {destination.label}
            </button>
          ))}

          <p className="nav-drawer__label">Explore</p>
          {[...topLinks, ...barLinks].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="nav-drawer__link"
            >
              {item.label}
            </button>
          ))}

          <a href={PHONE_HREF} className="nav-drawer__call">
            <Phone size={16} aria-hidden="true" /> {PHONE_DISPLAY}
          </a>

          <button type="button" onClick={openInquiry} className="nav-drawer__cta">
            Plan a trip
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
