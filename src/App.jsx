import React, { useEffect, useState } from 'react';
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
import { getDestinationsFromTours, getPrimaryToursByDestination } from './utils/destinations';
import './styles/index.css';
import './styles/homepage.css';

function App() {
  const [tours, setTours] = useState([]);
  const [availableTours, setAvailableTours] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [toursLoading, setToursLoading] = useState(true);
  const [toursError, setToursError] = useState('');

  const [selectedTourModal, setSelectedTourModal] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySelectedTour, setInquirySelectedTour] = useState(null);
  const [inquiryPrefill, setInquiryPrefill] = useState(null);
  const [bookingSearchLoading, setBookingSearchLoading] = useState(false);
  const [bookingSearchError, setBookingSearchError] = useState('');
  const [tourFilter, setTourFilter] = useState('ALL');
  const primaryTours = getPrimaryToursByDestination(tours);
  const destinations = getDestinationsFromTours(primaryTours);
  const featuredTour = primaryTours.find((tour) => tour.is_featured) || primaryTours[0];

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

        setTours(tourData);
        setAvailableTours(tourData);
        setBlogs(blogData);
        setVehicles(vehicleData);
      } catch {
        if (!isMounted) return;

        setTours([]);
        setAvailableTours([]);
        setBlogs([]);
        setVehicles([]);
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

  const handleSelectDestination = (destinationName) => {
    setTourFilter(destinationName);
    handleScrollTo('tours');
  };

  const handleOpenInquiry = (tour = null, vehiclePref = '') => {
    setInquiryPrefill(vehiclePref ? { vehicle_preference: vehiclePref } : null);
    setInquirySelectedTour(tour);
    setSelectedTourModal(null);
    setInquiryModalOpen(true);
  };

  const handleOpenInquiryWithCustom = (customData) => {
    setInquirySelectedTour(null);
    setInquiryPrefill(customData);
    setInquiryModalOpen(true);
  };

  const handleSelectTourBySlug = (slug) => {
    const tour = tours.find((item) => item.slug === slug);
    if (tour) {
      setSelectedTourModal(tour);
    }
  };

  const handleBookingSearch = async (bookingData) => {
    setBookingSearchLoading(true);
    setBookingSearchError('');

    try {
      const result = await submitBookingSearch(bookingData);
      setTours(result.tours || []);
      setTourFilter('ALL');
      setBlogs(result.blogs || []);
      handleScrollTo('tours');
    } catch {
      setBookingSearchError('We could not find matching routes. Please try again.');
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
        tours={availableTours}
        toursLoading={toursLoading}
        toursError={toursError}
        onBookingSearch={handleBookingSearch}
        bookingSearchLoading={bookingSearchLoading}
        bookingSearchError={bookingSearchError}
      />

      <TourExplorer
        tours={primaryTours}
        featuredTour={featuredTour}
        selectedFilter={tourFilter}
        onFilterChange={setTourFilter}
        onSelectTour={(tour) => setSelectedTourModal(tour)}
      />

      {featuredTour?.checkpoints?.length > 0 && (
        <section id="checkpoints" className="section section--compact checkpoints-section">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Route Preview</span>
            <h2>Day-by-day checkpoints, clearly mapped.</h2>
          </div>

          <CheckpointTimeline
            tourTitle={featuredTour.title}
            checkpoints={featuredTour.checkpoints}
          />
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
