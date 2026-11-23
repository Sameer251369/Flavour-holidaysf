import React, { useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CarFront, Search } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const money = (price) => Number(price).toLocaleString('en-IN');
const VEHICLE_COLUMNS = [
  { key: 'sedan_price', label: 'Sedan (Etios/Swift Desire)' },
  { key: 'innova_price', label: 'Innova' },
  { key: 'tempo_traveller_price', label: 'Tempo Traveler' },
];

const VehicleRatesPage = ({ vehicles = [], routeFares = [], onRent }) => {
  const [query, setQuery] = useState('');
  const [tableAtRight, setTableAtRight] = useState(false);
  const tableRef = useRef(null);
  const heroPhoto = vehicles.find((vehicle) => vehicle.image_url)?.image_url;
  const visibleFares = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return routeFares.filter((fare) => fare.destination.toLowerCase().includes(normalized));
  }, [routeFares, query]);

  return (
    <main className="vehicle-rates-page">
      <section className="vehicle-rates-hero" id="hero">
        {heroPhoto && <OptimizedImage className="vehicle-rates-hero__image" src={heroPhoto} alt="Flavour Holidays Kashmir taxi fleet" priority sizes="100vw" />}
        <div className="vehicle-rates-hero__shade" />
        <div className="vehicle-rates-hero__content">
          <a className="vehicle-rates-back" href="/" aria-label="Back to home"><ArrowLeft size={16} /> Home</a>
          <span className="vehicle-rates-eyebrow">Flavour Holidays · Kashmir</span>
          <h1>Kashmir Taxi Services</h1>
          <p>Choose a destination and compare private taxi fares by vehicle. Our local team can help confirm your route and travel date.</p>
          <button type="button" className="vehicle-rates-hero__button" onClick={() => onRent(null, '')}>
            Book a ride <ArrowRight size={17} />
          </button>
        </div>
        <div className="vehicle-rates-photo-count"><CarFront size={16} /> Srinagar route fare list</div>
      </section>

      <section className="vehicle-rates-content">
        <div className="vehicle-rates-heading">
          <div>
            <span className="vehicle-rates-eyebrow">Clear, upfront pricing</span>
            <h2>Srinagar Taxi Service Price List</h2>
            <p>Compare the fare for each route across our available vehicle options.</p>
          </div>
          <span className="vehicle-rates-currency">Rates in INR <span>₹</span></span>
        </div>

        <label className="vehicle-rates-search">
          <Search size={17} />
          <span className="sr-only">Search destinations</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search destinations" />
        </label>

        {visibleFares.length ? (
          <>
            <div className="vehicle-rates-scroll-hint" role="note">
              <span>Swipe right to see all vehicle prices</span><ArrowRight size={16} aria-hidden="true" />
            </div>
            <div className={`vehicle-rates-table-frame${tableAtRight ? ' is-scrolled-end' : ''}`}>
              <div
                className="vehicle-rates-table-wrap"
                ref={tableRef}
                onScroll={() => {
                  const table = tableRef.current;
                  if (table) setTableAtRight(table.scrollLeft + table.clientWidth >= table.scrollWidth - 8);
                }}
              >
                <table className="vehicle-rates-table">
                  <thead>
                    <tr>
                      <th scope="col">Destination</th>
                      {VEHICLE_COLUMNS.map((vehicle) => <th scope="col" key={vehicle.key}>{vehicle.label}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleFares.map((fare) => (
                      <tr key={fare.id}>
                        <th scope="row">{fare.destination}</th>
                        {VEHICLE_COLUMNS.map((vehicle) => {
                          const price = fare[vehicle.key];
                          return (
                            <td key={vehicle.key}>
                              {price !== null && price !== '' ? (
                                <div className="vehicle-rates-fare">
                                  <span className="vehicle-rates-price">₹{money(price)}</span>
                                  <button className="vehicle-rates-book" type="button" onClick={() => onRent(null, `${fare.destination} — ${vehicle.label}`)}>
                                    Book <ArrowRight size={14} />
                                  </button>
                                </div>
                              ) : <span className="vehicle-rates-quote">Ask for quote</span>}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="vehicle-rates-scroll-edge" aria-hidden="true"><ArrowRight size={17} /></div>
            </div>
          </>
        ) : (
          <div className="vehicle-rates-empty">{routeFares.length ? 'No routes match your search.' : 'Taxi route fares are being updated. Contact us for a current quote.'}</div>
        )}
        <p className="vehicle-rates-note">Fares are shown in Indian rupees. Please confirm route access and final pricing when booking.</p>
      </section>
    </main>
  );
};

export default VehicleRatesPage;
