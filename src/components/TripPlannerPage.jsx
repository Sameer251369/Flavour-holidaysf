import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, LoaderCircle, MessageCircle, RefreshCw } from 'lucide-react';
import { fetchTripPlannerOptions, submitTripInquiry } from '../services/api';
import OptimizedImage from './OptimizedImage';
import '../styles/trip-planner.css';

const STEPS = ['Destinations', 'Travel details', 'Stay', 'Transport', 'Experiences', 'Budget & style', 'Your details', 'Review'];
const initialForm = {
  destination_slugs: [], departure_date: '', return_date: '', adults: 2, children: 0, infants: 0,
  stay_slug: '', transport_slug: '', activity_slugs: [], additional_service_slugs: [], budget_slug: '', budget_scope: 'per_person',
  travel_style_slug: '', name: '', email: '', phone_country_code: '+91', phone: '', food_preferences: '',
  special_requests: '', accessibility_needs: '', additional_information: '', website: '',
};

const tripOverlapsSeason = (departureValue, returnValue, season) => {
  if (!departureValue || !returnValue) return false;
  const departure = new Date(`${departureValue}T00:00:00`);
  const returning = new Date(`${returnValue}T00:00:00`);
  for (let year = departure.getFullYear() - 1; year <= returning.getFullYear(); year += 1) {
    const starts = new Date(year, season.start_month - 1, season.start_day);
    const wrapsYear = season.start_month > season.end_month || (season.start_month === season.end_month && season.start_day > season.end_day);
    const ends = new Date(year + (wrapsYear ? 1 : 0), season.end_month - 1, season.end_day);
    if (starts <= returning && ends >= departure) return true;
  }
  return false;
};

const TripPlannerPage = () => {
  const [options, setOptions] = useState(null);
  const [optionsError, setOptionsError] = useState('');
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const loadOptions = async () => {
    setOptionsError('');
    try {
      setOptions(await fetchTripPlannerOptions());
    } catch {
      setOptionsError('We could not load trip options. Check your connection and try again.');
    }
  };
  useEffect(() => {
    let active = true;
    fetchTripPlannerOptions()
      .then((data) => { if (active) setOptions(data); })
      .catch(() => { if (active) setOptionsError('We could not load trip options. Check your connection and try again.'); });
    return () => { active = false; };
  }, []);

  const nights = useMemo(() => {
    if (!form.departure_date || !form.return_date) return 0;
    return Math.max(0, Math.round((new Date(`${form.return_date}T00:00:00`) - new Date(`${form.departure_date}T00:00:00`)) / 86400000));
  }, [form.departure_date, form.return_date]);
  const travelers = Number(form.adults || 0) + Number(form.children || 0) + Number(form.infants || 0);
  const selected = (list, slug) => list?.find((option) => option.slug === slug);
  const chosenPlaces = (options?.destinations || []).filter((place) => form.destination_slugs.includes(place.slug));
  const estimate = useMemo(() => {
    if (!options) return null;
    const stay = selected(options.stays, form.stay_slug);
    const transport = selected(options.transports, form.transport_slug);
    const activities = options.activities.filter((activity) => form.activity_slugs.includes(activity.slug));
    const services = options.additional_services.filter((service) => form.additional_service_slugs.includes(service.slug));
    const lines = [];
    const missing = [];
    if (stay) {
      if (stay.estimate_per_night == null) missing.push('accommodation');
      else lines.push({ label: `${stay.name} · ${nights} nights`, amount: stay.estimate_per_night * Math.max(nights, 1) });
    }
    if (transport) {
      if (transport.estimate_per_day == null) missing.push('transportation');
      else lines.push({ label: `${transport.name} · ${Math.max(nights + 1, 1)} days`, amount: transport.estimate_per_day * Math.max(nights + 1, 1) });
    }
    activities.forEach((activity) => {
      if (activity.estimate_amount == null) missing.push(activity.name);
      else lines.push({ label: `${activity.name} · ${travelers} travellers`, amount: activity.estimate_amount * travelers });
    });
    services.forEach((service) => {
      if (service.estimate_amount == null) missing.push(service.name);
      else lines.push({ label: service.name, amount: service.estimate_amount });
    });
    const total = lines.reduce((sum, line) => sum + line.amount, 0);
    const season = options.seasonal_rates?.find((rate) => tripOverlapsSeason(form.departure_date, form.return_date, rate));
    const multiplier = season ? Number(season.multiplier) : 1;
    const adjustedTotal = Math.round(total * multiplier);
    const displayLines = season && adjustedTotal !== total
      ? [...lines, { label: `${season.name} seasonal adjustment`, amount: adjustedTotal - total }]
      : lines;
    return lines.length && !missing.length ? { lines: displayLines, total: adjustedTotal, missing, season: season?.name } : { lines: displayLines, total: null, missing, season: season?.name };
  }, [options, form.stay_slug, form.transport_slug, form.activity_slugs, form.additional_service_slugs, form.departure_date, form.return_date, nights, travelers]);

  const setField = (name, value) => setForm((current) => ({ ...current, [name]: value }));
  const toggle = (name, slug) => setForm((current) => ({
    ...current,
    [name]: current[name].includes(slug) ? current[name].filter((item) => item !== slug) : [...current[name], slug],
  }));

  const validateStep = () => {
    const nextErrors = {};
    if (step === 0 && !form.destination_slugs.length) nextErrors.destination_slugs = 'Choose at least one destination.';
    if (step === 1) {
      const departure = form.departure_date && new Date(`${form.departure_date}T00:00:00`);
      const returning = form.return_date && new Date(`${form.return_date}T00:00:00`);
      if (!departure || Number.isNaN(departure.getTime())) nextErrors.departure_date = 'Choose a departure date.';
      else if (departure < new Date(new Date().toDateString())) nextErrors.departure_date = 'Departure date cannot be in the past.';
      if (!returning || Number.isNaN(returning.getTime())) nextErrors.return_date = 'Choose a return date.';
      else if (departure && returning <= departure) nextErrors.return_date = 'Return must be after departure.';
      if (travelers < 1 || Number(form.adults) < 1) nextErrors.adults = 'At least one adult is required.';
      if (travelers > 30) nextErrors.children = 'For groups over 30, please contact our team.';
    }
    if (step === 6) {
      if (!form.name.trim()) nextErrors.name = 'Enter your name.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
      if (!/^[0-9\s()+-]{6,20}$/.test(form.phone.trim())) nextErrors.phone = 'Enter a valid phone number.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => { if (validateStep()) setStep((current) => Math.min(current + 1, STEPS.length - 1)); };
  const back = () => { setErrors({}); setStep((current) => Math.max(current - 1, 0)); };

  const submit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setErrors({});
    try {
      const response = await submitTripInquiry({
        ...form,
        adults: Number(form.adults), children: Number(form.children), infants: Number(form.infants),
        stay_slug: form.stay_slug || null, transport_slug: form.transport_slug || null,
        budget_slug: form.budget_slug || null, travel_style_slug: form.travel_style_slug || null,
      });
      setResult(response);
    } catch (error) {
      const data = error?.response?.data;
      if (data && typeof data === 'object') {
        const flatErrors = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, Array.isArray(value) ? value[0] : String(value)]));
        setErrors({ submit: flatErrors.detail || 'Please check the highlighted information and try again.', ...flatErrors });
      } else setErrors({ submit: 'We could not send your request. Please try again in a moment.' });
    } finally { setSubmitting(false); }
  };

  if (result) return (
    <main className="trip-page trip-page--success">
      <section className="trip-success-card">
        <span className="trip-success-icon"><CheckCircle2 size={34} /></span>
        <p className="trip-eyebrow">Enquiry received</p>
        <h1>Your Himalayan trip is taking shape.</h1>
        <p>Our travel team will review your preferences and contact you with a personalized plan.</p>
        <div className="trip-reference"><span>Reference ID</span><strong>{result.reference_id}</strong></div>
        <div className="trip-success-actions">
          <a href="/" className="trip-button trip-button--secondary">Back to Flavour Holidays</a>
          {result.whatsapp_url && <a href={result.whatsapp_url} target="_blank" rel="noreferrer" className="trip-button trip-button--primary"><MessageCircle size={17} /> Continue on WhatsApp</a>}
        </div>
      </section>
    </main>
  );

  return (
    <main className="trip-page">
      <div className="trip-page-heading">
        <p className="trip-eyebrow">Your journey, your way</p>
        <h1>Customize your trip</h1>
        <p>Share what you have in mind. Our local team will shape it into a thoughtful Kashmir or Ladakh itinerary.</p>
      </div>
      {optionsError ? <div className="trip-load-error" role="alert"><p>{optionsError}</p><button type="button" onClick={loadOptions}><RefreshCw size={16} /> Try again</button></div> : !options ? <div className="trip-loading"><LoaderCircle className="trip-spin" /> Loading trip options…</div> : (
        <div className="trip-wizard">
          <div className="trip-progress" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
            <div className="trip-progress__bar"><span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div>
            <div className="trip-progress__labels">{STEPS.map((label, index) => <span key={label} className={index === step ? 'is-current' : index < step ? 'is-done' : ''}>{index < step ? <Check size={13} /> : <b>{index + 1}</b>}<em>{label}</em></span>)}</div>
          </div>
          <section className="trip-step-panel" aria-live="polite">
            <div className="trip-step-heading"><span>Step {step + 1} of {STEPS.length}</span><h2>{STEPS[step]}</h2><p>{[
              'Pick the places you would love to see.', 'Tell us when you are travelling and who is coming.', 'Choose the kind of stay that feels right.', 'Select how you would like to get around.', 'Add experiences that would make this trip special.', 'Set your budget range and travel mood.', 'How can our team reach you?', 'Check your trip details before sending your enquiry.',
            ][step]}</p></div>
            {step === 0 && <><div className="trip-destination-groups">{['kashmir', 'ladakh'].map((region) => <div className="trip-region" key={region}><h3>{region === 'kashmir' ? 'Kashmir' : 'Ladakh'}</h3><div className="trip-destination-grid">{options.destinations.filter((place) => place.region === region).map((place) => { const active = form.destination_slugs.includes(place.slug); return <button type="button" key={place.slug} onClick={() => toggle('destination_slugs', place.slug)} className={`trip-destination-card${active ? ' is-selected' : ''}`} aria-pressed={active}><OptimizedImage src={place.cover_image} alt="" loading="lazy" sizes="(max-width: 640px) 108px, (max-width: 1000px) 30vw, 22vw" /><span className="trip-card-check">{active && <Check size={15} />}</span><span className="trip-card-copy"><strong>{place.name}</strong><small>{place.highlight || place.description}</small></span></button>; })}</div></div>)}</div>{errors.destination_slugs && <p className="trip-error">{errors.destination_slugs}</p>}</>}
            {step === 1 && <div className="trip-fields"><label>Departure date<input type="date" min={new Date().toISOString().slice(0, 10)} value={form.departure_date} onChange={(e) => setField('departure_date', e.target.value)} />{errors.departure_date && <small className="trip-error">{errors.departure_date}</small>}</label><label>Return date<input type="date" min={form.departure_date || new Date().toISOString().slice(0, 10)} value={form.return_date} onChange={(e) => setField('return_date', e.target.value)} />{errors.return_date && <small className="trip-error">{errors.return_date}</small>}</label><div className="trip-counts">{[['adults', 'Adults'], ['children', 'Children'], ['infants', 'Infants']].map(([key, label]) => <label key={key}>{label}<span><button type="button" onClick={() => setField(key, Math.max(key === 'adults' ? 1 : 0, Number(form[key]) - 1))} aria-label={`Remove ${label.toLowerCase()}`}>−</button><b>{form[key]}</b><button type="button" onClick={() => setField(key, Math.min(30, Number(form[key]) + 1))} aria-label={`Add ${label.toLowerCase()}`}>+</button></span></label>)}</div><div className="trip-duration"><strong>{travelers} traveller{travelers === 1 ? '' : 's'}</strong><span>{nights > 0 ? `${nights} night${nights === 1 ? '' : 's'}` : 'Choose both dates to see duration'}</span></div>{errors.adults && <p className="trip-error">{errors.adults}</p>}{errors.children && <p className="trip-error">{errors.children}</p>}</div>}
            {step === 2 && <OptionGrid items={options.stays} value={form.stay_slug} onSelect={(v) => setField('stay_slug', form.stay_slug === v ? '' : v)} optional />}
            {step === 3 && <OptionGrid items={options.transports} value={form.transport_slug} onSelect={(v) => setField('transport_slug', form.transport_slug === v ? '' : v)} optional />}
            {step === 4 && <div className="trip-preference-groups"><div><h3>Activities & experiences</h3><OptionGrid items={options.activities} value={form.activity_slugs} onSelect={(v) => toggle('activity_slugs', v)} multiple optional /></div>{options.additional_services.length > 0 && <div><h3>Additional services</h3><OptionGrid items={options.additional_services} value={form.additional_service_slugs} onSelect={(v) => toggle('additional_service_slugs', v)} multiple optional /></div>}</div>}
            {step === 5 && <div className="trip-fields"><div className="trip-option-grid trip-option-grid--budgets">{options.budgets.map((item) => <SelectCard key={item.slug} item={item} active={form.budget_slug === item.slug} onClick={() => setField('budget_slug', form.budget_slug === item.slug ? '' : item.slug)} />)}</div><fieldset className="trip-budget-scope"><legend>How should we understand this budget?</legend>{[['per_person', 'Per person'], ['total', 'Total trip']].map(([value, label]) => <label key={value}><input type="radio" name="budget_scope" checked={form.budget_scope === value} onChange={() => setField('budget_scope', value)} />{label}</label>)}</fieldset><div className="trip-option-grid">{options.travel_styles.map((item) => <SelectCard key={item.slug} item={item} active={form.travel_style_slug === item.slug} onClick={() => setField('travel_style_slug', form.travel_style_slug === item.slug ? '' : item.slug)} />)}</div></div>}
            {step === 6 && <div className="trip-fields"><div className="trip-fields__row"><label>Full name<input autoComplete="name" value={form.name} onChange={(e) => setField('name', e.target.value)} />{errors.name && <small className="trip-error">{errors.name}</small>}</label><label>Email address<input type="email" autoComplete="email" value={form.email} onChange={(e) => setField('email', e.target.value)} />{errors.email && <small className="trip-error">{errors.email}</small>}</label></div><div className="trip-fields__row"><label>Country code<input className="trip-country" value={form.phone_country_code} onChange={(e) => setField('phone_country_code', e.target.value)} aria-label="Phone country code" /></label><label>Phone number<input type="tel" autoComplete="tel-national" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />{errors.phone && <small className="trip-error">{errors.phone}</small>}</label></div><label>Food preferences <small>Optional</small><input placeholder="Vegetarian, Jain, no preference…" value={form.food_preferences} onChange={(e) => setField('food_preferences', e.target.value)} /></label><label>Special requests <small>Optional</small><textarea rows="3" value={form.special_requests} onChange={(e) => setField('special_requests', e.target.value)} /></label><label>Accessibility requirements <small>Optional</small><textarea rows="2" value={form.accessibility_needs} onChange={(e) => setField('accessibility_needs', e.target.value)} /></label><label>Anything else we should know? <small>Optional</small><textarea rows="3" value={form.additional_information} onChange={(e) => setField('additional_information', e.target.value)} /></label><label className="trip-honeypot" aria-hidden="true">Website<input tabIndex="-1" autoComplete="off" value={form.website} onChange={(e) => setField('website', e.target.value)} /></label></div>}
            {step === 7 && <Review form={form} options={options} chosenPlaces={chosenPlaces} nights={nights} travelers={travelers} estimate={estimate} onEdit={setStep} />}
            {errors.submit && <p className="trip-submit-error" role="alert">{errors.submit}</p>}
            <div className="trip-step-actions">{step > 0 && <button type="button" onClick={back} className="trip-button trip-button--secondary"><ArrowLeft size={17} /> Back</button>}{step < STEPS.length - 1 ? <button type="button" onClick={next} className="trip-button trip-button--primary">Continue <ArrowRight size={17} /></button> : <button type="button" onClick={submit} disabled={submitting} className="trip-button trip-button--primary">{submitting ? <><LoaderCircle className="trip-spin" size={17} /> Sending…</> : <>Send trip enquiry <ArrowRight size={17} /></>}</button>}</div>
          </section>
        </div>
      )}
    </main>
  );
};

function OptionGrid({ items, value, onSelect, multiple = false, optional = false }) {
  return <><div className="trip-option-grid">{items.map((item) => <SelectCard key={item.slug} item={item} active={multiple ? value.includes(item.slug) : value === item.slug} onClick={() => onSelect(item.slug)} />)}</div><p className="trip-optional-note">{optional ? 'You can skip this and ask our team for recommendations.' : 'Choose any that interest you.'}</p></>;
}

function SelectCard({ item, active, onClick }) {
  return <button type="button" className={`trip-option-card${active ? ' is-selected' : ''}`} onClick={onClick} aria-pressed={active}><span className="trip-option-check">{active && <Check size={14} />}</span><strong>{item.name || item.label}</strong>{item.description && <small>{item.description}</small>}</button>;
}

function Review({ form, options, chosenPlaces, nights, travelers, estimate, onEdit }) {
  const labels = (list, slugs) => list.filter((item) => slugs.includes(item.slug)).map((item) => item.name || item.label).join(', ') || 'Not selected';
  return <div className="trip-review"><ReviewRow title="Destinations" value={chosenPlaces.map((place) => place.name).join(', ')} onEdit={() => onEdit(0)} /><ReviewRow title="Travel dates" value={`${form.departure_date} to ${form.return_date} · ${nights} nights · ${travelers} travellers`} onEdit={() => onEdit(1)} /><ReviewRow title="Accommodation" value={labels(options.stays, form.stay_slug ? [form.stay_slug] : [])} onEdit={() => onEdit(2)} /><ReviewRow title="Transport" value={labels(options.transports, form.transport_slug ? [form.transport_slug] : [])} onEdit={() => onEdit(3)} /><ReviewRow title="Experiences" value={labels(options.activities, form.activity_slugs)} onEdit={() => onEdit(4)} /><ReviewRow title="Additional services" value={labels(options.additional_services, form.additional_service_slugs)} onEdit={() => onEdit(4)} /><ReviewRow title="Budget & style" value={`${labels(options.budgets, form.budget_slug ? [form.budget_slug] : [])} (${form.budget_scope === 'total' ? 'total trip' : 'per person'}) · ${labels(options.travel_styles, form.travel_style_slug ? [form.travel_style_slug] : [])}`} onEdit={() => onEdit(5)} /><ReviewRow title="Contact" value={`${form.name} · ${form.email} · ${form.phone_country_code} ${form.phone}`} onEdit={() => onEdit(6)} />{(form.food_preferences || form.special_requests || form.accessibility_needs || form.additional_information) && <ReviewRow title="Additional requirements" value={[form.food_preferences, form.special_requests, form.accessibility_needs, form.additional_information].filter(Boolean).join(' · ')} onEdit={() => onEdit(6)} />}<div className="trip-estimate-box"><div><span>Trip cost estimate</span><strong>{estimate?.total != null ? `₹${estimate.total.toLocaleString('en-IN')}` : 'Request a Personalized Quote'}</strong></div>{estimate?.lines?.length > 0 && <ul>{estimate.lines.map((line) => <li key={line.label}><span>{line.label}</span><b>₹{line.amount.toLocaleString('en-IN')}</b></li>)}</ul>}<small>{estimate?.total != null ? `Indicative estimate based on configured rates${estimate.season ? ` and the ${estimate.season} seasonal rate` : ''}. Final price will be confirmed by Flavour Holidays.` : 'No configured prices are available for all selected services. Our team will prepare a personalized quote.'}</small></div></div>;
}

function ReviewRow({ title, value, onEdit }) { return <div className="trip-review-row"><div><small>{title}</small><p>{value || 'Not selected'}</p></div><button type="button" onClick={onEdit}>Edit</button></div>; }

export default TripPlannerPage;
