import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, X, Sparkles, Tag } from 'lucide-react';

const TourBlog = ({ blogs, onSelectTourBySlug }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <section id="blogs" className="support-section blog-section" style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Section Header */}
      <div style={{ textBaseline: 'middle', marginBottom: '48px', textAlign: 'center' }}>
        <div className="badge-pink" style={{ marginBottom: '14px', display: 'inline-flex' }}>
          <BookOpen size={14} /> THE HIMALAYAN TRAVEL LOG
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, marginBottom: '16px' }}>
          GEN-Z TRAVEL <span style={{ color: '#FF007F' }}>HACKS & GUIDES.</span>
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          SIM card rules, permit hacks for Gurez & Bangus border zones, snow tips, and local food guides written by Himalayan hosts.
        </p>
      </div>

      {/* Blog Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px'
      }}>
        {blogs && blogs.map((blog) => (
          <div 
            key={blog.id} 
            className="glass-card"
            onClick={() => setSelectedBlog(blog)}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
              <img 
                src={blog.cover_image} 
                alt={blog.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                <span className="badge-pink">{blog.vibe_tag || '#TravelGuide'}</span>
              </div>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ display: 'flex', gap: '14px', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} /> {blog.read_time}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={14} /> {blog.author}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '10px', lineHeight: 1.35 }}>
                {blog.title}
              </h3>

              <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '20px', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {blog.excerpt}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', alignItems: 'center', color: '#00F5D4', fontWeight: 700, fontSize: '0.9rem' }}>
                Read Guide <ArrowRight size={14} style={{ marginLeft: '6px' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Blog Reader Modal */}
      {selectedBlog && (
        <div className="blog-reader-overlay" style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 2000,
          background: 'rgba(5, 8, 14, 0.88)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-panel blog-reader-panel" style={{
            width: '100%',
            maxWidth: '850px',
            maxHeight: '88vh',
            overflowY: 'auto',
            padding: '36px',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedBlog(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#FFF',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <div className="badge-pink" style={{ marginBottom: '12px' }}>
              {selectedBlog.category} • {selectedBlog.read_time}
            </div>

            <h2 style={{ fontSize: '2.1rem', fontWeight: 900, marginBottom: '14px', lineHeight: 1.25 }}>
              {selectedBlog.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94A3B8', fontSize: '0.88rem', marginBottom: '24px' }}>
              <span>Written by <strong style={{ color: '#00F5D4' }}>{selectedBlog.author}</strong></span>
            </div>

            <img 
              src={selectedBlog.cover_image} 
              alt={selectedBlog.title}
              style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '16px', marginBottom: '28px' }}
            />

            <div style={{ color: '#CBD5E1', fontSize: '1.02rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
              {selectedBlog.content}
            </div>

            {/* Related Tour CTA */}
            {selectedBlog.related_tour_slug && (
              <div style={{
                marginTop: '36px',
                padding: '24px',
                background: 'rgba(0, 245, 212, 0.08)',
                border: '1px solid rgba(0, 245, 212, 0.3)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <div style={{ color: '#00F5D4', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>MATCHING ITINERARY</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>{selectedBlog.related_tour_title || 'Kashmir Tour'}</div>
                </div>

                <button 
                  onClick={() => {
                    const slug = selectedBlog.related_tour_slug;
                    setSelectedBlog(null);
                    onSelectTourBySlug(slug);
                  }}
                  className="btn-primary"
                  style={{ padding: '10px 24px', fontSize: '0.9rem' }}
                >
                  <Sparkles size={16} /> View Checkpoints
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default TourBlog;
