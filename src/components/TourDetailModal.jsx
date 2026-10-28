import React, { useEffect, useState } from 'react';
import {
  BadgePercent,
  Car,
  Check,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react';
import CheckpointTimeline from './CheckpointTimeline';
import { fetchTourBySlug } from '../services/api';
import { getTourMedia } from '../utils/destinations';

const WHATSAPP_NUMBER = '919906666336';

const SERVICE_POINTS = [
  {
    icon: MapPin,
    title: 'Local team in Srinagar',
    detail: 'On-ground hosts for every departure',
  },
  {
    icon: Car,
    title: 'Winter-ready 4x4 fleet',
    detail: 'Mountain drivers, chains and oxygen',
  },
  {
    icon: ShieldCheck,
    title: 'Permits and stays handled',
    detail: 'Houseboats, hotels and Inner Line Permits',
  },
];

const formatPrice = (price) =>
  Number(price || 0).toLocaleString('en-IN');

const TourDetailModal = ({ tour, onClose, onBookNow }) => {
  const [activeTab, setActiveTab] = useState('checkpoints');
  const [tourDetails, setTourDetails] = useState(tour);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTourDetails(tour);
    setActiveTab('checkpoints');

    if (!tour?.slug || (tour.checkpoints?.length ?? 0) > 0) {
      setLoading(false);
      return undefined;
    }

    let cancelled = false;

    setLoading(true);

    fetchTourBySlug(tour.slug)
      .then((data) => {
        if (!cancelled && data) {
          setTourDetails(data);
        }
      })
      .catch((error) => {
        console.error('Unable to load tour details:', error);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [tour]);

  useEffect(() => {
    if (!tour) return undefined;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tour, onClose]);

  if (!tour) return null;

  const displayTour = tourDetails || tour;
  const media = getTourMedia(displayTour);
  const heroImage = displayTour.cover_image || media.src;

  const inclusions = Array.isArray(displayTour.inclusions)
    ? displayTour.inclusions
    : [];

  const exclusions = Array.isArray(displayTour.exclusions)
    ? displayTour.exclusions
    : [];

  const checkpoints = Array.isArray(displayTour.checkpoints)
    ? displayTour.checkpoints
    : [];

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I'm interested in ${displayTour.title}. Please share more details.`
  )}`;

  const handleBook = () => {
    onClose();
    onBookNow?.(displayTour);
  };

  const tabClass = (name) =>
    `relative shrink-0 whitespace-nowrap border-b-[3px] px-4 py-3 text-sm font-semibold transition-colors sm:px-6 sm:text-base ${
      activeTab === name
        ? 'border-[#00a9d0] text-[#0098ba]'
        : 'border-transparent text-slate-500 hover:text-slate-900'
    }`;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-slate-950/75 p-0 backdrop-blur-sm sm:p-4 lg:p-6"
      onClick={onClose}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-detail-title"
        className="relative mx-auto flex min-h-full w-full max-w-7xl flex-col overflow-visible bg-white shadow-2xl sm:min-h-0 sm:overflow-hidden sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close tour details"
          className="absolute right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/95 text-slate-900 shadow-lg transition hover:rotate-90 hover:bg-[#ffe600] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a9d0] sm:right-6 sm:top-6"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Hero section */}
        <header className="relative flex min-h-[510px] items-end overflow-hidden bg-slate-900 sm:min-h-[540px] lg:min-h-[580px]">
          {heroImage && (
            <img
              src={heroImage}
              alt={media.alt || displayTour.title || 'Tour destination'}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          )}

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10"
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-8 pt-24 text-white sm:px-9 sm:pb-10 lg:px-12 lg:pb-12">
            {/* Destination badges */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {displayTour.destination_name && (
                <span className="max-w-full truncate rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm sm:text-sm">
                  {displayTour.destination_name}
                </span>
              )}

              {displayTour.vibe_tag && (
                <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
                  {displayTour.vibe_tag.replace('#', '')}
                </span>
              )}

              {displayTour.duration_days && (
                <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
                  {displayTour.duration_days} Days /{' '}
                  {displayTour.duration_nights ?? 0} Nights
                </span>
              )}
            </div>

            <h2
              id="tour-detail-title"
              className="max-w-4xl break-words text-3xl font-extrabold leading-tight tracking-tight drop-shadow-lg sm:text-4xl lg:text-5xl"
            >
              {displayTour.title}
            </h2>

            {displayTour.tagline && (
              <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-white/90 sm:text-lg sm:leading-8 lg:text-xl">
                {displayTour.tagline}
              </p>
            )}

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 sm:mt-7">
              <BadgePercent
                size={21}
                className="shrink-0 text-[#ffe600]"
                aria-hidden="true"
              />

              <span className="text-sm text-white/90 sm:text-base">
                Starting from
              </span>

              <strong className="text-xl font-extrabold text-[#ffe600] sm:text-2xl">
                ₹{formatPrice(displayTour.starting_price)}
              </strong>

              <span className="text-sm text-white/80">
                / person
              </span>
            </div>

            {/* Contact actions */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={handleBook}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#ffe600] px-6 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto sm:min-w-[220px] sm:px-7 sm:text-base"
              >
                <Phone size={18} aria-hidden="true" />
                Request a Callback
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-sm font-bold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto sm:min-w-[200px] sm:px-7 sm:text-base"
              >
                <MessageCircle size={19} aria-hidden="true" />
                Chat With Us
              </a>
            </div>
          </div>
        </header>

        {/* What the price includes from our side */}
        <section
          aria-label="What we arrange"
          className="border-b border-slate-200 bg-[#f4fcfe]"
        >
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-3 sm:gap-5 lg:gap-8">
            {SERVICE_POINTS.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-100 bg-white text-[#0098ba] shadow-sm sm:h-12 sm:w-12"
                  aria-hidden="true"
                >
                  <Icon size={19} />
                </span>

                <div className="min-w-0 leading-tight text-slate-800">
                  <span className="block text-sm font-bold sm:text-base">
                    {title}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500 sm:text-sm">
                    {detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tour information tabs */}
        <section className="px-4 sm:px-8 lg:px-12">
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div
              className="flex min-w-max border-b border-slate-200 pt-3 sm:min-w-0 sm:gap-2"
              role="tablist"
              aria-label="Tour information"
            >
              <button
                type="button"
                role="tab"
                id="checkpoints-tab"
                aria-selected={activeTab === 'checkpoints'}
                aria-controls="checkpoints-panel"
                className={tabClass('checkpoints')}
                onClick={() => setActiveTab('checkpoints')}
              >
                Itinerary ({checkpoints.length})
              </button>

              <button
                type="button"
                role="tab"
                id="inclusions-tab"
                aria-selected={activeTab === 'inclusions'}
                aria-controls="inclusions-panel"
                className={tabClass('inclusions')}
                onClick={() => setActiveTab('inclusions')}
              >
                Inclusions & Exclusions
              </button>
            </div>
          </div>

          <div className="min-h-[260px] py-6 sm:py-9">
            {activeTab === 'checkpoints' && (
              <div
                id="checkpoints-panel"
                role="tabpanel"
                aria-labelledby="checkpoints-tab"
              >
                {loading ? (
                  <div
                    className="flex flex-col items-center justify-center gap-3 py-14 text-center"
                    role="status"
                  >
                    <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#00a9d0]" />
                    <p className="text-sm font-medium text-slate-500">
                      Fetching itinerary details...
                    </p>
                  </div>
                ) : checkpoints.length > 0 ? (
                  <CheckpointTimeline checkpoints={checkpoints} />
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
                    <h3 className="text-lg font-bold text-slate-800">
                      Itinerary details coming soon
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Contact our team for the detailed day-by-day itinerary.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'inclusions' && (
              <div
                id="inclusions-panel"
                role="tabpanel"
                aria-labelledby="inclusions-tab"
                className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
              >
                {/* Included */}
                <div className="rounded-2xl border border-sky-100 bg-[#f0fbfe] p-5 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0098ba] shadow-sm">
                      <Check size={20} aria-hidden="true" />
                    </span>

                    <h3 className="text-xl font-bold text-slate-900">
                      What's Included
                    </h3>
                  </div>

                  {inclusions.length > 0 ? (
                    <ul className="mt-5 space-y-4">
                      {inclusions.map((item, index) => (
                        <li
                          key={`${item}-${index}`}
                          className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-base"
                        >
                          <Check
                            size={18}
                            className="mt-1 shrink-0 text-[#0098ba]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5 text-sm leading-6 text-slate-500">
                      Please contact us for details about what's included.
                    </p>
                  )}
                </div>

                {/* Excluded */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-red-500 shadow-sm">
                      <X size={20} aria-hidden="true" />
                    </span>

                    <h3 className="text-xl font-bold text-slate-900">
                      What's Not Included
                    </h3>
                  </div>

                  {exclusions.length > 0 ? (
                    <ul className="mt-5 space-y-4">
                      {exclusions.map((item, index) => (
                        <li
                          key={`${item}-${index}`}
                          className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-base"
                        >
                          <X
                            size={18}
                            className="mt-1 shrink-0 text-red-500"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5 text-sm leading-6 text-slate-500">
                      Please contact us to confirm any exclusions.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Sticky booking footer */}
        <footer className="sticky bottom-0 z-30 mt-auto flex flex-col gap-4 border-t border-slate-200 bg-white/95 px-5 py-4 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div className="min-w-0">
            <span className="block text-xs font-medium text-slate-500 sm:text-sm">
              Starting price per person
            </span>

            <strong className="mt-0.5 block text-xl font-extrabold text-slate-900 sm:text-2xl">
              ₹{formatPrice(displayTour.starting_price)}
            </strong>
          </div>

          <button
            type="button"
            onClick={handleBook}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#ffe600] px-7 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a9d0] focus-visible:ring-offset-2 sm:w-auto sm:min-w-[220px] sm:text-base"
          >
            <Phone size={17} aria-hidden="true" />
            Book This Itinerary
          </button>
        </footer>
      </article>
    </div>
  );
};

export default TourDetailModal;
