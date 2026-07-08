import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo, useId } from 'react';
import {
  Star, Heart, Share2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X,
  Wifi, ChefHat, Tv, Wind, Waves, Car, Dumbbell, MapPin,
  ShieldCheck, Flag, Plus, Minus, Award, Check,
  Clock, Home, Menu, Globe, CircleUserRound, Search,
  Image as ImageIcon, DoorOpen, GraduationCap, CalendarX
} from 'lucide-react';

const IMAGES = [
  { src: '/images/livingroom.jpg', alt: 'Living room with large windows and rooftop view' },
  { src: '/images/bedroom.jpg', alt: 'Bedroom with queen bed and reading nook' },
  { src: '/images/kitchen.jpg', alt: 'Kitchen with marble countertops' },
  { src: '/images/bathroom.jpg', alt: 'Bathroom with walk-in shower' },
  { src: '/images/exterior.jpg', alt: 'Rooftop terrace at sunset' },
  { src: '/images/exterior2.jpg', alt: 'Second exterior view' },
  { src: '/images/Diningarea.jpg', alt: 'Dining nook with street view' },
  { src: '/images/additional.jpg', alt: 'Building entrance and courtyard' },
];

const LISTING = {
  title: 'Sunlit Loft with Rooftop Views in the Historic Quarter',
  type: 'Entire loft',
  location: 'Lisbon, Portugal',
  lat: 38.7223,
  lng: -9.1393,
  host: {
    name: 'Mariana',
    isSuperhost: true,
    yearsHosting: 8,
    reviewCount: 1424,
    rating: 4.92,
    bornDecade: '80s',
    school: 'University of Lisbon',
    bio: "I'm a former textile designer who moved back to Lisbon in 2018 to restore my grandmother's old apartment in the historic quarter. If you love natural light, local markets and quiet cobblestone streets, you'll feel right at home here.",
    responseRate: 100,
    responseTime: 'within an hour',
  },
  rating: 4.92,
  reviewCount: 238,
  guests: 4,
  bedrooms: 2,
  beds: 2,
  baths: 1,
  price: 142,
  currency: '$',
  cleaningFee: 48,
  serviceFee: 39,
  highlights: [
    { icon: DoorOpen, title: 'Self check-in', body: 'Check yourself in with the keypad.' },
    { icon: Award, title: 'Mariana is a Superhost', body: 'Superhosts are experienced, highly rated hosts.' },
    { icon: MapPin, title: 'Great location', body: '95% of recent guests gave the location a 5-star rating.' },
  ],
  description:
    "This bright, top-floor loft sits on a quiet cobblestone street in the heart of the historic quarter, a short walk from miradouros, cafés and the tram line. Exposed beams and tall windows fill the space with natural light, and the private rooftop terrace is the perfect spot for evening wine with a view over the rooftops. The kitchen is fully equipped for slow mornings, and the neighborhood's bakeries, laundromat and grocery are all within a five minute walk. Ideal for couples, small families or friends who want a comfortable base for exploring the city on foot.",
  amenities: [
    { icon: Wifi, label: 'Wifi' },
    { icon: ChefHat, label: 'Kitchen' },
    { icon: Tv, label: 'TV with Netflix' },
    { icon: Wind, label: 'Air conditioning' },
    { icon: Waves, label: 'Rooftop terrace' },
    { icon: Car, label: 'Free street parking' },
    { icon: Dumbbell, label: 'Shared gym access' },
    { icon: ShieldCheck, label: 'Smoke alarm' },
  ],
  amenityCategories: [
    { name: 'Bathroom', items: ['Hair dryer', 'Shampoo', 'Hot water', 'Walk-in shower'] },
    { name: 'Bedroom and laundry', items: ['Washer', 'Essentials', 'Hangers', 'Iron'] },
    { name: 'Entertainment', items: ['TV with Netflix', 'Books and reading material'] },
    { name: 'Heating and cooling', items: ['Air conditioning', 'Central heating'] },
    { name: 'Home safety', items: ['Smoke alarm', 'Carbon monoxide alarm', 'Fire extinguisher'] },
    { name: 'Internet and office', items: ['Wifi', 'Dedicated workspace'] },
    { name: 'Kitchen and dining', items: ['Kitchen', 'Refrigerator', 'Coffee maker', 'Dining table'] },
    { name: 'Outdoor', items: ['Private rooftop terrace', 'Outdoor furniture'] },
  ],
  ratingBreakdown: [
    { label: 'Cleanliness', value: 4.9 },
    { label: 'Accuracy', value: 4.9 },
    { label: 'Check-in', value: 5.0 },
    { label: 'Communication', value: 5.0 },
    { label: 'Location', value: 4.8 },
    { label: 'Value', value: 4.7 },
  ],
  reviews: [
    { name: 'Priya', date: 'June 2026', rating: 5, text: 'Mariana was an incredible host and the terrace view at sunset was unreal. Would stay again in a heartbeat.' },
    { name: 'Tomás', date: 'May 2026', rating: 5, text: 'Perfect location for walking everywhere. The apartment was spotless and exactly like the photos.' },
    { name: 'Anke', date: 'May 2026', rating: 4, text: 'Lovely stay, quiet street, comfortable bed. Only minor note is the stairs up are a bit steep!' },
    { name: 'Diego', date: 'April 2026', rating: 5, text: 'Communication was fast and check-in was seamless with the keypad. Highly recommend this stay.' },
    { name: 'Freya', date: 'April 2026', rating: 5, text: 'One of the best Airbnbs we have stayed in. The light in the mornings is beautiful.' },
    { name: 'Noah', date: 'March 2026', rating: 5, text: 'Great value for the location. Walked to nearly everything we wanted to see.' },
  ],
};

const THINGS_TO_KNOW = [
  {
    icon: CalendarX,
    title: 'Cancellation policy',
    lines: ['Free cancellation before check-in.', 'After that, the reservation is non-refundable.'],
    linkText: "Review this host's full policy for details.",
  },
  {
    icon: Search,
    title: 'House rules',
    lines: ['Check-in: 3:00 PM – 2:00 AM', 'Checkout before 11:00 AM', `${LISTING.guests} guests maximum`],
    linkText: 'Show more',
  },
  {
    icon: ShieldCheck,
    title: 'Safety & property',
    lines: ['Exterior security cameras on property', 'Carbon monoxide alarm', 'Smoke alarm'],
    linkText: 'Show more',
  },
];

/* =============================================================================
   HOOKS
   ============================================================================= */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler);
    };
  }, []);
  return reduced;
}

function useRevealOnScroll() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  // Runs before paint: if the element is already in the viewport on load
  // (e.g. the title, gallery), skip the fade animation entirely so there's
  // no flash of dim/grey content. Only elements starting off-screen animate.
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      setSkipAnimation(true);
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (skipAnimation) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [skipAnimation]);

  return [ref, visible, skipAnimation];
}

function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [locked]);
}

function useEscapeKey(handler, active) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => { if (e.key === 'Escape') handler(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, handler]);
}

function useOutsideClick(ref, handler, active) {
  useEffect(() => {
    if (!active) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) handler(); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [active, handler, ref]);
}

function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const container = ref.current;
    const selector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const previouslyFocused = document.activeElement;
    const focusables = () => Array.from(container.querySelectorAll(selector));
    const items = focusables();
    (items[0] || container).focus();
    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const els = focusables();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    container.addEventListener('keydown', onKey);
    return () => {
      container.removeEventListener('keydown', onKey);
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [active, ref]);
}

/* =============================================================================
   SMALL PRESENTATIONAL HELPERS
   ============================================================================= */
function Reveal({ children, className = '', as: Tag = 'div', ...rest }) {
  const [ref, visible, skipAnimation] = useRevealOnScroll();
  return (
    <Tag
      ref={ref}
      className={`${skipAnimation ? '' : 'alc-reveal'} ${visible ? 'is-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function SmartImage({ src, alt, className = '', style }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div className={`alc-img-fallback ${className}`} style={style} role="img" aria-label={alt}>
        <ImageIcon size={26} aria-hidden="true" />
        <span>{alt}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}

function RatingStars({ rating, size = 14 }) {
  return <Star size={size} className="alc-star-icon" aria-hidden="true" fill="currentColor" />;
}

/* =============================================================================
   MODAL (shared dialog shell)
   ============================================================================= */
function Modal({ isOpen, onClose, labelledBy, children, className = '' }) {
  const ref = useRef(null);
  useLockBodyScroll(isOpen);
  useEscapeKey(onClose, isOpen);
  useFocusTrap(ref, isOpen);
  if (!isOpen) return null;
  return (
    <div
      className="alc-modal-overlay"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={ref}
        className={`alc-modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}

/* =============================================================================
   GALLERY
   ============================================================================= */
function Gallery({ images, onOpen }) {
  return (
    <div className="alc-gallery" role="group" aria-label="Photo gallery">
      {images.slice(0, 5).map((img, i) => (
        <button
          key={i}
          type="button"
          className={`alc-gallery-tile ${i === 0 ? 'alc-gallery-main' : ''}`}
          onClick={() => onOpen(i)}
          aria-label={`View photo ${i + 1} of ${images.length}: ${img.alt}`}
        >
          <SmartImage src={img.src} alt={img.alt} className="alc-gallery-img" />
        </button>
      ))}
      <button type="button" className="alc-show-all-btn" onClick={() => onOpen(0)}>
        <ImageIcon size={16} aria-hidden="true" />
        Show all photos
      </button>
    </div>
  );
}

function GalleryModal({ isOpen, onClose, images, initialIndex, titleId }) {
  const [index, setIndex] = useState(initialIndex);
  useEffect(() => { if (isOpen) setIndex(initialIndex); }, [isOpen, initialIndex]);

  const go = useCallback((delta) => {
    setIndex((i) => (i + delta + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, go]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy={titleId} className="alc-lightbox">
      <div className="alc-lightbox-top">
        <h2 id={titleId} className="alc-visually-hidden">Photo gallery, image {index + 1} of {images.length}</h2>
        <button type="button" className="alc-icon-btn alc-lightbox-close" onClick={onClose} aria-label="Close photo gallery">
          <X size={20} aria-hidden="true" />
        </button>
        <span className="alc-lightbox-counter" aria-hidden="true">{index + 1} / {images.length}</span>
      </div>
      <div className="alc-lightbox-body">
        <button type="button" className="alc-lightbox-nav alc-lightbox-prev" onClick={() => go(-1)} aria-label="Previous photo">
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <SmartImage src={images[index].src} alt={images[index].alt} className="alc-lightbox-img" />
        <button type="button" className="alc-lightbox-nav alc-lightbox-next" onClick={() => go(1)} aria-label="Next photo">
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </div>
      <p className="alc-lightbox-caption">{images[index].alt}</p>
    </Modal>
  );
}

/* =============================================================================
   GUEST PICKER
   ============================================================================= */
function Stepper({ label, hint, value, min, max, onChange }) {
  return (
    <div className="alc-stepper-row">
      <div>
        <div className="alc-stepper-label">{label}</div>
        {hint && <div className="alc-stepper-hint">{hint}</div>}
      </div>
      <div className="alc-stepper-controls">
        <button
          type="button"
          className="alc-stepper-btn"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
        >
          <Minus size={14} aria-hidden="true" />
        </button>
        <span className="alc-stepper-value" aria-live="polite">{value}</span>
        <button
          type="button"
          className="alc-stepper-btn"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
        >
          <Plus size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function GuestPicker({ counts, onChange, maxGuests }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false), open);
  useEscapeKey(() => setOpen(false), open);

  const total = counts.adults + counts.children;
  const summary = total > 0
    ? `${total} guest${total > 1 ? 's' : ''}${counts.infants ? `, ${counts.infants} infant${counts.infants > 1 ? 's' : ''}` : ''}${counts.pets ? `, ${counts.pets} pet${counts.pets > 1 ? 's' : ''}` : ''}`
    : 'Add guests';

  const set = (key) => (val) => onChange({ ...counts, [key]: val });

  return (
    <div className="alc-guest-picker" ref={ref}>
      <button
        type="button"
        className="alc-field alc-field-guests"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="alc-field-label">GUESTS</span>
        <span className="alc-field-value">{summary}</span>
      </button>
      {open && (
        <div className="alc-guest-panel" role="group" aria-label="Guest selection">
          <Stepper label="Adults" hint="Ages 13+" value={counts.adults} min={1} max={maxGuests} onChange={set('adults')} />
          <Stepper label="Children" hint="Ages 2–12" value={counts.children} min={0} max={maxGuests} onChange={set('children')} />
          <Stepper label="Infants" hint="Under 2" value={counts.infants} min={0} max={5} onChange={set('infants')} />
          <Stepper label="Pets" value={counts.pets} min={0} max={5} onChange={set('pets')} />
          <p className="alc-guest-note">This place has a maximum of {maxGuests} guests, not counting infants.</p>
        </div>
      )}
    </div>
  );
}

/* =============================================================================
   CALENDAR
   ============================================================================= */
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function buildMonth(year, month) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function Calendar({ range, onSelect, monthsToShow = 2 }) {
  const today = useMemo(() => { const t = new Date(); t.setHours(0,0,0,0); return t; }, []);
  const [cursor, setCursor] = useState(today);
  const [focusDate, setFocusDate] = useState(today);
  const gridRef = useRef(null);

  const months = [];
  for (let i = 0; i < monthsToShow; i++) {
    const d = new Date(cursor.getFullYear(), cursor.getMonth() + i, 1);
    months.push({ year: d.getFullYear(), month: d.getMonth(), cells: buildMonth(d.getFullYear(), d.getMonth()) });
  }

  const isPast = (d) => d < today;
  const isSelected = (d) => sameDay(d, range.start) || sameDay(d, range.end);
  const isInRange = (d) => range.start && range.end && d > range.start && d < range.end;

  const handlePick = (d) => {
    if (isPast(d)) return;
    if (!range.start || (range.start && range.end)) {
      onSelect({ start: d, end: null });
    } else if (d < range.start) {
      onSelect({ start: d, end: range.start });
    } else {
      onSelect({ start: range.start, end: d });
    }
  };

  const moveFocus = (delta) => {
    const next = new Date(focusDate);
    next.setDate(next.getDate() + delta);
    setFocusDate(next);
    if (next.getMonth() !== cursor.getMonth() && next < cursor) {
      setCursor(new Date(next.getFullYear(), next.getMonth(), 1));
    } else if (next > new Date(cursor.getFullYear(), cursor.getMonth() + monthsToShow, 0)) {
      setCursor(new Date(next.getFullYear(), next.getMonth(), 1));
    }
    requestAnimationFrame(() => {
      const el = gridRef.current && gridRef.current.querySelector(`[data-date="${next.toDateString()}"]`);
      if (el) el.focus();
    });
  };

  const onKeyDown = (e) => {
    const map = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 };
    if (map[e.key] !== undefined) { e.preventDefault(); moveFocus(map[e.key]); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(focusDate); }
  };

  return (
    <div className="alc-calendar" ref={gridRef}>
      <div className="alc-calendar-nav">
        <button type="button" className="alc-icon-btn" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} aria-label="Previous month">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button type="button" className="alc-icon-btn" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} aria-label="Next month">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="alc-calendar-months">
        {months.map((m, mi) => (
          <div className="alc-calendar-month" key={mi}>
            <div className="alc-calendar-title">{MONTH_NAMES[m.month]} {m.year}</div>
            <div className="alc-calendar-weekdays" aria-hidden="true">
              {WEEKDAYS.map((w, i) => <span key={i}>{w}</span>)}
            </div>
            <div className="alc-calendar-grid" role="grid" aria-label={`${MONTH_NAMES[m.month]} ${m.year}`}>
              {m.cells.map((d, i) => {
                if (!d) return <span key={i} className="alc-calendar-cell alc-calendar-cell-empty" aria-hidden="true" />;
                const disabled = isPast(d);
                const selected = isSelected(d);
                const inRange = isInRange(d);
                const isFocusTarget = sameDay(d, focusDate);
                return (
                  <button
                    key={i}
                    type="button"
                    data-date={d.toDateString()}
                    className={`alc-calendar-cell ${selected ? 'is-selected' : ''} ${inRange ? 'is-inrange' : ''}`}
                    disabled={disabled}
                    tabIndex={isFocusTarget ? 0 : -1}
                    aria-current={sameDay(d, today) ? 'date' : undefined}
                    aria-pressed={selected}
                    onFocus={() => setFocusDate(d)}
                    onKeyDown={onKeyDown}
                    onClick={() => handlePick(d)}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =============================================================================
   MAIN COMPONENT
   ============================================================================= */
export default function AirbnbListingClone() {
  const reducedMotion = usePrefersReducedMotion();
  const headingId = useId();
  const galleryTitleId = useId();
  const amenitiesTitleId = useId();
  const datesTitleId = useId();
  const hostTitleId = useId();

  const [scrolled, setScrolled] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareMsg, setShareMsg] = useState('');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [datesOpen, setDatesOpen] = useState(false);
  const [range, setRange] = useState({ start: null, end: null });
  const [guestCounts, setGuestCounts] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });
  const [reserveMsg, setReserveMsg] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 420);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nights = useMemo(() => {
    if (!range.start || !range.end) return 5;
    return Math.max(1, Math.round((range.end - range.start) / 86400000));
  }, [range]);

  const subtotal = LISTING.price * nights;
  const total = subtotal + LISTING.cleaningFee + LISTING.serviceFee;

  const dateLabel = (d) => d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null;

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try { await navigator.share({ title: LISTING.title, url }); } catch (e) { /* cancelled */ }
    } else if (navigator.clipboard) {
      try { await navigator.clipboard.writeText(url); setShareMsg('Link copied to clipboard'); } catch (e) { setShareMsg('Could not copy link'); }
      setTimeout(() => setShareMsg(''), 3000);
    }
  };

  const openGalleryAt = (i) => { setGalleryIndex(i); setGalleryOpen(true); };

  return (
    <div className="alc-root">
      <style>{CSS}</style>
      <a href="#alc-main" className="alc-skip-link">Skip to content</a>

      {/* ---------------- Header ---------------- */}
      <header className={`alc-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="alc-header-inner">
          <div className="alc-logo" aria-label="Airbnb home">
            <Home size={22} aria-hidden="true" />
            <span>airbnb</span>
          </div>
          <div className={`alc-header-search ${scrolled ? 'is-compact' : ''}`}>
            <Search size={15} aria-hidden="true" />
            <span className="alc-header-search-text">
              {scrolled ? LISTING.title : 'Start your search'}
            </span>
          </div>
          <div className="alc-header-right">
            <button type="button" className="alc-header-menu" aria-label="Open main menu">
              <Menu size={16} aria-hidden="true" />
              <CircleUserRound size={26} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <main id="alc-main" className="alc-container">
        {/* ---------------- Title row ---------------- */}
        <Reveal as="section" className="alc-title-row" aria-labelledby={headingId}>
          <h1 id={headingId} className="alc-title">{LISTING.title}</h1>
          <div className="alc-title-meta-row">
            <div className="alc-title-meta">
              <span className="alc-meta-rating">
                <RatingStars rating={LISTING.rating} />
                <span>{LISTING.rating.toFixed(2)}</span>
              </span>
              <span aria-hidden="true">·</span>
              <a href="#reviews" className="alc-link-underline">{LISTING.reviewCount} reviews</a>
              <span aria-hidden="true">·</span>
              <span className="alc-superhost"><Award size={14} aria-hidden="true" /> Superhost</span>
              <span aria-hidden="true">·</span>
              <a href="#location" className="alc-link-underline">{LISTING.location}</a>
            </div>
            <div className="alc-title-actions">
              <button type="button" className="alc-text-btn" onClick={handleShare}>
                <Share2 size={16} aria-hidden="true" /> Share
              </button>
              <button
                type="button"
                className="alc-text-btn"
                aria-pressed={saved}
                onClick={() => setSaved((s) => !s)}
              >
                <Heart size={16} aria-hidden="true" fill={saved ? 'currentColor' : 'none'} />
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
          <p className="alc-visually-hidden" role="status">{shareMsg}</p>
        </Reveal>

        {/* ---------------- Gallery ---------------- */}
        <Reveal>
          <Gallery images={IMAGES} onOpen={openGalleryAt} />
        </Reveal>
        <GalleryModal
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          images={IMAGES}
          initialIndex={galleryIndex}
          titleId={galleryTitleId}
        />

        {/* ---------------- Content grid ---------------- */}
        <div className="alc-content-grid">
          <div className="alc-content-main">
            <Reveal className="alc-host-row">
              <div>
                <h2 className="alc-h2">{LISTING.type} hosted by {LISTING.host.name}</h2>
                <p className="alc-meta-line">
                  {LISTING.guests} guests · {LISTING.bedrooms} bedrooms · {LISTING.beds} beds · {LISTING.baths} bath
                </p>
              </div>
              <div className="alc-host-avatar" aria-hidden="true">{LISTING.host.name[0]}</div>
            </Reveal>

            <div className="alc-divider" />

            <Reveal className="alc-highlights">
              {LISTING.highlights.map((h, i) => (
                <div className="alc-highlight" key={i}>
                  <h.icon size={24} aria-hidden="true" />
                  <div>
                    <p className="alc-highlight-title">{h.title}</p>
                    <p className="alc-highlight-body">{h.body}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            <div className="alc-divider" />

            <Reveal>
              <div className={`alc-description ${showFullDescription ? 'is-expanded' : ''}`}>
                <p>{LISTING.description}</p>
              </div>
              <button
                type="button"
                className="alc-text-btn alc-underline-btn"
                aria-expanded={showFullDescription}
                onClick={() => setShowFullDescription((s) => !s)}
              >
                {showFullDescription ? 'Show less' : 'Show more'}
                {showFullDescription ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronRight size={16} aria-hidden="true" />}
              </button>
            </Reveal>

            <div className="alc-divider" />

            <Reveal aria-labelledby={amenitiesTitleId}>
              <h2 id={amenitiesTitleId} className="alc-h2">What this place offers</h2>
              <div className="alc-amenities-grid">
                {LISTING.amenities.map((a, i) => (
                  <div className="alc-amenity" key={i}>
                    <a.icon size={22} aria-hidden="true" />
                    <span>{a.label}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="alc-secondary-btn" onClick={() => setAmenitiesOpen(true)}>
                Show all {LISTING.amenityCategories.reduce((n, c) => n + c.items.length, 0)} amenities
              </button>
            </Reveal>
            <Modal
              isOpen={amenitiesOpen}
              onClose={() => setAmenitiesOpen(false)}
              labelledBy={amenitiesTitleId + '-modal'}
              className="alc-modal-panel"
            >
              <div className="alc-modal-header">
                <h2 id={amenitiesTitleId + '-modal'} className="alc-h2">What this place offers</h2>
                <button type="button" className="alc-icon-btn" onClick={() => setAmenitiesOpen(false)} aria-label="Close amenities list">
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
              <div className="alc-modal-scroll">
                {LISTING.amenityCategories.map((cat, i) => (
                  <div key={i} className="alc-amenity-category">
                    <h3 className="alc-h3">{cat.name}</h3>
                    <ul className="alc-amenity-list">
                      {cat.items.map((item, j) => <li key={j}><Check size={16} aria-hidden="true" />{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </Modal>

            <div className="alc-divider" />

            <Reveal aria-labelledby={datesTitleId}>
              <h2 id={datesTitleId} className="alc-h2">{nights} nights in {LISTING.location.split(',')[0]}</h2>
              <p className="alc-meta-line" style={{ marginBottom: 16 }}>
                {range.start ? dateLabel(range.start) : 'Add date'} – {range.end ? dateLabel(range.end) : 'Add date'}
              </p>
              <Calendar range={range} onSelect={setRange} monthsToShow={2} />
            </Reveal>

            <div className="alc-divider" />

            <Reveal id="reviews" aria-label="Reviews">
              <h2 className="alc-h2 alc-reviews-heading">
                <RatingStars rating={LISTING.rating} size={18} /> {LISTING.rating.toFixed(2)} · {LISTING.reviewCount} reviews
              </h2>
              <div className="alc-rating-bars">
                {LISTING.ratingBreakdown.map((r, i) => (
                  <div className="alc-rating-bar-row" key={i}>
                    <span className="alc-rating-bar-label">{r.label}</span>
                    <span className="alc-rating-bar-track" role="img" aria-label={`${r.label} rated ${r.value} out of 5`}>
                      <span className="alc-rating-bar-fill" style={{ width: `${(r.value / 5) * 100}%` }} />
                    </span>
                    <span className="alc-rating-bar-value">{r.value.toFixed(1)}</span>
                  </div>
                ))}
              </div>
              <div className="alc-reviews-grid">
                {LISTING.reviews.map((rev, i) => (
                  <div className="alc-review-card" key={i}>
                    <div className="alc-review-header">
                      <div className="alc-host-avatar alc-host-avatar-sm" aria-hidden="true">{rev.name[0]}</div>
                      <div>
                        <p className="alc-review-name">{rev.name}</p>
                        <p className="alc-review-date">{rev.date}</p>
                      </div>
                    </div>
                    <div className="alc-review-stars" aria-label={`Rated ${rev.rating} out of 5`}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={12} aria-hidden="true" fill={s < rev.rating ? 'currentColor' : 'none'} className="alc-star-icon" />
                      ))}
                    </div>
                    <p className="alc-review-text">{rev.text}</p>
                  </div>
                ))}
              </div>
              <button type="button" className="alc-secondary-btn">Show all {LISTING.reviewCount} reviews</button>
            </Reveal>

            <div className="alc-divider" />

            {/* ---------------- Meet your host ---------------- */}
            <Reveal aria-labelledby={hostTitleId}>
              <h2 id={hostTitleId} className="alc-h2">Meet your host</h2>
              <div className="alc-host-meet-grid">
                <div className="alc-host-left">
                  <div className="alc-host-card">
                    <div className="alc-host-card-top">
                      <div className="alc-host-photo-wrap">
                        <div className="alc-host-avatar alc-host-avatar-lg" aria-hidden="true">{LISTING.host.name[0]}</div>
                        {LISTING.host.isSuperhost && (
                          <span className="alc-host-verified-badge" aria-label="Identity verified">
                            <Check size={13} aria-hidden="true" />
                          </span>
                        )}
                      </div>
                      <div className="alc-host-card-stats">
                        <div className="alc-host-stat">
                          <strong>{LISTING.host.reviewCount}</strong>
                          <span>Reviews</span>
                        </div>
                        <div className="alc-host-stat">
                          <strong>{LISTING.host.rating.toFixed(2)}<Star size={13} className="alc-star-icon" fill="currentColor" aria-hidden="true" /></strong>
                          <span>Rating</span>
                        </div>
                        <div className="alc-host-stat">
                          <strong>{LISTING.host.yearsHosting}</strong>
                          <span>Years hosting</span>
                        </div>
                      </div>
                    </div>
                    <p className="alc-host-card-name">{LISTING.host.name}</p>
                    {LISTING.host.isSuperhost && (
                      <p className="alc-host-card-superhost"><Award size={14} aria-hidden="true" /> Superhost</p>
                    )}
                  </div>

                  <div className="alc-host-bio">
                    <p><MapPin size={18} aria-hidden="true" /> Born in the {LISTING.host.bornDecade}</p>
                    <p><GraduationCap size={18} aria-hidden="true" /> Where I went to school: {LISTING.host.school}</p>
                    <p className="alc-host-bio-text">{LISTING.host.bio}</p>
                  </div>
                </div>

                <div className="alc-host-info">
                  {LISTING.host.isSuperhost && (
                    <>
                      <h3 className="alc-h3">{LISTING.host.name} is a Superhost</h3>
                      <p className="alc-host-info-text">
                        Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                      </p>
                    </>
                  )}
                  <h3 className="alc-h3 alc-host-details-title">Host details</h3>
                  <p className="alc-host-info-text">Response rate: {LISTING.host.responseRate}%</p>
                  <p className="alc-host-info-text">Responds {LISTING.host.responseTime}</p>
                  <button type="button" className="alc-message-host-btn">Message host</button>
                  <div className="alc-divider alc-host-info-divider" />
                  <p className="alc-host-payment-note">
                    <ShieldCheck size={30} aria-hidden="true" />
                    To help protect your payment, always use Airbnb to send money and communicate with hosts.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="alc-divider" />

            <Reveal id="location" aria-label="Location">
              <h2 className="alc-h2">Where you'll be</h2>
              <p className="alc-meta-line" style={{ marginBottom: 16 }}>{LISTING.location}</p>
              <div className="alc-map-placeholder">
                <iframe
                  className="alc-map-iframe"
                  title={`Map showing approximate location near ${LISTING.location}`}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${LISTING.lng - 0.02}%2C${LISTING.lat - 0.015}%2C${LISTING.lng + 0.02}%2C${LISTING.lat + 0.015}&layer=mapnik&marker=${LISTING.lat}%2C${LISTING.lng}`}
                  loading="lazy"
                />
              </div>
              <p className="alc-map-caption">Exact location provided after booking, for guest safety.</p>
            </Reveal>

            <div className="alc-divider" />

            {/* ---------------- Things to know ---------------- */}
            <Reveal aria-label="Things to know">
              <h2 className="alc-h2">Things to know</h2>
              <div className="alc-things-grid">
                {THINGS_TO_KNOW.map((t, i) => (
                  <div className="alc-thing-card" key={i}>
                    <t.icon size={26} aria-hidden="true" />
                    <p className="alc-thing-title">{t.title}</p>
                    <div className="alc-thing-body">
                      {t.lines.map((line, j) => <p key={j}>{line}</p>)}
                    </div>
                    <button type="button" className="alc-text-btn alc-thing-link">{t.linkText}</button>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ---------------- Booking card ---------------- */}
          <aside className="alc-booking-col" aria-label="Booking">
            <div className="alc-booking-card">
              <div className="alc-booking-price-row">
                <span><strong>{LISTING.currency}{LISTING.price}</strong> night</span>
                <span className="alc-meta-rating">
                  <RatingStars rating={LISTING.rating} />
                  <span>{LISTING.rating.toFixed(2)}</span>
                </span>
              </div>

              <div className="alc-booking-fields">
                <button type="button" className="alc-field alc-field-half" onClick={() => setDatesOpen(true)}>
                  <span className="alc-field-label">CHECK-IN</span>
                  <span className="alc-field-value">{range.start ? dateLabel(range.start) : 'Add date'}</span>
                </button>
                <button type="button" className="alc-field alc-field-half alc-field-border-left" onClick={() => setDatesOpen(true)}>
                  <span className="alc-field-label">CHECKOUT</span>
                  <span className="alc-field-value">{range.end ? dateLabel(range.end) : 'Add date'}</span>
                </button>
                <GuestPicker counts={guestCounts} onChange={setGuestCounts} maxGuests={LISTING.guests} />
              </div>

              <button
                type="button"
                className="alc-reserve-btn"
                onClick={() => { setReserveMsg('This is a demo — no reservation was created.'); setTimeout(() => setReserveMsg(''), 4000); }}
              >
                Reserve
              </button>
              <p className="alc-reserve-note" role="status">{reserveMsg || "You won't be charged yet"}</p>

              <div className="alc-price-breakdown">
                <div className="alc-price-row">
                  <span>{LISTING.currency}{LISTING.price} × {nights} nights</span>
                  <span>{LISTING.currency}{subtotal}</span>
                </div>
                <div className="alc-price-row">
                  <span>Cleaning fee</span>
                  <span>{LISTING.currency}{LISTING.cleaningFee}</span>
                </div>
                <div className="alc-price-row">
                  <span>Service fee</span>
                  <span>{LISTING.currency}{LISTING.serviceFee}</span>
                </div>
                <div className="alc-divider" style={{ margin: '16px 0' }} />
                <div className="alc-price-row alc-price-total">
                  <span>Total</span>
                  <span>{LISTING.currency}{total}</span>
                </div>
              </div>
            </div>
            <button type="button" className="alc-text-btn alc-report-link">
              <Flag size={14} aria-hidden="true" /> Report this listing
            </button>
          </aside>
        </div>
      </main>

      <Modal
        isOpen={datesOpen}
        onClose={() => setDatesOpen(false)}
        labelledBy={datesTitleId + '-modal'}
        className="alc-modal-panel alc-modal-dates"
      >
        <div className="alc-modal-header">
          <h2 id={datesTitleId + '-modal'} className="alc-h2">Select dates</h2>
          <button type="button" className="alc-icon-btn" onClick={() => setDatesOpen(false)} aria-label="Close date picker">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="alc-modal-scroll">
          <Calendar range={range} onSelect={setRange} monthsToShow={2} />
        </div>
      </Modal>

      {/* ---------------- Mobile sticky bar ---------------- */}
      <div className="alc-mobile-bar">
        <div>
          <strong>{LISTING.currency}{LISTING.price}</strong> night
          <div className="alc-meta-rating">
            <RatingStars rating={LISTING.rating} size={12} />
            <span>{LISTING.rating.toFixed(2)} · {LISTING.reviewCount} reviews</span>
          </div>
        </div>
        <button
          type="button"
          className="alc-reserve-btn alc-reserve-btn-sm"
          onClick={() => { setReserveMsg('This is a demo — no reservation was created.'); setTimeout(() => setReserveMsg(''), 4000); }}
        >
          Reserve
        </button>
      </div>

      <footer className="alc-footer">
        <div className="alc-footer-row">
          <span>© 2026 Airbnb</span>
          <div className="alc-footer-links">
            <button type="button" className="alc-text-btn"><Globe size={14} aria-hidden="true" /> English (US)</button>
            <button type="button" className="alc-text-btn">{LISTING.currency} USD</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* =============================================================================
   CSS — Airbnb-inspired design tokens, layout, motion and focus states
   ============================================================================= */
const CSS = `
.alc-root {
  --alc-text: #222222;
  --alc-text-secondary: #6a6a6a;
  --alc-border: #dddddd;
  --alc-border-light: #ebebeb;
  --alc-primary: #E31C5F;
  --alc-gradient: linear-gradient(to right, #E61E4D, #E31C5F, #D70466);
  --alc-bg-hover: #f7f7f7;
  --alc-radius-sm: 8px;
  --alc-radius-md: 12px;
  --alc-radius-lg: 16px;
  --alc-shadow-card: 0 6px 20px rgba(0,0,0,0.12);
  --alc-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --alc-max: 1120px;
  --alc-t: 200ms cubic-bezier(0.2, 0, 0, 1);

  font-family: var(--alc-font);
  color: var(--alc-text);
  background: #fff;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
.alc-root *, .alc-root *::before, .alc-root *::after { box-sizing: border-box; }
.alc-root button { font-family: inherit; cursor: pointer; background: none; border: none; color: inherit; }
.alc-root a { color: inherit; text-decoration: none; }
.alc-root ul { list-style: none; margin: 0; padding: 0; }
.alc-root img { max-width: 100%; display: block; }

.alc-root *:focus { outline: none; }
.alc-root *:focus-visible {
  outline: 2px solid var(--alc-text);
  outline-offset: 2px;
  border-radius: 4px;
}

.alc-skip-link {
  position: absolute; left: -999px; top: 0; background: #fff; color: var(--alc-text);
  padding: 12px 16px; z-index: 200; border-radius: 0 0 8px 0; box-shadow: var(--alc-shadow-card);
}
.alc-skip-link:focus { left: 0; }

.alc-visually-hidden {
  position: absolute; width: 1px; height: 1px; overflow: hidden;
  clip: rect(0 0 0 0); white-space: nowrap;
}

/* ---------- Header ---------- */
.alc-header {
  position: sticky; top: 0; z-index: 50; background: #fff;
  border-bottom: 1px solid var(--alc-border-light);
  transition: box-shadow var(--alc-t);
}
.alc-header.is-scrolled { box-shadow: 0 1px 8px rgba(0,0,0,0.08); }
.alc-header-inner {
  max-width: var(--alc-max); margin: 0 auto; padding: 18px 24px;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
}
.alc-logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 19px; color: var(--alc-primary); flex-shrink: 0; }
.alc-header-search {
  display: flex; align-items: center; gap: 10px; border: 1px solid var(--alc-border);
  border-radius: 999px; padding: 10px 18px; box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  color: var(--alc-text-secondary); font-size: 14px; font-weight: 500;
  transition: box-shadow var(--alc-t); flex: 1; max-width: 380px; overflow: hidden;
}
.alc-header-search:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.14); }
.alc-header-search-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--alc-text); }
.alc-header-menu {
  display: flex; align-items: center; gap: 8px; border: 1px solid var(--alc-border);
  border-radius: 999px; padding: 6px 6px 6px 12px; transition: box-shadow var(--alc-t);
}
.alc-header-menu:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.14); }

/* ---------- Container / layout ---------- */
.alc-container { max-width: var(--alc-max); margin: 0 auto; padding: 24px 24px 80px; }
.alc-root h1.alc-title,
.alc-root h2.alc-h2,
.alc-root h3.alc-h3 {
  color: var(--alc-text);
  font-family: var(--alc-font);
}
.alc-title { font-size: 26px; font-weight: 600; letter-spacing: -0.2px; margin: 0 0 8px; }
.alc-title-meta-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.alc-title-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 14px; }
.alc-title-actions { display: flex; align-items: center; gap: 4px; }
.alc-meta-rating { display: inline-flex; align-items: center; gap: 4px; font-weight: 600; }
.alc-superhost { display: inline-flex; align-items: center; gap: 4px; }
.alc-star-icon { color: var(--alc-text); }
.alc-link-underline { text-decoration: underline; }
.alc-link-underline:hover { color: var(--alc-primary); }

.alc-text-btn {
  display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600;
  padding: 8px 12px; border-radius: var(--alc-radius-sm); transition: background var(--alc-t);
}
.alc-text-btn:hover { background: var(--alc-bg-hover); }
.alc-text-btn[aria-pressed="true"] { color: var(--alc-primary); }

/* ---------- Gallery ---------- */
.alc-gallery {
  position: relative; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(2, 1fr);
  gap: 8px; height: 480px; border-radius: var(--alc-radius-lg); overflow: hidden; margin: 24px 0 32px;
}
.alc-gallery-tile { position: relative; overflow: hidden; padding: 0; display: block; }
.alc-gallery-main { grid-column: 1 / 3; grid-row: 1 / 3; }
.alc-gallery-img, .alc-img-fallback { width: 100%; height: 100%; object-fit: cover; transition: transform 400ms ease; }
.alc-gallery-tile:hover .alc-gallery-img, .alc-gallery-tile:hover .alc-img-fallback { transform: scale(1.04); }
.alc-img-fallback {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  background: #f2f2f2; color: var(--alc-text-secondary); font-size: 12px; text-align: center; padding: 8px;
}
.alc-show-all-btn {
  position: absolute; bottom: 16px; right: 16px; display: inline-flex; align-items: center; gap: 8px;
  background: #fff; border: 1px solid var(--alc-text); border-radius: var(--alc-radius-sm);
  padding: 8px 14px; font-size: 13px; font-weight: 600; box-shadow: 0 2px 6px rgba(0,0,0,0.16);
  transition: transform var(--alc-t);
}
.alc-show-all-btn:hover { transform: scale(1.03); }

@media (max-width: 744px) {
  .alc-gallery { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; height: 280px; border-radius: 0; margin-left: -24px; margin-right: -24px; width: calc(100% + 48px); }
  .alc-gallery-tile { flex: 0 0 100%; scroll-snap-align: start; }
  .alc-gallery-main { grid-column: unset; grid-row: unset; }
  .alc-show-all-btn { bottom: 12px; right: 12px; }
}

/* ---------- Content grid ---------- */
.alc-content-grid { display: grid; grid-template-columns: 1fr 380px; gap: 64px; align-items: start; }
.alc-h2 { font-size: 22px; font-weight: 600; margin: 0 0 16px; }
.alc-h3 { font-size: 16px; font-weight: 600; margin: 0 0 12px; }
.alc-meta-line { color: var(--alc-text); font-size: 16px; margin: 0; }
.alc-divider { border-top: 1px solid var(--alc-border-light); margin: 32px 0; }

.alc-host-row { display: flex; align-items: flex-start; justify-content: space-between; padding-top: 8px; }
.alc-host-avatar {
  width: 56px; height: 56px; border-radius: 50%; background: var(--alc-gradient); color: #fff;
  display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 20px; flex-shrink: 0;
}
.alc-host-avatar-sm { width: 40px; height: 40px; font-size: 15px; }

.alc-highlights { display: flex; flex-direction: column; gap: 24px; }
.alc-highlight { display: flex; gap: 16px; align-items: flex-start; }
.alc-highlight-title { font-weight: 600; margin: 0 0 2px; font-size: 15px; }
.alc-highlight-body { color: var(--alc-text-secondary); margin: 0; font-size: 14px; }

.alc-description { position: relative; max-height: 78px; overflow: hidden; transition: max-height 320ms ease; }
.alc-description.is-expanded { max-height: 600px; }
.alc-description p { margin: 0; white-space: pre-line; }
.alc-underline-btn { text-decoration: underline; padding-left: 0; margin-top: 8px; }

.alc-amenities-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px 24px; margin-bottom: 24px; }
.alc-amenity { display: flex; align-items: center; gap: 14px; font-size: 15px; }

.alc-secondary-btn {
  border: 1px solid var(--alc-text); border-radius: var(--alc-radius-sm); padding: 12px 20px;
  font-weight: 600; font-size: 15px; transition: background var(--alc-t);
}
.alc-secondary-btn:hover { background: var(--alc-bg-hover); }

/* ---------- Calendar ---------- */
.alc-calendar { border: 1px solid var(--alc-border-light); border-radius: var(--alc-radius-md); padding: 20px; }
.alc-calendar-nav { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 4px; }
.alc-calendar-months { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
@media (max-width: 744px) { .alc-calendar-months { grid-template-columns: 1fr; } }
.alc-calendar-title { font-weight: 600; margin-bottom: 12px; }
.alc-calendar-weekdays, .alc-calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
.alc-calendar-weekdays { font-size: 12px; color: var(--alc-text-secondary); text-align: center; margin-bottom: 4px; }
.alc-calendar-weekdays span { padding: 4px 0; }
.alc-calendar-cell {
  aspect-ratio: 1; border-radius: 50%; font-size: 14px; transition: background var(--alc-t);
  display: flex; align-items: center; justify-content: center;
}
.alc-calendar-cell:not(:disabled):hover { background: var(--alc-bg-hover); }
.alc-calendar-cell:disabled { color: #cccccc; cursor: not-allowed; }
.alc-calendar-cell.is-selected { background: var(--alc-text); color: #fff; }
.alc-calendar-cell.is-inrange { background: var(--alc-bg-hover); }
.alc-calendar-cell-empty { visibility: hidden; }

/* ---------- Reviews ---------- */
.alc-reviews-heading { display: flex; align-items: center; gap: 8px; }
.alc-rating-bars { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 32px; margin-bottom: 32px; }
.alc-rating-bar-row { display: grid; grid-template-columns: 90px 1fr 24px; align-items: center; gap: 10px; font-size: 13px; }
.alc-rating-bar-track { height: 4px; background: var(--alc-border-light); border-radius: 2px; overflow: hidden; }
.alc-rating-bar-fill { display: block; height: 100%; background: var(--alc-text); border-radius: 2px; transition: width 600ms ease; }
.alc-reviews-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px 24px; margin-bottom: 24px; }
@media (max-width: 744px) { .alc-reviews-grid, .alc-rating-bars { grid-template-columns: 1fr; } }
.alc-review-card { transition: transform var(--alc-t); }
.alc-review-card:hover { transform: translateY(-2px); }
.alc-review-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.alc-review-name { font-weight: 600; margin: 0; font-size: 14px; }
.alc-review-date { color: var(--alc-text-secondary); margin: 0; font-size: 13px; }
.alc-review-stars { display: flex; gap: 2px; margin-bottom: 8px; }
.alc-review-text {
  margin: 0; font-size: 14px; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;
}

/* ---------- Meet your host ---------- */
.alc-host-meet-grid { display: grid; grid-template-columns: minmax(280px, 360px) 1fr; gap: 48px; align-items: start; }
.alc-host-left { display: flex; flex-direction: column; gap: 24px; }
.alc-host-card {
  border: 1px solid var(--alc-border-light); border-radius: var(--alc-radius-lg); box-shadow: var(--alc-shadow-card);
  padding: 28px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 4px;
}
.alc-host-card-top { display: flex; align-items: center; gap: 24px; margin-bottom: 12px; }
.alc-host-photo-wrap { position: relative; flex-shrink: 0; }
.alc-host-avatar-lg { width: 90px; height: 90px; font-size: 32px; }
.alc-host-verified-badge {
  position: absolute; bottom: -2px; right: -2px; width: 26px; height: 26px; border-radius: 50%;
  background: var(--alc-primary); color: #fff; display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff;
}
.alc-host-card-stats { display: flex; flex-direction: column; gap: 10px; text-align: left; }
.alc-host-stat { display: flex; flex-direction: column; line-height: 1.3; }
.alc-host-stat strong { font-size: 17px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; }
.alc-host-stat span { font-size: 12px; color: var(--alc-text-secondary); }
.alc-host-card-name { font-size: 28px; font-weight: 700; margin: 4px 0 0; }
.alc-host-card-superhost { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; margin: 0; }

.alc-host-bio { display: flex; flex-direction: column; gap: 14px; font-size: 15px; }
.alc-host-bio p { margin: 0; display: flex; align-items: center; gap: 12px; }
.alc-host-bio-text { display: block; line-height: 1.6; color: var(--alc-text); }

.alc-host-info { display: flex; flex-direction: column; }
.alc-host-info-text { margin: 0 0 8px; font-size: 15px; }
.alc-host-details-title { margin-top: 24px; }
.alc-message-host-btn {
  align-self: flex-start; margin-top: 8px; background: var(--alc-text); color: #fff; font-weight: 600;
  font-size: 15px; padding: 13px 24px; border-radius: var(--alc-radius-sm); transition: background var(--alc-t);
}
.alc-message-host-btn:hover { background: #000; }
.alc-host-info-divider { margin: 24px 0; }
.alc-host-payment-note {
  display: flex; align-items: center; gap: 14px; font-size: 13px; color: var(--alc-text-secondary); margin: 0;
}
@media (max-width: 900px) {
  .alc-host-meet-grid { grid-template-columns: 1fr; }
  .alc-host-card { align-items: flex-start; text-align: left; }
  .alc-host-card-top { align-items: flex-start; }
}
@media (max-width: 480px) {
  .alc-host-card-top { flex-direction: column; align-items: center; text-align: center; }
  .alc-host-card-stats { flex-direction: row; justify-content: center; gap: 20px; text-align: center; }
  .alc-host-stat { align-items: center; }
}

/* ---------- Things to know ---------- */
.alc-things-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
@media (max-width: 744px) { .alc-things-grid { grid-template-columns: 1fr; } }
.alc-thing-card { display: flex; flex-direction: column; gap: 10px; }
.alc-thing-title { font-weight: 600; font-size: 16px; margin: 4px 0 0; }
.alc-thing-body { display: flex; flex-direction: column; }
.alc-thing-body p { margin: 0; font-size: 14px; color: var(--alc-text-secondary); line-height: 1.6; }
.alc-thing-link { text-decoration: underline; padding-left: 0; margin-top: 4px; align-self: flex-start; }

/* ---------- Map ---------- */
.alc-map-placeholder {
  height: 320px; border-radius: var(--alc-radius-md); overflow: hidden;
  background: #f2f2f2; margin-bottom: 12px; border: 1px solid var(--alc-border-light);
}
.alc-map-iframe { width: 100%; height: 100%; border: 0; display: block; }
.alc-map-caption { color: var(--alc-text-secondary); font-size: 13px; margin: 0; }

.alc-policies { display: flex; flex-direction: column; gap: 24px; }
.alc-policy { display: flex; gap: 16px; align-items: flex-start; }

/* ---------- Booking card ---------- */
.alc-booking-col { position: sticky; top: 100px; }
.alc-booking-card {
  border: 1px solid var(--alc-border); border-radius: var(--alc-radius-lg); box-shadow: var(--alc-shadow-card);
  padding: 24px; display: flex; flex-direction: column; gap: 20px;
}
.alc-booking-price-row { display: flex; align-items: center; justify-content: space-between; font-size: 20px; }
.alc-booking-price-row strong { font-size: 20px; }

.alc-booking-fields { border: 1px solid var(--alc-border); border-radius: var(--alc-radius-md); overflow: hidden; }
.alc-field {
  display: flex; flex-direction: column; align-items: flex-start; width: 100%; padding: 10px 14px;
  border-bottom: 1px solid var(--alc-border); transition: background var(--alc-t);
}
.alc-field:hover { background: var(--alc-bg-hover); }
.alc-field:last-child, .alc-field-guests { border-bottom: none; }
.alc-field-half { width: 50%; display: inline-flex; border-bottom: 1px solid var(--alc-border); }
.alc-field-border-left { border-left: 1px solid var(--alc-border); }
.alc-field-label { font-size: 10px; font-weight: 700; letter-spacing: 0.4px; color: var(--alc-text); }
.alc-field-value { font-size: 14px; color: var(--alc-text-secondary); margin-top: 2px; }

.alc-guest-picker { position: relative; width: 100%; }
.alc-guest-panel {
  position: absolute; top: calc(100% + 8px); left: 0; right: 0; background: #fff; border: 1px solid var(--alc-border-light);
  border-radius: var(--alc-radius-md); box-shadow: var(--alc-shadow-card); padding: 16px; z-index: 10;
  animation: alc-pop-in 160ms ease;
}
.alc-stepper-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--alc-border-light); }
.alc-stepper-row:last-of-type { border-bottom: none; }
.alc-stepper-label { font-weight: 600; font-size: 14px; }
.alc-stepper-hint { color: var(--alc-text-secondary); font-size: 12px; }
.alc-stepper-controls { display: flex; align-items: center; gap: 12px; }
.alc-stepper-btn {
  width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--alc-border);
  display: flex; align-items: center; justify-content: center; transition: border-color var(--alc-t), color var(--alc-t);
}
.alc-stepper-btn:hover:not(:disabled) { border-color: var(--alc-text); }
.alc-stepper-btn:disabled { color: var(--alc-border); cursor: not-allowed; }
.alc-stepper-value { min-width: 16px; text-align: center; font-size: 14px; }
.alc-guest-note { font-size: 12px; color: var(--alc-text-secondary); margin: 12px 0 0; }

.alc-reserve-btn {
  background: var(--alc-gradient); color: #fff; font-weight: 600; font-size: 16px; padding: 14px;
  border-radius: var(--alc-radius-sm); transition: filter var(--alc-t), transform var(--alc-t);
}
.alc-reserve-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
.alc-reserve-note { text-align: center; font-size: 12px; color: var(--alc-text-secondary); margin: 0; min-height: 16px; }

.alc-price-breakdown { display: flex; flex-direction: column; }
.alc-price-row { display: flex; justify-content: space-between; font-size: 15px; padding: 6px 0; text-decoration: underline; text-decoration-color: transparent; }
.alc-price-row span:first-child { text-decoration: underline; text-decoration-color: var(--alc-border); text-underline-offset: 3px; }
.alc-price-total { font-weight: 700; }
.alc-price-total span:first-child { text-decoration: none; }

.alc-report-link { margin: 16px auto 0; display: flex; color: var(--alc-text-secondary); }

@media (max-width: 960px) {
  .alc-content-grid { grid-template-columns: 1fr; gap: 0; }
  .alc-booking-col { position: static; display: none; }
}

/* ---------- Mobile sticky bar ---------- */
.alc-mobile-bar {
  display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #fff;
  border-top: 1px solid var(--alc-border-light); padding: 14px 24px; align-items: center; justify-content: space-between;
  z-index: 40; box-shadow: 0 -4px 12px rgba(0,0,0,0.06);
}
.alc-mobile-bar .alc-meta-rating { font-weight: 400; font-size: 13px; color: var(--alc-text-secondary); }
.alc-reserve-btn-sm { padding: 12px 28px; }
@media (max-width: 960px) { .alc-mobile-bar { display: flex; } .alc-container { padding-bottom: 96px; } }

/* ---------- Footer ---------- */
.alc-footer { border-top: 1px solid var(--alc-border-light); padding: 24px; }
.alc-footer-row { max-width: var(--alc-max); margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--alc-text-secondary); }
.alc-footer-links { display: flex; gap: 8px; }

/* ---------- Modal / Lightbox ---------- */
.alc-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 100;
  display: flex; align-items: center; justify-content: center; padding: 24px;
  animation: alc-fade-in 200ms ease;
}
.alc-modal-panel {
  background: #fff; border-radius: var(--alc-radius-lg); width: min(720px, 100%); max-height: 85vh;
  display: flex; flex-direction: column; animation: alc-pop-in 220ms ease;
}
.alc-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid var(--alc-border-light); }
.alc-modal-scroll { padding: 24px; overflow-y: auto; }
.alc-amenity-category { margin-bottom: 28px; }
.alc-amenity-list { display: flex; flex-direction: column; gap: 14px; }
.alc-amenity-list li { display: flex; align-items: center; gap: 12px; font-size: 15px; }

.alc-icon-btn {
  width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  transition: background var(--alc-t);
}
.alc-icon-btn:hover { background: var(--alc-bg-hover); }

.alc-lightbox { background: #000; width: 100%; height: 100%; max-height: 100%; border-radius: 0; color: #fff; }
.alc-lightbox-top { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; }
.alc-lightbox-close { color: #fff; }
.alc-lightbox-close:hover { background: rgba(255,255,255,0.15); }
.alc-lightbox-counter { font-size: 14px; }
.alc-lightbox-body { flex: 1; display: flex; align-items: center; justify-content: center; gap: 16px; padding: 0 24px; min-height: 0; }
.alc-lightbox-img { max-height: 70vh; max-width: 100%; object-fit: contain; border-radius: 8px; }
.alc-lightbox-nav {
  width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.15); color: #fff;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background var(--alc-t);
}
.alc-lightbox-nav:hover { background: rgba(255,255,255,0.3); }
.alc-lightbox-caption { text-align: center; padding: 16px; color: rgba(255,255,255,0.7); font-size: 13px; }

/* ---------- Scroll reveal ---------- */
.alc-reveal { opacity: 0.6; transform: translateY(10px); transition: opacity 100ms ease, transform 100ms ease; }
.alc-reveal.is-visible { opacity: 1; transform: translateY(0); }

@keyframes alc-fade-in { from { opacity: 0; } to { opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .alc-root * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .alc-reveal { opacity: 1 !important; transform: none !important; }
  .alc-gallery-tile:hover .alc-gallery-img { transform: none !important; }
}
`;