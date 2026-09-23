import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { fetchFAQs } from '../services/api';

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const [faqs, setFaqs] = useState([
    {
      question: 'What is the best time to visit Kashmir?',
      answer: 'Kashmir is a year-round destination. Spring and summer bring tulips and green valleys, autumn brings golden Chinar leaves, and winter is best for snow in Gulmarg and Pahalgam.'
    },
    {
      question: 'Are permits required for offbeat places like Gurez or Bangus Valley?',
      answer: 'Yes. Some border-side routes need permissions. Flavour Holidays can arrange the required permits for guests before the journey.'
    },
    {
      question: 'Will prepaid SIM cards work in Jammu & Kashmir?',
      answer: 'Outside prepaid SIM cards usually do not work in Jammu & Kashmir. Carry a postpaid SIM or arrange a local tourist SIM after arrival.'
    },
    {
      question: 'Is Kashmir suitable for families and honeymoon couples?',
      answer: 'Yes. With the right local planning, hotels, routes and transport, Kashmir is a comfortable destination for couples and families.'
    }
  ]);

  useEffect(() => {
    fetchFAQs().then(data => {
      if (data && data.length > 0) {
        setFaqs(data);
      }
    });
  }, []);

  return (
    <section id="faqs" className="section section--narrow faq-section">
      <div className="section-heading section-heading--center">
        <span className="eyebrow">Before You Go</span>
        <h2>Clear answers for common travel questions.</h2>
      </div>

      <div className="faq-list">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <button
              key={idx}
              className={`faq-item${isOpen ? ' faq-item--open' : ''}`}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              type="button"
              aria-expanded={isOpen}
            >
              <span className="faq-item__question">
                {faq.question || faq.q}
                {isOpen ? <ChevronUp size={19} /> : <ChevronDown size={19} />}
              </span>

              {isOpen && <span className="faq-item__answer">{faq.answer || faq.a}</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
