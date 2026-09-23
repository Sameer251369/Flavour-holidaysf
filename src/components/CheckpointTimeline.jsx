import React, { useState } from 'react';
import { Camera, CheckCircle, MapPin, Mountain } from 'lucide-react';

const CheckpointTimeline = ({ checkpoints }) => {
  const [activeDay, setActiveDay] = useState(1);

  if (!checkpoints || checkpoints.length === 0) {
    return <div className="empty-state">Loading checkpoint itinerary...</div>;
  }

  const selectedCheckpoint = checkpoints.find(c => c.day_number === activeDay) || checkpoints[0];

  return (
    <div className="checkpoint-view">
      <div className="day-tabs" aria-label="Itinerary days">
        {checkpoints.map((cp) => {
          const isActive = activeDay === cp.day_number;
          const locationShort = cp.location_name ? cp.location_name.split(',')[0] : '';
          return (
            <button
              key={cp.day_number}
              onClick={() => setActiveDay(cp.day_number)}
              className={`day-tab${isActive ? ' day-tab--active' : ''}`}
              type="button"
            >
              <span>Day {cp.day_number}</span>
              {locationShort && <small>{locationShort}</small>}
            </button>
          );
        })}
      </div>

      <article className="checkpoint-card">
        <div className="checkpoint-card__media">
          <img
            src={selectedCheckpoint.image_url || 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=900'}
            alt={selectedCheckpoint.title}
          />
        </div>

        <div className="checkpoint-card__content">
          <div className="checkpoint-card__kicker">Checkpoint {selectedCheckpoint.day_number}</div>
          <h3>{selectedCheckpoint.title}</h3>

          <div className="mini-meta">
            <span><MapPin size={15} /> {selectedCheckpoint.location_name}</span>
            {selectedCheckpoint.altitude && <span><Mountain size={15} /> {selectedCheckpoint.altitude}</span>}
          </div>

          <p>{selectedCheckpoint.description}</p>

          <div className="checkpoint-notes">
            {selectedCheckpoint.insta_spot && (
              <div>
                <Camera size={17} />
                <span>{selectedCheckpoint.insta_spot}</span>
              </div>
            )}
            {selectedCheckpoint.vibe_highlight && (
              <div>
                <CheckCircle size={17} />
                <span>{selectedCheckpoint.vibe_highlight}</span>
              </div>
            )}
          </div>

          {selectedCheckpoint.activities && selectedCheckpoint.activities.length > 0 && (
            <div className="activity-list">
              <h4>Included that day</h4>
              {selectedCheckpoint.activities.map((act, idx) => (
                <span key={idx}>
                  <CheckCircle size={15} />
                  {act}
                </span>
              ))}
            </div>
          )}

          <div className="checkpoint-card__footer">
            <span>Step {activeDay} of {checkpoints.length}</span>
            {activeDay < checkpoints.length ? (
              <button type="button" className="text-button" onClick={() => setActiveDay(activeDay + 1)}>
                Next checkpoint
              </button>
            ) : (
              <strong>Final checkpoint</strong>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default CheckpointTimeline;
