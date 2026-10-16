export const SITE = {
  name: 'Fitmates',
  url: 'https://fitmates.net',
  appUrl: 'https://app.fitmates.net',
  ios: 'https://apps.apple.com/fr/app/fitmates-sports-social/id6756283890',
  android: 'https://play.google.com/store/apps/details?id=com.dlahlou.fitmate',
  logo: 'https://fitmates.net/fitmate_logo_short.png',
  ogImage: 'https://fitmates.net/screenshot_homescreen.png',
  email: 'support@fitmates.app',
  facebook: 'https://www.facebook.com/fitmatestrongertogether',
  locale: 'fr_FR',
  /** Chiffres réels, datés : utilisés dans les pages et le llms.txt. À mettre à jour à chaque trimestre. */
  facts: {
    activeUsers: 1200,
    weeklyParticipations: 100,
    sinceLabel: 'depuis l’été 2026',
    asOf: '2026-10',
    liveSports: ['randonnee'],
    liveRegions: ['Île-de-France'],
  },
};

export function abs(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}
