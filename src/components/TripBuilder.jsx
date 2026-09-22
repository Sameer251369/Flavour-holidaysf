import React, { useState } from 'react';
import { Sparkles, Sliders, Car, Calendar, Users, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

const TripBuilder = ({ onOpenInquiryWithCustom }) => {
  const [destination, setDestination] = useState('Kashmir');
  const [vehicle, setVehicle] = useState('Thar 4WD');
  const [vibe, setVibe] = useState('#SnowVibes');
  const [days, setDays] = useState(5);
  const [travelers, setTravelers] = useState(2);

  // Dynamic price calculation
  const baseRatePerDay = destination === 'Kashmir' ? 3200 : destination === 'Gurez' ? 3800 : 4200;
  const vehicleSurplus = vehicle === 'Thar 4WD' ? 1200 : vehicle === 'Crysta' ? 900 : 1800;
  const estimatedPricePerPerson = Math.round((baseRatePerDay * days) + vehicleSurplus);
  const totalPrice = estimatedPricePerPerson * travelers;

  const handleCustomSubmit = () => {
    onOpenInquiryWithCustom({
      custom_notes: `Gen-Z Custom Plan: ${days} Days in ${destination} with ${vehicle} for ${travelers} travelers (${vibe} vibe). Estimated Est: ₹${estimatedPricePerPerson}/person.`,
      travelers_count: travelers,
      vehicle_preference: vehicle
    });
  };

  return (
    <section id="customizer" className="support-section trip-builder-section" style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      <div className="glass-panel" style={{
        padding: '48px',
        border: '1px solid rgba(0, 245, 212, 0.3)',
        boxShadow: '0 0 50px rgba(0, 245, 212, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow backdrop */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(157, 78, 221, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ textBaseline: 'middle', marginBottom: '36px', textAlign: 'center' }}>
          <div className="badge-neon" style={{ marginBottom: '14px', display: 'inline-flex' }}>
            <Sliders size={14} /> INSTANT TRIP CUSTOMIZER
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, marginBottom: '12px' }}>
            BUILD YOUR <span style={{ color: '#00F5D4' }}>CUSTOM HIMALAYAN TRIP.</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            Adjust days, choose high-altitude Thar 4x4s or luxury Crystas, select group size, and get an instant custom itinerary proposal.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px' }}>
          {/* Controls Form Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1. Destination */}
            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: 800, color: '#CBD5E1', display: 'block', marginBottom: '10px' }}>
                1. SELECT DESTINATION FRONTIER
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Kashmir', 'Gurez', 'Ladakh'].map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setDestination(dest)}
                    style={{
                      flex: 1,
                      minWidth: '100px',
                      padding: '12px',
                      borderRadius: '12px',
                      border: destination === dest ? '1px solid #00F5D4' : '1px solid rgba(255,255,255,0.1)',
                      background: destination === dest ? 'rgba(0, 245, 212, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                      color: destination === dest ? '#00F5D4' : '#94A3B8',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {dest === 'Kashmir' ? '🏔️ Kashmir' : dest === 'Gurez' ? '🔥 Gurez 11.6k' : '⭐ Ladakh'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Vehicle Selection */}
            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: 800, color: '#CBD5E1', display: 'block', marginBottom: '10px' }}>
                2. SELECT VEHICLE BEAST
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[
                  { name: 'Thar 4WD', icon: '🚙', desc: 'Snow & Passes' },
                  { name: 'Crysta', icon: '🚐', desc: 'Luxury Family' },
                  { name: 'Tempo', icon: '🚌', desc: 'Squad Group' }
                ].map((v) => (
                  <button
                    key={v.name}
                    type="button"
                    onClick={() => setVehicle(v.name)}
                    style={{
                      flex: 1,
                      minWidth: '100px',
                      padding: '12px',
                      borderRadius: '12px',
                      border: vehicle === v.name ? '1px solid #C77DFF' : '1px solid rgba(255,255,255,0.1)',
                      background: vehicle === v.name ? 'rgba(157, 78, 221, 0.18)' : 'rgba(15, 23, 42, 0.6)',
                      color: vehicle === v.name ? '#C77DFF' : '#94A3B8',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    <div>{v.icon} {v.name}</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.8, marginTop: '2px' }}>{v.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Duration & Travelers Sliders */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#CBD5E1', display: 'block', marginBottom: '8px' }}>
                  DURATION: <span style={{ color: '#00F5D4' }}>{days} Days</span>
                </label>
                <input 
                  type="range" 
                  min="3" 
                  max="10" 
                  value={days} 
                  onChange={(e) => setDays(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#00F5D4', cursor: 'pointer' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#CBD5E1', display: 'block', marginBottom: '8px' }}>
                  SQUAD: <span style={{ color: '#FF007F' }}>{travelers} Guests</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="16" 
                  value={travelers} 
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#FF007F', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Instant Proposal Summary Column */}
          <div style={{
            background: 'rgba(10, 15, 26, 0.75)',
            border: '1px solid rgba(0, 245, 212, 0.25)',
            borderRadius: '20px',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ color: '#00F5D4', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '14px' }}>
                INSTANT CUSTOM PROPOSAL
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '16px', color: '#F8FAFC' }}>
                {days}-Day {destination} {vehicle} Custom Tour
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#CBD5E1' }}>
                  <CheckCircle size={16} color="#00F5D4" />
                  Customized Checkpoint Itinerary for {destination}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#CBD5E1' }}>
                  <CheckCircle size={16} color="#00F5D4" />
                  Dedicated {vehicle} Vehicle + Mountain Driver
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#CBD5E1' }}>
                  <CheckCircle size={16} color="#00F5D4" />
                  Border Permits & Gondola Ticket Booking Assistance
                </div>
              </div>
            </div>

            {/* Price & Submit CTA */}
            <div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Est. Price / Person</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00F5D4' }}>₹{estimatedPricePerPerson.toLocaleString('en-IN')}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Total Squad ({travelers})</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFD166' }}>₹{totalPrice.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <button 
                onClick={handleCustomSubmit} 
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
              >
                <Sparkles size={18} /> Request Instant Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripBuilder;
