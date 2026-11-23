import React, { useState } from 'react';
import { CalendarDays, CarFront, MapPinned, Menu, MessageCircle, Phone, X } from 'lucide-react';
import BrandMark from './BrandMark';
import { CONTACT_PHONE_HREF, WHATSAPP_NUMBER } from '../config/contact';
import { trackWhatsAppClick } from '../config/metaPixel';

const PHONE_HREF = CONTACT_PHONE_HREF;
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I am interested in a Kashmir or Ladakh trip. Please share more details.')}`;

const topLinks = [
  { label: 'Upcoming Trips', id: 'tours', icon: CalendarDays },
  { label: 'Itinerary', id: 'checkpoints' },
  { label: 'Customize Your Trip', id: 'customize-trip' },
  { label: 'Blogs', id: 'blogs' },
  { label: 'FAQs', id: 'faqs' }
];

const barLinks = [
  { label: 'Tours', id: 'tours' },
  { label: 'Book a Ride', id: 'vehicles-page', icon: CarFront }
];

const Navbar = ({ onScrollTo, onSelectDestination, destinations = [] }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRidePage = /^\/vehicles\/?$/.test(window.location.pathname);
  const isCustomizePage = /^\/customize-trip\/?$/.test(window.location.pathname);

  const go = (id) => {
    if (id === 'customize-trip') {
      window.location.assign('/customize-trip');
      setMobileOpen(false);
      return;
    }
    if (id === 'vehicles-page') {
      window.location.assign('/vehicles/');
      setMobileOpen(false);
      return;
    }
    onScrollTo(id);
    setMobileOpen(false);
  };

  const selectDestination = (destination) => {
    if (onSelectDestination) onSelectDestination(destination.filterValue, destination.anchor);
    else go(destination.anchor);
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
            <a href={PHONE_HREF} className="site-header__call" aria-label="Call Flavour Holidays">
              <Phone size={19} aria-hidden="true" />
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="site-header__whatsapp"
              aria-label="Chat with Flavour Holidays on WhatsApp"
              onClick={() => trackWhatsAppClick({ source: 'site_header' })}
            >
              <MessageCircle size={19} aria-hidden="true" />
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
                className={`destination-bar__link${item.icon ? ' destination-bar__action-link' : ''}`}
                aria-label={item.label}
                aria-current={item.id === 'vehicles-page' && isRidePage ? 'page' : undefined}
              >
                {item.icon && <item.icon className="destination-bar__action-icon" size={17} aria-hidden="true" />}
                <span>{item.label}</span>
              </button>
            ))}
            <a href="/customize-trip" className="destination-bar__cta destination-bar__action-link" aria-label="Customize Your Trip" aria-current={isCustomizePage ? 'page' : undefined}>
              <MapPinned className="destination-bar__action-icon" size={17} aria-hidden="true" />
              <span>Customize Your Trip</span>
            </a>
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

          <div className="nav-drawer__contact-actions">
            <a href={PHONE_HREF} className="nav-drawer__call" aria-label="Call Flavour Holidays">
              <Phone size={18} aria-hidden="true" /> Call us
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-drawer__whatsapp"
              aria-label="Chat with Flavour Holidays on WhatsApp"
              onClick={() => trackWhatsAppClick({ source: 'mobile_navigation' })}
            >
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp
            </a>
          </div>

          <a href="/customize-trip" className="nav-drawer__cta">Customize Your Trip</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
