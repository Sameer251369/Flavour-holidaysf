import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
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
        if (data) setTourDetails(data);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, [tour]);

  if (!tour) return null;

  const displayTour = tourDetails || tour;

  return (
    <div className="modal-overlay tour-detail-overlay">
      <article className="modal-panel modal-panel--wide tour-detail-panel">
        <button className="modal-close" onClick={onClose} aria-label="Close tour details">
          <X size={18} />
        </button>

        <header className="tour-modal-header">
          <div className="tour-modal-header__badges">
            <span className="soft-badge">{displayTour.destination_name}</span>
            {displayTour.vibe_tag && <span className="soft-badge soft-badge--muted">{displayTour.vibe_tag.replace('#', '')}</span>}
            <span className="soft-badge soft-badge--muted">{displayTour.duration_days} Days / {displayTour.duration_nights} Nights</span>
          </div>

          <h2>{displayTour.title}</h2>
          <p>{displayTour.tagline}</p>
        </header>

        <div className="tab-bar">
          <button className={activeTab === 'checkpoints' ? 'active' : ''} onClick={() => setActiveTab('checkpoints')} type="button">
            Checkpoint Itinerary ({displayTour.checkpoints ? displayTour.checkpoints.length : 0})
          </button>
          <button className={activeTab === 'inclusions' ? 'active' : ''} onClick={() => setActiveTab('inclusions')} type="button">
            Inclusions
          </button>
        </div>

        {activeTab === 'checkpoints' && (
          loading ? (
            <div className="empty-state">Fetching checkpoints...</div>
          ) : (
            <CheckpointTimeline checkpoints={displayTour.checkpoints} />
          )
        )}

        {activeTab === 'inclusions' && (
          <div className="inclusion-grid">
            <div className="inclusion-card">
              <h4>Included</h4>
              <ul>
                {displayTour.inclusions && displayTour.inclusions.map((inc, idx) => (
                  <li key={idx}><Check size={16} /> {inc}</li>
                ))}
              </ul>
            </div>

            <div className="inclusion-card inclusion-card--muted">
              <h4>Not Included</h4>
              <ul>
                {displayTour.exclusions && displayTour.exclusions.map((exc, idx) => (
                  <li key={idx}><X size={16} /> {exc}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <footer className="booking-footer">
          <div>
            <span>Starting from</span>
            <strong>₹{displayTour.starting_price.toLocaleString('en-IN')} <small>/ person</small></strong>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookNow(displayTour);
            }}
            className="btn-primary"
          >
            Book this itinerary
          </button>
        </footer>
      </article>
    </div>
  );
};

export default TourDetailModal;
