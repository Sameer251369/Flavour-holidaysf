import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Car, MapPin, Pause, Play, ShieldCheck } from 'lucide-react';

const HERO_VIDEO_URL =
  'https://kombai-assets.b-cdn.net/generated_assets/93ec2c35-0d4c-4209-9d28-b2a8c59d8080/031636d4907d49df8fa69207bf34f191.mp4';

const HERO_POSTER_FALLBACK =
  'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=2000&auto=format&fit=crop';

const TYPED_PHRASES = [
  'Join Group Adventures',
  'Explore Kashmir Valley',
  'Discover Kargil & Ladakh',
];

const ASSURANCES = [
  {
    icon: MapPin,
    title: 'Local team in Srinagar',
    detail: 'On-ground hosts for every departure',
  },
  {
    icon: Car,
    title: 'Winter-ready 4x4 fleet',
    detail: 'Mountain drivers, chains and oxygen',
  },
  {
    icon: ShieldCheck,
    title: 'Permits and stays handled',
    detail: 'Houseboats, hotels and Inner Line Permits',
  },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const useTypewriter = (
  phrases,
  typeSpeed = 80,
  deleteSpeed = 40,
  hold = 1600
) => {
  const [text, setText] = useState(() =>
    prefersReducedMotion() ? phrases[0] : ''
  );

  const state = useRef({ index: 0, deleting: false });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let timer;

    const tick = () => {
      const currentState = state.current;
      const fullText = phrases[currentState.index];

      setText((previous) => {
        if (!currentState.deleting) {
          return fullText.slice(0, previous.length + 1);
        }

        return fullText.slice(0, Math.max(previous.length - 1, 0));
      });

      timer = setTimeout(() => {
        setText((current) => {
          let delay = currentState.deleting ? deleteSpeed : typeSpeed;

          if (!currentState.deleting && current === fullText) {
            currentState.deleting = true;
            delay = hold;
          } else if (currentState.deleting && current === '') {
            currentState.deleting = false;
            currentState.index =
              (currentState.index + 1) % phrases.length;
            delay = 500;
          }

          timer = setTimeout(tick, delay);
          return current;
        });
      }, currentState.deleting ? deleteSpeed : typeSpeed);
    };

    timer = setTimeout(tick, typeSpeed);

    return () => clearTimeout(timer);
  }, [phrases, typeSpeed, deleteSpeed, hold]);

  return text;
};

const Hero = ({ tours = [] }) => {
  const videoRef = useRef(null);

  const [videoPaused, setVideoPaused] = useState(() =>
    prefersReducedMotion()
  );

  const typed = useTypewriter(TYPED_PHRASES);

  const kashmirPoster = useMemo(
    () =>
      tours.find((tour) => /kashmir/i.test(tour.destination_name || ''))
        ?.cover_image,
    [tours]
  );

  const heroPoster = kashmirPoster || HERO_POSTER_FALLBACK;

  useEffect(() => {
    const video = videoRef.current;

    if (prefersReducedMotion()) {
      video?.pause();
      return;
    }

    if (video) {
      video.play().catch(() => setVideoPaused(true));
    }
  }, []);

  const toggleVideo = async () => {
    const video = videoRef.current;

    if (!video || prefersReducedMotion()) return;

    if (video.paused) {
      try {
        await video.play();
        setVideoPaused(false);
      } catch {
        setVideoPaused(true);
      }
    } else {
      video.pause();
      setVideoPaused(true);
    }
  };

  return (
    <section id="hero" className="hero-scenic" aria-labelledby="hero-title">
      <div className="hero-scenic__stage">
        <video
          ref={videoRef}
          className="hero-scenic__video"
          autoPlay={!prefersReducedMotion()}
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroPoster}
          aria-hidden="true"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>

        <div className="hero-scenic__scrim" aria-hidden="true" />

        <div className="page-shell hero-scenic__content">
          <p className="hero-scenic__eyebrow">Kashmir, Kargil and Ladakh</p>

          <h1 id="hero-title" className="hero-scenic__title">
            Global Community of Travelers
          </h1>

          <p className="hero-scenic__rotator" aria-live="polite">
            <span>{typed}</span>
            <span className="hero-scenic__caret" aria-hidden="true" />
          </p>
        </div>

        {!prefersReducedMotion() && (
          <button
            type="button"
            onClick={toggleVideo}
            aria-label={videoPaused ? 'Play background video' : 'Pause background video'}
            aria-pressed={videoPaused}
            className="hero-scenic__toggle"
          >
            {videoPaused ? (
              <Play size={15} aria-hidden="true" />
            ) : (
              <Pause size={15} aria-hidden="true" />
            )}
            <span>{videoPaused ? 'Play scene' : 'Pause scene'}</span>
          </button>
        )}
      </div>

      <div className="hero-assurances">
        <div className="page-shell hero-assurances__inner">
          {ASSURANCES.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="hero-assurance">
              <span className="hero-assurance__icon" aria-hidden="true">
                <Icon size={19} />
              </span>
              <span className="hero-assurance__copy">
                <strong>{title}</strong>
                <span className="hero-assurance__detail">{detail}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;