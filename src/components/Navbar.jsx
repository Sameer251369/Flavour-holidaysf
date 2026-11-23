import React, { useState } from 'react';
import { CalendarDays, CarFront, ChevronRight, MapPinned, Menu, MessageCircle, Phone, X } from 'lucide-react';
import BrandMark from './BrandMark';
import { CONTACT_PHONE_HREF, WHATSAPP_NUMBER } from '../config/contact';
import { trackWhatsAppClick } from '../config/metaPixel';

const PHONE_HREF = CONTACT_PHONE_HREF;
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I am interested in a Kashmir or Ladakh trip. Please share more details.')}`;

/* If your old header was sticky/fixed, set it here. Use '' for normal flow. */
const HEADER_POSITION = 'sticky top-0 z-50';

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

/* ---------- shared class strings ---------- */
const ring = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500';

// Masthead: round icon buttons (Call / WhatsApp / Menu)
const iconBtn = `inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700
  transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/10 active:translate-y-0 active:scale-90
  sm:h-11 sm:w-11 max-[360px]:h-9 max-[360px]:w-9 ${ring}`;

// Masthead: desktop text links (white background → dark text)
const mastLink = `group relative inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2 text-[0.9rem] font-semibold text-slate-700
  transition-colors duration-200 hover:text-cyan-700 active:scale-95 xl:px-3.5
  after:absolute after:inset-x-2.5 after:-bottom-px after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-cyan-500
  after:transition-transform after:duration-300 hover:after:scale-x-100 xl:after:inset-x-3.5 ${ring}`;

// Dark destination bar: text links (navy background → light text)
const barLink = `group relative inline-flex h-full shrink-0 snap-start items-center gap-1.5 whitespace-nowrap px-3.5 text-[0.85rem] font-semibold
  tracking-wide text-slate-200 transition-colors duration-200 hover:text-white active:scale-95 active:text-cyan-300
  aria-[current=page]:text-cyan-300
  after:absolute after:inset-x-3.5 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-cyan-400
  after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 ${ring}`;

// Drawer rows
const drawerLink = `group flex min-h-12 w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[0.98rem] font-semibold text-slate-800
  transition-all duration-200 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.98] active:bg-cyan-100 ${ring}`;

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
    <header className={`${HEADER_POSITION} w-full bg-white shadow-[0_4px_20px_-8px_rgba(15,23,42,0.25)]`}>
      {/* ================= Masthead (white) ================= */}
      <div className="border-b border-slate-200 bg-white pt-[env(safe-area-inset-top)]">
        <div className="page-shell flex h-16 items-center justify-between gap-3 md:h-[68px] lg:h-[76px] lg:gap-6">
          <button
            type="button"
            onClick={() => go('hero')}
            aria-label="Go to Flavour Holidays home"
            className={`-ml-1 inline-flex min-w-0 shrink items-center rounded-lg px-1 py-1 transition-transform duration-300 hover:scale-[1.02] active:scale-95 max-[360px]:[&>*]:max-w-[140px] ${ring}`}
          >
            <BrandMark />
          </button>

          <nav className="hidden h-full min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="Primary navigation">
            {topLinks.map(({ label, id, icon: Icon }) => (
              <button key={id} type="button" onClick={() => go(id)} className={`${mastLink} h-full`}>
                <span>{label}</span>
                {Icon && (
                  <Icon
                    size={16}
                    aria-hidden="true"
                    className="text-slate-400 transition-colors duration-200 group-hover:text-cyan-600"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href={PHONE_HREF}
              aria-label="Call Flavour Holidays"
              className={`${iconBtn} hover:border-slate-900 hover:bg-slate-900 hover:text-white`}
            >
              <Phone size={18} aria-hidden="true" />
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Flavour Holidays on WhatsApp"
              onClick={() => trackWhatsAppClick({ source: 'site_header' })}
              className={`${iconBtn} text-emerald-700 hover:border-[#25d366] hover:bg-[#25d366] hover:text-emerald-950`}
            >
              <MessageCircle size={18} aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`${iconBtn} lg:hidden ${mobileOpen ? '!border-slate-900 !bg-slate-900 !text-white' : ''}`}
            >
              {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= Destination bar (dark navy) ================= */}
      {/* ================= Destination bar (dark navy) ================= */}
      <nav className="bg-slate-900 text-slate-100" aria-label="Browse destinations">
        <div className="page-shell flex h-11 items-center justify-between gap-2 md:h-12 md:gap-3">
          {/* Scrollable destinations */}
          <div
            className="flex h-full min-w-0 flex-1 snap-x snap-proximity items-stretch overflow-x-auto overflow-y-hidden pr-5
              [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              [mask-image:linear-gradient(to_right,#000_calc(100%-24px),transparent)]"
          >
            {destinations.length > 0 && (
              <span className="mr-2 flex shrink-0 items-center gap-2 pr-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-cyan-300 md:mr-3 md:pr-3 md:text-[0.7rem]">
                <span className="hidden h-1.5 w-1.5 rounded-full bg-cyan-400 sm:inline-block" aria-hidden="true" />
                Destinations
              </span>
            )}
            {destinations.map((destination) => (
              <button
                key={destination.key}
                type="button"
                onClick={() => selectDestination(destination)}
                aria-label={`Browse ${destination.label} tours`}
                className={barLink}
              >
                <span>{destination.label}</span>
              </button>
            ))}
          </div>

          {/* Ride + Customize: icon buttons on phones, full links from md up */}
          <div className="flex h-full shrink-0 items-center gap-1.5 border-l border-white/10 pl-2 md:gap-1 md:pl-3">
            {barLinks.map((item) => {
              const isRide = Boolean(item.icon);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  aria-label={item.label}
                  aria-current={item.id === 'vehicles-page' && isRidePage ? 'page' : undefined}
                  className={
                    isRide
                      ? `group relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-100
                         transition-all duration-200 hover:bg-white/20 hover:text-white active:scale-90 active:bg-cyan-400/20
                         aria-[current=page]:bg-cyan-400/20 aria-[current=page]:text-cyan-300
                         md:h-full md:w-auto md:gap-1.5 md:rounded-none md:bg-transparent md:px-3.5 md:text-[0.85rem] md:font-semibold md:tracking-wide
                         md:hover:bg-transparent md:active:bg-transparent
                         md:after:absolute md:after:inset-x-3.5 md:after:bottom-0 md:after:h-0.5 md:after:origin-center md:after:scale-x-0
                         md:after:rounded-full md:after:bg-cyan-400 md:after:transition-transform md:after:duration-300
                         md:hover:after:scale-x-100 md:aria-[current=page]:after:scale-x-100 ${ring}`
                      : `hidden md:inline-flex ${barLink}`
                  }
                >
                  {item.icon && (
                    <item.icon
                      size={17}
                      aria-hidden="true"
                      className="shrink-0 text-cyan-300 transition-transform duration-300 group-hover:scale-110 md:text-slate-400 md:group-hover:text-cyan-300"
                    />
                  )}
                  <span className="sr-only md:not-sr-only">{item.label}</span>
                </button>
              );
            })}

            <a
              href="/customize-trip"
              aria-label="Customize Your Trip"
              aria-current={isCustomizePage ? 'page' : undefined}
              className={`group relative inline-flex h-8 w-8 shrink-0 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full
                bg-cyan-400 text-[0.82rem] font-bold text-slate-900 shadow-md shadow-cyan-500/20 transition-all duration-300
                hover:-translate-y-px hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/40 active:translate-y-0 active:scale-90
                aria-[current=page]:ring-2 aria-[current=page]:ring-white/70
                before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50
                before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full
                md:ml-1 md:w-auto md:px-4 ${ring}`}
            >
              <MapPinned
                size={17}
                aria-hidden="true"
                className="relative shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
              />
              <span className="relative sr-only md:not-sr-only">Customize Your Trip</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ================= Mobile / tablet drawer ================= */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="grid max-h-[calc(100dvh-108px)] gap-1 overflow-y-auto overscroll-contain border-t border-slate-200 bg-white px-3 pb-[calc(20px+env(safe-area-inset-bottom))] pt-3 shadow-2xl shadow-slate-900/15 lg:hidden"
        >
          {destinations.length > 0 && (
            <p className="mx-4 mb-1 mt-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cyan-700">Destinations</p>
          )}
          {destinations.map((destination) => (
            <button key={destination.key} type="button" onClick={() => selectDestination(destination)} className={drawerLink}>
              <span>{destination.label}</span>
              <ChevronRight size={18} aria-hidden="true" className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-600" />
            </button>
          ))}

          <p className="mx-4 mb-1 mt-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cyan-700">Explore</p>
          {[...topLinks, ...barLinks].map((item) => (
            <button key={item.id} type="button" onClick={() => go(item.id)} className={drawerLink}>
              <span>{item.label}</span>
              <ChevronRight size={18} aria-hidden="true" className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-600" />
            </button>
          ))}

          <div className="mt-4 grid grid-cols-2 gap-2.5 px-1 max-[360px]:grid-cols-1">
            <a
              href={PHONE_HREF}
              aria-label="Call Flavour Holidays"
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-[0.92rem] font-bold text-slate-900
                transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 active:scale-95 ${ring}`}
            >
              <Phone size={18} aria-hidden="true" /> Call us
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Flavour Holidays on WhatsApp"
              onClick={() => trackWhatsAppClick({ source: 'mobile_navigation' })}
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25d366] px-3 text-[0.92rem] font-bold text-emerald-950
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 ${ring}`}
            >
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp
            </a>
          </div>

          <a
            href="/customize-trip"
            className={`mx-1 mt-2.5 flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-slate-900 font-bold text-white shadow-lg shadow-slate-900/20
              transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0 active:scale-[0.98] ${ring}`}
          >
            <MapPinned size={18} aria-hidden="true" className="text-cyan-300" />
            Customize Your Trip
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;