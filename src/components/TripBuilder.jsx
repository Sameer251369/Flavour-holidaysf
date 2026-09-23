import React, { useState } from 'react';
import { ArrowRight, Car, CheckCircle, Users } from 'lucide-react';

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
      custom_notes: `Custom Plan: ${days} days in ${destination} with ${vehicle} for ${travelers} travelers (${vibe}). Estimated price: ₹${estimatedPricePerPerson}/person.`,
      travelers_count: travelers,
      vehicle_preference: vehicle
    });
  };

  return (
    <section id="customizer" className="section trip-builder-section">
      <div className="planner-panel">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">Custom Planning</span>
          <h2>Shape a private Himalayan route.</h2>
          <p>Choose destination, vehicle, duration and group size. The estimate updates instantly.</p>
        </div>

        <div className="planner-grid">
          <div className="planner-controls">
            <div className="field-group">
              <label>Destination</label>
              <div className="segmented-options">
                {['Kashmir', 'Gurez', 'Ladakh'].map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setDestination(dest)}
                    className={`option-tile${destination === dest ? ' option-tile--active' : ''}`}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label>Vehicle</label>
              <div className="segmented-options">
                {[
                  { name: 'Thar 4WD', desc: 'Snow passes' },
                  { name: 'Crysta', desc: 'Comfort drives' },
                  { name: 'Tempo', desc: 'Group travel' }
                ].map((v) => (
                  <button
                    key={v.name}
                    type="button"
                    onClick={() => setVehicle(v.name)}
                    className={`option-tile option-tile--stacked${vehicle === v.name ? ' option-tile--active' : ''}`}
                  >
                    <strong>{v.name}</strong>
                    <span>{v.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="range-grid">
              <div className="field-group">
                <label>
                  Duration <strong>{days} days</strong>
                </label>
                <input 
                  type="range" 
                  min="3" 
                  max="10" 
                  value={days} 
                  onChange={(e) => setDays(Number(e.target.value))}
                />
              </div>

              <div className="field-group">
                <label>
                  Travelers <strong>{travelers} guests</strong>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="16" 
                  value={travelers} 
                  onChange={(e) => setTravelers(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="proposal-card">
            <div>
              <span className="eyebrow">Estimate</span>
              <h3>
                {days}-Day {destination} {vehicle} Custom Tour
              </h3>

              <div className="proposal-list">
                <div>
                  <CheckCircle size={16} />
                  Customized Checkpoint Itinerary for {destination}
                </div>
                <div>
                  <Car size={16} />
                  Dedicated {vehicle} Vehicle + Mountain Driver
                </div>
                <div>
                  <Users size={16} />
                  Permits and ticket booking assistance
                </div>
              </div>
            </div>

            <div>
              <div className="price-row">
                <div>
                  <span>Per person</span>
                  <strong>₹{estimatedPricePerPerson.toLocaleString('en-IN')}</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>₹{totalPrice.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <button 
                onClick={handleCustomSubmit} 
                className="btn-primary"
              >
                Request quote <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripBuilder;
