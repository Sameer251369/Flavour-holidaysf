import { useEffect } from 'react';

const DEFAULT_TITLE = 'Flavour Holidays | Gen-Z Kashmir & Ladakh Expeditions';
const DEFAULT_DESCRIPTION =
  'Explore Kashmir, Kargil and Ladakh with local-led itineraries, mountain-ready transport, and thoughtful stays from Flavour Holidays.';
const DEFAULT_KEYWORDS =
  'Kashmir tour packages, Ladakh expedition, Kargil road trip, Srinagar travel agency, Gulmarg snow tour, Flavour Holidays';
const DEFAULT_CANONICAL = 'https://www.flavourholidays.com/';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop';
const BASE_DOMAIN = 'https://www.flavourholidays.com';

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': `${BASE_DOMAIN}/#travelagency`,
  name: 'Flavour Holidays',
  alternateName: 'Flavour Holidays Kashmir & Ladakh',
  url: BASE_DOMAIN,
  logo: `${BASE_DOMAIN}/brand-favicon.svg`,
  image: DEFAULT_IMAGE,
  description:
    'Local Srinagar-based travel agency specializing in Gen-Z Kashmir winter tours, Ladakh high-altitude circuits, Kargil expeditions, and 4WD mountain transport.',
  telephone: '+91-9797666859',
  priceRange: '₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'UPI, Credit Card, Bank Transfer',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Boulevard Road, Dal Lake',
    addressLocality: 'Srinagar',
    addressRegion: 'Jammu & Kashmir',
    postalCode: '190001',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 34.0837,
    longitude: 74.7973
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '22:00'
    }
  ],
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Jammu and Kashmir' },
    { '@type': 'AdministrativeArea', name: 'Ladakh' },
    { '@type': 'City', name: 'Srinagar' },
    { '@type': 'City', name: 'Gulmarg' },
    { '@type': 'City', name: 'Pahalgam' },
    { '@type': 'City', name: 'Sonamarg' },
    { '@type': 'City', name: 'Kargil' },
    { '@type': 'City', name: 'Leh' }
  ],
  sameAs: [
    'https://www.instagram.com/flavourholidays',
    'https://www.facebook.com/flavourholidays'
  ]
};

function setMetaTag(nameOrProperty, value, attribute = 'name') {
  if (!nameOrProperty) return;
  let element = document.head.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
  if (!value) {
    if (element) element.remove();
    return;
  }
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, nameOrProperty);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    if (link) link.remove();
    return;
  }
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function setJsonLd(id, data) {
  let script = document.getElementById(id);
  if (!data) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', id);
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  image,
  type = 'website',
  article = null,
  allowIndexing = true
}) => {
  useEffect(() => {
    const finalTitle = title || DEFAULT_TITLE;
    const finalDescription = description || DEFAULT_DESCRIPTION;
    const finalKeywords = keywords || DEFAULT_KEYWORDS;
    const finalCanonical = canonicalUrl || DEFAULT_CANONICAL;
    const finalImage = image || DEFAULT_IMAGE;
    const robotsContent = allowIndexing ? 'index, follow' : 'noindex, nofollow';

    // 1. Standard Document Head
    document.title = finalTitle;
    setMetaTag('description', finalDescription, 'name');
    setMetaTag('keywords', finalKeywords, 'name');
    setMetaTag('robots', robotsContent, 'name');
    setCanonical(finalCanonical);

    // 2. Open Graph Meta Tags (Facebook / WhatsApp / LinkedIn)
    setMetaTag('og:title', finalTitle, 'property');
    setMetaTag('og:description', finalDescription, 'property');
    setMetaTag('og:url', finalCanonical, 'property');
    setMetaTag('og:image', finalImage, 'property');
    setMetaTag('og:type', type, 'property');
    setMetaTag('og:site_name', 'Flavour Holidays', 'property');
    setMetaTag('og:locale', 'en_US', 'property');

    // 3. Twitter Card Tags
    setMetaTag('twitter:card', 'summary_large_image', 'name');
    setMetaTag('twitter:title', finalTitle, 'name');
    setMetaTag('twitter:description', finalDescription, 'name');
    setMetaTag('twitter:image', finalImage, 'name');

    // 4. Local SEO Geo Tags (Srinagar, Jammu & Kashmir)
    setMetaTag('geo.region', 'IN-JK', 'name');
    setMetaTag('geo.placename', 'Srinagar, Jammu & Kashmir, India', 'name');
    setMetaTag('geo.position', '34.0837;74.7973', 'name');
    setMetaTag('ICBM', '34.0837, 74.7973', 'name');

    // 5. Schema Markup: LocalBusiness
    setJsonLd('flavour-local-business-schema', LOCAL_BUSINESS_SCHEMA);

    // 6. Schema Markup: BlogPosting (if viewing an article)
    if (article) {
      const blogPostingSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${finalCanonical}#article`,
        headline: article.seo_title || article.title,
        description: article.meta_description || article.excerpt || finalDescription,
        image: [finalImage],
        datePublished: article.created_at || '2026-11-01T00:00:00+05:30',
        dateModified: article.created_at || '2026-11-01T00:00:00+05:30',
        author: {
          '@type': 'Person',
          name: article.author || 'Flavour Squad'
        },
        publisher: {
          '@type': 'TravelAgency',
          name: 'Flavour Holidays',
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_DOMAIN}/brand-favicon.svg`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': finalCanonical
        },
        keywords: article.meta_keywords || finalKeywords,
        articleSection: article.category || 'Travel Guide'
      };
      setJsonLd('flavour-blog-schema', blogPostingSchema);
    } else {
      setJsonLd('flavour-blog-schema', null);
    }

    return () => {
      // Optional cleanup on unmount
    };
  }, [title, description, keywords, canonicalUrl, image, type, article, allowIndexing]);

  return null;
};

export default SEO;
