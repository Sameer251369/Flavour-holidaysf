import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, User, X } from 'lucide-react';

const TourBlog = ({ blogs, onSelectTourBySlug }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <section id="blogs" className="section blog-section">
      <div className="section-heading section-heading--center">
        <span className="eyebrow">Travel Notes</span>
        <h2>Practical guides for moving through the mountains.</h2>
        <p>Permits, winter access, local customs and small details that make the trip easier.</p>
      </div>

      <div className="card-grid">
        {blogs && blogs.map((blog) => (
          <article key={blog.id} className="content-card content-card--clickable" onClick={() => setSelectedBlog(blog)}>
            <div className="content-card__image">
              <img src={blog.cover_image} alt={blog.title} />
              <span className="soft-badge">{blog.vibe_tag || 'Guide'}</span>
            </div>

            <div className="content-card__body">
              <div className="meta-line">
                <span><Clock size={14} /> {blog.read_time}</span>
                <span><User size={14} /> {blog.author}</span>
              </div>
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <span className="inline-link">Read guide <ArrowRight size={14} /></span>
            </div>
          </article>
        ))}
      </div>

      {selectedBlog && (
        <div className="modal-overlay blog-reader-overlay">
          <article className="modal-panel blog-reader-panel">
            <button className="modal-close" onClick={() => setSelectedBlog(null)} aria-label="Close guide">
              <X size={18} />
            </button>

            <span className="eyebrow"><BookOpen size={14} /> {selectedBlog.category} / {selectedBlog.read_time}</span>
            <h2>{selectedBlog.title}</h2>
            <p className="modal-subtitle">Written by <strong>{selectedBlog.author}</strong></p>

            <img className="modal-hero-image" src={selectedBlog.cover_image} alt={selectedBlog.title} />

            <div className="reader-content">{selectedBlog.content}</div>

            {selectedBlog.related_tour_slug && (
              <div className="related-callout">
                <div>
                  <span className="eyebrow">Matching Itinerary</span>
                  <strong>{selectedBlog.related_tour_title || 'Kashmir Tour'}</strong>
                </div>

                <button
                  onClick={() => {
                    const slug = selectedBlog.related_tour_slug;
                    setSelectedBlog(null);
                    onSelectTourBySlug(slug);
                  }}
                  className="btn-primary"
                >
                  View itinerary <ArrowRight size={16} />
                </button>
              </div>
            )}
          </article>
        </div>
      )}
    </section>
  );
};

export default TourBlog;
