import React, { useState } from 'react';
import { MapPin, Camera, Flame, Mountain, CheckCircle, ArrowRight } from 'lucide-react';

const CheckpointTimeline = ({ tourTitle, checkpoints }) => {
  const [activeDay, setActiveDay] = useState(1);

  if (!checkpoints || checkpoints.length === 0) {
    return <div style={{ color: '#94A3B8', padding: '40px 0', textAlign: 'center' }}>Loading checkpoint itinerary...</div>;
  }

  const selectedCheckpoint = checkpoints.find(c => c.day_number === activeDay) || checkpoints[0];

  return (
    <div id="checkpoints" style={{ padding: '10px 0 20px' }}>
      {/* Interactive Day Tabs Pills Header */}
      <div style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '16px',
        marginBottom: '24px',
        scrollbarWidth: 'none'
      }}>
        {checkpoints.map((cp) => {
          const isActive = activeDay === cp.day_number;
          const locationShort = cp.location_name ? cp.location_name.split(',')[0] : '';
          return (
            <button
              key={cp.day_number}
              onClick={() => setActiveDay(cp.day_number)}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                border: isActive ? '1px solid #00F5D4' : '1px solid rgba(255, 255, 255, 0.12)',
                background: isActive ? 'rgba(0, 245, 212, 0.12)' : 'rgba(15, 23, 42, 0.5)',
                color: isActive ? '#00F5D4' : '#94A3B8',
                fontWeight: 800,
                fontSize: '0.86rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isActive ? '0 0 15px rgba(0, 245, 212, 0.15)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              <span style={{ letterSpacing: '0.04em' }}>DAY {cp.day_number}</span>
              {locationShort && (
                <span style={{ fontSize: '0.78rem', opacity: 0.85, fontWeight: 600 }}>• {locationShort}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Checkpoint Spotlight Box */}
      <div className="glass-panel" style={{
        padding: '32px',
        borderRadius: '24px',
        border: '1px solid rgba(0, 245, 212, 0.2)',
        background: 'rgba(10, 15, 26, 0.85)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow Accent */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(0, 245, 212, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Top Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: '2px solid #00F5D4',
              background: 'rgba(0, 245, 212, 0.15)',
              color: '#00F5D4',
              fontWeight: 900,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              D{selectedCheckpoint.day_number}
            </div>
            <div>
              <span style={{ color: '#00F5D4', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                CHECKPOINT #{selectedCheckpoint.day_number}
              </span>
              <h3 style={{ fontSize: '1.55rem', fontWeight: 900, color: '#F8FAFC', margin: 0, fontFamily: "'Outfit', sans-serif" }}>
                {selectedCheckpoint.title}
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'rgba(0, 245, 212, 0.15)',
              border: '1px solid rgba(0, 245, 212, 0.3)',
              color: '#00F5D4',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <MapPin size={14} /> {selectedCheckpoint.location_name}
            </div>
            {selectedCheckpoint.altitude && (
              <div style={{
                background: 'rgba(157, 78, 221, 0.18)',
                border: '1px solid rgba(157, 78, 221, 0.35)',
                color: '#C77DFF',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Mountain size={14} /> {selectedCheckpoint.altitude}
              </div>
            )}
          </div>
        </div>

        {/* Card Main Content Grid: Left Column (Image & Spotlights) + Right Column (Overview & Activities) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Snapshot Image */}
            <div style={{
              position: 'relative',
              height: '240px',
              borderRadius: '18px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <img 
                src={selectedCheckpoint.image_url || "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800"} 
                alt={selectedCheckpoint.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '14px 18px',
                background: 'linear-gradient(to top, rgba(9, 12, 16, 0.95), transparent)',
                fontSize: '0.85rem',
                color: '#FFFFFF',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                📸 Checkpoint Snapshot
              </div>
            </div>

            {/* Insta Photo Checkpoint Callout */}
            {selectedCheckpoint.insta_spot && (
              <div style={{
                background: 'rgba(255, 0, 127, 0.08)',
                border: '1px solid rgba(255, 0, 127, 0.25)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}>
                <div style={{
                  background: 'rgba(255, 0, 127, 0.15)',
                  padding: '8px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Camera size={20} color="#FF007F" />
                </div>
                <div>
                  <div style={{ color: '#FF007F', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    INSTA PHOTO CHECKPOINT
                  </div>
                  <div style={{ color: '#F8FAFC', fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.4 }}>
                    {selectedCheckpoint.insta_spot}
                  </div>
                </div>
              </div>
            )}

            {/* Local Vibe Highlight Callout */}
            {selectedCheckpoint.vibe_highlight && (
              <div style={{
                background: 'rgba(0, 245, 212, 0.08)',
                border: '1px solid rgba(0, 245, 212, 0.25)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}>
                <div style={{
                  background: 'rgba(0, 245, 212, 0.15)',
                  padding: '8px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Flame size={20} color="#00F5D4" />
                </div>
                <div>
                  <div style={{ color: '#00F5D4', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    LOCAL VIBE HIGHLIGHT
                  </div>
                  <div style={{ color: '#F8FAFC', fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.4 }}>
                    {selectedCheckpoint.vibe_highlight}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Description Overview & Included Activities */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '12px' }}>
                Day Experience Overview
              </h4>
              <p style={{ color: '#94A3B8', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '28px' }}>
                {selectedCheckpoint.description}
              </p>

              {/* Activities Checklist */}
              {selectedCheckpoint.activities && selectedCheckpoint.activities.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#00F5D4', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.05em' }}>
                    INCLUDED DAY ACTIVITIES
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedCheckpoint.activities.map((act, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: '#E2E8F0', fontWeight: 700 }}>
                        <CheckCircle size={18} color="#00F5D4" style={{ flexShrink: 0 }} />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Checkpoint Step Footer */}
            <div style={{
              marginTop: '32px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>
                Step {activeDay} of {checkpoints.length} Checkpoints
              </span>

              {activeDay < checkpoints.length ? (
                <button
                  onClick={() => setActiveDay(activeDay + 1)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#00F5D4',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'color 0.2s ease'
                  }}
                >
                  Next Checkpoint (Day {activeDay + 1}) →
                </button>
              ) : (
                <span style={{ fontSize: '0.85rem', color: '#00F5D4', fontWeight: 700 }}>Final Expedition Checkpoint ✨</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckpointTimeline;

