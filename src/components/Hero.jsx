import React, { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, Pause, Play, Users } from 'lucide-react';
import { getPrimaryToursByDestination } from '../utils/destinations';

const HERO_VIDEO_URL = 'https://kombai-assets.b-cdn.net/generated_assets/93ec2c35-0d4c-4209-9d28-b2a8c59d8080/031636d4907d49df8fa69207bf34f191.mp4';
const HERO_POSTER_FALLBACK = 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=2000&auto=format&fit=crop';

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
  const primaryTours = getPrimaryToursByDestination(tours);
  const [checkIn, setCheckIn] = useState(initialDateRange.checkIn);
  const [checkOut, setCheckOut] = useState(initialDateRange.checkOut);
  const [people, setPeople] = useState(2);
  const [videoPaused, setVideoPaused] = useState(() => prefersReducedMotion());
  const videoRef = useRef(null);

  const activeTourId = selectedTourId || primaryTours[0]?.id || '';
  const hasTours = tours.length > 0;
  const isSearching = toursLoading || bookingSearchLoading;
  const canSearch = hasTours && !toursLoading && !toursError && !bookingSearchLoading && Boolean(activeTourId);
  const kashmirPoster = tours.find((tour) => /kashmir/i.test(tour.destination_name || ''))?.cover_image;
  const heroPoster = kashmirPoster || HERO_POSTER_FALLBACK;

  useEffect(() => {
    if (prefersReducedMotion()) videoRef.current?.pause();
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
          poster={heroPoster}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="hero-media__scrim" />
      </div>

      <div className="hero-content-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-intro">Local hosts. Thoughtful stays. Mountain-ready routes.</p>
            <h1 id="hero-title">Find your way through Kashmir.</h1>
            <p className="hero-copy__description">
              Compare guided journeys across Kashmir Valley, Kargil and Ladakh, then shape the details with a local team.
            </p>
          </div>

          <form className="hero-search-card" onSubmit={handleSubmit} aria-busy={isSearching} aria-describedby="hero-booking-status">
            <div className="hero-search-card__header">
              <div>
                <h2 className="hero-search-card__title">Find available tours</h2>
                <p className="hero-search-card__subtitle">Choose your route and travel dates.</p>
              </div>
            </div>

            <div className="hero-search-fields">
              <div className="hero-search-col hero-search-col--tour">
                <label className="hero-search-label" htmlFor="hero-tour">Destination tour</label>
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
                    {primaryTours.map((tour) => (
                      <option key={tour.id} value={tour.id}>
                        {tour.destination_name ? `${tour.destination_name} — ${tour.title}` : tour.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="hero-search-col hero-search-col--check-in">
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

              <div className="hero-search-col hero-search-col--check-out">
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
                <label className="hero-search-label" htmlFor="hero-people">Travelers</label>
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
                </div>
              </div>

              <button className="hero-search-action" type="submit" disabled={!canSearch}>
                {bookingSearchLoading ? 'Searching routes...' : 'Find available tours'}
              </button>
            </div>

            <p
              id="hero-booking-status"
              className={`hero-form-status${hasBookingError ? ' hero-form-status--error' : ''}`}
              role="status"
              aria-live="polite"
            >
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
        <span>{videoPaused ? 'Play scene' : 'Pause scene'}</span>
      </button>
    </section>
  );
};

export default Hero;
