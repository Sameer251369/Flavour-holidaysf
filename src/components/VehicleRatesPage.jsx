import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpDown, CarFront, Search, Users } from 'lucide-react';

const money = (price) => Number(price || 0).toLocaleString('en-IN');

const VehicleRatesPage = ({ vehicles = [], onRent }) => {
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const photos = vehicles.filter((vehicle) => vehicle.image_url);
  const heroPhoto = photos[0]?.image_url;
  const visibleVehicles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = vehicles.filter((vehicle) => [vehicle.name, vehicle.model_name, vehicle.terrain_type, vehicle.capacity_passengers]
      .some((value) => String(value || '').toLowerCase().includes(normalized)));
    if (sortOrder === 'price-asc') return [...filtered].sort((a, b) => (a.rent_per_day ?? Infinity) - (b.rent_per_day ?? Infinity));
    if (sortOrder === 'price-desc') return [...filtered].sort((a, b) => (b.rent_per_day ?? -Infinity) - (a.rent_per_day ?? -Infinity));
    if (sortOrder === 'name') return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [vehicles, query, sortOrder]);

  return (
    <main className="vehicle-rates-page">
      <section className="vehicle-rates-hero" id="hero">
        {heroPhoto && <img className="vehicle-rates-hero__image" src={heroPhoto} alt="Flavour Holidays Kashmir taxi fleet" />}
        <div className="vehicle-rates-hero__shade" />
        <div className="vehicle-rates-hero__content">
          <a className="vehicle-rates-back" href="/" aria-label="Back to home"><ArrowLeft size={16} /> Home</a>
          <span className="vehicle-rates-eyebrow">Flavour Holidays · Kashmir</span>
          <h1>Kashmir taxi service</h1>
          <p>Find the right vehicle for your route, group size and mountain plans. Our local drivers know the roads and seasonal conditions.</p>
          <button type="button" className="vehicle-rates-hero__button" onClick={() => onRent(null, '')}>
            Request a vehicle <ArrowRight size={17} />
          </button>
        </div>
        <div className="vehicle-rates-photo-count">{photos.length || 'Local'} vehicles for Kashmir routes</div>
      </section>

      {photos.length > 1 && (
        <section className="vehicle-rates-gallery" aria-label="Our vehicles">
          {photos.slice(1, 4).map((vehicle) => (
            <figure key={vehicle.id} className="vehicle-rates-gallery__photo">
              <img src={vehicle.image_url} alt={`Kashmir taxi fleet vehicle: ${vehicle.name}`} loading="lazy" />
            </figure>
          ))}
        </section>
      )}

      <section className="vehicle-rates-content">
        <div className="vehicle-rates-heading">
          <div>
            <span className="vehicle-rates-eyebrow">Transparent daily rates</span>
            <h2>Kashmir Taxi Service</h2>
            <p>Compare the fleet at a glance. Contact our team to confirm route availability and your final itinerary quote.</p>
          </div>
          <span className="vehicle-rates-currency">Rates in INR <span>₹</span></span>
        </div>

        <div className="vehicle-rates-tools">
          <label className="vehicle-rates-search"><Search size={17} /><span className="sr-only">Search vehicles</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search vehicles, seats or route type" /></label>
          <label className="vehicle-rates-sort"><ArrowUpDown size={16} /><span className="sr-only">Sort vehicle rates</span><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}><option value="default">Recommended order</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Vehicle name</option></select></label>
        </div>

        {visibleVehicles.length ? (
          <div className="vehicle-rates-table-wrap">
            <table className="vehicle-rates-table">
              <thead>
                <tr><th scope="col">Vehicle</th><th scope="col">Model</th><th scope="col">Seats</th><th scope="col">Route</th><th scope="col">Price / day</th><th scope="col"><span className="sr-only">Action</span></th></tr>
              </thead>
              <tbody>
                {visibleVehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <th scope="row"><span className="vehicle-rates-name"><CarFront size={18} />{vehicle.name}</span><span className="vehicle-rates-mobile-model">{vehicle.model_name}</span></th>
                    <td>{vehicle.model_name}</td>
                    <td><span className="vehicle-rates-seats"><Users size={15} />{vehicle.capacity_passengers}</span></td>
                    <td>{vehicle.terrain_type}</td>
                    <td>{vehicle.rent_per_day != null && vehicle.rent_per_day !== '' ? <span className="vehicle-rates-price">₹{money(vehicle.rent_per_day)}<small> / day</small></span> : <span className="vehicle-rates-quote">Ask for quote</span>}</td>
                    <td><button className="vehicle-rates-book" type="button" onClick={() => onRent(null, vehicle.name)}>Enquire <ArrowRight size={15} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="vehicle-rates-empty">{vehicles.length ? 'No vehicles match your search. Try a different name or category.' : 'Vehicle rates are being updated. Contact us for a current quote.'}</div>
        )}
        <p className="vehicle-rates-note">Daily prices are indicative. Route, season and trip duration can affect the final quote.</p>
      </section>
    </main>
  );
};

export default VehicleRatesPage;
