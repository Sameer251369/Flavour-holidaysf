import React from 'react';
import { ArrowRight, Users } from 'lucide-react';

const VehiclesShowcase = ({ vehicles, onOpenInquiry }) => (
  <section id="fleet" className="section fleet-section">
    <div className="section-heading section-heading--center">
      <span className="eyebrow">Fleet</span>
      <h2>Vehicles chosen for mountain roads.</h2>
      <p>Comfortable highway cruisers, winter-capable 4x4s and group carriers for longer routes.</p>
    </div>

    <div className="card-grid">
      {vehicles && vehicles.map((v) => (
        <article key={v.id} className="content-card vehicle-card">
          <div className="vehicle-card__image">
            <img src={v.image_url} alt={v.name} />
            <span className="soft-badge">{v.badge}</span>
          </div>

          <div className="content-card__body">
            <h3>{v.name}</h3>
            <div className="meta-line">
              <span><Users size={14} /> {v.capacity_passengers}</span>
            </div>
            <p>{v.description}</p>

            <div className="card-action-row">
              <span>{v.terrain_type.split('&')[0]}</span>
              <button onClick={() => onOpenInquiry(null, v.name)} className="btn-outline btn-outline--light">
                Rent <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default VehiclesShowcase;
