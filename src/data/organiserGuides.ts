/**
 * Pages d'acquisition « organisateur » par intention de recherche.
 * Objectif : faire venir les organisateurs (run clubs, groupes rando, coachs, clubs) par Google, Bing et les assistants IA,
 * puis les convertir avec le formulaire (type = organisateur / partenaire).
 */
export interface OrganiserGuide {
  slug: string;
  /** Intention de recherche ciblée (title) */
  title: string;
  h1: string;
  description: string;
  /** Requêtes visées (SEO + ASO + Ads) */
  keywords: string[];
  sport?: string;
  leadType: 'organisateur' | 'partenaire';
  intro: string;
  /** Étapes concrètes (contenu utile, pas promotionnel) */
  steps: { title: string; text: string }[];
  /** Ce que Fitmates apporte, en regard des étapes */
  withFitmates: string[];
  faq: { q: string; a: string }[];
}

export const ORGANISER_GUIDES: OrganiserGuide[] = [
  {
    slug: 'run-club',
    title: 'Créer un run club à Paris ou en Île-de-France : guide et outils gratuits',
    h1: 'Créer un run club et le remplir',
    description:
      'Comment lancer un run club : choisir le créneau, le parcours, les allures, recruter les premiers coureurs et gérer les inscriptions sans WhatsApp. Outils gratuits Fitmates.',
    keywords: ['créer un run club', 'lancer un run club paris', 'organiser une sortie running', 'gérer un club de running', 'application run club'],
    sport: 'course-a-pied',
    leadType: 'organisateur',
    intro:
      'Les run clubs ont été multipliés par 6,5 en France en 2025. La plupart naissent sur Instagram avec trois amis, puis butent sur les mêmes problèmes : un groupe WhatsApp qui déborde, des inscrits qui ne viennent pas, et aucun moyen d’être trouvé par les coureurs du quartier. Ce guide donne la méthode, et Fitmates fournit les outils gratuitement.',
    steps: [
      { title: 'Fixe un rituel', text: 'Un jour, une heure, un point de départ fixes (mardi 19h, métro Jaurès). La régularité fait plus que la communication : les coureurs reviennent parce qu’ils savent.' },
      { title: 'Propose deux ou trois allures', text: '« Conversation » (6:30–7:00 min/km), « tempo » (5:30), « rapide ». Indique-les sur chaque sortie : c’est la première question des débutants.' },
      { title: 'Choisis un parcours sûr et simple', text: 'Boucle de 5 à 8 km, éclairée, sans traversées dangereuses : quais, Buttes-Chaumont, Vincennes, parc de Sceaux. Termine au même endroit qu’au départ.' },
      { title: 'Rends-toi trouvable', text: 'Un compte Instagram, une page publique de tes sorties indexée par Google, une présence sur les annuaires de run clubs. Les coureurs cherchent « run club + arrondissement ».' },
      { title: 'Gère les inscriptions', text: 'Places limitées, liste d’attente, rappel la veille, désinscription en un clic. C’est ce qui fait passer le taux de présence de 50 % à 85 %.' },
    ],
    withFitmates: [
      'Sortie récurrente créée en une phrase, dupliquée chaque semaine.',
      'Page publique de ton run club indexée par Google (« run club Paris 11 »), sans site à construire.',
      'Inscriptions, liste d’attente, chat de groupe et rappels automatiques.',
      'Tes sorties apparaissent dans le fil des coureurs de ta zone, de ton allure.',
      'Gratuit, sans commission, sans abonnement organisateur.',
    ],
    faq: [
      { q: 'Faut-il être coach diplômé pour créer un run club ?', a: 'Non. Un run club informel et gratuit n’exige pas de diplôme. Un encadrement payant, lui, relève de la réglementation des éducateurs sportifs (carte professionnelle).' },
      { q: 'Combien de personnes pour commencer ?', a: 'Trois suffisent. Ce qui compte est la régularité du rendez-vous et la visibilité : avec une page publique et l’app, les premiers inconnus arrivent dès la deuxième ou troisième semaine.' },
      { q: 'Comment éviter les absents ?', a: 'Places limitées, confirmation la veille, liste d’attente qui se remplit automatiquement, et un historique de présence visible sur le profil de chaque coureur.' },
    ],
  },
  {
    slug: 'groupe-randonnee',
    title: 'Organiser une randonnée en groupe : préparer, publier, remplir',
    h1: 'Organiser une randonnée en groupe',
    description:
      'Organiser une randonnée à plusieurs en Île-de-France : choisir l’itinéraire et la gare, fixer le niveau, publier la sortie et gérer les inscriptions. Outils gratuits Fitmates.',
    keywords: ['organiser une randonnée', 'créer un groupe de randonnée', 'organiser une rando entre amis', 'application pour organiser des randonnées', 'groupe de marche'],
    sport: 'randonnee',
    leadType: 'organisateur',
    intro:
      'Trente millions de Français randonnent, moins d’un sur cent est licencié. Tout le reste s’organise entre amis, sur Facebook ou sur Meetup, avec les mêmes frictions : trouver des gens du bon niveau, gérer les inscriptions et ne pas se retrouver seul à la gare. Voici comment organiser une sortie qui se remplit.',
    steps: [
      { title: 'Choisis un itinéraire accessible en train', text: 'En Île-de-France, les sorties qui marchent partent d’une gare : Bois-le-Roi (Fontainebleau), Saint-Rémy-lès-Chevreuse, Rambouillet, Saint-Germain-en-Laye. Boucle ou linéaire avec retour en train.' },
      { title: 'Annonce le niveau honnêtement', text: 'Distance, dénivelé, allure moyenne et durée totale pauses comprises. « 16 km, 800 m D+, 6 h » attire les bonnes personnes et évite les abandons en route.' },
      { title: 'Fixe les règles de base', text: 'Heure de départ ferme, point de rendez-vous précis (sortie de gare, côté parking), eau et pique-nique, décision météo la veille à 18h.' },
      { title: 'Publie la sortie là où on la cherche', text: 'Une page publique avec date, lieu, niveau, trouvable sur « randonnée groupe île de france dimanche ». Les groupes Facebook ne sont plus indexés et Meetup fait payer l’organisateur.' },
      { title: 'Limite les places et garde un chat', text: 'Douze à vingt personnes maximum pour garder le groupe ensemble. Un chat par sortie pour le covoiturage et les retardataires.' },
    ],
    withFitmates: [
      'Création en une phrase : « dimanche 9h30, 25 Bosses depuis Bois-le-Roi, niveau sportif, 15 places ».',
      'Page publique de la sortie indexée par Google, avec balisage événement.',
      'Inscription automatique ou validée par toi, liste d’attente, annulation avec notification de tous.',
      'Chat de groupe par sortie, profil des participants avec leurs sorties passées.',
      'Reconnaissance : badge organisateur, mise en avant dans ta zone.',
    ],
    faq: [
      { q: 'Suis-je responsable en cas d’accident ?', a: 'Une sortie informelle et gratuite entre adultes relève de la responsabilité de chacun. Indique clairement le niveau, demande à chacun d’avoir son assurance responsabilité civile, et évite les sorties engagées sans expérience.' },
      { q: 'Combien de participants maximum ?', a: 'Entre 10 et 20 pour une rando à la journée. Au-delà, le groupe s’étire et le rythme devient impossible à tenir.' },
      { q: 'Puis-je demander une participation aux frais ?', a: 'Oui pour le covoiturage ou un pique-nique partagé, à prix coûtant. Une activité rémunérée relève de l’encadrement professionnel.' },
    ],
  },
  {
    slug: 'coach-sportif',
    title: 'Coach sportif : remplir ses séances collectives et trouver des clients localement',
    h1: 'Coach : remplis tes séances collectives',
    description:
      'Coach sportif indépendant : comment remplir des séances collectives (bootcamp, running, marche nordique, yoga en plein air) et te faire connaître dans ta ville, sans budget publicitaire. Visibilité gratuite sur Fitmates.',
    keywords: ['coach sportif trouver des clients', 'remplir ses cours collectifs', 'coach sportif visibilité', 'application coach sportif', 'bootcamp paris organiser'],
    leadType: 'partenaire',
    intro:
      'Il y a 20 000 à 35 000 coachs sportifs en France, en grande majorité indépendants, et ils passent une partie de leur temps à chercher des clients sur Superprof ou Instagram. Les séances collectives sont la façon la plus rentable de démarrer, à condition de les remplir. Voici comment.',
    steps: [
      { title: 'Définis un format répété', text: 'Même lieu, même heure chaque semaine (samedi 10h, parc de Sceaux, bootcamp 45 min). Les gens achètent une habitude, pas une séance.' },
      { title: 'Propose un niveau d’entrée clair', text: '« Débutant bienvenu », « tous niveaux », « confirmé ». Les séances ouvertes aux débutants se remplissent deux fois plus vite.' },
      { title: 'Rends visible la preuve sociale', text: 'Nombre de participants aux séances passées, photos de groupe, avis. C’est ce que regarde une personne qui hésite.' },
      { title: 'Sois trouvable localement', text: 'Les clients cherchent « bootcamp + ville », « coach running + arrondissement ». Une page publique par séance, indexée, remplace un site.' },
      { title: 'Convertis la première séance', text: 'Première séance gratuite ou à prix réduit, puis carnet de 10 ou abonnement. L’app gère les inscriptions, tu gères la séance.' },
    ],
    withFitmates: [
      'Tes séances affichées dans le fil des sportifs de ta zone, avec ton badge Coach.',
      'Pages publiques indexées par Google pour chaque séance, sans site à maintenir.',
      'Inscriptions et liste d’attente, prix affiché sur la fiche, rappels automatiques.',
      'Visibilité gratuite. Abonnement coach optionnel plus tard pour la mise en avant et les statistiques.',
    ],
    faq: [
      { q: 'Est-ce gratuit pour les coachs ?', a: 'Oui : publier des séances, gérer les inscriptions et être visible localement est gratuit. Des options payantes de mise en avant arriveront, jamais de commission sur tes clients.' },
      { q: 'Puis-je faire payer mes séances ?', a: 'Oui, le tarif est affiché sur la fiche et l’encaissement se fait comme tu le souhaites aujourd’hui. Le paiement intégré arrive progressivement.' },
      { q: 'Quels sports ?', a: 'Running, marche nordique, bootcamp et renforcement en plein air, yoga et pilates en parc, préparation trail, vélo. Tout ce qui se pratique en groupe à l’extérieur ou dans un lieu que tu réserves.' },
    ],
  },
  {
    slug: 'club-association',
    title: 'Club ou association sportive : attirer de nouveaux pratiquants avec des sorties ouvertes',
    h1: 'Clubs et associations : recrutez via des sorties ouvertes',
    description:
      'Clubs, associations, BDS, salles : comment toucher les pratiquants hors club (7 sur 10 en Île-de-France) avec des sorties ouvertes publiées là où ils cherchent. Outils gratuits Fitmates.',
    keywords: ['recruter des adhérents club sportif', 'association sportive nouveaux membres', 'faire connaître son club de randonnée', 'promouvoir un club de running', 'BDS événement sportif'],
    leadType: 'partenaire',
    intro:
      'En Île-de-France, 7 sportifs réguliers sur 10 pratiquent hors club, et les clubs saturés par l’effet des Jeux refusent des inscriptions pendant que d’autres cherchent des adhérents. Le point commun : les pratiquants ne vous trouvent pas, parce qu’ils ne cherchent pas « club », ils cherchent « randonnée dimanche » ou « courir en groupe ».',
    steps: [
      { title: 'Ouvrez une sortie par mois aux non-adhérents', text: 'Une sortie découverte, gratuite, au niveau le plus accessible de votre pratique. C’est votre première séance d’essai, sans paperasse.' },
      { title: 'Publiez-la où les gens cherchent', text: 'Une page publique indexée, décrite avec les mots des pratiquants (lieu, niveau, distance), pas avec le jargon fédéral.' },
      { title: 'Gérez les inscriptions sans tableur', text: 'Places, liste d’attente, rappels, chat. Vos bénévoles organisent, l’outil administre.' },
      { title: 'Convertissez après la sortie', text: 'Message automatique aux participants : prochaine sortie, et comment adhérer. Un participant sur trois revient si on le lui propose dans les 48 h.' },
    ],
    withFitmates: [
      'Profil club avec vos sorties ouvertes, trouvable par sport et par zone.',
      'Pages publiques indexées, données structurées, reprise dans le flux public des événements.',
      'Statistiques de participation pour vos assemblées générales et vos demandes de subvention.',
      'Gratuit pour les associations.',
    ],
    faq: [
      { q: 'Nos sorties restent-elles réservées aux adhérents ?', a: 'Vous choisissez sortie par sortie : ouverte à tous, sur validation, ou privée.' },
      { q: 'Est-ce compatible avec notre affiliation fédérale ?', a: 'Oui. Fitmates est un canal de visibilité et d’inscription ; l’encadrement, l’assurance et la licence restent gérés par le club.' },
    ],
  },
];

export function getOrganiserGuide(slug: string | undefined): OrganiserGuide | undefined {
  return slug ? ORGANISER_GUIDES.find((g) => g.slug === slug) : undefined;
}
