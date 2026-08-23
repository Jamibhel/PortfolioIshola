import { ProjectItem, TechnicalConviction, DiagnosticQuestion, SkillCategory } from '../types';

export const siteContent = {
  nav: {
    home: { fr: 'Accueil', en: 'Home' },
    projects: { fr: 'Projets', en: 'Projects' },
    architecture: { fr: 'Architecture', en: 'Architecture' },
    diagnostic: { fr: 'Audit Stack', en: 'Stack Audit' },
    contact: { fr: 'Contact', en: 'Contact' },
    zbMode: {
      standard: { fr: 'Zero Bullshit Mode', en: 'Zero Bullshit Mode' },
      active: { fr: 'Production Mode', en: 'Production Mode' }
    }
  },
  hero: {
    statusBadge: {
      corporate: {
        fr: 'Disponible pour missions Full-Stack & Mobile',
        en: 'Available for Full-Stack & Mobile Opportunities'
      },
      zb: {
        fr: 'Code propre. Zéro dette technique. En production.',
        en: 'Clean code. Zero technical rot. Shipped to production.'
      }
    },
    title: {
      line1: {
        corporate: { fr: 'Architecturer les systèmes.', en: 'Architect systems.' },
        zb: { fr: 'Vos apps rament.', en: 'Your apps stutter.' }
      },
      line2: {
        corporate: { fr: 'Développer Web & Mobile.', en: 'Build Web & Mobile.' },
        zb: { fr: 'Votre backend bloque.', en: 'Your backend stalls.' }
      },
      line3: {
        corporate: { fr: 'Livrer à grande échelle.', en: 'Ship at scale.' },
        zb: { fr: 'Je règle la racine.', en: 'I fix the root cause.' }
      }
    },
    subtitle: {
      corporate: {
        fr: "Développeur Full-Stack & Mobile (Flutter, React Native, Next.js, Firebase, Supabase, Android).<br />Basé à Maryland, USA (Remote). Je conçois des apps mobiles performantes et des plateformes web scalables.<br />Parce qu'une belle interface ne survit jamais à une mauvaise architecture.",
        en: "Full-Stack Developer (Flutter, React Native, Next.js, Firebase, Supabase, Android).<br />Based in Maryland, USA (Remote). Building high-performance mobile apps and resilient web platforms.<br />Because a sleek UI never survives a fragile backend architecture."
      },
      zb: {
        fr: "Des apps mobiles 60fps et des backends qui encaissent la charge sans broncher.<br />Pas de frameworks à la mode jetables : du code typé, testé et taillé pour la production.",
        en: "60fps mobile apps and resilient backends that scale effortlessly under real user load.<br />No throwaway hype: typed, tested, production-grade architecture from day one."
      }
    },
    badges: [
      { fr: '3D & WEBGL (THREE.JS / SHADERS / DRACO)', en: '3D & WEBGL (THREE.JS / SHADERS / DRACO)' },
      { fr: 'MOBILE (FLUTTER / REACT NATIVE / ANDROID)', en: 'MOBILE (FLUTTER / REACT NATIVE / ANDROID)' },
      { fr: 'FULL-STACK (REACT / NEXT.JS / TYPESCRIPT)', en: 'FULL-STACK (REACT / NEXT.JS / TYPESCRIPT)' },
      { fr: 'CLOUD & DB (SUPABASE / FIREBASE / POSTGRES)', en: 'CLOUD & DB (SUPABASE / FIREBASE / POSTGRES)' }
    ],
    signaturePostIt: {
      name: 'Shamsideen Tairu',
      role: 'Full-Stack Developer',
      frontPunchline: {
        fr: "— oui, j'ai mis un post-it sur mon propre portfolio.",
        en: '— yes, I put a post-it on my own portfolio.'
      },
      frontButton: {
        fr: 'en savoir +',
        en: 'read +'
      },
      backText: {
        fr: "Ingénierie logicielle Full-Stack, Web & Mobile. Spécialiste Flutter, React Native, Next.js, Firebase, Supabase, Android Studio et architectures scalables.",
        en: 'Full-Stack, Web & Mobile software engineering. Specialist in Flutter, React Native, Next.js, Firebase, Supabase, Android Studio, and scalable production architectures.'
      },
      backClose: {
        fr: 'Cliquer pour revenir',
        en: 'Click to go back'
      }
    },
    easterEgg: {
      title: { fr: '10+ clics.', en: '10+ clicks.' },
      p1: {
        fr: 'Soit tu testes la réactivité de mon canvas,<br />soit tu veux qu’on construise un super produit ensemble.',
        en: "Either you're stress-testing my canvas,<br />or you really want us to build something great together."
      },
      p2: { fr: "Si c'est le deuxième cas :", en: "If it's the latter:" },
      close: { fr: 'Fermer (ESC)', en: 'Close (ESC)' }
    }
  },
  intro: {
    corporate: {
      fr: "Ingénieur Full-Stack & Mobile basé à Maryland, USA. Spécialisé dans le développement d'applications mobiles cross-platform (Flutter, React Native, Android natif), d'interfaces web réactives (React, Next.js) et d'architectures de données robustes (Firebase, Supabase, PostgreSQL). Note : une grande partie de mes réalisations est sous contrat NDA.",
      en: "Full-Stack Developer based in Maryland, USA. Specializing in cross-platform mobile apps (Flutter, React Native, native Android), responsive web platforms (React, Next.js), and resilient cloud/database architectures (Firebase, Supabase, PostgreSQL). Note: many major systems built cannot be publicly showcased due to NDAs."
    },
    zb: {
      fr: "Plein de développeurs empilent des librairies sans comprendre pourquoi leur app mobile freeze ou pourquoi la base de données sature. Moi je supprime la friction : architecture offline-first, indexation PostgreSQL chirurgicale, règles Firebase/Supabase étanches et composants ultra-légers. Moins de sur-ingénierie, plus de vélocité réelle.",
      en: "Too many developers blindly stack npm packages without understanding why mobile frames drop or why database connections stall. I eliminate the friction: offline-first caching, surgical database indexing, airtight authorization rules, and lightweight UI components. Maximum velocity with zero technical debt."
    }
  },
  projects: {
    sectionTitle: {
      fr: 'Projets & Réalisations Flagship',
      en: 'Flagship Projects & Systems'
    },
    subtitle: {
      fr: 'Applications Web & Mobiles en production (Flutter, React, Next.js, Firebase, Supabase). Note : Plusieurs projets d’envergure ne peuvent être présentés ici en raison d’accords de confidentialité (NDAs).',
      en: 'Production-grade Web & Mobile apps (Flutter, React, Next.js, Firebase, Supabase). Note: A substantial portion of projects built cannot be publicly showcased due to non-disclosure agreements (NDAs).'
    },
    ndaDisclaimer: {
      fr: '🔒 Note de confidentialité : La plupart de mes projets complexes et systèmes d’entreprise ont été réalisés sous accords de confidentialité stricts (NDAs). Les 8 projets ci-dessous représentent une sélection autorisée de mes travaux publics.',
      en: '🔒 Confidentiality Notice: Most enterprise and client applications I have built are protected under strict Non-Disclosure Agreements (NDAs). The 8 systems highlighted below represent an authorized selection of public work.'
    },
    filterAll: { fr: 'Tous les projets', en: 'All Projects' },
    filterMobile: { fr: 'Mobile Apps (iOS & Android)', en: 'Mobile Apps' },
    filterWeb: { fr: 'Full-Stack Web & SaaS', en: 'Full-Stack Web & SaaS' },
    filterCloud: { fr: 'Supabase & Firebase Cloud', en: 'Cloud & Database' }
  },
  convictions: {
    sectionTitle: { fr: 'Philosophie Technique', en: 'Engineering Philosophy' },
    headline: {
      fr: "L'excellence logicielle est une discipline de simplicité.",
      en: 'Software excellence is a discipline of radical simplicity.'
    }
  },
  contact: {
    sectionTitle: { fr: 'Contact Direct', en: 'Direct Contact' },
    headline: {
      fr: 'Parlons de votre prochain projet par email.',
      en: 'Let’s discuss your next project directly via email.',
      zbFr: 'Besoin d’un dev qui livre vraiment ? Envoyez un email.',
      zbEn: 'Need a full-stack developer who actually delivers? Send an email.'
    },
    subtext: {
      fr: 'Disponible pour des opportunités Full-Stack, développement d’applications mobiles Flutter / React Native, création de SaaS et conseil en architecture.',
      en: 'Available for Full-Stack developer roles, Flutter & React Native mobile development, SaaS architecture, and technical consulting.',
      zbFr: 'Vous avez une app mobile à sortir ou un produit web à scaler ? Discutons concrètement par email.',
      zbEn: 'Have a mobile app to ship or a web platform to scale? Let’s talk concrete solutions via email.'
    },
    email: 'devshamsideentairu@gmail.com',
    location: { fr: 'Maryland, USA • Remote', en: 'Maryland, USA • Remote' },
    writeEmail: { fr: 'M’écrire un email direct', en: 'Send a Direct Email' },
    downloadCv: { fr: 'Télécharger mon CV (PDF/TXT)', en: 'Download Resume / CV' }
  },
  diagnostic: {
    sectionTitle: { fr: 'Audit Stack & Scalabilité V8', en: 'Stack & Scalability Audit V8' },
    subtitle: {
      fr: 'Évaluez en 4 questions la maturité de votre stack Web & Mobile et obtenez un diagnostic d’architecture.',
      en: 'Assess in 4 questions the health and scalability of your Web & Mobile stack with instant architectural diagnosis.'
    },
    cta: {
      fr: 'M’envoyer les résultats par email',
      en: 'Email Me Your Audit Results'
    }
  },
  footer: {
    role: 'Full-Stack Developer (Flutter • React Native • Next.js • Supabase)',
    copy: 'Shamsideen Tairu Portfolio © 2021 • Built with React, Tailwind, Three.js & Supabase'
  }
};

export const flagshipProjects: ProjectItem[] = [
  {
    id: 'nutricare-elderly',
    title: { fr: 'NutriCare — Nutrition IA pour Seniors', en: 'NutriCare — AI Senior Nutrition Platform' },
    category: 'mobile',
    tagline: {
      fr: 'Recommandations nutritionnelles intelligentes pour seniors gérant diabète et hypertension avec aliments locaux nigérians.',
      en: 'Smart dietary recommendations for Nigerian seniors managing chronic conditions with local foods & medication tracking.'
    },
    description: {
      fr: 'Plateforme mobile et web dédiée à la nutrition et santé des personnes âgées (60+). Plans de repas personnalisés basés sur 50+ plats locaux nigérians, rappels de prise de médicaments avec alertes d’interactions médicamenteuses, et suivi de la courbe de poids et IMC.',
      en: 'Specialized geriatric healthcare mobile & web platform. Delivers condition-tailored meal plans using 50+ local Nigerian foods, medication reminders with drug-food interaction checks, weight/BMI trend analytics, and caregiver coordination.',
      zbFr: 'Plus de 1 000 seniors actifs avec 98% de satisfaction. Application fluide conçue pour l’accessibilité senior (gros contrastes, navigation simplifiée) et synchronisation Supabase temps réel.',
      zbEn: '1,000+ active seniors with a 98% satisfaction rate and 4.9★ rating. Ultra-accessible UI with large typography, clear daily notifications, and Supabase cloud sync.'
    },
    technologies: ['Flutter', 'Dart', 'React', 'Tailwind CSS', 'Next.js', 'Kotlin', 'Supabase'],
    metrics: [
      { fr: '1 000+ seniors actifs', en: '1,000+ Active Seniors' },
      { fr: '50+ plats locaux répertoriés', en: '50+ Local Foods Database' },
      { fr: '4.9/5 satisfaction', en: '4.9★ App Rating' }
    ],
    liveUrl: 'https://nutricareelderly1.vercel.app/',
    featured: true,
    architectureHighlights: [
      {
        fr: 'Moteur de recommandation diététique calculant les index glycémiques des aliments locaux.',
        en: 'Dietary algorithm calculating glycemic impact and sodium levels of traditional foods.'
      },
      {
        fr: 'Rappels de médication natifs avec synchronisation cloud chiffrée sur Supabase.',
        en: 'Native background medication reminder scheduling with encrypted Supabase storage.'
      }
    ]
  },
  {
    id: 'moniepal-fintech',
    title: { fr: 'MoniePal — Fintech d’Épargne & Tontine', en: 'MoniePal — Fintech Savings & Digital Wallet' },
    category: 'mobile',
    tagline: {
      fr: 'Plateforme d’épargne collective éthique (Ajo/Esusu) et portefeuille numérique avec sécurité bancaire.',
      en: 'Halal-compliant group savings (Ajo/Esusu) & digital wallet platform with automated goal tracking and bank-grade security.'
    },
    description: {
      fr: 'Plateforme financière sécurisée permettant aux communautés et particuliers de créer des cercles d’épargne collective (Ajo/Esusu), de suivre des objectifs financiers personnalisés et d’effectuer des transactions de portefeuille numérique en toute transparence.',
      en: 'High-security fintech savings platform built for scale. Enables users to form trusted cooperative savings circles, automate recurring wallet contributions, track financial targets, and execute transparent payouts managing real money.',
      zbFr: 'Système transactionnel robuste avec chiffrement de bout en bout et gestion sécurisée des fonds. Zéro perte de fonds, haute résilience et conformité éthique.',
      zbEn: 'Production-grade financial platform handling real user funds with automated multi-tier wallets, real-time transaction reconciliation, and zero security incidents.'
    },
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'PWA'],
    metrics: [
      { fr: 'Épargne de groupe Ajo/Esusu', en: 'Automated Group Ajo/Esusu' },
      { fr: 'Chiffrement de niveau bancaire', en: 'Bank-Grade Security' },
      { fr: 'Portefeuille numérique temps réel', en: 'Multi-Tier Digital Wallet' }
    ],
    liveUrl: 'https://mymoniepal.com/',
    featured: true,
    architectureHighlights: [
      {
        fr: 'Architecture de portefeuille numérique transactionnelle avec règles de validation strictes.',
        en: 'Transactional wallet architecture with atomic balances and cryptographic verification.'
      },
      {
        fr: 'Automatisation des cycles de cotisation et distribution équitable par smart triggers.',
        en: 'Automated recurring contribution cycles and dispute-free payout schedules.'
      }
    ]
  },
  {
    id: 'bookup-learning',
    title: { fr: 'BookUp — Communauté d’Apprentissage & Tutorat', en: 'BookUp — Student-Tutor Community App' },
    category: 'mobile',
    tagline: {
      fr: 'Écosystème mobile Android et web reliant étudiants et tuteurs avec messagerie temps réel et ressources.',
      en: 'Comprehensive student-tutor mobile & web platform with community feed, peer discussions, and instant tutoring.'
    },
    description: {
      fr: 'Plateforme académique complète comprenant une application mobile native Android (Java / Android Studio) et une application web réactive. Intègre un fil d’actualité académique, messagerie instantanée, partage de cours et mise en relation avec des tuteurs qualifiés.',
      en: 'Cross-platform academic ecosystem featuring a native Android mobile app and responsive web app. Powers real-time student study feeds, group discussions, tutoring matchmaking, and academic resource distribution.',
      zbFr: 'Application mobile native Android et web PWA avec synchronisation Firebase instantanée. Des milliers d’échanges académiques quotidiens sans latence.',
      zbEn: 'Native Android application and web PWA backed by Firebase real-time database, enabling zero-latency peer messaging and study group collaboration.'
    },
    technologies: ['Android Studio', 'Java', 'Firebase', 'React', 'Vite', 'PWA'],
    metrics: [
      { fr: 'App Mobile Android Native', en: 'Native Android App' },
      { fr: 'Messagerie & Feed Temps Réel', en: 'Real-Time Messaging & Feed' },
      { fr: 'Mise en relation tuteurs', en: 'Peer Tutor Matching' }
    ],
    liveUrl: 'https://book-up-ten.vercel.app/',
    appUrl: 'https://bit.ly/bookup-app-install',
    featured: true,
    architectureHighlights: [
      {
        fr: 'Application Android native optimisée pour la fluidité des listes et la messagerie instantanée.',
        en: 'Native Android architecture utilizing optimized RecyclerAdapters and Firebase listeners.'
      },
      {
        fr: 'Synchronisation multi-plateforme transparente entre l’app mobile et l’application web React.',
        en: 'Bidirectional state sync ensuring seamless continuity between mobile and web clients.'
      }
    ]
  },
  {
    id: 'ops4ease-saas',
    title: { fr: 'Ops4Ease — Plateforme d’Opérations pour PME', en: 'Ops4Ease — SME Operations SaaS Platform' },
    category: 'fullstack',
    tagline: {
      fr: 'SaaS tout-en-un pour PME africaines remplaçant Excel et WhatsApp par des outils de gestion RH, tâches et finances.',
      en: 'All-in-one operations SaaS for African SMEs covering task management, team collaboration, HR, attendance, and business analytics.'
    },
    description: {
      fr: 'Plateforme d’opérations intégrée conçue pour les PME nigérianes et africaines. Centralise la gestion des tâches, le suivi de présence des employés, l’automatisation des processus internes, la gestion financière et les tableaux de bord décisionnels en temps réel.',
      en: 'Unified operations hub engineered for African SMEs. Eliminates disconnected spreadsheets and WhatsApp groups by centralizing task tracking, workforce attendance, HR workflows, finance tooling, and executive business insights.',
      zbFr: 'Remplace 5 outils fragmentés par une interface unique ultra-rapide. Permet aux dirigeants de visualiser en temps réel la productivité et la rentabilité de leurs équipes.',
      zbEn: 'Consolidates 5 fragmented tools into a single fast SaaS dashboard, giving founders instant real-time operational visibility over staff, tasks, and cashflow.'
    },
    technologies: ['React', 'TypeScript', 'Vite', 'Firebase', 'Tailwind CSS'],
    metrics: [
      { fr: 'Suite complète pour PME', en: 'All-in-One Operations Suite' },
      { fr: 'Suivi de présence temps réel', en: 'Real-Time Attendance' },
      { fr: 'Finances & Tâches unifiées', en: 'Unified HR & Finance' }
    ],
    liveUrl: 'https://ops4ease.com/',
    featured: true,
    architectureHighlights: [
      {
        fr: 'Architecture SaaS multi-entreprises avec gestion fine des rôles et permissions.',
        en: 'Multi-tenant role-based access control (RBAC) isolating organization data.'
      },
      {
        fr: 'Tableaux de bord analytiques temps réel avec calcul automatique des indicateurs de performance.',
        en: 'Real-time aggregated dashboards monitoring staff productivity and operational KPIs.'
      }
    ]
  },
  {
    id: 'depeace-travels',
    title: { fr: 'Depeace Global — Hub de Réservation de Voyages', en: 'Depeace Global — Travel Booking Hub' },
    category: 'fullstack',
    tagline: {
      fr: 'Agence de voyages en ligne pour forfaits Hajj & Umrah, vols internationaux et gestion des visas.',
      en: 'Full-service travel platform for Hajj/Umrah pilgrimage packages, business travel, and visa booking with Supabase CMS.'
    },
    description: {
      fr: 'Portail de réservation et système de gestion de contenu pour agence de voyage internationale. Présente des forfaits sur-mesure pour le Hajj et l’Omra, un blog de voyage, des galeries de destinations et un espace d’administration propulsé par Supabase.',
      en: 'High-conversion travel booking platform and CMS. Features specialized Hajj and Umrah pilgrimage packages, international flight and hotel reservations, destination service galleries, travel blog, and an admin CMS powered by Supabase.',
      zbFr: 'Interface moderne et fluide construite avec shadcn/ui et Tailwind CSS, intégrant un back-office Supabase pour la mise à jour instantanée des tarifs et forfaits.',
      zbEn: 'Polished booking interface with shadcn/ui and Tailwind CSS, backed by a Supabase CMS for instant package and pricing management.'
    },
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Supabase'],
    metrics: [
      { fr: 'Forfaits Hajj & Umrah', en: 'Hajj & Umrah Packages' },
      { fr: 'Services de visa complets', en: 'Multi-Tier Visa Management' },
      { fr: 'Back-office Supabase', en: 'Dynamic Supabase CMS' }
    ],
    liveUrl: 'https://depeacetravels.com/',
    featured: false,
    architectureHighlights: [
      {
        fr: 'Intégration de Supabase Database pour la gestion dynamique des catalogues de voyage.',
        en: 'Dynamic catalog schema in Supabase with instant content updates and caching.'
      },
      {
        fr: 'Composants d’interface haute fidélité avec accessibilité native via shadcn/ui.',
        en: 'Accessible, responsive travel booking workflow built on shadcn/ui primitives.'
      }
    ]
  },
  {
    id: 'infinite-studio',
    title: { fr: 'Infinite Studio — Espace de Création de Contenu', en: 'Infinite Studio — Content Creation Studio Space' },
    category: 'web',
    tagline: {
      fr: 'Espace de studio de contenu haut de gamme à Abeokuta avec 8 décors thématiques et système de réservation.',
      en: 'Premier content studio in Abeokuta with 8 themed creative spaces, cinema-grade gear, and flexible reservations.'
    },
    description: {
      fr: 'Site web vitrine et plateforme de réservation pour le premier studio de création de contenu d’Abeokuta. Propose la découverte de 8 espaces thématiques immersifs, la réservation de créneaux avec matériel professionnel (éclairage cinéma, caméras 4K) et un contact WhatsApp direct.',
      en: 'Editorial web platform and booking system for Abeokuta’s leading content studio. Showcases 8 themed creative production sets, equipment reservations (cinema lighting, 4K camera setups), creator testimonials, and seamless WhatsApp booking.',
      zbFr: '4 000+ heures réservées par 100+ créateurs et marques. Design éditorial primé avec animations fluides et temps de chargement instantanés.',
      zbEn: '4,000+ studio hours booked by 100+ creators. Award-worthy editorial aesthetic with smooth micro-interactions and sub-second page loads.'
    },
    technologies: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Lucide Icons'],
    metrics: [
      { fr: '8 Espaces thématiques', en: '8 Themed Studio Spaces' },
      { fr: '4 000+ Heures réservées', en: '4,000+ Hours Booked' },
      { fr: '100+ Créateurs & Marques', en: '100+ Creators & Brands' }
    ],
    liveUrl: 'https://www.infinitestudio.space/',
    featured: false,
    architectureHighlights: [
      {
        fr: 'Architecture Next.js 14 avec rendu hybride et optimisation des galeries multimédias.',
        en: 'Next.js 14 architecture with responsive WebP image optimization and lazy-loaded galleries.'
      }
    ]
  },
  {
    id: 'provenance-school',
    title: { fr: 'Provenance School — Plateforme Éducative & Webinaires', en: 'Provenance School — Business Education Platform' },
    category: 'web',
    tagline: {
      fr: 'Plateforme de webinaires et formation pour dirigeants avec portails étudiants et tuteurs.',
      en: 'Interactive executive education platform with live webinar rooms, student/tutor portals, and registration management.'
    },
    description: {
      fr: 'Plateforme EdTech moderne conçue pour former les leaders d’entreprise. Intègre des webinaires interactifs en direct, des modules de cours par spécialité, la gestion des inscriptions et des portails sécurisés pour étudiants et intervenants.',
      en: 'Executive education portal empowering next-generation business leaders. Features live interactive webinars, modular course management, student onboarding, and role-based tutor/admin management portals.',
      zbFr: 'Double portail étudiant/tuteur avec synchronisation en direct et interface intuitive favorisant un taux de complétion élevé des programmes.',
      zbEn: 'Dual-portal architecture separating student learning environments from tutor curriculum tools, backed by real-time session tracking.'
    },
    technologies: ['React', 'TypeScript', 'Firebase', 'Supabase', 'Tailwind CSS'],
    metrics: [
      { fr: 'Webinaires interactifs', en: 'Interactive Live Webinars' },
      { fr: 'Portails Étudiant & Tuteur', en: 'Dual Role-Based Portals' },
      { fr: 'Gestion de cours modulaire', en: 'Modular Course System' }
    ],
    liveUrl: 'https://provenancesch.com/',
    featured: false,
    architectureHighlights: [
      {
        fr: 'Gestion des sessions de cours en direct avec synchronisation d’état sur Supabase et Firebase.',
        en: 'Hybrid Supabase/Firebase backend handling live webinar attendee presence and registration.'
      }
    ]
  },
  {
    id: 'willow-health',
    title: { fr: 'Willow Health — Santé & Bien-Être sur Campus', en: 'Willow Health — Campus Wellness Platform' },
    category: 'web',
    tagline: {
      fr: 'Plateforme de santé numérique connectant étudiants et cliniques universitaires avec prise de RDV et tri.',
      en: 'Digital student health platform connecting university students with campus clinics, triage workflows, and analytics.'
    },
    description: {
      fr: 'Solution complète de santé pour campus universitaires comprenant une application mobile pour les étudiants, un tableau de bord de tri pour les professionnels de santé et des graphiques d’analyse de données cliniques avec Recharts.',
      en: 'Campus wellness ecosystem providing students with private, confidential healthcare access. Includes student self-assessment tools, clinic triage dashboards, appointment booking, and wellness trend analytics powered by Recharts.',
      zbFr: 'Système sécurisé garantissant la confidentialité médicale des étudiants avec visualisation des tendances de santé du campus en temps réel.',
      zbEn: 'Zero-breach student medical portal with automated appointment triaging and interactive data visualization for university health administrators.'
    },
    technologies: ['React', 'TypeScript', 'Firebase', 'Recharts', 'Tailwind CSS'],
    metrics: [
      { fr: 'Tri clinique sur campus', en: 'Campus Clinic Triage' },
      { fr: 'Analyses visuelles Recharts', en: 'Interactive Recharts Analytics' },
      { fr: '100% Confidentialité', en: 'Strict Medical Privacy' }
    ],
    liveUrl: 'https://campus-wellnes.web.app/',
    featured: false,
    architectureHighlights: [
      {
        fr: 'Tableaux de bord cliniques interactifs utilisant Recharts pour visualiser les flux de consultation.',
        en: 'Interactive clinical dashboards with Recharts rendering real-time appointment volume.'
      },
      {
        fr: 'Structure de données sécurisée sur Firebase garantissant l’anonymisation des dossiers de santé.',
        en: 'Anonymized Firebase database schema protecting confidential student consultation records.'
      }
    ]
  }
];

export const convictions: TechnicalConviction[] = [
  {
    id: 'offline-first',
    icon: 'solar:smartphone-update-linear',
    title: { fr: 'Mobile & Offline-First par Défaut', en: 'Offline-First & Native Mobile' },
    description: {
      fr: "Les réseaux mobiles sont instables. Une application mobile de qualité doit fonctionner sans friction hors-ligne et réconcilier les données avec Supabase / Firebase dès le retour du réseau.",
      en: "Mobile networks are volatile. Production mobile apps must function flawlessly offline and gracefully synchronize data with Supabase or Firebase upon reconnection."
    }
  },
  {
    id: 'database-integrity',
    icon: 'solar:database-linear',
    title: { fr: 'Sécurité à la Source (RLS & Rules)', en: 'Security at the Data Layer' },
    description: {
      fr: "La sécurité ne doit pas reposer uniquement sur du code applicatif. Avec PostgreSQL RLS et les règles de sécurité Firebase, chaque donnée est protégée à la source.",
      en: "Security shouldn't rely solely on client-side checks. With PostgreSQL RLS and airtight Firebase rules, authorization is enforced at the database engine level."
    }
  },
  {
    id: '60fps-performance',
    icon: 'solar:bolt-linear',
    title: { fr: '60 FPS & Latence Sub-100ms', en: '60 FPS & Sub-100ms INP' },
    description: {
      fr: "L'utilisateur ressent chaque saccade et chaque milliseconde d'attente. L'optimisation du thread UI, des animations natives et du rendu web est une priorité absolue.",
      en: "Users don't inspect architecture diagrams—they feel every dropped frame and delay. UI thread optimization, native gestures, and crisp web interactions are non-negotiable."
    }
  },
  {
    id: 'end-to-end-types',
    icon: 'solar:shield-check-linear',
    title: { fr: 'Typage Strict de Bout en Bout', en: 'End-to-End Type Safety' },
    description: {
      fr: "Du schéma de base de données jusqu'aux composants Flutter, React Native et Next.js, le typage strict TypeScript / Dart élimine 90% des bugs avant la mise en production.",
      en: "From database schemas to Flutter, React Native, and Next.js UI components, end-to-end TypeScript & Dart static typing eliminates 90% of bugs before production."
    }
  }
];

export const technicalSkills: SkillCategory[] = [
  {
    id: '3d-graphics',
    title: { fr: '3D & Expériences Interactives', en: '3D & Interactive Graphics' },
    tagline: { fr: 'Rendu temps réel, shaders & WebGL fluide', en: 'Real-time rendering, shaders & silky WebGL' },
    skills: ['Three.js', 'WebGL', 'GLSL Shaders', 'Draco / GLTF 3D', 'Canvas API', 'Framer Motion', 'Anime.js']
  },
  {
    id: 'mobile-dev',
    title: { fr: 'Ingénierie Mobile Multiplateforme', en: 'Cross-Platform & Native Mobile' },
    tagline: { fr: 'Apps 60fps résilientes offline-first', en: '60fps resilient offline-first native apps' },
    skills: ['Flutter & Dart', 'React Native / Expo', 'Android Studio', 'Java & Kotlin', 'SQLite / Isar Cache', 'FCM Push Notifications', 'Native Bridges']
  },
  {
    id: 'web-fullstack',
    title: { fr: 'Web Moderne & Frontend Réactif', en: 'Modern Web & Full-Stack' },
    tagline: { fr: 'Composants typés, SSR & design systems', en: 'Typed components, SSR & design systems' },
    skills: ['React 19', 'Next.js 15 (App Router)', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Recharts', 'Vite', 'Zustand / Riverpod']
  },
  {
    id: 'cloud-data',
    title: { fr: 'Cloud, Données & Temps Réel', en: 'Cloud, Databases & Real-Time' },
    tagline: { fr: 'Architectures résilientes et sécurité RLS', en: 'Resilient architectures & RLS data security' },
    skills: ['Supabase (PostgreSQL / RLS)', 'Firebase (Firestore / Auth)', 'Edge Functions', 'pgvector & AI embeddings', 'REST & GraphQL APIs', 'WebSockets']
  },
  {
    id: 'devops-security',
    title: { fr: 'DevOps, Sécurité & Architecture', en: 'DevOps, Security & Tooling' },
    tagline: { fr: 'Pipelines CI/CD et qualité de code', en: 'Automated CI/CD pipelines & code quality' },
    skills: ['GitHub Actions (CI/CD)', 'Fastlane', 'Docker', 'Turborepo', 'Clean Architecture & TDD', 'OWASP Standards', 'Performance Profiling']
  }
];

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: 1,
    question: {
      fr: 'Comment votre application mobile gère-t-elle les coupures réseau ?',
      en: 'How does your mobile app handle sudden network disconnections?',
      zbFr: 'Votre app mobile plante-t-elle dès qu’un utilisateur passe sous un tunnel ?',
      zbEn: 'Does your mobile app crash or freeze the moment a user enters an elevator?'
    },
    options: [
      {
        id: '1a',
        text: {
          fr: 'Architecture offline-first avec cache local (SQLite/WatermelonDB) et sync automatique Supabase/Firebase',
          en: 'Offline-first architecture with local cache (SQLite/Isar) and automatic cloud sync',
          zbFr: 'Zéro spinner bloquant : les actions sont enregistrées localement et envoyées en tâche de fond',
          zbEn: 'Zero blocking spinners: mutations queue locally and sync gracefully in background'
        },
        score: 3
      },
      {
        id: '1b',
        text: {
          fr: 'Cache mémoire simple (React Query) sans persistance sur disque',
          en: 'Simple in-memory cache (React Query) without disk persistence',
          zbFr: 'Si l’app redémarre hors-ligne, écran blanc et perte des données non envoyées',
          zbEn: 'If app restarts offline, blank screen and lost unsaved input'
        },
        score: 2
      },
      {
        id: '1c',
        text: {
          fr: 'Requêtes directes avec spinner de chargement et message d’erreur en cas de timeout',
          en: 'Direct HTTP calls with loading spinners and timeout alerts',
          zbFr: 'L’utilisateur est bloqué avec des popups "Erreur réseau" à répétition',
          zbEn: 'The user is bombarded with annoying "Network Error" modals'
        },
        score: 1
      }
    ]
  },
  {
    id: 2,
    question: {
      fr: 'Comment est garantie la sécurité de vos données multi-utilisateurs ?',
      en: 'How is data security enforced across multiple tenants/users?',
      zbFr: 'Avez-vous des règles de sécurité au niveau données ou espérez-vous que le backend ne fuite rien ?',
      zbEn: 'Do you enforce database-level security or just pray your API controllers never leak data?'
    },
    options: [
      {
        id: '2a',
        text: {
          fr: 'Row-Level Security (RLS) PostgreSQL / Règles Firebase étanches testées unitairement',
          en: 'Airtight PostgreSQL Row-Level Security (RLS) / Firebase Security Rules tested in CI',
          zbFr: 'Même si un token est exposé, la base refuse tout accès aux données des autres utilisateurs',
          zbEn: 'Even if an API token leaks, the database engine strictly denies unauthorized rows'
        },
        score: 3
      },
      {
        id: '2b',
        text: {
          fr: 'Filtres de sécurité appliqués manuellement dans les contrôleurs API de l’application',
          en: 'Manual authorization filters in application API controllers',
          zbFr: 'Un développeur oublie un WHERE user_id = ... et les données privées fuient',
          zbEn: 'One developer forgets a WHERE user_id = ... clause and user data is compromised'
        },
        score: 1
      },
      {
        id: '2c',
        text: {
          fr: 'Middleware d’authentification basique sur les routes principales',
          en: 'Basic authentication middleware on top-level routes',
          zbFr: 'Authentifié = accès complet à la base sans cloisonnement granulaire',
          zbEn: 'Authenticated = full database access without granular record ownership'
        },
        score: 2
      }
    ]
  },
  {
    id: 3,
    question: {
      fr: 'Quelle est la fluidité de vos écrans mobiles et web complexes ?',
      en: 'What is the rendering fluidity of your complex mobile and web screens?',
      zbFr: 'Vos listes déroulantes saccadent-elles quand on scroll rapidement ?',
      zbEn: 'Do your lists stutter and drop frames when scrolling fast?'
    },
    options: [
      {
        id: '3a',
        text: {
          fr: 'Listes virtualisées, animations sur le thread UI natif et sub-50ms INP',
          en: 'Virtualized lists, native UI thread animations, and sub-50ms interaction latency',
          zbFr: '60fps constants même avec des milliers d’éléments chargés et animations fluides',
          zbEn: 'Steady 60fps even with thousands of items rendered and fluid gestural feedback'
        },
        score: 3
      },
      {
        id: '3b',
        text: {
          fr: 'Listes standard avec re-renders occasionnels sur les gros composants',
          en: 'Standard lists with occasional re-renders on heavy components',
          zbFr: 'Quelques ralentissements visibles sur les téléphones d’entrée de gamme',
          zbEn: 'Noticeable frame drops on budget mobile devices'
        },
        score: 2
      },
      {
        id: '3c',
        text: {
          fr: 'ScrollView basique sans virtualisation ni mémoïsation',
          en: 'Basic ScrollView without virtualization or memoization',
          zbFr: 'Consommation mémoire explosive et freeze de l’application sur les gros volumes',
          zbEn: 'Skyrocketing memory usage and total app freezes on large datasets'
        },
        score: 1
      }
    ]
  },
  {
    id: 4,
    question: {
      fr: 'Quel est le niveau d’automatisation de votre pipeline de livraison (CI/CD) ?',
      en: 'What is the automation level of your deployment pipeline (CI/CD)?',
      zbFr: 'Livrez-vous vos applications mobiles en 1 clic ou manuellement avec sueur froide ?',
      zbEn: 'Do you deploy mobile & web updates in 1-click or manually with anxiety?'
    },
    options: [
      {
        id: '4a',
        text: {
          fr: 'Pipeline CI/CD complet (Fastlane / GitHub Actions / Vercel) avec tests automatisés',
          en: 'Full CI/CD pipeline (Fastlane / GitHub Actions / Vercel) with automated tests',
          zbFr: 'Chaque commit sur main déclenche les tests, builds et déploiements en staging sans intervention',
          zbEn: 'Every commit on main triggers automated tests, preview builds, and zero-downtime deploys'
        },
        score: 3
      },
      {
        id: '4b',
        text: {
          fr: 'Déploiements web automatiques mais builds mobiles générés localement',
          en: 'Automated web deployments but locally compiled mobile builds',
          zbFr: 'Le build mobile dépend de la machine d’un développeur et prend 45 minutes',
          zbEn: 'Mobile builds depend on one dev’s local laptop setup taking 45 min'
        },
        score: 2
      },
      {
        id: '4c',
        text: {
          fr: 'Processus manuel de compilation et téléversement sur les stores',
          en: 'Manual compilation and store upload process',
          zbFr: 'Chaque release est un parcours du combattant avec des risques d’erreurs de build',
          zbEn: 'Every store release is an anxiety-inducing manual ordeal with build errors'
        },
        score: 1
      }
    ]
  }
];
