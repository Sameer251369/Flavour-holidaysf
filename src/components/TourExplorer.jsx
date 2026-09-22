import React, { useState, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Sparkles, Filter } from 'lucide-react';

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
      label: name.includes('Kashmir') ? '🏔️ Kashmir' : name.includes('Gurez') ? '🔥 Gurez' : name.includes('Ladakh') ? '⭐ Ladakh' : `📍 ${name}`,
      value: name
    })),
    { label: '❄️ #SnowVibes', value: '#SnowVibes' },
    { label: '🏔️ #OffbeatGenZ', value: '#OffbeatGenZ' },
    { label: '⚡ #ThrillSeeker', value: '#ThrillSeeker' }
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
    <section id="tours" style={{
      padding: '90px 32px 80px',
      maxWidth: '1280px',
      margin: '0 auto',
      position: 'relative'
    }}>
      {/* Top Header Row */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
        marginBottom: '36px'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(0, 245, 212, 0.3)',
            background: 'rgba(0, 245, 212, 0.08)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#00F5D4',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '14px'
          }}>
            <Sparkles size={14} /> EXPEDITION ROUTES &amp; DESTINATIONS
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#FFFFFF',
            fontFamily: "'Outfit', sans-serif",
            maxWidth: '640px',
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            Your Journey to the Perfect Destination Begins Here
          </h2>
        </div>

        {/* Top Right Actions & Navigation Arrows */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setSelectedFilter('ALL')}
            style={{
              background: selectedFilter === 'ALL' ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.08)',
              border: selectedFilter === 'ALL' ? '1px solid #00F5D4' : '1px solid rgba(255, 255, 255, 0.2)',
              color: selectedFilter === 'ALL' ? '#00F5D4' : '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.88rem',
              padding: '10px 22px',
              borderRadius: '30px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            See All Destinations ({tours.length})
            <ArrowUpRight size={16} />
          </button>

          {/* Quick Header Arrow Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={scrollLeft}
              aria-label="Previous tour"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 245, 212, 0.4)',
                background: 'rgba(10, 15, 26, 0.8)',
                color: '#00F5D4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(0, 245, 212, 0.15)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#00F5D4';
                e.currentTarget.style.color = '#090C10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(10, 15, 26, 0.8)';
                e.currentTarget.style.color = '#00F5D4';
              }}
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={scrollRight}
              aria-label="Next tour"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 245, 212, 0.4)',
                background: 'rgba(10, 15, 26, 0.8)',
                color: '#00F5D4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(0, 245, 212, 0.15)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#00F5D4';
                e.currentTarget.style.color = '#090C10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(10, 15, 26, 0.8)';
                e.currentTarget.style.color = '#00F5D4';
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div style={{
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '14px',
        marginBottom: '32px',
        scrollbarWidth: 'none'
      }}>
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSelectedFilter(opt.value)}
            style={{
              padding: '8px 18px',
              borderRadius: '24px',
              border: selectedFilter === opt.value ? '1px solid #00F5D4' : '1px solid rgba(255,255,255,0.12)',
              background: selectedFilter === opt.value ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              color: selectedFilter === opt.value ? '#00F5D4' : '#CBD5E1',
              fontWeight: 700,
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Tour Cards Carousel Container */}
      <div
        ref={sliderRef}
        style={{
          display: 'flex',
          gap: '28px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          paddingBottom: '20px',
          scrollbarWidth: 'none'
        }}
      >
        {displayTours.map((tour) => (
          <div 
            key={tour.id} 
            onClick={() => onSelectTour(tour)}
            style={{
              flex: '0 0 350px',
              scrollSnapAlign: 'start',
              position: 'relative',
              height: '460px',
              borderRadius: '28px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(0, 245, 212, 0.5)';
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.0)';
            }}
          >
            {/* Background Image */}
            <img 
              src={tour.cover_image || "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800"} 
              alt={tour.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s ease'
              }}
            />

            {/* Gradient Dark Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(9, 14, 26, 0.95) 0%, rgba(9, 14, 26, 0.35) 50%, rgba(0, 0, 0, 0.15) 100%)'
            }} />

            {/* Top-Right Arrow Badge */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#090C10',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
              <ArrowUpRight size={20} />
            </div>

            {/* Top-Left Badges */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <span style={{
                background: 'rgba(0, 245, 212, 0.25)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 245, 212, 0.5)',
                color: '#00F5D4',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>
                {tour.destination_name || 'Himalayas'}
              </span>
              {tour.vibe_tag && (
                <span style={{
                  background: 'rgba(255, 0, 127, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 0, 127, 0.4)',
                  color: '#FF007F',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  width: 'fit-content'
                }}>
                  {tour.vibe_tag}
                </span>
              )}
            </div>

            {/* Bottom Details */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              color: '#FFFFFF'
            }}>
              <h3 style={{
                fontSize: '1.45rem',
                fontWeight: 900,
                marginBottom: '8px',
                fontFamily: "'Outfit', sans-serif",
                lineHeight: 1.25,
                color: '#F8FAFC'
              }}>
                {tour.title}
              </h3>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '14px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255,255,255,0.12)'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Starting Price</div>
                  <div style={{ fontSize: '1.25rem', color: '#00F5D4', fontWeight: 900 }}>
                    ₹{tour.starting_price.toLocaleString('en-IN')} <span style={{ fontSize: '0.75rem', color: '#CBD5E1', fontWeight: 500 }}>/ person</span>
                  </div>
                </div>

                <div style={{
                  fontSize: '0.8rem',
                  color: '#00F5D4',
                  fontWeight: 800,
                  background: 'rgba(0, 245, 212, 0.1)',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 245, 212, 0.25)'
                }}>
                  📍 {tour.checkpoints ? tour.checkpoints.length : 6} Checkpoints
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Slider Navigation Bar with Arrow Controls & Tour Counter */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '28px',
        paddingTop: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ fontSize: '0.88rem', color: '#94A3B8', fontWeight: 700 }}>
          Showing <span style={{ color: '#00F5D4' }}>{displayTours.length}</span> Expedition Routes {selectedFilter !== 'ALL' && `for ${selectedFilter}`}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={scrollLeft}
            style={{
              padding: '10px 20px',
              borderRadius: '24px',
              border: '1px solid rgba(0, 245, 212, 0.4)',
              background: 'rgba(10, 15, 26, 0.8)',
              color: '#00F5D4',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(0, 245, 212, 0.15)',
              transition: 'all 0.25s ease'
            }}
          >
            <ChevronLeft size={18} /> Prev Route
          </button>

          <button 
            onClick={scrollRight}
            style={{
              padding: '10px 20px',
              borderRadius: '24px',
              border: '1px solid rgba(0, 245, 212, 0.4)',
              background: 'rgba(10, 15, 26, 0.8)',
              color: '#00F5D4',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(0, 245, 212, 0.15)',
              transition: 'all 0.25s ease'
            }}
          >
            Next Route <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TourExplorer;

