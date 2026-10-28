import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const duration = formatDuration(tour);

  return (
    <article id={anchorId || undefined} className="tours-rail__item">
      <button
        type="button"
        onClick={() => onSelectTour(tour)}
        aria-label={`View itinerary: ${tour.title}`}
        className="tour-tile"
      >
        <img
          src={media.src}
          alt={media.alt}
          loading="lazy"
          className="tour-tile__media"
        />
        <span className="tour-tile__scrim" aria-hidden="true" />

        {duration && <span className="tour-tile__duration">{duration}</span>}

        <span className="tour-tile__body">
          <span className="tour-tile__title">{tour.title}</span>
          <span className="tour-tile__price">
            Starting price <strong>₹{formatPrice(tour.starting_price)}</strong>
          </span>
        </span>
      </button>
    </article>
  );
};

const TourExplorer = ({
  tours = [],
  featuredTour,
  onSelectTour,
  selectedFilter = 'ALL',
  onFilterChange = () => {},
  searchSummary = '',
  hasActiveSearch = false,
  toursLoading = false,
  onClearSearch = () => {}
}) => {
  const scrollRef = useRef(null);
  const [bar, setBar] = useState({ left: 0, width: 100, canScroll: false });

  const destinationNames = useMemo(
    () => Array.from(new Set(tours.map((tour) => tour.destination_name).filter(Boolean))),
    [tours]
  );
  const vibeNames = useMemo(
    () => Array.from(new Set(tours.map((tour) => tour.vibe_tag).filter(Boolean))),
    [tours]
  );

  const filterOptions = useMemo(
    () => [
      { label: 'All routes', value: 'ALL' },
      ...destinationNames.map((name) => ({ label: getDestinationLabel(name), value: name })),
      ...vibeNames.map((vibe) => ({ label: vibe.replace('#', ''), value: vibe }))
    ],
    [destinationNames, vibeNames]
  );

  const filteredTours = tours.filter((tour) => {
    if (selectedFilter === 'ALL') return true;
    return tour.destination_name === selectedFilter || tour.vibe_tag === selectedFilter;
  });

  const hasNoTours = tours.length === 0;
  const hasNoFilterMatches = !hasNoTours && filteredTours.length === 0;
  const visibleFeaturedTour =
    filteredTours.find((tour) => tour.id === featuredTour?.id) ||
    filteredTours.find((tour) => tour.is_featured) ||
    filteredTours[0];

  const bannerMedia = visibleFeaturedTour ? getTourMedia(visibleFeaturedTour) : null;
  const activeOption = filterOptions.find((option) => option.value === selectedFilter);
  const bannerTitle =
    selectedFilter === 'ALL' || !activeOption ? 'Popular Tours' : activeOption.label;

  const bannerAction = hasActiveSearch
    ? { label: 'Show all routes', onClick: onClearSearch }
    : selectedFilter !== 'ALL'
      ? { label: 'Show all routes', onClick: () => onFilterChange('ALL') }
      : visibleFeaturedTour
        ? { label: 'View route details', onClick: () => onSelectTour(visibleFeaturedTour) }
        : null;

  const assignedAnchors = new Set();
  const cardAnchors = filteredTours.map((tour) => {
    const anchor = getDestinationAnchor(tour.destination_name);
    if (assignedAnchors.has(anchor)) return '';
    assignedAnchors.add(anchor);
    return anchor;
  });

  const updateBar = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    const canScroll = element.scrollWidth - element.clientWidth > 8;
    if (!canScroll) {
      setBar({ left: 0, width: 100, canScroll: false });
      return;
    }

    setBar({
      left: (element.scrollLeft / element.scrollWidth) * 100,
      width: (element.clientWidth / element.scrollWidth) * 100,
      canScroll: true
    });
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollTo({ left: 0, behavior: 'auto' });

    updateBar();
    window.addEventListener('resize', updateBar);
    return () => window.removeEventListener('resize', updateBar);
  }, [updateBar, filteredTours.length]);

  const scrollByCards = (direction) => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * 0.85, behavior: 'smooth' });
  };

  const isInitialLoading = toursLoading && hasNoTours;

  const emptyMessage = hasNoTours
    ? (hasActiveSearch
      ? 'No tours matched those dates. Clear the search to browse every route again.'
      : 'No tours are available right now. Please check back soon or ask our team to plan a route.')
    : 'No tours match this destination yet.';

  return (
    <section id="tours" className="page-shell tours-section" aria-label="Tour packages">
      {filterOptions.length > 1 && (
        <div className="tours-toolbar">
          <div className="tours-filters" role="group" aria-label="Filter tours by destination or route style">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onFilterChange(option.value)}
                aria-pressed={selectedFilter === option.value}
                className="tours-filter"
              >
                {option.label}
              </button>
            ))}
          </div>

          <p className="tours-count">
            {filteredTours.length} of {tours.length} {tours.length === 1 ? 'route' : 'routes'}
          </p>
        </div>
      )}

      {hasActiveSearch && searchSummary && (
        <div className="tours-status" role="status" aria-live="polite">
          <p>{searchSummary}</p>
          <button type="button" onClick={onClearSearch}>
            Clear date search
          </button>
        </div>
      )}

      {hasNoTours || hasNoFilterMatches ? (
        <div className="tours-empty" role={isInitialLoading ? 'status' : undefined}>
          <p>{isInitialLoading ? 'Loading current routes from our Srinagar team…' : emptyMessage}</p>
          {!isInitialLoading && (
            <button
              type="button"
              onClick={hasNoTours && hasActiveSearch ? onClearSearch : () => onFilterChange('ALL')}
            >
              {hasNoTours && hasActiveSearch ? 'Show all tours' : 'Clear filters'}
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="tours-banner">
            {bannerMedia && (
              <img
                src={bannerMedia.src}
                alt={bannerMedia.alt}
                className="tours-banner__media"
              />
            )}
            <div className="tours-banner__scrim" aria-hidden="true" />

            <div className="tours-banner__content">
              <h2 className="tours-banner__title">{bannerTitle}</h2>
              <p className="tours-banner__subtitle">
                Handpicked routes across Kashmir, Kargil and Ladakh with transport,
                permits and stays arranged by our local team.
              </p>
              {bannerAction && (
                <button
                  type="button"
                  onClick={bannerAction.onClick}
                  className="tours-banner__cta"
                >
                  {bannerAction.label}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div className="tours-rail-wrap">
            {bar.canScroll && (
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Scroll tours left"
                className="tours-rail__nav tours-rail__nav--prev"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
            )}

            <div
              ref={scrollRef}
              onScroll={updateBar}
              className="tours-rail"
            >
              {filteredTours.map((tour, index) => (
                <PackageCard
                  key={tour.id}
                  tour={tour}
                  onSelectTour={onSelectTour}
                  anchorId={cardAnchors[index]}
                />
              ))}
            </div>

            {bar.canScroll && (
              <>
                <button
                  type="button"
                  onClick={() => scrollByCards(1)}
                  aria-label="Scroll tours right"
                  className="tours-rail__nav tours-rail__nav--next"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>

                <div className="tours-rail__progress" aria-hidden="true">
                  <span style={{ width: `${bar.width}%`, marginLeft: `${bar.left}%` }} />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default TourExplorer;
