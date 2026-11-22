// Create a Meta Events Manager custom conversion for the WhatsAppClick event
// (or optimize an ad set for the standard Contact event) to report WhatsApp leads.
export const META_WHATSAPP_EVENT_NAME =
  import.meta.env.VITE_META_WHATSAPP_EVENT_NAME || 'WhatsAppClick';

const getPixel = () => (typeof window !== 'undefined' ? window.fbq : null);

export const trackWhatsAppClick = ({ source, tourTitle } = {}) => {
  const fbq = getPixel();
  if (typeof fbq !== 'function') return;

  const details = {
    content_name: tourTitle || 'Kashmir and Ladakh trip inquiry',
    content_category: 'WhatsApp lead',
    source,
    page_path: window.location.pathname,
  };

  fbq('track', 'Contact', details);
  fbq('trackCustom', META_WHATSAPP_EVENT_NAME, details);
};

export const trackInquiryLead = ({ tourTitle } = {}) => {
  const fbq = getPixel();
  if (typeof fbq !== 'function') return;

  fbq('track', 'Lead', {
    content_name: tourTitle || 'Trip inquiry form',
    content_category: 'Trip inquiry',
    page_path: window.location.pathname,
  });
};

export const trackTourView = ({ tourTitle } = {}) => {
  const fbq = getPixel();
  if (typeof fbq !== 'function') return;

  fbq('track', 'ViewContent', {
    content_name: tourTitle || 'Tour details',
    content_category: 'Tour itinerary',
    page_path: window.location.pathname,
  });
};
