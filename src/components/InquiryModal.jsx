import React, { useState } from 'react';
import { CheckCircle, Send, X } from 'lucide-react';
import { submitInquiry } from '../services/api';

const InquiryModal = ({ prefillData, selectedTour, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travel_dates: '',
    travelers_count: prefillData?.travelers_count || 2,
    vehicle_preference: prefillData?.vehicle_preference || 'Thar 4WD',
    custom_notes: prefillData?.custom_notes || (selectedTour ? `Interested in booking ${selectedTour.title}` : '')
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      selected_tour: selectedTour ? selectedTour.id : null
    };

    const res = await submitInquiry(payload);
    setLoading(false);
    setSuccessMsg(res.message || 'Thank you. Our Kashmir host will contact you shortly.');
  };

  return (
    <div className="modal-overlay inquiry-modal-overlay">
      <div className="modal-panel inquiry-modal-panel">
        <button className="modal-close" onClick={onClose} aria-label="Close inquiry form">
          <X size={18} />
        </button>

        {successMsg ? (
          <div className="success-state">
            <CheckCircle size={44} />
            <h3>Request received</h3>
            <p>{successMsg}</p>
            <button onClick={onClose} className="btn-primary">Back to site</button>
          </div>
        ) : (
          <>
            <span className="eyebrow">Trip Inquiry</span>
            <h3>Plan your trip.</h3>
            <p className="modal-subtitle">
              {selectedTour ? `Booking request for ${selectedTour.title}` : 'Share a few details for a custom Kashmir and Ladakh quote.'}
            </p>

            <form onSubmit={handleSubmit} className="form-grid">
              <label>
                Full name
                <input type="text" name="name" required placeholder="Rahul Sharma" value={formData.name} onChange={handleChange} />
              </label>

              <div className="form-row">
                <label>
                  Phone / WhatsApp
                  <input type="tel" name="phone" required placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
                </label>

                <label>
                  Email
                  <input type="email" name="email" required placeholder="you@email.com" value={formData.email} onChange={handleChange} />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Travel dates
                  <input type="text" name="travel_dates" placeholder="December 2026" value={formData.travel_dates} onChange={handleChange} />
                </label>

                <label>
                  Travelers
                  <input type="number" name="travelers_count" min="1" value={formData.travelers_count} onChange={handleChange} />
                </label>
              </div>

              <label>
                Notes / preferences
                <textarea name="custom_notes" rows="4" placeholder="Vehicle, hotel, route or experience preferences" value={formData.custom_notes} onChange={handleChange} />
              </label>

              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Submitting...' : <>Submit request <Send size={16} /></>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InquiryModal;
