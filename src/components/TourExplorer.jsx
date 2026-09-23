import React, { useState, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Route } from 'lucide-react';

const TourExplorer = ({ tours, onSelectTour }) => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Extract unique destination names from loaded tours
  const destinationNames = Array.from(
    new Set(tours.map(t => t.destination_name).filter(Boolean))
  );

  const filterOptions = [
    { label: 'All Destinations', value: 'ALL' },
    ...destinationNames.map(name => ({
      label: name,
      value: name
    })),
    { label: 'Snow routes', value: '#SnowVibes' },
    { label: 'Offbeat valleys', value: '#OffbeatGenZ' },
    { label: 'High altitude', value: '#ThrillSeeker' }
  ];

  const filteredTours = tours.filter(tour => {
    if (selectedFilter === 'ALL') return true;
    if (tour.destination_name === selectedFilter) return true;
    if (tour.vibe_tag === selectedFilter) return true;
    if (tour.title.toLowerCase().includes(selectedFilter.toLowerCase())) return true;
    return false;
  });

  const displayTours = filteredTours.length > 0 ? filteredTours : tours;

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : displayTours.length - 1));
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
    setCurrentIndex(prev => (prev + 1 < displayTours.length ? prev + 1 : 0));
  };

  return (
    <section id="tours" className="section tours-section">
      <div className="section-toolbar">
        <div className="section-heading">
          <span className="eyebrow">Routes &amp; Stays</span>
          <h2>Curated Kashmir, Gurez and Ladakh journeys.</h2>
        </div>

        <div className="toolbar-actions">
          <button 
            onClick={() => setSelectedFilter('ALL')}
            className="btn-outline btn-outline--light"
          >
            All destinations ({tours.length})
            <ArrowUpRight size={16} />
          </button>

          <div className="icon-button-group">
            <button className="icon-button" onClick={scrollLeft} aria-label="Previous tour">
              <ChevronLeft size={20} />
            </button>
            <button className="icon-button" onClick={scrollRight} aria-label="Next tour">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="filter-tabs">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSelectedFilter(opt.value)}
            className={`filter-chip${selectedFilter === opt.value ? ' filter-chip--active' : ''}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div ref={sliderRef} className="tour-carousel">
        {displayTours.map((tour) => (
          <div 
            key={tour.id} 
            onClick={() => onSelectTour(tour)}
            className="tour-card"
          >
            <img 
              src={tour.cover_image || "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800"} 
              alt={tour.title}
            />

            <div className="tour-card__open">
              <ArrowUpRight size={20} />
            </div>

            <div className="tour-card__badges">
              <span className="soft-badge">
                {tour.destination_name || 'Himalayas'}
              </span>
              {tour.vibe_tag && <span className="soft-badge soft-badge--muted">{tour.vibe_tag.replace('#', '')}</span>}
            </div>

            <div className="tour-card__body">
              <h3>{tour.title}</h3>
              
              <div className="tour-card__meta">
                <div>
                  <span>From</span>
                  <strong>₹{tour.starting_price.toLocaleString('en-IN')}</strong>
                </div>
                <div className="tour-card__route">
                  <Route size={16} />
                  {tour.checkpoints ? tour.checkpoints.length : 6} stops
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-footer-row">
        <div className="result-note">
          Showing <strong>{displayTours.length}</strong> routes {selectedFilter !== 'ALL' && `for ${selectedFilter.replace('#', '')}`}
        </div>

        <div className="pager-actions">
          <button className="text-button" onClick={scrollLeft}>
            <ChevronLeft size={18} /> Previous
          </button>
          <button className="text-button" onClick={scrollRight}>
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TourExplorer;
