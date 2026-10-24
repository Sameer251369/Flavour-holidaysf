import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TourExplorer from './components/TourExplorer';
import TourDetailModal from './components/TourDetailModal';
import CheckpointTimeline from './components/CheckpointTimeline';
import TourBlog from './components/TourBlog';
import TripBuilder from './components/TripBuilder';
import VehiclesShowcase from './components/VehiclesShowcase';
import FAQSection from './components/FAQSection';
import Testimonials from './components/Testimonials';
import InquiryModal from './components/InquiryModal';
import Footer from './components/Footer';

import { fetchTours, fetchBlogs, fetchVehicles, submitBookingSearch } from './services/api';
import { getDestinationsFromTours } from './utils/destinations';
import './styles/index.css';
import './styles/homepage.css';

function App() {
  const [allTours, setAllTours] = useState([]);
  const [searchMatchedTours, setSearchMatchedTours] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [toursLoading, setToursLoading] = useState(true);
  const [toursError, setToursError] = useState('');

  const [selectedTourModal, setSelectedTourModal] = useState(null);
  const [previewTour, setPreviewTour] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySelectedTour, setInquirySelectedTour] = useState(null);
  const [inquiryPrefill, setInquiryPrefill] = useState(null);
  const [bookingSearchLoading, setBookingSearchLoading] = useState(false);
  const [bookingSearchError, setBookingSearchError] = useState('');
  const [bookingSearchSummary, setBookingSearchSummary] = useState('');
  const [tourFilter, setTourFilter] = useState('ALL');

  const destinations = getDestinationsFromTours(allTours);
  const tours = searchMatchedTours ?? allTours;
  const featuredTour = useMemo(
    () => tours.find((tour) => tour.is_featured) || tours[0] || null,
    [tours]
  );
  const routePreviewTour = previewTour && tours.some((tour) => tour.id === previewTour.id)
    ? previewTour
    : featuredTour;
  const hasActiveSearch = searchMatchedTours !== null;

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setToursLoading(true);
      setToursError('');

      try {
        const [tourData, blogData, vehicleData] = await Promise.all([
          fetchTours(),
          fetchBlogs(),
          fetchVehicles()
        ]);

        if (!isMounted) return;

        setAllTours(tourData);
        setAllBlogs(blogData);
        setBlogs(blogData);
        setVehicles(vehicleData);
        setPreviewTour(tourData.find((tour) => tour.is_featured) || tourData[0] || null);
      } catch {
        if (!isMounted) return;

        setAllTours([]);
        setSearchMatchedTours(null);
        setAllBlogs([]);
        setBlogs([]);
        setVehicles([]);
        setPreviewTour(null);
        setToursError('We could not load the expedition routes right now.');
      } finally {
        if (isMounted) setToursLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const clearBookingSearch = () => {
    setSearchMatchedTours(null);
    setBlogs(allBlogs);
    setBookingSearchError('');
    setBookingSearchSummary('');
    setTourFilter('ALL');
  };

  const handleSelectDestination = (destinationName) => {
    clearBookingSearch();
    setTourFilter(destinationName);
    handleScrollTo('tours');
  };

  const handleOpenInquiry = (tour = null, vehiclePref = '') => {
    setInquiryPrefill((current) => {
      const next = { ...(current || {}) };
      if (vehiclePref) next.vehicle_preference = vehiclePref;
      return Object.keys(next).length ? next : null;
    });
    setInquirySelectedTour(tour);
    setSelectedTourModal(null);
    setInquiryModalOpen(true);
  };

  const handleOpenInquiryWithCustom = (customData) => {
    setInquirySelectedTour(null);
    setInquiryPrefill(customData);
    setInquiryModalOpen(true);
  };

  const handleSelectTour = (tour) => {
    setPreviewTour(tour);
    setSelectedTourModal(tour);
  };

  const handleSelectTourBySlug = (slug) => {
    const tour = allTours.find((item) => item.slug === slug) || tours.find((item) => item.slug === slug);
    if (tour) {
      handleSelectTour(tour);
    }
  };

  const handleBookingSearch = async (bookingData) => {
    setBookingSearchLoading(true);
    setBookingSearchError('');

    try {
      const result = await submitBookingSearch(bookingData);
      const matchedTours = result.tours || [];
      setSearchMatchedTours(matchedTours);
      setTourFilter('ALL');
      setBlogs(result.blogs || []);
      setPreviewTour(matchedTours.find((tour) => tour.is_featured) || matchedTours[0] || null);

      const selected = allTours.find((tour) => tour.id === Number(bookingData.selected_tour));
      const peopleLabel = Number(bookingData.people) === 1 ? '1 traveler' : `${bookingData.people} travelers`;
      setBookingSearchSummary(
        matchedTours.length
          ? `Showing ${matchedTours.length} matching route${matchedTours.length === 1 ? '' : 's'} for ${peopleLabel} (${bookingData.check_in} → ${bookingData.check_out})${selected ? ` near ${selected.destination_name || selected.title}` : ''}.`
          : `No routes matched ${peopleLabel} for ${bookingData.check_in} → ${bookingData.check_out}. Try different dates or clear the search.`
      );

      setInquiryPrefill({
        travel_dates: `${bookingData.check_in} to ${bookingData.check_out}`,
        travelers_count: bookingData.people
      });

      handleScrollTo('tours');
    } catch {
      setBookingSearchError('We could not find matching routes. Please try again.');
      setBookingSearchSummary('');
    } finally {
      setBookingSearchLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Navbar
        destinations={destinations}
        onOpenInquiry={() => handleOpenInquiry()}
        onScrollTo={handleScrollTo}
        onSelectDestination={handleSelectDestination}
      />

      <Hero
        tours={allTours}
        toursLoading={toursLoading}
        toursError={toursError}
        onBookingSearch={handleBookingSearch}
        bookingSearchLoading={bookingSearchLoading}
        bookingSearchError={bookingSearchError}
      />

      <TourExplorer
        tours={tours}
        featuredTour={featuredTour}
        selectedFilter={tourFilter}
        onFilterChange={setTourFilter}
        onSelectTour={handleSelectTour}
        searchSummary={bookingSearchSummary}
        hasActiveSearch={hasActiveSearch}
        onClearSearch={clearBookingSearch}
      />

      {routePreviewTour?.checkpoints?.length > 0 && (
        <section id="checkpoints" className="section section--compact checkpoints-section">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Route Preview</span>
            <h2>Day-by-day checkpoints, clearly mapped.</h2>
            <p className="section-heading__support">
              Previewing {routePreviewTour.title}. Open any tour card to switch this itinerary.
            </p>
          </div>

          <CheckpointTimeline
            key={routePreviewTour.id}
            tourTitle={routePreviewTour.title}
            checkpoints={routePreviewTour.checkpoints}
          />

          <div className="section-cta-row">
            <button
              type="button"
              className="btn-primary"
              onClick={() => handleOpenInquiry(routePreviewTour)}
            >
              Ask about this route
            </button>
          </div>
        </section>
      )}

      <TripBuilder
        onOpenInquiryWithCustom={handleOpenInquiryWithCustom}
      />

      <TourBlog
        blogs={blogs}
        onSelectTourBySlug={handleSelectTourBySlug}
      />

      <VehiclesShowcase
        vehicles={vehicles}
        onOpenInquiry={handleOpenInquiry}
      />

      <FAQSection />

      <Testimonials />

      <Footer
        onScrollTo={handleScrollTo}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {selectedTourModal && (
        <TourDetailModal
          tour={selectedTourModal}
          onClose={() => setSelectedTourModal(null)}
          onBookNow={(tour) => handleOpenInquiry(tour)}
        />
      )}

      {inquiryModalOpen && (
        <InquiryModal
          prefillData={inquiryPrefill}
          selectedTour={inquirySelectedTour}
          onClose={() => setInquiryModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
