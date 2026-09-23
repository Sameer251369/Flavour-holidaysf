import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronDown, MapPin, Pause, Play, Users } from 'lucide-react';

const HERO_VIDEO_URL = 'https://kombai-assets.b-cdn.net/generated_assets/93ec2c35-0d4c-4209-9d28-b2a8c59d8080/031636d4907d49df8fa69207bf34f191.mp4';
const HERO_POSTER_URL = 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=2000&auto=format&fit=crop';

const prefersReducedMotion = () => (
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

const formatDateInput = (date) => date.toISOString().slice(0, 10);

const getInitialDateRange = () => {
  const checkInDate = new Date();
  checkInDate.setDate(checkInDate.getDate() + 14);

  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + 5);

  return {
    checkIn: formatDateInput(checkInDate),
    checkOut: formatDateInput(checkOutDate)
  };
};

const Hero = ({
  tours,
  toursLoading = false,
  toursError = '',
  onBookingSearch,
  bookingSearchLoading,
  bookingSearchError = ''
}) => {
  const initialDateRange = getInitialDateRange();
  const [selectedTourId, setSelectedTourId] = useState('');
  const [checkIn, setCheckIn] = useState(initialDateRange.checkIn);
  const [checkOut, setCheckOut] = useState(initialDateRange.checkOut);
  const [people, setPeople] = useState(2);
  const [videoPaused, setVideoPaused] = useState(prefersReducedMotion);
  const [routeFormExpanded, setRouteFormExpanded] = useState(false);
  const videoRef = useRef(null);

  const activeTourId = selectedTourId || tours[0]?.id || '';
  const hasTours = tours.length > 0;
  const isSearching = toursLoading || bookingSearchLoading;
  const canSearch = hasTours && !toursLoading && !toursError && !bookingSearchLoading && Boolean(activeTourId);

  useEffect(() => {
    if (prefersReducedMotion()) {
      videoRef.current?.pause();
      setVideoPaused(true);
    }
  }, []);

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion()) return;

    if (video.paused) {
      try {
        await video.play();
        setVideoPaused(false);
      } catch {
        setVideoPaused(true);
      }
      return;
    }

    video.pause();
    setVideoPaused(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSearch || !checkIn || !checkOut) return;

    onBookingSearch({
      selected_tour: Number(activeTourId),
      check_in: checkIn,
      check_out: checkOut,
      people: Number(people)
    });
  };

  const bookingStatus = toursLoading
    ? 'Loading tour options...'
    : toursError || (!hasTours ? 'Tour options are temporarily unavailable. Please try again.' : '')
      || bookingSearchError
      || (bookingSearchLoading ? 'Searching available routes...' : 'Choose dates and travelers to see matching routes.');
  const hasBookingError = Boolean(toursError || bookingSearchError || (!toursLoading && !hasTours));

  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay={!prefersReducedMotion()}
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER_URL}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="hero-media__scrim" />
      </div>

      <div className="hero-content-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-eyebrow">Private Kashmir journeys</span>
            <h1 id="hero-title">Travel the Himalayas with quiet confidence.</h1>
            <p className="hero-copy__description">
              Handcrafted itineraries across Kashmir Valley, Gurez and Ladakh with local planning, thoughtful stays and mountain-ready transport.
            </p>
          </div>

          <form className={`hero-search-card${routeFormExpanded ? ' hero-search-card--expanded' : ''}`} onSubmit={handleSubmit} aria-busy={isSearching}>
            <div className="hero-search-card__header">
              <button
                className="hero-search-card__toggle"
                type="button"
                onClick={() => setRouteFormExpanded((isExpanded) => !isExpanded)}
                aria-expanded={routeFormExpanded}
                aria-controls="hero-search-fields"
              >
                <span>
                  <span className="hero-search-card__title">Plan your route</span>
                  <span className="hero-search-card__subtitle">Build a route around your dates and crew.</span>
                </span>
                <ChevronDown className="hero-search-card__toggle-icon" size={18} aria-hidden="true" />
              </button>
              <p className={`hero-search-card__status${hasBookingError ? ' hero-form-status--error' : ''}`} role="status" aria-live="polite">
                {bookingStatus}
              </p>
            </div>

            <div className="hero-search-fields" id="hero-search-fields">
              <div className="hero-search-col">
                <label className="hero-search-label" htmlFor="hero-tour">Tour</label>
                <div className="hero-search-control">
                  <MapPin size={16} aria-hidden="true" />
                  <select
                    id="hero-tour"
                    name="selected_tour"
                    value={activeTourId}
                    onChange={(event) => setSelectedTourId(event.target.value)}
                    required
                    disabled={!hasTours || toursLoading || Boolean(toursError)}
                  >
                    <option value="" disabled>Select a tour</option>
                    {tours.reduce((unique, tour) => {
                      const label = tour.destination_name || tour.title;
                      if (!unique.some(t => (t.destination_name || t.title) === label)) {
                        unique.push(tour);
                      }
                      return unique;
                    }, []).map((tour) => (
                      <option key={tour.id} value={tour.id}>
                        {tour.destination_name ? `${tour.destination_name} - ${tour.title}` : tour.title}
                      </option>
                    ))}
                  </select>

                </div>
              </div>

              <div className="hero-search-col">
                <label className="hero-search-label" htmlFor="hero-check-in">Check-in</label>
                <div className="hero-search-control">
                  <Calendar size={16} aria-hidden="true" />
                  <input
                    id="hero-check-in"
                    name="check_in"
                    type="date"
                    value={checkIn}
                    onChange={(event) => setCheckIn(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="hero-search-col">
                <label className="hero-search-label" htmlFor="hero-check-out">Check-out</label>
                <div className="hero-search-control">
                  <Calendar size={16} aria-hidden="true" />
                  <input
                    id="hero-check-out"
                    name="check_out"
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(event) => setCheckOut(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="hero-search-col">
                <label className="hero-search-label" htmlFor="hero-people">People</label>
                <div className="hero-search-control">
                  <Users size={16} aria-hidden="true" />
                  <input
                    id="hero-people"
                    name="people"
                    type="number"
                    min="1"
                    max="50"
                    value={people}
                    onChange={(event) => setPeople(event.target.value)}
                    required
                  />
                  <ChevronDown size={14} aria-hidden="true" />
                </div>
              </div>

              <button className="hero-search-action" type="submit" disabled={!canSearch}>
                {bookingSearchLoading ? 'Searching routes...' : 'Find available tours'}
              </button>
            </div>

            <p id="hero-booking-status" className={`hero-form-status${hasBookingError ? ' hero-form-status--error' : ''}`} aria-live="polite">
              {bookingStatus}
            </p>
          </form>
        </div>
      </div>

      <button
        className="hero-video-toggle"
        type="button"
        onClick={toggleVideo}
        aria-label={videoPaused ? 'Play background motion' : 'Pause background motion'}
        aria-pressed={videoPaused}
        disabled={prefersReducedMotion()}
      >
        {videoPaused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
        <span>{videoPaused ? 'Play background' : 'Pause background'}</span>
      </button>
    </section>
  );
};

export default Hero;
