import React, { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const VehiclesShowcase = ({ vehicles = [], onOpenInquiry }) => {
  const [tableAtRight, setTableAtRight] = useState(false);
  const tableRef = useRef(null);

  return (
  <section id="fleet" className="section fleet-section">
    <div className="section-heading section-heading--center">
      <span className="eyebrow">Fleet</span>
      <h2>Vehicles chosen for mountain roads.</h2>
      <p>Comfortable highway cruisers, winter-capable 4x4s and group carriers for longer routes.</p>
    </div>

    <div className="section-cta-row" style={{ marginTop: 20, marginBottom: 22 }}>
      <a href="/vehicles/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
        View vehicle rates <ArrowRight size={16} />
      </a>
    </div>

    {vehicles.length ? (
      <>
        <div className="fleet-table-scroll-hint" role="note">
          <span>Swipe right to see all vehicle details</span><ArrowRight size={16} aria-hidden="true" />
        </div>
        <div className={`fleet-table-frame${tableAtRight ? ' is-scrolled-end' : ''}`}>
          <div
            className="fleet-table-wrap"
            ref={tableRef}
            onScroll={() => {
              const table = tableRef.current;
              if (table) setTableAtRight(table.scrollLeft + table.clientWidth >= table.scrollWidth - 8);
            }}
          >
            <table className="fleet-table">
              <thead>
                <tr>
                  <th scope="col">Vehicle</th>
                  <th scope="col">Route</th>
                  <th scope="col">Capacity</th>
                  <th scope="col">Terrain</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Book</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id}>
                    <th scope="row">
                      <div className="fleet-table__vehicle">
                        {v.image_url && <OptimizedImage src={v.image_url} alt={v.name} loading="lazy" />}
                        <span>
                          <strong>{v.name}</strong>
                          <small>{v.model_name}</small>
                          {v.badge && <small className="fleet-table__badge">{v.badge}</small>}
                        </span>
                      </div>
                    </th>
                    <td>{v.route_description || 'Contact us to confirm the best route.'}</td>
                    <td>{v.capacity_passengers}</td>
                    <td>{v.terrain_type}</td>
                    <td className="fleet-table__rate">
                      {v.rent_per_day != null && v.rent_per_day !== ''
                        ? <>₹{Number(v.rent_per_day).toLocaleString('en-IN')} <small>/ day</small></>
                        : 'Ask for quote'}
                    </td>
                    <td>
                      <button onClick={() => onOpenInquiry(null, v.name)} className="btn-outline btn-outline--light fleet-table__rent">
                        Rent <ArrowRight size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="fleet-table-scroll-edge" aria-hidden="true"><ArrowRight size={17} /></div>
        </div>
      </>
    ) : <p className="fleet-table__empty">Vehicle details are being updated. Contact us for options.</p>}
  </section>
  );
};

export default VehiclesShowcase;
