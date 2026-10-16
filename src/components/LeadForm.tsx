import { useState, type FormEvent } from 'react';
import { SPORTS } from '../data/sports';
import { ZONES } from '../data/zones';
import { SITE } from '../seo/site';

export type LeadType = 'participant' | 'organisateur' | 'partenaire';

interface Props {
  defaultType?: LeadType;
  defaultSport?: string;
  defaultZone?: string;
  source: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

const API = (import.meta.env.VITE_LEADS_API_URL as string | undefined)?.replace(/\/$/, '');

export default function LeadForm({ defaultType = 'participant', defaultSport = '', defaultZone = '', source, title, subtitle, compact }: Props) {
  const [type, setType] = useState<LeadType>(defaultType);
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.website) return; // honeypot
    if (!data.consent) {
      setError('Merci de cocher la case de consentement.');
      return;
    }
    const payload = {
      type,
      first_name: data.first_name?.trim(),
      email: data.email?.trim(),
      sport: data.sport || null,
      zone: data.zone || null,
      message: data.message?.trim() || null,
      source,
      page_url: typeof window !== 'undefined' ? window.location.href : source,
      utm: typeof window !== 'undefined' ? Object.fromEntries([...new URLSearchParams(window.location.search)].filter(([k]) => k.startsWith('utm_'))) : {},
    };
    setState('sending');
    setError('');
    try {
      if (!API) {
        const body = encodeURIComponent(
          `Type : ${payload.type}\nPrénom : ${payload.first_name}\nEmail : ${payload.email}\nSport : ${payload.sport}\nZone : ${payload.zone}\nMessage : ${payload.message ?? ''}\nSource : ${payload.source}`,
        );
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Contact Fitmates – ' + payload.type)}&body=${body}`;
        setState('ok');
        return;
      }
      const res = await fetch(`${API}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState('ok');
      form.reset();
    } catch {
      setState('error');
      setError('Envoi impossible pour le moment. Réessaie ou écris-nous à ' + SITE.email);
    }
  }

  if (state === 'ok') {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-6 text-green-800">
        <p className="font-semibold">Merci ! On te recontacte très vite.</p>
        <p className="text-sm mt-1">En attendant, télécharge l’app pour voir les sorties déjà en ligne.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`rounded-3xl border border-orange-100 bg-gradient-to-br from-white to-orange-50 ${compact ? 'p-6' : 'p-8'} space-y-4`}>
      {title && <h3 className="text-2xl font-bold text-gray-900">{title}</h3>}
      {subtitle && <p className="text-gray-600">{subtitle}</p>}

      <fieldset className="flex flex-wrap gap-2" aria-label="Je suis">
        {(
          [
            ['participant', 'Je veux participer'],
            ['organisateur', 'Je veux organiser'],
            ['partenaire', 'Club, coach ou marque'],
          ] as [LeadType, string][]
        ).map(([val, label]) => (
          <label
            key={val}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              type === val ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-orange-400'
            }`}
          >
            <input type="radio" name="type" value={val} checked={type === val} onChange={() => setType(val)} className="sr-only" />
            {label}
          </label>
        ))}
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm font-medium text-gray-700">
          Prénom
          <input name="first_name" required maxLength={80} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none" />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Email
          <input name="email" type="email" required maxLength={120} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none" />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Sport
          <select name="sport" defaultValue={defaultSport} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 bg-white focus:border-orange-500 focus:outline-none">
            <option value="">Choisir…</option>
            {SPORTS.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Zone
          <select name="zone" defaultValue={defaultZone} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 bg-white focus:border-orange-500 focus:outline-none">
            <option value="">Choisir…</option>
            {ZONES.map((z) => (
              <option key={z.slug} value={z.slug}>
                {z.name}
              </option>
            ))}
            <option value="autre">Autre (hors Île-de-France)</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium text-gray-700">
        {type === 'organisateur' ? 'Ce que tu organises (sport, fréquence, taille du groupe)' : type === 'partenaire' ? 'Ta structure et ton besoin' : 'Message (optionnel)'}
        <textarea name="message" rows={3} maxLength={1000} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none" />
      </label>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <label className="flex items-start gap-2 text-xs text-gray-600">
        <input type="checkbox" name="consent" value="1" className="mt-0.5" />
        <span>
          J’accepte d’être recontacté·e par Fitmates au sujet de ma demande. Mes données ne sont jamais revendues.{' '}
          <a href="/privacy-policy.html" className="underline">
            Politique de confidentialité
          </a>
          .
        </span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-shadow disabled:opacity-60"
      >
        {state === 'sending' ? 'Envoi…' : type === 'participant' ? 'Prévenez-moi des prochaines sorties' : 'Envoyer ma demande'}
      </button>
    </form>
  );
}
