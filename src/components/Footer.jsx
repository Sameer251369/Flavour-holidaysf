import React from 'react';
import { Mountain, PhoneCall, Mail, MapPin, Globe, Share2, Compass } from 'lucide-react';

const Footer = ({ onScrollTo, onOpenInquiry }) => {
  return (
    <footer style={{
      background: 'rgba(5, 8, 14, 0.95)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '80px 24px 30px',
      marginTop: '100px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '48px', marginBottom: '60px' }}>
        {/* Brand Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00F5D4 0%, #7B2CBF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Mountain size={20} color="#050a14" />
            </div>
            <div>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: '1.2rem', color: '#FFF' }}>
                FLAVOUR HOLIDAYS
              </span>
            </div>
          </div>

          <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
            Jammu & Kashmir's premier Gen-Z tour operator. Specialized in high-altitude 4x4 off-roading, Gurez frontier permits, luxury houseboats, and interactive checkpoint itineraries.
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="https://flavourholidays.com" target="_blank" rel="noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F5D4' }}>
              <Globe size={18} />
            </a>
            <a href="#hero" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F5D4' }}>
              <Share2 size={18} />
            </a>
            <a href="#tours" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F5D4' }}>
              <Compass size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '20px' }}>
            Quick Navigation
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <li onClick={() => onScrollTo('hero')} style={{ cursor: 'pointer', color: '#94A3B8' }}>Home</li>
            <li onClick={() => onScrollTo('tours')} style={{ cursor: 'pointer', color: '#94A3B8' }}>Interactive Checkpoint Tours</li>
            <li onClick={() => onScrollTo('customizer')} style={{ cursor: 'pointer', color: '#94A3B8' }}>Custom Trip Builder</li>
            <li onClick={() => onScrollTo('blogs')} style={{ cursor: 'pointer', color: '#94A3B8' }}>Travel Log & Guides</li>
            <li onClick={() => onScrollTo('fleet')} style={{ cursor: 'pointer', color: '#94A3B8' }}>4x4 Thar & Vehicle Fleet</li>
          </ul>
        </div>

        {/* Direct Contact */}
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '20px' }}>
            Direct Host Desk
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: '#94A3B8' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <PhoneCall size={18} color="#00F5D4" />
              <div>
                <a href="tel:+919906666336" style={{ color: '#00F5D4', textDecoration: 'none', fontWeight: 700, display: 'block' }}>+91 99066 66336</a>
                <a href="tel:+917006888299" style={{ color: '#00F5D4', textDecoration: 'none', fontWeight: 700, display: 'block' }}>+91 70068 88299</a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Mail size={18} color="#00F5D4" />
              <span>info@flavourholidays.com</span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <MapPin size={18} color="#00F5D4" />
              <span>Srinagar, Jammu & Kashmir 190001, India</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', textAlign: 'center', fontSize: '0.82rem', color: '#64748B' }}>
        © {new Date().getFullYear()} Flavour Holidays. All Rights Reserved. Redesigned with Django & React.
      </div>
    </footer>
  );
};

export default Footer;
