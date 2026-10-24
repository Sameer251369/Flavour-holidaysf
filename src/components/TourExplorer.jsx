import React, { useMemo } from 'react';
import { ArrowRight, CalendarDays, MapPin, Route } from 'lucide-react';
import { getDestinationAnchor, getDestinationLabel, getTourMedia } from '../utils/destinations';

const formatDuration = (tour) => {
  if (tour.duration_days && tour.duration_nights) {
    return `${tour.duration_days}D/${tour.duration_nights}N`;
  }
  if (tour.duration_days) return `${tour.duration_days} days`;
  return '';
};

const formatPrice = (price) => Number(price || 0).toLocaleString('en-IN');

const PackageCard = ({ tour, onSelectTour, anchorId }) => {
  const media = getTourMedia(tour);

  return (
    <article className="package-card" id={anchorId}>
      <button
        className="package-card__image-button"
        type="button"
        onClick={() => onSelectTour(tour)}
        aria-label={`View itinerary: ${tour.title}`}
      >
        <img
          src={media.src}
          alt={media.alt}
          loading="lazy"
          style={{ width: '100%', height: '100%' }}
        />
        <span className="package-card__destination">{getDestinationLabel(tour.destination_name)}</span>
      </button>

      <div className="package-card__body">
        <div className="package-card__metadata">
          {formatDuration(tour) && <span>{formatDuration(tour)}</span>}
          {tour.difficulty && <span>{tour.difficulty}</span>}
        </div>

        <h3>{tour.title}</h3>

        <div className="package-card__route">
          <Route size={14} aria-hidden="true" />
          {tour.checkpoints?.length ? `${tour.checkpoints.length} route stops` : 'Route details available'}
        </div>

        <div className="package-card__footer">
          <p className="package-card__price">
            <strong>₹{formatPrice(tour.starting_price)}</strong>
            <span> / person</span>
          </p>
          <button
            className="package-card__action"
            type="button"
            onClick={() => onSelectTour(tour)}
          >
            View itinerary <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};

const FeaturedRouteBand = ({ tour, onSelectTour }) => {
  if (!tour) return null;

  const duration = formatDuration(tour);
  const media = getTourMedia(tour);

  return (
    <article className="featured-route-band" aria-label={`Featured route: ${tour.title}`}>
      <img
        className="featured-route-band__image"
        src={media.src}
        alt={media.alt}
        loading="lazy"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="featured-route-band__scrim" aria-hidden="true" />
      <div className="featured-route-band__content">
        <p>{getDestinationLabel(tour.destination_name)}{duration ? ` · ${duration}` : ''}</p>
        <h3>{tour.title}</h3>
        <div className="featured-route-band__details">
          {tour.checkpoints?.length > 0 && (
            <span><MapPin size={14} aria-hidden="true" /> {tour.checkpoints.length} route stops</span>
          )}
          {tour.starting_price > 0 && (
            <span><CalendarDays size={14} aria-hidden="true" /> From ₹{formatPrice(tour.starting_price)} per person</span>
          )}
        </div>
        <button className="featured-route-band__action" type="button" onClick={() => onSelectTour(tour)}>
          View itinerary <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

const TourExplorer = ({
  tours,
  featuredTour,
  onSelectTour,
  selectedFilter = 'ALL',
  onFilterChange = () => {},
  searchSummary = '',
  hasActiveSearch = false,
  onClearSearch = () => {}
}) => {

  const destinationNames = useMemo(
    () => Array.from(new Set(tours.map((tour) => tour.destination_name).filter(Boolean))),
    [tours]
  );

  const vibeNames = useMemo(
    () => Array.from(new Set(tours.map((tour) => tour.vibe_tag).filter(Boolean))),
    [tours]
  );

  const filterOptions = [
    { label: 'All routes', value: 'ALL' },
    ...destinationNames.map((name) => ({ label: getDestinationLabel(name), value: name })),
    ...vibeNames.map((vibe) => ({ label: vibe.replace('#', ''), value: vibe }))
  ];

  const filteredTours = tours.filter((tour) => {
    if (selectedFilter === 'ALL') return true;
    if (tour.destination_name === selectedFilter) return true;
    return tour.vibe_tag === selectedFilter;
  });

  const hasNoTours = tours.length === 0;
  const hasNoFilterMatches = !hasNoTours && filteredTours.length === 0;
  const visibleFeaturedTour = filteredTours.find((tour) => tour.id === featuredTour?.id)
    || filteredTours.find((tour) => tour.is_featured)
    || filteredTours[0];

  const assignedAnchors = new Set();
  const cardAnchors = filteredTours.map((tour) => {
    const anchor = getDestinationAnchor(tour.destination_name);
    if (assignedAnchors.has(anchor)) return '';
    assignedAnchors.add(anchor);
    return anchor;
  });

  return (
    <section id="tours" className="section tours-section">
      <div className="section-toolbar">
        <div className="section-heading">
          <h2>Popular tours across Kashmir, Kargil and Ladakh</h2>
          <p>Compare routes, trip lengths and starting prices before choosing an itinerary.</p>
        </div>

        <div className="toolbar-actions">
          {hasActiveSearch ? (
            <button
              type="button"
              onClick={onClearSearch}
              className="btn-outline btn-outline--light"
            >
              Show all tours <ArrowRight size={15} aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onFilterChange('ALL')}
              className="btn-outline btn-outline--light"
            >
              All destinations ({tours.length}) <ArrowRight size={15} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {hasActiveSearch && searchSummary && (
        <div className="search-result-banner" role="status" aria-live="polite">
          <p>{searchSummary}</p>
          <button type="button" className="text-button" onClick={onClearSearch}>
            Clear date search
          </button>
        </div>
      )}

      {filterOptions.length > 1 && (
        <div className="filter-tabs" aria-label="Filter tours by destination or route style">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onFilterChange(option.value)}
              className={`filter-chip${selectedFilter === option.value ? ' filter-chip--active' : ''}`}
              aria-pressed={selectedFilter === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {hasNoTours ? (
        <div className="package-empty-state">
          <p>
            {hasActiveSearch
              ? 'No tours matched those dates. Clear the search to browse every route again.'
              : 'No tours are available right now. Please check back soon or ask our team to plan a route.'}
          </p>
          {hasActiveSearch && (
            <button className="btn-outline" type="button" onClick={onClearSearch}>
              Show all tours
            </button>
          )}
        </div>
      ) : hasNoFilterMatches ? (
        <div className="package-empty-state">
          <p>No tours match this destination yet.</p>
          <button className="btn-outline" type="button" onClick={() => onFilterChange('ALL')}>
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="tour-grid">
            {filteredTours.map((tour, index) => (
              <PackageCard
                key={tour.id}
                tour={tour}
                onSelectTour={onSelectTour}
                anchorId={cardAnchors[index]}
              />
            ))}
          </div>

          <FeaturedRouteBand tour={visibleFeaturedTour} onSelectTour={onSelectTour} />
        </>
      )}
    </section>
  );
};

export default TourExplorer;
