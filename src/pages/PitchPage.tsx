import { useState, useRef, useEffect } from 'react';

const tabs = [
  'Problème',
  'Solution',
  'Positionnement',
  'Concurrence',
  'Modèle économique',
  'Démarrage à froid',
  'Mise en marché',
];

function SourceLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-orange-500 hover:text-orange-600 underline ml-1 align-super"
    >
      source
    </a>
  );
}

function StatCard({ value, label, source }: { value: string; label: string; source?: string }) {
  return (
    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 text-center flex-1 min-w-[140px]">
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-gray-600 mt-2 text-sm">{label}</div>
      {source && (
        <div className="mt-2">
          <SourceLink href={source} />
        </div>
      )}
    </div>
  );
}

function DarkBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 my-8">
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
      {children}
    </h2>
  );
}

function Sources({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-gray-400 italic mt-8">{children}</p>
  );
}

function ProblemeTab() {
  return (
    <div>
      <SectionTitle>Le problème</SectionTitle>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <StatCard
          value="24 %"
          label="des Français se sentent régulièrement seuls"
          source="https://www.fondationdefrance.org/images/pdf/2025/etude-solitudes-2024_fdf.pdf"
        />
        <StatCard
          value="45 %"
          label="chez les moins de 25 ans"
          source="https://www.fondationdefrance.org/images/pdf/2025/etude-solitudes-2024_fdf.pdf"
        />
        <StatCard
          value="+3 pts"
          label="en un an"
          source="https://www.fondationdefrance.org/images/pdf/2025/etude-solitudes-2024_fdf.pdf"
        />
      </div>

      <p className="text-gray-700 text-lg mb-4">
        La solitude progresse, et elle touche en priorité la génération la plus connectée de l'histoire.
      </p>
      <p className="text-gray-700 text-lg mb-4">
        Et pourtant. Ce même pays fait plus de sport que jamais. 58 % des Français pratiquent une activité physique régulière. +4 points depuis 2018.<SourceLink href="https://injep.fr/publication/barometre-national-des-pratiques-sportives-2024/" />
      </p>
      <p className="text-gray-700 text-lg mb-4">
        Plus de sportifs, plus de solitude. Deux chiffres qui coexistent dans le même pays, au même moment. Le paradoxe s'explique en une phrase : la majorité pratique seule. Hors club. Hors structure. Hors lien.
      </p>

      <DarkBox>
        <p className="text-xl md:text-2xl font-bold mb-4">
          Le sport est là. Le lien, <span className="text-orange-500">non</span>.
        </p>
        <p className="text-gray-300 mb-4">
          Les gens qui font du sport ensemble tiennent plus longtemps, se sentent mieux, progressent plus vite et reviennent plus souvent. À 6 mois : <span className="text-orange-500 font-bold">84 % de rétention en groupe</span>. <span className="text-orange-500 font-bold">63 % en solo</span>. <span className="text-orange-500 font-bold">42 % d'abandon en salle</span> avant le sixième mois.<a href="https://pubmed.ncbi.nlm.nih.gov/12473421/" target="_blank" rel="noopener noreferrer" className="text-xs text-orange-400 hover:text-orange-300 underline ml-1 align-super">source</a>
        </p>
        <p className="text-white font-semibold">
          Le sport tue la solitude — mais seulement quand il est <span className="text-orange-500">social</span>.
        </p>
      </DarkBox>

      <p className="text-gray-700 text-lg mb-4">
        Le problème dépasse la France. En 2023, l'OMS a déclaré officiellement que le monde était entré dans une « épidémie de solitude ». Une personne sur six concernée. Un impact sanitaire comparable à 15 cigarettes par jour. Premier levier d'action recommandé : multiplier les occasions de contact réel.<SourceLink href="https://www.who.int/fr/news/item/15-11-2023-who-launches-commission-to-foster-social-connection" />
      </p>
      <p className="text-gray-700 text-lg mb-4">
        Le sport fait ça mieux que n'importe quoi d'autre. Contact physique. Rendez-vous récurrent. Effort partagé. Communauté immédiate.
      </p>
      <p className="text-gray-700 text-lg mb-4">
        Pourtant, aucun outil digital n'est construit pour ça. Instagram maximise le défilement. Strava célèbre le chrono individuel. Meetup noie le sport entre les soirées tricot et les apéros réseautage. Les groupes Facebook sont morts depuis 2021. Les salles de sport vendent un badge d'accès, pas une communauté.
      </p>
      <p className="text-gray-700 text-lg font-bold mb-4">
        Le sport social — cette pratique collective, locale, informelle, non compétitive qui représente désormais la majorité de l'activité physique en France — n'a aucune infrastructure digitale.
      </p>

      <Sources>
        <a href="https://www.fondationdefrance.org/images/pdf/2025/etude-solitudes-2024_fdf.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 underline">Fondation de France / CRÉDOC, Solitudes 2024</a> · <a href="https://injep.fr/publication/barometre-national-des-pratiques-sportives-2024/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 underline">INJEP / CRÉDOC, Baromètre national des pratiques sportives 2024</a> · <a href="https://www.who.int/fr/news/item/15-11-2023-who-launches-commission-to-foster-social-connection" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 underline">OMS, Commission sur le lien social 2023–2025</a> · <a href="https://www.researchgate.net/publication/228622237_Group_versus_Individual_Approach_A_Meta-Analysis_of_the_Effectiveness_of_Interventions_to_promote_physical_activity" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 underline">Burke et al., méta-analyse Group vs Individual Approach</a> · <a href="https://pubmed.ncbi.nlm.nih.gov/12473421/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 underline">Cox et al., S.W.E.A.T. Study</a>
      </Sources>
    </div>
  );
}

function SolutionTab() {
  return (
    <div>
      <SectionTitle>La solution</SectionTitle>

      <p className="text-gray-700 text-lg mb-4">
        Fitmates est la plateforme mobile du sport social. Le réseau social du sport, centré sur l'action réelle.
      </p>
      <p className="text-gray-700 text-lg mb-8">
        L'expérience tient en trois gestes. Ouvrir l'app. Voir les activités autour de soi. Rejoindre en un tap.
      </p>

      <h3 className="text-xl font-bold text-gray-900 mb-4">Découverte locale intelligente</h3>
      <ul className="list-disc list-inside text-gray-700 text-lg mb-2 space-y-1">
        <li>Fil d'activités géolocalisé, filtré par distance, niveau, discipline, moment</li>
        <li>Accueil personnalisé dès la première ouverture</li>
        <li>Objectif : trouver une activité pertinente en moins de 5 secondes</li>
      </ul>

      <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Dynamique communautaire</h3>
      <ul className="list-disc list-inside text-gray-700 text-lg mb-2 space-y-1">
        <li>Groupes locaux par ville et par activité — Running Paris, Rando Fontainebleau, Yoga Vincennes, Trail Marseille</li>
        <li>Outils organisateurs : gestion des participants, co-organisation, Inscription progressive (intéressé → je viens), annulations avec notification auto</li>
      </ul>

      <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Engagement durable</h3>
      <ul className="list-disc list-inside text-gray-700 text-lg mb-2 space-y-1">
        <li>Défis en groupe — avancer ensemble, pas les uns contre les autres</li>
        <li>Défis individuels rattachés à l'avancement collectif : "Tu as participé à 3 sorties ce mois. Ton groupe Running Paris en est à 47."</li>
        <li>Valorisation automatique des organisateurs : badges, mentions, reconnaissance post-événement ("Merci à Clara — 12 sorties organisées ce mois-ci")</li>
      </ul>

      <DarkBox>
        <p className="text-lg md:text-xl font-semibold">
          La métrique de succès n'est pas le <span className="text-orange-500">temps d'écran</span>. C'est le nombre d'<span className="text-orange-500">activités réalisées dans la vraie vie</span>.
        </p>
      </DarkBox>

      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 md:p-8 text-white my-8">
        <h3 className="text-2xl font-bold mb-2">Déjà prouvé sur le terrain</h3>
        <p className="text-white/80 mb-6">Randonnée en Île-de-France. Sans aucune publicité.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 text-center">
            <div className="text-3xl md:text-4xl font-bold">1 200</div>
            <div className="text-white/80 text-sm mt-1">utilisateurs actifs en 3 mois</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-3xl md:text-4xl font-bold">~100</div>
            <div className="text-white/80 text-sm mt-1">participations / semaine</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-3xl md:text-4xl font-bold">0 €</div>
            <div className="text-white/80 text-sm mt-1">dépensé en acquisition</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PositionnementTab() {
  return (
    <div>
      <SectionTitle>Ce qu'on n'est pas</SectionTitle>

      <p className="text-gray-700 text-lg mb-6">
        Fitmates ne concurrence pas les clubs sportifs, les associations, ni les coachs locaux. C'est leur prolongement digital.
      </p>

      <ul className="space-y-3 text-gray-700 text-lg mb-6">
        <li><span className="font-semibold">Un coach indépendant</span> → canal d'acquisition gratuit, visibilité locale immédiate</li>
        <li><span className="font-semibold">Une asso universitaire</span> → touche des publics qu'elle n'atteint plus via l'affichage papier</li>
        <li><span className="font-semibold">Un groupe de potes</span> → remplace le chaos WhatsApp par un outil qui fait le travail</li>
        <li><span className="font-semibold">Un club saturé post-JO</span> → oriente ses refusés vers des activités communautaires accessibles</li>
      </ul>

      <p className="text-gray-700 text-lg mb-8">
        Fitmates rend visible et accessible ce qui existe déjà de manière dispersée. Et crée les conditions pour que de nouvelles initiatives émergent.
      </p>

      <DarkBox>
        <p className="text-lg mb-3">
          Là où Instagram maximise le <span className="text-orange-500 font-bold">temps d'écran</span>, Fitmates le <span className="text-orange-500 font-bold">minimise</span>.
        </p>
        <p className="text-lg mb-3">
          Là où Strava célèbre la <span className="text-orange-500 font-bold">performance individuelle</span>, Fitmates célèbre la <span className="text-orange-500 font-bold">participation collective</span>.
        </p>
        <p className="text-lg">
          Là où Meetup traite le sport comme <span className="text-orange-500 font-bold">une catégorie parmi d'autres</span>, Fitmates est <span className="text-orange-500 font-bold">construit pour lui</span>.
        </p>
      </DarkBox>
    </div>
  );
}

function ConcurrenceTab() {
  return (
    <div>
      <SectionTitle>La concurrence</SectionTitle>

      <p className="text-gray-700 text-lg mb-8">
        250+ solutions digitales recensées par le Pôle Ressources National Sport-Innovations. Des dizaines ont identifié le bon problème. Aucune n'a trouvé la bonne exécution.<SourceLink href="https://www.sports.gouv.fr/decouvrez-la-cartographie-des-250-solutions-digitales-qui-reinventent-le-sport-en-france-3224" />
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Mise en relation sportive</h3>
          <p className="text-gray-600 mb-3">
            Atclub, SportivUP, PoteSport, GymBros… Logique de balayage ou annuaire. Connectent deux individus, pas une communauté.
          </p>
          <p className="font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            → Masse critique jamais atteinte
          </p>
        </div>

        <div className="border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Sorties généralistes</h3>
          <p className="text-gray-600 mb-3">
            Frimake (600K membres), Meetup. Le sport est noyé. Pas de filtres niveau/distance. Pas d'outils organisateurs dédiés.
          </p>
          <p className="font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            → Le sport n'est pas l'objet central
          </p>
        </div>

        <div className="border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Apps sportives</h3>
          <p className="text-gray-600 mb-3">
            Strava, Nike Run Club. Axé sur la performance individuelle. Pression du classement. Repoussent débutants et récréatifs.
          </p>
          <p className="font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            → Social en bonus, pas en cœur
          </p>
        </div>

        <div className="border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Apps mono-sport</h3>
          <p className="text-gray-600 mb-3">
            Poteau (foot), BallnConnect (basket), Swiit (gestion clubs). Niche par sport. Pas de vision plateforme.
          </p>
          <p className="font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            → Fragmenté, pas extensible
          </p>
        </div>
      </div>

      <DarkBox>
        <p className="text-lg mb-4">Personne n'a combiné les trois :</p>
        <ul className="space-y-2 text-lg mb-4">
          <li>
            <span className="text-orange-500 font-bold">1.</span> Le sport comme objet central
          </li>
          <li>
            <span className="text-orange-500 font-bold">2.</span> La communauté locale comme unité de base
          </li>
          <li>
            <span className="text-orange-500 font-bold">3.</span> L'action réelle comme métrique de succès
          </li>
        </ul>
        <p className="text-gray-300">
          Le marché n'est pas vide. Il est fragmenté, sous-financé, mal exécuté. <span className="text-orange-500 font-bold">L'espace est ouvert.</span>
        </p>
      </DarkBox>

      <Sources>
        <a href="https://www.sports.gouv.fr/decouvrez-la-cartographie-des-250-solutions-digitales-qui-reinventent-le-sport-en-france-3224" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 underline">Cartographie PRNSI 2025 (250+ solutions)</a> · <a href="https://injep.fr/publication/barometre-national-des-pratiques-sportives-2024/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 underline">INJEP Baromètre 2024 : 16 % des non-pratiquants citent l'absence de partenaire comme frein principal</a>
      </Sources>
    </div>
  );
}

function BusinessModelTab() {
  return (
    <div>
      <SectionTitle>Modèle économique</SectionTitle>

      <p className="text-gray-700 text-lg mb-8">
        Modèle freemium. Le cœur est gratuit. Découvrir, rejoindre, organiser, participer aux groupes communautaires. Zéro barrière à l'entrée.
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Source de revenus 1 — Abonnement organisateurs & coachs</h3>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
            <li>Visibilité renforcée dans le fil d'activités local</li>
            <li>Outils de gestion avancés, statistiques de participation</li>
            <li>Les personnes qui créent de la valeur pour la communauté paient pour mieux la servir</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Source de revenus 2 — Partenariats locaux</h3>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
            <li>Marques sportives, collectivités, salles, sponsors d'événements</li>
            <li>Format natif : sponsoring d'activités réelles. Pas de bannières publicitaires</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Source de revenus 3 — Événements encadrés</h3>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
            <li>Coachs partenaires intégrés à la plateforme</li>
            <li>Séances structurées par niveau — débutant, intermédiaire, avancé</li>
            <li>Double fonction : revenus directs + moteur d'acquisition</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ColdStartTab() {
  return (
    <div>
      <SectionTitle>Démarrage à froid</SectionTitle>

      <p className="text-gray-700 text-lg mb-4">
        Le problème classique des plateformes : l'utilisateur arrive, le fil est vide, il part. Abandon à J+1.
      </p>
      <p className="text-gray-700 text-lg font-semibold mb-8">
        Fitmates a résolu ça avant le lancement.
      </p>

      <h3 className="text-xl font-bold text-gray-900 mb-4">La solution : coachs partenaires dès le jour 1</h3>
      <ul className="list-disc list-inside text-gray-700 text-lg space-y-1 mb-8">
        <li>Intégration de coachs débutants et semi-professionnels</li>
        <li>Source : Superprof et équivalents — coût d'acquisition faible</li>
        <li>Motivation du coach : visibilité locale, constitution de clientèle, test de formats de séance</li>
      </ul>

      <h3 className="text-xl font-bold text-gray-900 mb-4">Le résultat</h3>
      <ul className="list-disc list-inside text-gray-700 text-lg space-y-1 mb-8">
        <li>Fil actif dès le premier jour — événements structurés visibles à l'ouverture</li>
        <li>Première expérience guidée pour chaque nouvel utilisateur</li>
        <li>La communauté organique se construit autour de ce socle</li>
      </ul>

      <DarkBox>
        <p className="text-lg md:text-xl font-semibold">
          Pas de fil vide. Pas de perception d'application morte. <span className="text-orange-500">Pas d'abandon à J+1.</span>
        </p>
      </DarkBox>
    </div>
  );
}

function GoToMarketTab() {
  return (
    <div>
      <SectionTitle>Mise en marché</SectionTitle>

      <h3 className="text-xl font-bold text-gray-900 mb-4">Déploiement</h3>
      <div className="space-y-4 mb-8">
        <div className="flex gap-3">
          <span className="font-bold text-orange-500 shrink-0">Phase 1</span>
          <span className="text-gray-700 text-lg">Île-de-France. Preuve de concept déjà en cours : randonnée, 1 200 utilisateurs actifs, zéro budget pub</span>
        </div>
        <div className="flex gap-3">
          <span className="font-bold text-orange-500 shrink-0">Phase 2</span>
          <span className="text-gray-700 text-lg">Marseille, Aix-en-Provence, Lyon → grandes villes françaises</span>
        </div>
        <div className="flex gap-3">
          <span className="font-bold text-orange-500 shrink-0">Phase 3</span>
          <span className="text-gray-700 text-lg">Marché national, monétisation activée, structuration des revenus</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4">Trois canaux simultanés</h3>
      <div className="space-y-4 mb-8">
        <div className="flex gap-3">
          <span className="font-bold text-orange-500 shrink-0">Numérique natif</span>
          <span className="text-gray-700 text-lg">Vidéos courtes Instagram / TikTok centrés sur des activités réelles, pas du contenu de marque</span>
        </div>
        <div className="flex gap-3">
          <span className="font-bold text-orange-500 shrink-0">Terrain</span>
          <span className="text-gray-700 text-lg">Partenariats clubs, universités, associations, groupes Facebook locaux</span>
        </div>
        <div className="flex gap-3">
          <span className="font-bold text-orange-500 shrink-0">Preuve sociale</span>
          <span className="text-gray-700 text-lg">Photos, stats locales, témoignages ("18 activités cette semaine à Paris")</span>
        </div>
      </div>

      <DarkBox>
        <p className="text-lg md:text-xl font-semibold">
          L'objectif n'est pas de <span className="text-orange-500">créer</span> des sportifs. C'est de <span className="text-orange-500">connecter</span> ceux qui le sont déjà — et de donner envie aux autres de les rejoindre.
        </p>
      </DarkBox>
    </div>
  );
}

const tabComponents = [
  ProblemeTab,
  SolutionTab,
  PositionnementTab,
  ConcurrenceTab,
  BusinessModelTab,
  ColdStartTab,
  GoToMarketTab,
];

export default function PitchPage() {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = tabComponents[activeTab];
  const tabBarAnchorRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = (i: number) => {
    setActiveTab(i);
  };

  useEffect(() => {
    // Scroll page instantly so the tab bar is at the top
    const anchor = tabBarAnchorRef.current;
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    // Scroll the tab strip so the active tab and next are fully visible,
    // previous tab can be partially cut off
    const container = tabsContainerRef.current;
    const activeButton = tabRefs.current[activeTab];
    const nextButton = tabRefs.current[activeTab + 1];
    if (container && activeButton) {
      // Calculate: we want activeButton fully visible + nextButton fully visible
      // So scroll so that the right edge of nextButton (or activeButton if last) fits
      const rightEdge = nextButton
        ? nextButton.offsetLeft + nextButton.offsetWidth
        : activeButton.offsetLeft + activeButton.offsetWidth;
      const scrollLeft = rightEdge - container.clientWidth;
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth',
      });
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white">
      {/* Logo bar */}
      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <img src="/fitmate_logo_transparent.png" alt="Fitmates Logo" className="h-14 md:h-16" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">L'espace digital du sport social</h1>
          <p className="text-sm mt-4 text-white/70 tracking-widest uppercase">Executive Pitch — Confidentiel</p>
        </div>
      </div>

      {/* Scroll anchor for tab clicks */}
      <div ref={tabBarAnchorRef} />

      {/* Tab navigation */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div ref={tabsContainerRef} className="flex overflow-x-auto scrollbar-hide -mb-px">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                ref={(el) => { tabRefs.current[i] = el; }}
                onClick={() => handleTabClick(i)}
                className={`whitespace-nowrap px-4 py-4 text-sm font-medium border-b-2 transition-colors shrink-0 ${
                  activeTab === i
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="container mx-auto px-4 py-10 md:py-14 max-w-4xl">
        <ActiveComponent />
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 py-12 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <p className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Fitmates donne au sport social l'espace digital qui lui manque.
          </p>
          <p className="text-gray-600 text-lg">
            Plus d'activités. Plus de lien. Plus de gens qui bougent ensemble.
          </p>
        </div>
      </div>
    </div>
  );
}
