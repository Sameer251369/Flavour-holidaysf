import React, { useState, useEffect } from 'react';
import { Star, Quote, Heart } from 'lucide-react';
import { fetchTestimonials } from '../services/api';

const Testimonials = () => {
  const [reviews, setReviews] = useState([
    {
      client_name: "Vikas Rana & Family",
      trip_type: "Honeymoon Special (Srinagar, Gulmarg & Pahalgam)",
      rating: 5,
      comment: "People are wonderful in Kashmir. We spoke to Flavour Holidays – and they arranged our total honeymoon trip in Jammu and Kashmir. Every place and Hotel was superb.",
      avatar_url: "https://flavourholidays.com/wp-content/uploads/2026/08/ava1.jpg"
    },
    {
      client_name: "Rohan & Squad",
      trip_type: "Offbeat Gurez & Razdan Pass 11.6k ft Expedition",
      rating: 5,
      comment: "Gurez Valley was unreal! Crossings at Razdan Pass in our Thar 4x4 arranged by Flavour Holidays felt like a movie scene. 100/10 experience!",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
    }
  ]);

  useEffect(() => {
    fetchTestimonials().then(data => {
      if (data && data.length > 0) {
        setReviews(data);
      }
    });
  }, []);

  return (
    <section className="support-section testimonials-section" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textBaseline: 'middle', marginBottom: '48px', textAlign: 'center' }}>
        <div className="badge-neon" style={{ marginBottom: '14px', display: 'inline-flex' }}>
          <Heart size={14} /> TRAVELER SATISFACTION
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, marginBottom: '12px' }}>
          WHAT OUR SQUAD <span style={{ color: '#00F5D4' }}>SAYS.</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        {reviews.map((rev, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <Quote size={40} color="rgba(0, 245, 212, 0.15)" style={{ position: 'absolute', top: '24px', right: '24px' }} />

            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} size={18} fill="#FFD166" color="#FFD166" />
              ))}
            </div>

            <p style={{ color: '#E2E8F0', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px', fontStyle: 'italic' }}>
              "{rev.comment}"
            </p>

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img 
                src={rev.avatar_url || rev.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"} 
                alt={rev.client_name || rev.name}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #00F5D4' }}
              />
              <div>
                <strong style={{ display: 'block', color: '#F8FAFC', fontSize: '1rem' }}>{rev.client_name || rev.name}</strong>
                <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>{rev.trip_type || rev.trip}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
