import React, { useState } from 'react';
import { X, Sparkles, Send, PhoneCall, CheckCircle } from 'lucide-react';
import { submitInquiry } from '../services/api';

const InquiryModal = ({ prefillData, selectedTour, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travel_dates: '',
    travelers_count: prefillData?.travelers_count || 2,
    vehicle_preference: prefillData?.vehicle_preference || 'Thar 4WD',
    custom_notes: prefillData?.custom_notes || (selectedTour ? `Interested in booking ${selectedTour.title}` : '')
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      selected_tour: selectedTour ? selectedTour.id : null
    };

    const res = await submitInquiry(payload);
    setLoading(false);
    setSuccessMsg(res.message || "Thank you! Our Kashmir host will contact you shortly.");
  };

  return (
    <div className="inquiry-modal-overlay" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 3000,
      background: 'rgba(5, 8, 14, 0.9)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel inquiry-modal-panel" style={{
        width: '100%',
        maxWidth: '540px',
        padding: '36px',
        position: 'relative',
        border: '1px solid rgba(0, 245, 212, 0.3)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#FFF',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {successMsg ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0, 245, 212, 0.15)', border: '2px solid #00F5D4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={36} color="#00F5D4" />
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '12px' }}>PACK YOUR BAGS! 🎉</h3>
            <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.5, marginBottom: '28px' }}>
              {successMsg}
            </p>
            <button onClick={onClose} className="btn-primary" style={{ padding: '12px 30px' }}>
              Back to Exploration
            </button>
          </div>
        ) : (
          <div>
            <div className="badge-neon" style={{ marginBottom: '12px' }}>
              <Sparkles size={14} /> INSTANT ITINERARY QUOTE
            </div>

            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '6px' }}>
              PLAN YOUR <span style={{ color: '#00F5D4' }}>TRIP.</span>
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '24px' }}>
              {selectedTour ? `Booking request for ${selectedTour.title}` : 'Drop your details for a custom Kashmir & Ladakh quote.'}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>FULL NAME</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#FFF',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>PHONE / WHATSAPP</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#FFF',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>EMAIL</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#FFF',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>EST. TRAVEL DATES</label>
                  <input 
                    type="text" 
                    name="travel_dates"
                    placeholder="e.g. Next Month / Dec 2026"
                    value={formData.travel_dates}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#FFF',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>TRAVELERS</label>
                  <input 
                    type="number" 
                    name="travelers_count"
                    min="1"
                    value={formData.travelers_count}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#FFF',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>SPECIAL NOTES / PREFERENCES</label>
                <textarea 
                  name="custom_notes"
                  rows="3"
                  placeholder="Need snow Thar 4x4? Gondola Phase 2 tickets? Luxury Houseboat?"
                  value={formData.custom_notes}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#FFF',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '14px' }}
              >
                {loading ? 'Submitting Request...' : (
                  <>
                    <Send size={16} /> Submit Instant Request
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryModal;
