import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle, X } from 'lucide-react';
import { parseNoteContent } from '../utils/noteContent';
import { WHATSAPP_NUMBER } from '../config/contact';
import { trackWhatsAppClick } from '../config/metaPixel';
import OptimizedImage from './OptimizedImage';

const FALLBACK_BLOG_IMAGE =
  'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop';

const renderSegments = (segments = []) =>
  segments.map((segment, index) => (
    segment.strong
      ? <strong key={index}>{segment.text}</strong>
      : <React.Fragment key={index}>{segment.text}</React.Fragment>
  ));

const NoteBlocks = ({ content }) => {
  const blocks = parseNoteContent(content);

  return (
    <div className="note-blocks">
      {blocks.map((block, index) => {
        if (block.type === 'list') {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderSegments(item)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === 'h3' || block.type === 'h4') {
          const Heading = block.type;
          return <Heading key={index}>{renderSegments(block.segments)}</Heading>;
        }

        return <p key={index}>{renderSegments(block.segments)}</p>;
      })}
    </div>
  );
};

const BlogReader = ({ note, onClose, onSelectTourBySlug }) => {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const relatedSlug =
    note.related_tour_slug ||
    note.related_tour_slug_name ||
    (typeof note.related_tour === 'string' ? note.related_tour : note.related_tour?.slug);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I read your travel note "${note.title}" and would like help planning a Kashmir or Ladakh trip.`
  )}`;

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal-panel blog-reader-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-reader-title"
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close travel note">
          <X size={18} aria-hidden="true" />
        </button>

        <div className="reader-head">
          {note.category && <span className="eyebrow">{note.category}</span>}
          <h2 id="blog-reader-title">{note.title}</h2>
          <div className="reader-meta">
            {note.read_time && <span>{note.read_time}</span>}
            {note.author && <span>{note.author}</span>}
          </div>
        </div>

        {note.cover_image && (
          <OptimizedImage
            className="modal-hero-image"
            src={note.cover_image}
            alt={note.image_alt || note.effective_image_alt || note.title}
            priority
            sizes="100vw"
          />
        )}

        <NoteBlocks content={note.content || note.excerpt || ''} />

        <div className="reader-related">
          {relatedSlug && onSelectTourBySlug && (
            <>
              <span>This note is tied to a published route.</span>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  onClose();
                  onSelectTourBySlug(relatedSlug);
                }}
              >
                View route
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </>
          )}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary reader-whatsapp"
            onClick={() => trackWhatsAppClick({ source: 'blog_note', tourTitle: note.title })}
          >
            <MessageCircle size={17} aria-hidden="true" /> Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

const TourBlog = ({
  blogs = [],
  onSelectTourBySlug,
  activeNote: controlledActiveNote,
  onOpenNote,
  onCloseNote
}) => {
  const [internalActiveNote, setInternalActiveNote] = useState(null);

  const activeNote = controlledActiveNote !== undefined ? controlledActiveNote : internalActiveNote;
  const handleOpen = (note) => {
    if (onOpenNote) {
      onOpenNote(note);
    } else {
      setInternalActiveNote(note);
    }
  };
  const handleClose = () => {
    if (onCloseNote) {
      onCloseNote();
    } else {
      setInternalActiveNote(null);
    }
  };

  if (!blogs.length) return null;

  return (
    <section id="blogs" className="page-shell blog-section">
      <div className="section-heading section-heading--center">
        <span className="eyebrow">Travel Notes</span>
        <h2>What to know before you go</h2>
        <p>
          Practical notes from our Srinagar team on permits, road access and
          travel timing through Kashmir, Kargil and Ladakh.
        </p>
      </div>

      <div className="blog-grid">
        {blogs.map((note) => (
          <article key={note.id || note.slug} className="blog-card">
            <div className="blog-card__media">
              <OptimizedImage
                src={note.cover_image || FALLBACK_BLOG_IMAGE}
                alt={note.image_alt || note.effective_image_alt || note.title}
                loading="lazy"
                sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              {note.category && <span className="blog-card__tag">{note.category}</span>}
            </div>

            <div className="blog-card__body">
              <div className="blog-card__meta">
                {note.read_time && <span>{note.read_time}</span>}
                {note.author && <span>{note.author}</span>}
              </div>

              <h3 className="blog-card__title">{note.title}</h3>
              {note.excerpt && <p className="blog-card__excerpt">{note.excerpt}</p>}

              <button type="button" className="blog-card__cta" onClick={() => handleOpen(note)}>
                Read note
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {activeNote && (
        <BlogReader
          note={activeNote}
          onClose={handleClose}
          onSelectTourBySlug={onSelectTourBySlug}
        />
      )}
    </section>
  );
};

export default TourBlog;

