export type Project = {
  slug: string; number: string; name: string; category: string; mark: string;
  color: string; tags: string[]; filters: string[]; summary: string; role: string;
  problem: string; approach: string; deliverables: string[]; tech: string[];
  note?: string;
  inProgress?: boolean;
  screenshots?: { file: string; title: string; caption: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: 'matontine', number: '01', name: 'MaTontine', category: 'Mobile · Inclusion financière', mark: 'Mt.', color: 'gold',
    tags: ['Flutter', 'Hors-ligne'], filters: ['code', 'patrimoine'],
    summary: 'Créer une tontine, suivre les cotisations et partager le bilan du tour. Une application mobile pensée pour l’épargne collective.',
    role: 'Conception et développement Flutter / Dart, en solo',
    problem: 'Comment numériser une pratique communautaire sans perdre ce qui fait sa force ? En Afrique de l’Ouest francophone, un outil de tontine doit aussi rester utilisable lorsque la connexion est irrégulière.',
    approach: 'La version présentée permet de créer une tontine rotative à ordre fixe, de suivre les cotisations de chaque membre et de clôturer un tour. Un rapport réunit ensuite le bénéficiaire, le montant collecté et les contributions. L’application conserve les données localement et propose le partage du rapport en PDF ou en texte.',
    deliverables: ['Application Flutter avec persistance locale', 'Création guidée : informations, calendrier, membres et résumé', 'Tontine rotative à ordre fixe et suivi des cotisations', 'Rapport de clôture avec partage en PDF ou en texte', 'APK release compilé et installation validée', 'Dossier de présentation de dix pages'],
    tech: ['Flutter', 'Dart', 'shared_preferences', 'share_plus'],
    note: 'Version présentée : la tontine rotative à ordre fixe est disponible. Les autres modèles restent prévus ; les options aux enchères et épargne-crédit portent la mention « Bientôt ». Les noms et montants des captures appartiennent à un scénario de démonstration.',
    screenshots: [
      { file: 'accueil.png', title: 'Un point de départ clair', caption: 'L’accueil réunit le total collecté, les tontines actives et les membres. L’état vide invite à créer une première tontine.', alt: 'Accueil de MaTontine sans groupe créé, avec total de 0 FCFA et bouton Nouvelle tontine.' },
      { file: 'creation.png', title: 'Une création guidée', caption: 'Le parcours annonce quatre étapes. La première définit le nom, le montant de cotisation, la pénalité de retard et le type de tontine.', alt: 'Formulaire de création de tontine : informations, calendrier, membres et résumé ; modèle rotatif à ordre fixe sélectionné.' },
      { file: 'cotisations.png', title: 'Le tour, en un regard', caption: 'Le bénéficiaire, l’objectif de collecte et le statut de chaque membre sont visibles sur le même écran.', alt: 'Tour 1 de la tontine Demo, avec un objectif de 10 000 FCFA et deux membres qui n’ont pas encore cotisé.' },
      { file: 'rapport.png', title: 'Un bilan à partager', caption: 'Après la clôture, le rapport détaille les contributions et propose un partage en PDF ou en texte.', alt: 'Rapport d’un tour clôturé : deux cotisants à 5 000 FCFA chacun et boutons de partage PDF et texte.' },
    ],
  },
  {
    slug: 'nova', number: '02', name: 'NOVA™', category: 'E-commerce · Acquisition', mark: 'N.', color: 'clay',
    tags: ['Shopify', 'Liquid', 'Meta Ads'], filters: ['commerce', 'ia'],
    summary: 'Du produit à la boutique, de la création publicitaire à l’analyse. Une marque DTC travaillée de bout en bout.',
    role: 'Marque, boutique Shopify et acquisition payante',
    problem: 'Lancer une boutique autour d’un clip magnétique pour cheveux demande de relier la présentation du produit, les offres commerciales et les messages publicitaires.',
    approach: 'Construire des sections Liquid sur mesure et une barre d’achat avec synchronisation du prix, organiser les remises par paliers, puis comparer les campagnes vidéo et image à partir de leurs indicateurs.',
    deliverables: ['Sections Shopify sur mesure, thème Horizon', 'Remises automatiques à trois paliers via GraphQL', 'Barre d’achat collante avec synchronisation du prix', 'Scripts UGC et créations pour Meta', 'Analyse comparative CPM, CTR et ROAS'],
    tech: ['Shopify', 'Liquid', 'JavaScript', 'GraphQL', 'Meta Ads', 'ElevenLabs'],
    note: 'Les résultats commerciaux chiffrés ne sont pas présentés dans cette étude.',
  },
  {
    slug: 'labo-microbio', number: '03', name: 'Labo microbio virtuel', category: 'Éducation · Sciences', mark: 'μ.', color: 'blue',
    inProgress: true,
    tags: ['En cours', 'Microbiologie'], filters: ['code', 'education'],
    summary: 'Projet de laboratoire virtuel pour l’apprentissage de la microbiologie. En cours de développement, à un stade préliminaire.',
    role: 'Conception d’un projet d’application web éducative',
    problem: 'Les étudiants en microbiologie n’ont pas toujours accès au matériel nécessaire pour répéter les manipulations et s’approprier les calculs du laboratoire.',
    approach: 'Le projet est encore à un stade préliminaire, sans avancée majeure à présenter. L’objectif est d’explorer un support pédagogique autour des gestes du laboratoire. Le périmètre et les choix techniques restent à préciser.',
    deliverables: ['Définir le parcours pédagogique et les besoins des étudiants', 'Explorer des exercices sur les dilutions et le calcul d’UFC/g', 'Préciser les gestes à représenter et les choix techniques'],
    tech: ['À définir'],
    note: 'Projet en cours. Les éléments ci-dessus sont des pistes de travail, pas des fonctionnalités achevées ni une démonstration disponible.',
  },
  {
    slug: 'biostat', number: '04', name: 'BioStat', category: 'Data · Outil scientifique', mark: 'B↗', color: 'blue',
    tags: ['Python', 'Streamlit', 'Prototype'], filters: ['code', 'education', 'ia'],
    summary: 'Rendre la biostatistique plus accessible aux chercheurs, avec des analyses réunies dans un rapport exportable.',
    role: 'Développement d’un prototype Python / Streamlit',
    problem: 'Un chercheur non spécialiste des statistiques a besoin d’un parcours compréhensible pour réunir ses analyses et produire un document exploitable.',
    approach: 'Organiser les résultats dans un panier de rapports cumulatif et préparer leur génération en PDF. L’interprétation assistée par IA est envisagée dans une phase ultérieure.',
    deliverables: ['Prototype d’application Streamlit', 'Panier de rapports cumulatif', 'Génération PDF avec WeasyPrint'],
    tech: ['Python', 'Streamlit', 'WeasyPrint'],
    note: 'Prototype. L’interprétation par IA est prévue, elle n’est pas présentée comme une fonctionnalité déjà disponible.',
  },
  {
    slug: 'gbe', number: '05', name: 'GBÈ & récits', category: 'Patrimoine · Édition', mark: 'Gb.', color: 'clay',
    tags: ['Écriture', 'Fon', 'Édition'], filters: ['patrimoine'],
    summary: 'Une fiction ancrée dans le Fon, un regard sur l’histoire régionale et des documents conçus pour transmettre.',
    role: 'Écriture longue et conception éditoriale',
    problem: 'Faire vivre un récit culturel dans un format numérique demande autant d’attention au fond qu’à sa mise en page et à sa transmission.',
    approach: 'GBÈ explore un Cotonou inondé en 2061 à travers une novella de science-fiction ancrée dans le Fon. Un autre travail porte sur l’histoire du terrorisme en Afrique de l’Ouest, avec une chaîne de fabrication PDF dédiée.',
    deliverables: ['Projet de novella de science-fiction', 'Livre illustré de vingt-cinq pages sur l’histoire régionale', 'Figures SVG sur mesure', 'Pipeline PDF réunissant couverture et corps du document'],
    tech: ['SVG', 'Playwright', 'pypdf'],
  },
  {
    slug: 'recherche-produit', number: '06', name: 'Recherche produit DTC', category: 'Commerce · Veille', mark: 'R.', color: 'gold',
    tags: ['Analyse', 'Veille', 'IA appliquée'], filters: ['commerce', 'conformite', 'ia'],
    summary: 'Croiser les signaux de marché et les contraintes du produit pour éclairer les décisions avant un lancement.',
    role: 'Recherche produit et veille réglementaire',
    problem: 'Une publicité visible ne suffit pas à justifier un lancement. Il faut comprendre la demande, les contraintes logistiques et les points réglementaires à examiner.',
    approach: 'Croiser les informations de Meta Ad Library et TrendTrack, appliquer une grille de sélection et identifier les sujets réglementaires propres aux marchés étudiés.',
    deliverables: ['Grille de sélection produit en huit critères', 'Croisement des signaux publicitaires et du trafic', 'Veille sur les sujets DGCCRF et cosmétique UE', 'Identification de points de vigilance sur le marché mexicain'],
    tech: ['TrendTrack', 'Meta Ad Library', 'Google Trends', 'API Claude', 'MCP'],
    note: 'Cette présentation décrit un travail de recherche et de veille, sans revendiquer une certification réglementaire.',
  },
];

export const filters = [
  ['all', 'Tous les projets'], ['code', 'Code'], ['commerce', 'Commerce'],
  ['education', 'Éducation'], ['patrimoine', 'Patrimoine'], ['conformite', 'Veille'], ['ia', 'IA appliquée'],
];

export function url(path = '') { return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`; }
