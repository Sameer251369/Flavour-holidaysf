import React, { useEffect, useState } from 'react';
import { Quote, Star } from 'lucide-react';
import { fetchTestimonials } from '../services/api';

const Testimonials = () => {
  const [reviews, setReviews] = useState([
    {
      client_name: 'Vikas Rana & Family',
      trip_type: 'Honeymoon Special',
      rating: 5,
      comment: 'People are wonderful in Kashmir. Flavour Holidays arranged our complete honeymoon trip, and every place and hotel was superb.',
      avatar_url: 'https://flavourholidays.com/wp-content/uploads/2026/08/ava1.jpg'
    },
    {
      client_name: 'Rohan & Squad',
      trip_type: 'Offbeat Gurez Expedition',
      rating: 5,
      comment: 'Gurez Valley was unreal. The Razdan Pass crossing in a 4x4 arranged by Flavour Holidays felt beautifully managed from start to finish.',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'
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
    <section className="section testimonials-section">
      <div className="section-heading section-heading--center">
        <span className="eyebrow">Guest Notes</span>
        <h2>Travelers remember the details.</h2>
      </div>

      <div className="testimonial-grid">
        {reviews.map((rev, idx) => (
          <article key={idx} className="testimonial-card">
            <Quote size={34} />

            <div className="stars">
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} size={17} fill="currentColor" />
              ))}
            </div>

            <p>{rev.comment}</p>

            <div className="testimonial-card__guest">
              <img
                src={rev.avatar_url || rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'}
                alt={rev.client_name || rev.name}
              />
              <div>
                <strong>{rev.client_name || rev.name}</strong>
                <span>{rev.trip_type || rev.trip}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
