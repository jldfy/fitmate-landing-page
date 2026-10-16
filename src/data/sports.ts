export type SportSlug =
  | 'randonnee'
  | 'course-a-pied'
  | 'trail'
  | 'velo'
  | 'marche-nordique'
  | 'natation'
  | 'escalade'
  | 'yoga'
  | 'pilates'
  | 'fitness'
  | 'tennis'
  | 'padel'
  | 'football'
  | 'basketball';

export interface Sport {
  slug: SportSlug;
  /** Nom affiché (singulier) */
  name: string;
  /** Forme utilisée dans les phrases : "faire de la randonnée", "faire du vélo" */
  phrase: string;
  /** Verbe d'action : "randonner", "courir", "pédaler" */
  verb: string;
  /** Synonymes / variantes de recherche (SEO + LLM) */
  synonyms: string[];
  /** Vertical déjà actif dans l'app (true) ou en ouverture (false) */
  live: boolean;
  /** Ordre de priorité d'ouverture (1 = déjà actif) */
  priority: number;
  /** Saison forte (mois 1-12) pour le calendrier éditorial */
  peakMonths: number[];
  /** Description courte, factuelle, réutilisée dans les meta et le llms.txt */
  short: string;
  /** Pourquoi le faire à plusieurs — argument clé de la page */
  why: string;
  /** Questions fréquentes (FAQ schema) */
  faq: { q: string; a: string }[];
  /** Niveaux proposés */
  levels: string[];
}

export const SPORTS: Sport[] = [
  {
    slug: 'randonnee',
    name: 'Randonnée',
    phrase: 'de la randonnée',
    verb: 'randonner',
    synonyms: ['rando', 'marche', 'trek', 'balade', 'hiking', 'sortie nature', 'GR'],
    live: true,
    priority: 1,
    peakMonths: [3, 4, 5, 6, 9, 10],
    short:
      'Trouve un groupe de randonnée près de chez toi et rejoins une sortie ce week-end : forêt, GR, boucle à la journée, tous niveaux.',
    why:
      'Randonner en groupe, c’est plus sûr, plus motivant et beaucoup plus convivial : on partage le covoiturage ou le train, le pique-nique, et on découvre des itinéraires qu’on n’aurait jamais osé faire seul.',
    levels: ['Débutant (8–12 km, peu de dénivelé)', 'Intermédiaire (12–20 km)', 'Sportif (20 km et +, dénivelé)'],
    faq: [
      {
        q: 'Comment trouver un groupe de randonnée près de chez moi ?',
        a: 'Ouvre Fitmates, choisis « Randonnée » et ta zone : tu vois toutes les sorties à venir avec la date, le point de rendez-vous, la distance et le niveau. Tu rejoins en un clic et tu accèdes au chat du groupe.',
      },
      {
        q: 'Faut-il être expérimenté pour rejoindre une randonnée ?',
        a: 'Non. Chaque sortie indique un niveau (débutant, intermédiaire, sportif), la distance et le dénivelé. Les organisateurs accueillent régulièrement des débutants.',
      },
      {
        q: 'Est-ce gratuit ?',
        a: 'Oui. Rejoindre ou organiser une randonnée sur Fitmates est gratuit. Certaines sorties encadrées par un coach ou une association peuvent avoir un coût indiqué sur la fiche.',
      },
      {
        q: 'Comment organiser ma propre randonnée ?',
        a: 'Décris ta sortie en une phrase (« dimanche 10h, boucle de 15 km depuis Bois-le-Roi, niveau intermédiaire ») : l’app crée l’événement, tu valides, et les participants te rejoignent dans le chat.',
      },
    ],
  },
  {
    slug: 'course-a-pied',
    name: 'Course à pied',
    phrase: 'de la course à pied',
    verb: 'courir',
    synonyms: ['running', 'run club', 'footing', 'jogging', 'sortie running', 'courir en groupe'],
    live: false,
    priority: 2,
    peakMonths: [1, 3, 4, 5, 9, 10],
    short:
      'Rejoins un run club ou une sortie running près de chez toi : footing tranquille, fractionné, sortie longue, tous rythmes.',
    why:
      'Courir à plusieurs fait tenir le rythme, sécurise les sorties du soir et transforme une contrainte en rendez-vous. Les run clubs sont devenus le premier lieu de rencontre sportive en ville.',
    levels: ['Débutant (5 km, 7 min/km et +)', 'Intermédiaire (10 km, 5:30–6:30 min/km)', 'Confirmé (semi, marathon, fractionné)'],
    faq: [
      {
        q: 'Comment rejoindre un run club ?',
        a: 'Sur Fitmates, filtre « Course à pied » et ta ville : tu vois les sorties récurrentes des run clubs et les footings ponctuels proposés par des membres. Le rythme (min/km) et la distance sont indiqués.',
      },
      {
        q: 'Je débute, puis-je courir avec un groupe ?',
        a: 'Oui. De nombreuses sorties sont annoncées « allure conversation » ou « débutant ». Cherche les sorties de 5 km à allure libre.',
      },
    ],
  },
  {
    slug: 'trail',
    name: 'Trail',
    phrase: 'du trail',
    verb: 'courir en nature',
    synonyms: ['trail running', 'course nature', 'sortie trail', 'ultra'],
    live: false,
    priority: 5,
    peakMonths: [3, 4, 5, 6, 9, 10],
    short: 'Sorties trail en groupe : forêts, dénivelé, préparation de courses.',
    why: 'Le trail se prépare rarement seul : repérage des parcours, sécurité, motivation sur les longues sorties.',
    levels: ['Découverte (10–15 km)', 'Intermédiaire (15–30 km)', 'Ultra (30 km et +)'],
    faq: [],
  },
  {
    slug: 'velo',
    name: 'Vélo',
    phrase: 'du vélo',
    verb: 'pédaler',
    synonyms: ['cyclisme', 'sortie vélo', 'vélo de route', 'gravel', 'VTT', 'cyclotourisme'],
    live: false,
    priority: 3,
    peakMonths: [4, 5, 6, 7, 8, 9],
    short: 'Sorties vélo en groupe : route, gravel, VTT, balades tranquilles ou sorties sportives.',
    why: 'Rouler en peloton, c’est moins d’effort, plus de sécurité sur la route et des itinéraires partagés.',
    levels: ['Balade (20–40 km, plat)', 'Intermédiaire (40–80 km)', 'Sportif (80 km et +, dénivelé)'],
    faq: [
      {
        q: 'Comment trouver un groupe de vélo près de chez moi ?',
        a: 'Filtre « Vélo » et ta zone sur Fitmates : chaque sortie indique le type (route, gravel, VTT), la distance, la vitesse moyenne visée et le point de départ.',
      },
    ],
  },
  {
    slug: 'marche-nordique',
    name: 'Marche nordique',
    phrase: 'de la marche nordique',
    verb: 'marcher',
    synonyms: ['nordic walking', 'marche sportive', 'marche active'],
    live: false,
    priority: 7,
    peakMonths: [3, 4, 5, 9, 10, 11],
    short: 'Séances de marche nordique en groupe, tous âges, en parc ou en forêt.',
    why: 'La marche nordique est un sport collectif par nature : rythme commun, séance encadrée, convivialité.',
    levels: ['Initiation', 'Régulier', 'Sportif'],
    faq: [],
  },
  {
    slug: 'natation',
    name: 'Natation',
    phrase: 'de la natation',
    verb: 'nager',
    synonyms: ['nage', 'piscine', 'eau libre', 'open water'],
    live: false,
    priority: 10,
    peakMonths: [1, 6, 7, 8],
    short: 'Partenaires de natation en piscine ou en eau libre.',
    why: 'Trouver un binôme de nage pour les séances techniques ou les sorties eau libre, où nager seul est déconseillé.',
    levels: ['Loisir', 'Entraînement', 'Eau libre'],
    faq: [],
  },
  {
    slug: 'escalade',
    name: 'Escalade',
    phrase: 'de l’escalade',
    verb: 'grimper',
    synonyms: ['grimpe', 'bloc', 'voie', 'bouldering', 'salle d’escalade', 'partenaire d’escalade'],
    live: false,
    priority: 6,
    peakMonths: [1, 2, 3, 10, 11, 12],
    short: 'Trouve un partenaire d’escalade pour grimper en salle ou en extérieur (bloc, voie).',
    why: 'En voie, il faut un assureur. En bloc, on progresse en regardant les autres. L’escalade est le sport où le « partenaire » est indispensable.',
    levels: ['Débutant (bloc jusqu’au 5, voie 5c)', 'Intermédiaire (6a–6c)', 'Confirmé (7a et +)'],
    faq: [
      {
        q: 'Comment trouver un partenaire d’escalade ?',
        a: 'Publie une session (« jeudi 19h, salle X, voie, niveau 6a ») ou rejoins-en une. Le niveau et le type (bloc ou voie) sont indiqués pour chaque session.',
      },
    ],
  },
  {
    slug: 'yoga',
    name: 'Yoga',
    phrase: 'du yoga',
    verb: 'pratiquer',
    synonyms: ['yoga en plein air', 'yoga parc', 'vinyasa', 'hatha', 'séance de yoga'],
    live: false,
    priority: 8,
    peakMonths: [1, 5, 6, 7, 9],
    short: 'Séances de yoga en groupe, en studio ou en plein air.',
    why: 'Les séances collectives en parc ou en studio sont le format qui fait revenir : rendez-vous fixe, communauté, prof identifié.',
    levels: ['Tous niveaux'],
    faq: [],
  },
  {
    slug: 'pilates',
    name: 'Pilates',
    phrase: 'du pilates',
    verb: 'pratiquer',
    synonyms: ['pilates mat', 'renforcement doux', 'pilates en plein air'],
    live: false,
    priority: 9,
    peakMonths: [1, 2, 9, 10],
    short: 'Séances de pilates collectives, tous niveaux.',
    why: 'Le pilates est l’une des pratiques en plus forte croissance, surtout chez les 25–40 ans, et se pratique quasi exclusivement en groupe.',
    levels: ['Tous niveaux'],
    faq: [],
  },
  {
    slug: 'fitness',
    name: 'Fitness',
    phrase: 'du fitness',
    verb: 's’entraîner',
    synonyms: ['musculation', 'cross training', 'hyrox', 'bootcamp', 'renforcement musculaire', 'gym partner'],
    live: false,
    priority: 11,
    peakMonths: [1, 2, 3, 5, 9],
    short: 'Séances de fitness, bootcamp ou cross-training en groupe, en salle ou en plein air.',
    why: 'Les formats collectifs (bootcamp, Hyrox, cross-training) explosent parce que la motivation vient du groupe.',
    levels: ['Débutant', 'Intermédiaire', 'Confirmé'],
    faq: [],
  },
  {
    slug: 'tennis',
    name: 'Tennis',
    phrase: 'du tennis',
    verb: 'jouer',
    synonyms: ['partenaire tennis', 'match tennis', 'tennis loisir'],
    live: false,
    priority: 12,
    peakMonths: [4, 5, 6, 7, 8, 9],
    short: 'Trouve un partenaire de tennis de ton niveau près de chez toi.',
    why: 'Le tennis ne se joue pas seul : le vrai problème est de trouver quelqu’un de son niveau, disponible au même créneau.',
    levels: ['Débutant', 'Classé 30', 'Classé 15 et +'],
    faq: [],
  },
  {
    slug: 'padel',
    name: 'Padel',
    phrase: 'du padel',
    verb: 'jouer',
    synonyms: ['partenaire padel', 'match padel', 'padel paris', 'padel débutant'],
    live: false,
    priority: 4,
    peakMonths: [1, 2, 3, 9, 10, 11],
    short: 'Complète ta partie de padel : trouve 1 à 3 joueurs de ton niveau près de chez toi.',
    why: 'Le padel se joue à 4 : la difficulté numéro un des joueurs est de compléter une partie. C’est exactement ce que Fitmates résout.',
    levels: ['Débutant', 'Intermédiaire', 'Confirmé'],
    faq: [
      {
        q: 'Comment trouver des joueurs de padel de mon niveau ?',
        a: 'Publie une partie (club, créneau, niveau, places manquantes) ou rejoins une partie ouverte. Le niveau de chaque joueur est visible sur son profil.',
      },
    ],
  },
  {
    slug: 'football',
    name: 'Football',
    phrase: 'du football',
    verb: 'jouer',
    synonyms: ['foot à 5', 'five', 'match de foot', 'foot entre amis', 'futsal'],
    live: false,
    priority: 13,
    peakMonths: [9, 10, 11, 3, 4, 5],
    short: 'Complète ton équipe de foot à 5 ou rejoins un match près de chez toi.',
    why: 'Le foot à 5 vit un problème récurrent : il manque toujours un ou deux joueurs. Fitmates permet de compléter une équipe en quelques heures.',
    levels: ['Loisir', 'Compétiteur'],
    faq: [],
  },
  {
    slug: 'basketball',
    name: 'Basketball',
    phrase: 'du basket',
    verb: 'jouer',
    synonyms: ['basket', 'playground', 'street basket', '3x3'],
    live: false,
    priority: 14,
    peakMonths: [4, 5, 6, 7, 8, 9],
    short: 'Rejoins une session de basket sur un playground près de chez toi.',
    why: 'Les playgrounds sont pleins mais personne ne sait qui y sera quand : Fitmates donne l’heure et les joueurs.',
    levels: ['Loisir', 'Confirmé'],
    faq: [],
  },
];

export const SPORTS_BY_SLUG: Record<string, Sport> = Object.fromEntries(
  SPORTS.map((s) => [s.slug, s]),
);

export function getSport(slug: string | undefined): Sport | undefined {
  return slug ? SPORTS_BY_SLUG[slug] : undefined;
}
