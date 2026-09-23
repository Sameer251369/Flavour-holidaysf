import React from 'react';
import { Globe, Mail, MapPin, PhoneCall } from 'lucide-react';
import BrandMark from './BrandMark';

const Footer = ({ onScrollTo }) => (
  <footer className="site-footer">
    <div className="site-footer__grid">
      <div>
        <BrandMark />
        <p>
          Kashmir-based travel planning for scenic holidays, high-altitude routes,
          offbeat valleys and private vehicle-led itineraries.
        </p>

        <div className="footer-socials">
          <a href="https://flavourholidays.com" target="_blank" rel="noreferrer" aria-label="Open Flavour Holidays website">
            <Globe size={18} />
          </a>
        </div>
      </div>

      <div>
        <h4>Explore</h4>
        <button type="button" onClick={() => onScrollTo('hero')}>Home</button>
        <button type="button" onClick={() => onScrollTo('tours')}>Tours</button>
        <button type="button" onClick={() => onScrollTo('customizer')}>Custom Trip Builder</button>
        <button type="button" onClick={() => onScrollTo('blogs')}>Travel Notes</button>
        <button type="button" onClick={() => onScrollTo('fleet')}>Fleet</button>
      </div>

      <div>
        <h4>Contact</h4>
        <a href="tel:+919906666336"><PhoneCall size={17} /> +91 99066 66336</a>
        <a href="tel:+917006888299"><PhoneCall size={17} /> +91 70068 88299</a>
        <a href="mailto:info@flavourholidays.com"><Mail size={17} /> info@flavourholidays.com</a>
        <span><MapPin size={17} /> Srinagar, Jammu &amp; Kashmir 190001</span>
      </div>
    </div>

    <div className="site-footer__bottom">
      © {new Date().getFullYear()} Flavour Holidays. All rights reserved.
    </div>
  </footer>
);

export default Footer;
