const DESTINATION_RULES = [
  { key: 'kashmir', label: 'Kashmir', pattern: /kashmir/i },
  { key: 'kargil', label: 'Kargil', pattern: /kargil/i },
  { key: 'ladakh', label: 'Ladakh', pattern: /ladakh|leh/i }
];

const toSlug = (value) => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const FALLBACK_TOUR_MEDIA = {
  src: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200',
  alt: 'Himalayan tour landscape'
};

export const getTourMedia = (tour) => ({
  src: tour?.cover_image || FALLBACK_TOUR_MEDIA.src,
  alt: tour?.title || FALLBACK_TOUR_MEDIA.alt
});

export const getDestinationKey = (destinationName = '') => {
  const rule = DESTINATION_RULES.find(({ pattern }) => pattern.test(destinationName));
  return rule?.key || toSlug(destinationName) || 'other';
};

export const getDestinationLabel = (destinationName = '') => {
  const rule = DESTINATION_RULES.find(({ pattern }) => pattern.test(destinationName));
  return rule?.label || destinationName || 'Himalayas';
};

export const getDestinationAnchor = (destinationName = '') => `destination-${getDestinationKey(destinationName)}`;

export const getDestinationsFromTours = (tours = []) => {
  const seen = new Set();

  return tours.reduce((destinations, tour) => {
    const name = tour.destination_name || 'Himalayas';
    const key = getDestinationKey(name);

    if (seen.has(key)) return destinations;
    seen.add(key);
    destinations.push({ key, label: getDestinationLabel(name), filterValue: name, anchor: getDestinationAnchor(name) });
    return destinations;
  }, []);
};
