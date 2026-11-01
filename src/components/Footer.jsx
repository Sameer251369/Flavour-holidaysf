import React from 'react';
import { ArrowUp, Globe, Mail, MapPin, PhoneCall } from 'lucide-react';
import BrandMark from './BrandMark';

const exploreLinks = [
  { label: 'Home', target: 'hero' },
  { label: 'Tours', target: 'tours' },
  { label: 'Custom Trip Builder', target: 'customizer' },
  { label: 'Travel Notes', target: 'blogs' },
  { label: 'Fleet', target: 'fleet' },
];

const phones = [
  { label: '+91 99066 66336', href: 'tel:+919906666336' },
  { label: '+91 70068 88299', href: 'tel:+917006888299' },
];

const linkClass =
  'group inline-flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-slate-950 rounded-sm';

const iconWrapClass =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-amber-400 ring-1 ring-white/10 ' +
  'transition-colors group-hover:bg-amber-400 group-hover:text-slate-950';

const Footer = ({ onScrollTo }) => (
  <footer className="relative overflow-hidden bg-slate-950 text-slate-300">
    {/* soft top glow to separate footer from page content */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
    />

    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
      {/* Call to action */}
      <div className="flex flex-col gap-6 border-b border-white/10 py-12 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
            Planning a trip to Kashmir or Ladakh?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-base">
            Tell us your dates and the kind of trip you want. We will put together a route, vehicle and stays for you.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="tel:+919906666336"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <PhoneCall size={16} />
            Call us
          </a>
          <button
            type="button"
            onClick={() => onScrollTo('customizer')}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Build a custom trip
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr] lg:gap-16">
        <div>
          <BrandMark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
            Kashmir-based travel planning for scenic holidays, high-altitude routes, offbeat valleys and private
            vehicle-led itineraries.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://flavourholidays.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Open Flavour Holidays website"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10 transition hover:bg-amber-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Explore">
          <h4 className="text-base font-semibold text-white">Explore</h4>
          <ul className="mt-5 space-y-3">
            {exploreLinks.map(({ label, target }) => (
              <li key={target}>
                <button
                  type="button"
                  onClick={() => onScrollTo(target)}
                  className="rounded-sm text-sm text-slate-300 transition-colors hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="text-base font-semibold text-white">Contact</h4>
          <ul className="mt-5 space-y-4">
            {phones.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={linkClass}>
                  <span className={iconWrapClass}>
                    <PhoneCall size={15} />
                  </span>
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href="mailto:info@flavourholidays.com" className={linkClass}>
                <span className={iconWrapClass}>
                  <Mail size={15} />
                </span>
                info@flavourholidays.com
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-amber-400 ring-1 ring-white/10">
                <MapPin size={15} />
              </span>
              <span className="pt-1.5 leading-snug">Srinagar, Jammu &amp; Kashmir 190001</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Flavour Holidays. All rights reserved.</p>

        <button
          type="button"
          onClick={() => onScrollTo('hero')}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-slate-400 transition hover:border-amber-400/60 hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <ArrowUp size={14} />
          Back to top
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;