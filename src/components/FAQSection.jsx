import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchFAQs } from '../services/api';

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const [faqs, setFaqs] = useState([
    {
      question: "What is the best time to visit Kashmir?",
      answer: "Kashmir is a year-round destination! Spring/Summer (March to August) offers lush green valleys and tulip gardens. Autumn (September to November) showcases golden Chinar leaves. Winter (December to February) turns Gulmarg and Pahalgam into snow paradises ideal for skiing."
    },
    {
      question: "Are inner line permits required for offbeat places like Gurez or Bangus Valley?",
      answer: "Yes, due to proximity to the border zone, special permissions/permits are required for Gurez and Bangus Valley. Flavour Holidays handles all permit arrangements for our guests automatically."
    },
    {
      question: "Are prepaid mobile SIM cards active in Jammu & Kashmir?",
      answer: "No, outside prepaid SIM cards (Airtel, Jio, Vi) do not work in J&K due to security regulations. You will need a postpaid SIM or can acquire a local tourist SIM upon arrival at Srinagar airport with your ID documents."
    },
    {
      question: "Is Kashmir safe for honeymoon couples and family travel?",
      answer: "Absolutely! Kashmir is renowned for warm hospitality ('Kashmiriyat'). Thousands of families and couples travel safely every month with tour providers like Flavour Holidays."
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
    <section id="faqs" className="support-section faq-section" style={{ padding: '80px 24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textBaseline: 'middle', marginBottom: '40px', textAlign: 'center' }}>
        <div className="badge-purple" style={{ marginBottom: '14px', display: 'inline-flex' }}>
          <HelpCircle size={14} /> KNOWLEDGE BASE
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, marginBottom: '12px' }}>
          EVERYTHING YOU NEED TO <span style={{ color: '#00F5D4' }}>KNOW.</span>
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className="glass-panel"
            style={{
              padding: '20px 28px',
              cursor: 'pointer',
              borderColor: openIdx === idx ? 'rgba(0, 245, 212, 0.4)' : 'rgba(255,255,255,0.08)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: openIdx === idx ? '#00F5D4' : '#F8FAFC' }}>
                {faq.question || faq.q}
              </h3>
              {openIdx === idx ? <ChevronUp size={20} color="#00F5D4" /> : <ChevronDown size={20} color="#94A3B8" />}
            </div>

            {openIdx === idx && (
              <p style={{ marginTop: '14px', color: '#94A3B8', fontSize: '0.96rem', lineHeight: 1.6, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
                {faq.answer || faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
