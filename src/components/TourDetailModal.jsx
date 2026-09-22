import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Check, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import CheckpointTimeline from './CheckpointTimeline';
import { fetchTourBySlug } from '../services/api';

const TourDetailModal = ({ tour, onClose, onBookNow }) => {
  const [activeTab, setActiveTab] = useState('checkpoints');
  const [tourDetails, setTourDetails] = useState(tour);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTourDetails(tour);

    if (tour && tour.slug && (!tour.checkpoints || tour.checkpoints.length === 0)) {
      setLoading(true);
      fetchTourBySlug(tour.slug).then(data => {
        if (data) {
          setTourDetails(data);
        }
        setLoading(false);
      }).catch(err => {
        console.error("Error fetching detail:", err);
        setLoading(false);
      });
    }
  }, [tour]);

  if (!tour) return null;

  const displayTour = tourDetails || tour;

  return (
    <div className="tour-detail-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2000,
      background: 'rgba(5, 8, 14, 0.88)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel tour-detail-panel" style={{
        width: '100%',
        maxWidth: '1050px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        padding: '36px',
        border: '1px solid rgba(0, 245, 212, 0.25)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
        background: '#090C10',
        borderRadius: '28px'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#FFF',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span className="badge-neon">{displayTour.destination_name}</span>
            <span className="badge-pink">{displayTour.vibe_tag}</span>
            <span className="badge-purple">{displayTour.duration_days} Days / {displayTour.duration_nights} Nights</span>
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#F8FAFC', marginBottom: '6px', fontFamily: "'Outfit', sans-serif" }}>
            {displayTour.title}
          </h2>
          <p style={{ color: '#00F5D4', fontSize: '1.05rem', fontWeight: 700 }}>
            {displayTour.tagline}
          </p>
        </div>

        {/* Tabs Bar */}
        <div style={{ display: 'flex', gap: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('checkpoints')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === 'checkpoints' ? '#00F5D4' : '#94A3B8',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              borderBottom: activeTab === 'checkpoints' ? '2px solid #00F5D4' : '2px solid transparent',
              paddingBottom: '8px'
            }}
          >
            🗺️ Checkpoint Itinerary ({displayTour.checkpoints ? displayTour.checkpoints.length : 0})
          </button>

          <button
            onClick={() => setActiveTab('inclusions')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === 'inclusions' ? '#00F5D4' : '#94A3B8',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              borderBottom: activeTab === 'inclusions' ? '2px solid #00F5D4' : '2px solid transparent',
              paddingBottom: '8px'
            }}
          >
            ✅ Inclusions & VIP Perks
          </button>
        </div>

        {/* Tab 1: Interactive Checkpoints */}
        {activeTab === 'checkpoints' && (
          loading ? (
            <div style={{ color: '#94A3B8', padding: '40px 0', textAlign: 'center' }}>
              Fetching high-altitude checkpoints...
            </div>
          ) : (
            <CheckpointTimeline tourTitle={displayTour.title} checkpoints={displayTour.checkpoints} />
          )
        )}

        {/* Tab 2: Inclusions & Exclusions */}
        {activeTab === 'inclusions' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', padding: '16px 0' }}>
            <div style={{ background: 'rgba(0, 245, 212, 0.05)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(0, 245, 212, 0.2)' }}>
              <h4 style={{ color: '#00F5D4', fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={18} /> What's Included in Your Trip
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {displayTour.inclusions && displayTour.inclusions.map((inc, idx) => (
                  <li key={idx} style={{ fontSize: '0.92rem', color: '#E2E8F0', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#00F5D4', fontWeight: 900 }}>•</span> {inc}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h4 style={{ color: '#94A3B8', fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px' }}>
                Exclusions (Personal Add-ons)
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {displayTour.exclusions && displayTour.exclusions.map((exc, idx) => (
                  <li key={idx} style={{ fontSize: '0.92rem', color: '#94A3B8', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#FF007F' }}>✕</span> {exc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Booking Sticky Footer */}
        <div style={{
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>All-Inclusive Starting Price</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00F5D4' }}>
              ₹{displayTour.starting_price.toLocaleString('en-IN')} <span style={{ fontSize: '0.9rem', color: '#94A3B8', fontWeight: 500 }}>/ person</span>
            </div>
          </div>

          <button 
            onClick={() => {
              onClose();
              onBookNow(displayTour);
            }} 
            className="btn-primary"
            style={{ padding: '14px 36px', fontSize: '1.05rem' }}
          >
            <Sparkles size={18} /> Book This Itinerary Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetailModal;
