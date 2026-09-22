import React from 'react';
import { ShieldCheck, Users, Compass, Zap } from 'lucide-react';

const VehiclesShowcase = ({ vehicles, onOpenInquiry }) => {
  return (
    <section id="fleet" className="support-section fleet-section" style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textBaseline: 'middle', marginBottom: '48px', textAlign: 'center' }}>
        <div className="badge-neon" style={{ marginBottom: '14px', display: 'inline-flex' }}>
          <Zap size={14} /> FLAVOUR MOUNTAIN FLEET
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, marginBottom: '16px' }}>
          4X4 BEASTS & <span style={{ color: '#00F5D4' }}>LUXURY CRUISERS.</span>
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Equipped for winter snow routes (Tangmarg-Gulmarg), high-altitude frontier passes (Razdan, Khardung La), and long mountain drives.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {vehicles && vehicles.map((v) => (
          <div key={v.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '200px', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', background: 'rgba(5, 8, 14, 0.6)' }}>
              <img 
                src={v.image_url} 
                alt={v.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '12px' }}
              />
              <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                <span className="badge-purple">{v.badge}</span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '6px', color: '#F8FAFC' }}>
              {v.name}
            </h3>

            <div style={{ display: 'flex', gap: '10px', fontSize: '0.82rem', color: '#00F5D4', fontWeight: 700, marginBottom: '14px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Users size={14} /> {v.capacity_passengers}
              </span>
            </div>

            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.5 }}>
              {v.description}
            </p>

            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', color: '#CBD5E1', fontWeight: 600 }}>
                🛣️ {v.terrain_type.split('&')[0]}
              </span>

              <button 
                onClick={() => onOpenInquiry(null, v.name)}
                className="btn-outline"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                Rent Vehicle
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VehiclesShowcase;
