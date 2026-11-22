import React from 'react';
import { ArrowRight, Compass, MapPin, Sparkles } from 'lucide-react';

const TripBuilder = () => (
  <section id="customizer" className="section trip-builder-section">
    <div className="planner-panel">
      <div className="section-heading section-heading--center">
        <span className="eyebrow">Custom Planning</span>
        <h2>Build a Himalayan journey around you.</h2>
        <p>Choose your destinations, dates, stays and experiences in a few simple steps.</p>
      </div>
      <div className="section-cta-row">
        <a href="/customize-trip" className="btn-primary">
          <Compass size={18} /> Customize your trip <ArrowRight size={18} />
        </a>
      </div>
      <p className="estimate-note" style={{ textAlign: 'center' }}>
        <MapPin size={14} aria-hidden="true" /> &nbsp; Kashmir and Ladakh, planned by local travel experts. &nbsp;
        <Sparkles size={14} aria-hidden="true" /> Personalized quotes based on your preferences.
      </p>
    </div>
  </section>
);

export default TripBuilder;
