import type { SportSlug } from './sports';

export interface Spot {
  name: string;
  /** Pourquoi ce spot, en une phrase (contenu unique par zone) */
  detail: string;
  /** Accès transports (RER, Transilien, métro…) */
  access?: string;
}

export interface Zone {
  slug: string;
  name: string;
  /** Région administrative (pour l'extension future : Lyon, Marseille…) */
  region: string;
  regionSlug: string;
  /** Département(s) couverts */
  departments: string[];
  /** Centre géographique approximatif (schema.org GeoCoordinates) */
  lat: number;
  lng: number;
  /** Population approx. (contexte) */
  population?: string;
  /** Description unique de la zone */
  intro: string;
  /** Spots par sport. Une page sport × zone n'est générée que si le sport a des spots ici (ou des événements). */
  spots: Partial<Record<SportSlug, Spot[]>>;
}

const IDF = { region: 'Île-de-France', regionSlug: 'ile-de-france' };

export const ZONES: Zone[] = [
  {
    slug: 'paris',
    name: 'Paris',
    ...IDF,
    departments: ['75'],
    lat: 48.8566,
    lng: 2.3522,
    population: '2,1 M',
    intro:
      'Paris concentre la plus forte densité de sportifs amateurs de France, mais aussi le plus grand nombre de personnes qui pratiquent seules. Les deux bois, les quais et les parcs servent de terrain de jeu, et la plupart des sorties nature partent des gares parisiennes (Gare de Lyon, Gare du Nord, Montparnasse, Saint-Lazare).',
    spots: {
      randonnee: [
        { name: 'Bois de Vincennes', detail: 'Boucles de 8 à 15 km autour des lacs Daumesnil et des Minimes, idéal pour une première sortie en groupe.', access: 'Métro 1 Château de Vincennes, RER A Joinville-le-Pont' },
        { name: 'Bois de Boulogne', detail: 'Tour complet d’environ 12 km, plat, parfait pour une sortie en semaine après le travail.', access: 'Métro 2 Porte Dauphine, métro 10 Porte d’Auteuil' },
        { name: 'Traversée de Paris (GR 2024 / Petite Ceinture)', detail: 'Randonnée urbaine de 20 à 50 km en plusieurs étapes, très demandée le dimanche.', access: 'Départ libre depuis n’importe quelle station' },
        { name: 'Canal de l’Ourcq vers Pantin et Bobigny', detail: 'Itinéraire linéaire plat, 10 à 20 km, retour en RER.', access: 'Métro 5 Jaurès, RER E Pantin' },
      ],
      'course-a-pied': [
        { name: 'Quais de Seine (Bercy → Trocadéro)', detail: 'Parcours plat de 10 km, le plus fréquenté des run clubs le soir.', access: 'Métro 14 Cour Saint-Émilion' },
        { name: 'Parc des Buttes-Chaumont', detail: 'Dénivelé pour le fractionné en côte, boucle de 2 km.', access: 'Métro 7bis Buttes-Chaumont' },
        { name: 'Bois de Vincennes', detail: 'Sorties longues de 15 à 25 km sur chemins stabilisés.', access: 'Métro 1 Château de Vincennes' },
        { name: 'Jardin du Luxembourg', detail: 'Boucle de 2 km, point de rendez-vous classique pour les footings de midi.', access: 'RER B Luxembourg' },
      ],
      velo: [
        { name: 'Coulée verte du Sud parisien', detail: 'Piste cyclable continue vers Massy, départ idéal pour une sortie vers la vallée de Chevreuse.', access: 'Montparnasse' },
        { name: 'Canal de l’Ourcq', detail: 'Plus de 25 km de piste plate vers Claye-Souilly, pour les sorties « balade ».', access: 'Bassin de la Villette' },
      ],
      escalade: [
        { name: 'Salles de bloc de l’Est parisien', detail: 'Forte densité de salles de bloc dans les 11e, 19e et 20e ; sessions après le travail très demandées.', access: 'Métro 2 / 3 / 11' },
      ],
      yoga: [
        { name: 'Parc de la Villette et Buttes-Chaumont', detail: 'Séances collectives en plein air de mai à septembre, le matin le week-end.', access: 'Métro 5 / 7 / 7bis' },
      ],
      padel: [
        { name: 'Clubs du 13e, 15e et portes de Paris', detail: 'Les créneaux du soir se remplissent une semaine à l’avance : compléter une partie est le besoin numéro un.', access: 'Tramway T3' },
      ],
    },
  },
  {
    slug: 'hauts-de-seine',
    name: 'Hauts-de-Seine',
    ...IDF,
    departments: ['92'],
    lat: 48.84,
    lng: 2.24,
    population: '1,6 M',
    intro:
      'Le 92 est le département le plus « sport-actif » de la petite couronne : forêt de Meudon, parc de Saint-Cloud, parc de Sceaux et bords de Seine forment un réseau continu de sorties accessibles en transilien et en tramway.',
    spots: {
      randonnee: [
        { name: 'Forêt de Meudon et Clamart', detail: 'Boucles de 10 à 18 km avec de vrais dénivelés, étangs, et retour par Bellevue.', access: 'Transilien N Meudon / Bellevue, tram T6' },
        { name: 'Parc de Saint-Cloud et forêt de Marly', detail: 'Du parc de Saint-Cloud vers la forêt de Marly : 15 à 22 km, l’une des sorties les plus populaires du 92.', access: 'Métro 10 Boulogne – Pont de Saint-Cloud' },
        { name: 'Parc de Sceaux et vallée de la Bièvre', detail: 'Rando courte (8 à 12 km), idéale débutants et familles.', access: 'RER B Parc de Sceaux' },
      ],
      'course-a-pied': [
        { name: 'Parc de Sceaux', detail: 'Boucle de 4,5 km sur allées larges, rendez-vous des run clubs du sud du 92.', access: 'RER B Bourg-la-Reine' },
        { name: 'Bords de Seine Issy – Boulogne – Saint-Cloud', detail: 'Parcours plat de 10 km, très couru en semaine.', access: 'Tram T2' },
      ],
      velo: [
        { name: 'Vallée de la Bièvre vers Versailles', detail: 'Sortie route de 40 à 60 km via Sceaux et Jouy-en-Josas.', access: 'RER B' },
      ],
    },
  },
  {
    slug: 'seine-saint-denis',
    name: 'Seine-Saint-Denis',
    ...IDF,
    departments: ['93'],
    lat: 48.92,
    lng: 2.45,
    population: '1,7 M',
    intro:
      'Département le plus jeune de France et héritier des JO 2024 : parc Georges-Valbon (la Courneuve), canal de l’Ourcq, forêt de Bondy et parc de la Poudrerie offrent de grands espaces encore peu exploités par les groupes de sport amateur.',
    spots: {
      randonnee: [
        { name: 'Parc Georges-Valbon (La Courneuve)', detail: 'Plus grand parc d’Île-de-France après les bois parisiens : boucles de 8 à 14 km sans voiture.', access: 'RER B La Courneuve – Aubervilliers, tram T1' },
        { name: 'Canal de l’Ourcq et parc de la Poudrerie', detail: 'Itinéraire plat de 15 à 20 km de Bobigny à Sevran, retour en RER B.', access: 'Métro 5 Bobigny, RER B Sevran-Livry' },
        { name: 'Forêt de Bondy', detail: 'Petite forêt pour sorties courtes et sorties découverte.', access: 'RER E Le Raincy-Villemomble' },
      ],
      'course-a-pied': [
        { name: 'Parc Georges-Valbon', detail: 'Boucle de 5 km et 10 km balisées, dénivelé modéré.', access: 'Tram T1' },
        { name: 'Canal Saint-Denis', detail: 'Parcours plat vers le Stade de France, 8 km aller-retour.', access: 'RER D Saint-Denis' },
      ],
      football: [
        { name: 'Terrains de foot à 5 de Saint-Denis / Aubervilliers', detail: 'Forte demande de compléments d’équipes en semaine le soir.', access: 'Métro 12 / 13' },
      ],
      basketball: [
        { name: 'Playgrounds de Saint-Ouen et Montreuil', detail: 'Sessions 3x3 et 5x5 très suivies, créneaux surtout 18h–21h.', access: 'Métro 9 / 13' },
      ],
    },
  },
  {
    slug: 'val-de-marne',
    name: 'Val-de-Marne',
    ...IDF,
    departments: ['94'],
    lat: 48.78,
    lng: 2.45,
    population: '1,4 M',
    intro:
      'Les bords de Marne, le bois de Vincennes côté 94 et le plateau briard offrent des sorties variées à moins de 30 minutes du centre de Paris. Le 94 est l’une des zones les plus actives de la communauté randonnée Fitmates.',
    spots: {
      randonnee: [
        { name: 'Boucles de la Marne (Joinville → Champigny → Bry)', detail: 'Rando plate de 12 à 18 km le long de la Marne, guinguettes à l’arrivée.', access: 'RER A Joinville-le-Pont' },
        { name: 'Forêt Notre-Dame et plateau briard', detail: 'Grande forêt du sud-est, boucles de 15 à 25 km, calme et peu fréquentée.', access: 'RER A Boissy-Saint-Léger' },
        { name: 'Bois de Vincennes depuis Saint-Mandé / Fontenay', detail: 'Accès par l’est, sorties courtes en semaine.', access: 'RER A Fontenay-sous-Bois' },
      ],
      'course-a-pied': [
        { name: 'Bords de Marne à Nogent et Le Perreux', detail: 'Parcours plat de 10 km, très prisé le dimanche matin.', access: 'RER E Nogent – Le Perreux' },
      ],
      velo: [
        { name: 'Voie verte de la Marne vers Lagny', detail: 'Sortie plate de 50 km, accessible aux débutants.', access: 'RER A' },
      ],
    },
  },
  {
    slug: 'seine-et-marne',
    name: 'Seine-et-Marne',
    ...IDF,
    departments: ['77'],
    lat: 48.6,
    lng: 2.95,
    population: '1,4 M',
    intro:
      'La Seine-et-Marne est la destination randonnée numéro un des Franciliens : forêt de Fontainebleau, Trois Pignons, vallée du Loing et forêt d’Armainvilliers. La majorité des sorties du week-end organisées sur Fitmates partent en Transilien R depuis la Gare de Lyon.',
    spots: {
      randonnee: [
        { name: 'Forêt de Fontainebleau – circuit des 25 Bosses', detail: 'La rando sportive de référence en Île-de-France : 16 km et 800 m de dénivelé cumulé.', access: 'Transilien R Bois-le-Roi ou Fontainebleau-Avon' },
        { name: 'Trois Pignons et Milly-la-Forêt', detail: 'Sable, rochers et points de vue : boucles de 12 à 20 km, niveau intermédiaire.', access: 'Transilien R Fontainebleau-Avon puis covoiturage' },
        { name: 'Vallée du Loing (Moret → Nemours)', detail: 'Rando plate de 15 km entre villages et bords de rivière, idéale débutants.', access: 'Transilien R Moret – Veneux-les-Sablons' },
        { name: 'Forêt d’Armainvilliers et Ferrières', detail: 'Forêt proche de Marne-la-Vallée, boucles de 10 à 18 km.', access: 'RER E Tournan, RER A Val d’Europe' },
      ],
      trail: [
        { name: 'Fontainebleau (sentiers bleus et GR 11)', detail: 'Terrain technique, sable et rochers, parfait pour préparer un trail.', access: 'Transilien R' },
      ],
      escalade: [
        { name: 'Bloc à Fontainebleau (Bas Cuvier, Franchard, Apremont)', detail: 'Le site de bloc le plus célèbre du monde ; les sorties groupées partagent crash pads et voitures.', access: 'Transilien R puis covoiturage' },
      ],
      velo: [
        { name: 'Boucles de Fontainebleau et vallée de la Seine', detail: 'Sorties route et gravel de 60 à 100 km.', access: 'Transilien R' },
      ],
    },
  },
  {
    slug: 'yvelines',
    name: 'Yvelines',
    ...IDF,
    departments: ['78'],
    lat: 48.8,
    lng: 1.9,
    population: '1,45 M',
    intro:
      'Forêt de Rambouillet, vallée de Chevreuse, forêt de Saint-Germain et boucles de la Seine : les Yvelines offrent les plus belles randonnées accessibles en RER depuis Paris. Les sorties partent surtout de Saint-Rémy-lès-Chevreuse (RER B) et de Rambouillet (Transilien N).',
    spots: {
      randonnee: [
        { name: 'Vallée de Chevreuse (Saint-Rémy → Dampierre → Chevreuse)', detail: 'La rando la plus demandée depuis Paris : 15 à 20 km, châteaux et vallons.', access: 'RER B Saint-Rémy-lès-Chevreuse' },
        { name: 'Forêt de Rambouillet et étangs de Hollande', detail: 'Grandes boucles de 20 à 25 km, parfaites pour une sortie à la journée.', access: 'Transilien N Rambouillet' },
        { name: 'Forêt de Saint-Germain-en-Laye', detail: 'Plat, 10 à 15 km, sortie du samedi matin facile.', access: 'RER A Saint-Germain-en-Laye' },
        { name: 'Boucles de la Seine (Marly, Louveciennes, Bougival)', detail: 'Patrimoine, points de vue sur la Seine, 12 à 16 km.', access: 'Transilien L Marly-le-Roi' },
      ],
      trail: [
        { name: 'Vallée de Chevreuse', detail: 'Dénivelé le plus intéressant de l’ouest parisien pour le trail.', access: 'RER B' },
      ],
      velo: [
        { name: 'Vallée de Chevreuse et plateau de Saclay', detail: 'Le terrain de jeu classique des cyclistes parisiens, 60 à 90 km avec bosses.', access: 'RER B' },
      ],
    },
  },
  {
    slug: 'essonne',
    name: 'Essonne',
    ...IDF,
    departments: ['91'],
    lat: 48.53,
    lng: 2.25,
    population: '1,3 M',
    intro:
      'Forêt de Sénart, vallée de l’Essonne, et accès direct au massif des Trois Pignons : l’Essonne est la porte sud de la randonnée francilienne, bien desservie par les RER C et D.',
    spots: {
      randonnee: [
        { name: 'Forêt de Sénart', detail: 'Boucles de 10 à 18 km sur terrain plat, accès facile pour les débutants.', access: 'RER D Montgeron-Crosne' },
        { name: 'Vallée de l’Essonne (Mennecy → La Ferté-Alais)', detail: 'Rando mi-forêt mi-marais, 14 à 20 km.', access: 'RER D Mennecy' },
        { name: 'Trois Pignons côté Milly-la-Forêt', detail: 'Accès sud du massif de Fontainebleau, randonnées sportives.', access: 'RER D Maisse / covoiturage' },
      ],
      'course-a-pied': [
        { name: 'Base de loisirs de Draveil / Port aux Cerises', detail: 'Boucle plate de 6 km au bord de la Seine.', access: 'RER D Juvisy' },
      ],
    },
  },
  {
    slug: 'val-d-oise',
    name: 'Val-d’Oise',
    ...IDF,
    departments: ['95'],
    lat: 49.05,
    lng: 2.15,
    population: '1,25 M',
    intro:
      'Forêt de Montmorency, Vexin français et boucles de l’Oise : le Val-d’Oise est la zone de randonnée la moins saturée d’Île-de-France, avec des villages et des points de vue que les Parisiens connaissent peu.',
    spots: {
      randonnee: [
        { name: 'Forêt de Montmorency', detail: 'Dénivelé réel et châtaigneraies, boucles de 12 à 18 km.', access: 'Transilien H Saint-Leu-la-Forêt' },
        { name: 'Vexin français (Auvers-sur-Oise, La Roche-Guyon)', detail: 'Parc naturel régional, randonnées de 15 à 25 km entre falaises de craie et villages impressionnistes.', access: 'Transilien J / H Auvers-sur-Oise' },
        { name: 'Forêt de L’Isle-Adam et bords de l’Oise', detail: 'Sortie facile de 10 à 14 km avec baignade possible l’été.', access: 'Transilien H L’Isle-Adam – Parmain' },
      ],
    },
  },
];

export const ZONES_BY_SLUG: Record<string, Zone> = Object.fromEntries(ZONES.map((z) => [z.slug, z]));

export function getZone(slug: string | undefined): Zone | undefined {
  return slug ? ZONES_BY_SLUG[slug] : undefined;
}
