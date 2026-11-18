export type LangCode = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh';
export type WebsiteTheme = 'light' | 'dark';

export interface LanguageOption {
  code: LangCode;
  label: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'es', label: 'Spanish', nativeName: 'Español' },
  { code: 'fr', label: 'French', nativeName: 'Français' },
  { code: 'de', label: 'German', nativeName: 'Deutsch' },
  { code: 'ja', label: 'Japanese', nativeName: '日本語' },
  { code: 'zh', label: 'Chinese', nativeName: '中文' },
];

export interface TranslationBundle {
  navHome: string;
  navEstimator: string;
  navGlobe: string;
  navClient: string;
  navEmployee: string;
  navAdmin: string;
  navAbout: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutSubtitle: string;
  bookWaybillCta: string;
  themeLabel: string;
  themeLight: string;
  themeDark: string;
  languageLabel: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroLookupLabel: string;
  heroLookupPlaceholder: string;
  heroLookupButton: string;
  heroConfigureBtn: string;
  heroClientBtn: string;
  kpi1Title: string;
  kpi2Title: string;
  kpi3Title: string;
  kpi4Title: string;
  sectionFleetEyebrow: string;
  sectionFleetTitle: string;
  compareTariffsBtn: string;
  bookModePrefix: string;
  sectionTelemetryEyebrow: string;
  sectionTelemetryTitle: string;
  sectionPortsEyebrow: string;
  sectionPortsTitle: string;
  readyCtaTitle: string;
  readyCtaDesc: string;
  launchEstimatorBtn: string;
  enterClientBtn: string;
  footerTagline: string;
}

const TRANSLATIONS: Record<LangCode, TranslationBundle> = {
  en: {
    navHome: 'Global Network',
    navEstimator: 'Freight Estimator',
    navGlobe: 'Live 3D Globe Map',
    navClient: 'Client Shipper Portal',
    navEmployee: 'Employee & Courier Terminal',
    navAdmin: '24/7 Master Dispatch ERP',
    navAbout: 'About Us',
    aboutEyebrow: 'Portal 07 · Corporate Heritage & Global Logistics Mission',
    aboutTitle: 'Engineering Sovereign Global Freight Across Six Oceans.',
    aboutSubtitle:
      'Founded in 1998 across Rotterdam and Singapore, Vanguard Global Freight operates ultra-large maritime vessels, priority widebody air charters, and cryogenic cold-chain infrastructure with 24/7 satellite custody.',
    bookWaybillCta: 'Book Waybill',
    themeLabel: 'Website Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    languageLabel: 'Language',
    heroEyebrow: 'Vanguard Global Freight · 24/7 Maritime & Air Telemetry OS',
    heroTitle: 'Global Freight. Tracked in Real Time.',
    heroSubtitle:
      'Door-to-port container, air, and cold-chain logistics across 140+ international harbors.',
    heroLookupLabel: 'Private Orbital Waybill Reference Lookup',
    heroLookupPlaceholder: 'Enter private Waybill ID manually...',
    heroLookupButton: 'Launch 3D Globe Tracker',
    heroConfigureBtn: 'Configure Container & Air Quote',
    heroClientBtn: 'Open Commercial Shipper Desk',
    kpi1Title: '420+ Active Vessels',
    kpi2Title: '99.94% On-Schedule Arrival',
    kpi3Title: '148 Customs Ports',
    kpi4Title: '24/7 Satellite Telemetry',
    sectionFleetEyebrow: '01. Sovereign Fleet & Port Terminal Infrastructure',
    sectionFleetTitle: 'Intermodal Assets Across Ocean, Air, Cold-Chain & Ground',
    compareTariffsBtn: 'Compare All Modal Tariffs',
    bookModePrefix: 'Book',
    sectionTelemetryEyebrow: '02. End-to-End Chain of Custody Architecture',
    sectionTelemetryTitle: 'How 24/7 Satellite & Customs Telemetry Works',
    sectionPortsEyebrow: '03. Regional Port Authorities & Bonded Hubs',
    sectionPortsTitle: 'Interactive Global Port Hub Directory',
    readyCtaTitle: 'Ready to dispatch a container or charter a priority air corridor?',
    readyCtaDesc:
      'Generate an instant private Waybill synced across Crew Terminal and 24/7 Master ERP portals.',
    launchEstimatorBtn: 'Launch Freight Estimator',
    enterClientBtn: 'Enter Client Shipper Portal',
    footerTagline:
      'Sovereign Maritime, Priority Air & Cold-Chain Telemetry across 148 Customs Ports.',
  },
  es: {
    navHome: 'Red Global',
    navEstimator: 'Cotizador de Carga',
    navGlobe: 'Mapa Globo 3D',
    navClient: 'Portal del Cliente',
    navEmployee: 'Terminal de Tripulación',
    navAdmin: 'ERP Despacho 24/7',
    navAbout: 'Sobre Nosotros',
    aboutEyebrow: 'Portal 07 · Historia Corporativa y Misión Logística',
    aboutTitle: 'Ingeniería de Carga Global Soberana en Seis Océanos.',
    aboutSubtitle:
      'Fundada en 1998 entre Róterdam y Singapur, Vanguard Global Freight opera buques portacontenedores, chárteres aéreos prioritarios e infraestructura de cadena de frío con custodia satelital 24/7.',
    bookWaybillCta: 'Reservar Guía',
    themeLabel: 'Tema del Sitio',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    languageLabel: 'Idioma',
    heroEyebrow: 'Vanguard Global Freight · Sistema de Telemetría Marítima y Aérea 24/7',
    heroTitle: 'Carga Global. Rastreada en Tiempo Real.',
    heroSubtitle:
      'Logística puerta a puerto en contenedores, carga aérea y cadena de frío en más de 140 puertos internacionales.',
    heroLookupLabel: 'Consulta Privada de Guía Orbital',
    heroLookupPlaceholder: 'Ingrese el ID de guía manualmente...',
    heroLookupButton: 'Abrir Rastreador Globo 3D',
    heroConfigureBtn: 'Cotizar Contenedor y Carga Aérea',
    heroClientBtn: 'Abrir Portal Comercial',
    kpi1Title: '420+ Buques Activos',
    kpi2Title: '99.94% Llegada Puntual',
    kpi3Title: '148 Puertos Aduaneros',
    kpi4Title: 'Telemetría Satelital 24/7',
    sectionFleetEyebrow: '01. Flota Soberana e Infraestructura Portuaria',
    sectionFleetTitle: 'Activos Intermodales en Océano, Aire, Frío y Tierra',
    compareTariffsBtn: 'Comparar Tarifas Modales',
    bookModePrefix: 'Reservar',
    sectionTelemetryEyebrow: '02. Arquitectura de Custodia de Extremo a Extremo',
    sectionTelemetryTitle: 'Cómo Funciona la Telemetría Satelital y Aduanera 24/7',
    sectionPortsEyebrow: '03. Autoridades Portuarias Regionales y Centros',
    sectionPortsTitle: 'Directorio Interactivo de Puertos Globales',
    readyCtaTitle: '¿Listo para despachar un contenedor o fletar un corredor aéreo?',
    readyCtaDesc:
      'Genere una guía privada sincronizada con la Terminal de Tripulación y el ERP Maestro 24/7.',
    launchEstimatorBtn: 'Abrir Cotizador de Carga',
    enterClientBtn: 'Entrar al Portal de Cliente',
    footerTagline:
      'Telemetría Marítima, Aérea Prioritaria y Cadena de Frío en 148 Puertos Aduaneros.',
  },
  fr: {
    navHome: 'Réseau Mondial',
    navEstimator: 'Estimateur Fret',
    navGlobe: 'Globe 3D en Direct',
    navClient: 'Portail Client',
    navEmployee: 'Terminal Équipage',
    navAdmin: 'ERP Dispatch 24/7',
    navAbout: 'À Propos',
    aboutEyebrow: 'Portail 07 · Héritage & Mission Logistique Mondiale',
    aboutTitle: 'Ingénierie du Fret Souverain sur Six Océans.',
    aboutSubtitle:
      'Fondée en 1998 entre Rotterdam et Singapour, Vanguard Global Freight exploite des porte-conteneurs géants, des vols cargo prioritaires et des hubs cryogéniques sous suivi satellite 24/7.',
    bookWaybillCta: 'Réserver LTA',
    themeLabel: 'Thème du Site',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    languageLabel: 'Langue',
    heroEyebrow: 'Vanguard Global Freight · Télémétrie Maritime & Aérienne 24/7',
    heroTitle: 'Fret Mondial. Suivi en Temps Réel.',
    heroSubtitle:
      'Logistique porte-à-port en conteneur, fret aérien et chaîne du froid sur plus de 140 ports internationaux.',
    heroLookupLabel: 'Recherche Privée de Lettre de Transport',
    heroLookupPlaceholder: 'Saisissez votre numéro privé...',
    heroLookupButton: 'Lancer le Suivi Globe 3D',
    heroConfigureBtn: 'Configurer Devis Conteneur & Air',
    heroClientBtn: 'Ouvrir le Bureau Client',
    kpi1Title: '420+ Navires Actifs',
    kpi2Title: '99.94% Ponctualité',
    kpi3Title: '148 Ports Douaniers',
    kpi4Title: 'Télémétrie Satellite 24/7',
    sectionFleetEyebrow: '01. Flotte Souveraine & Infrastructures Portuaires',
    sectionFleetTitle: 'Actifs Intermodaux Mer, Air, Froid & Route',
    compareTariffsBtn: 'Comparer Tous les Tarifs',
    bookModePrefix: 'Réserver',
    sectionTelemetryEyebrow: '02. Chaîne de Traçabilité Intégrale',
    sectionTelemetryTitle: 'Fonctionnement de la Télémétrie Douanière 24/7',
    sectionPortsEyebrow: '03. Autorités Portuaires Régionales',
    sectionPortsTitle: 'Annuaire Interactif des Hubs Portuaires',
    readyCtaTitle: 'Prêt à expédier un conteneur ou affréter un vol prioritaire ?',
    readyCtaDesc:
      'Générez un titre privé synchronisé avec le Terminal Équipage et l’ERP 24/7.',
    launchEstimatorBtn: 'Lancer l’Estimateur',
    enterClientBtn: 'Accéder au Portail Client',
    footerTagline:
      'Télémétrie Maritime, Aérienne et Chaîne du Froid dans 148 Ports Douaniers.',
  },
  de: {
    navHome: 'Globales Netzwerk',
    navEstimator: 'Frachtkalkulator',
    navGlobe: 'Live 3D-Globus',
    navClient: 'Kundenportal',
    navEmployee: 'Crew-Terminal',
    navAdmin: '24/7 Master-ERP',
    navAbout: 'Über Uns',
    aboutEyebrow: 'Portal 07 · Unternehmensgeschichte & Globale Mission',
    aboutTitle: 'Souveräne Weltlogistik Über Alle Sechs Ozeane.',
    aboutSubtitle:
      '1998 zwischen Rotterdam und Singapur gegründet, betreibt Vanguard Global Freight Großcontainerschiffe, Prioritäts-Luftfrachtcharter und Kryo-Kühlketten mit 24/7 Satelliten-Telemetrie.',
    bookWaybillCta: 'Fracht Buchen',
    themeLabel: 'Website-Design',
    themeLight: 'Hell',
    themeDark: 'Dunkel',
    languageLabel: 'Sprache',
    heroEyebrow: 'Vanguard Global Freight · 24/7 See- & Luftfracht-Telemetrie',
    heroTitle: 'Globale Fracht. Live Verfolgt.',
    heroSubtitle:
      'Container-, Luftfracht- und Kühlkettenlogistik über mehr als 140 internationale Seehäfen.',
    heroLookupLabel: 'Private Frachtbrief-Abfrage',
    heroLookupPlaceholder: 'Private Frachtnummer eingeben...',
    heroLookupButton: '3D-Globus-Tracker Starten',
    heroConfigureBtn: 'Container- & Luftfracht Berechnen',
    heroClientBtn: 'Kunden-Desk Öffnen',
    kpi1Title: '420+ Aktive Schiffe',
    kpi2Title: '99.94% Pünktlichkeit',
    kpi3Title: '148 Zollhäfen',
    kpi4Title: '24/7 Satelliten-Telemetrie',
    sectionFleetEyebrow: '01. Flotten- & Hafenterminal-Infrastruktur',
    sectionFleetTitle: 'Intermodale Flotte: See, Luft, Kühlkette & Land',
    compareTariffsBtn: 'Alle Tarife Vergleichen',
    bookModePrefix: 'Buchen:',
    sectionTelemetryEyebrow: '02. Durchgängige Sicherheitsarchitektur',
    sectionTelemetryTitle: 'Wie 24/7 Satelliten- & Zoll-Telemetrie Funktioniert',
    sectionPortsEyebrow: '03. Regionale Hafenbehörden & Hubs',
    sectionPortsTitle: 'Interaktives Globales Hafenverzeichnis',
    readyCtaTitle: 'Bereit für Containerversand oder Prioritäts-Luftcharter?',
    readyCtaDesc:
      'Erstellen Sie einen privaten Frachtbrief mit Echtzeit-Sync zu Crew-Terminal und 24/7 Master-ERP.',
    launchEstimatorBtn: 'Frachtkalkulator Öffnen',
    enterClientBtn: 'Zum Kundenportal',
    footerTagline:
      'Maritime, Luftfracht- und Kühlketten-Telemetrie über 148 Zollhäfen.',
  },
  ja: {
    navHome: 'グローバル網',
    navEstimator: '運賃見積り',
    navGlobe: '3D地球儀マップ',
    navClient: '荷主ポータル',
    navEmployee: '乗務員端末',
    navAdmin: '24/7 総合ERP',
    navAbout: '会社概要',
    aboutEyebrow: 'ポータル 07 · 企業沿革・国際物流ミッション',
    aboutTitle: '六大洋を結ぶ、信頼のグローバル総合物流インフラ。',
    aboutSubtitle:
      '1998年にロッテルダムとシンガポールを拠点として設立されたVanguard Global Freightは、超大型コンテナ船・優先航空チャーター・低温コールドチェーンを24時間衛星監視で運用しています。',
    bookWaybillCta: '船荷予約',
    themeLabel: '表示テーマ',
    themeLight: 'ライト',
    themeDark: 'ダーク',
    languageLabel: '言語',
    heroEyebrow: 'Vanguard Global Freight · 24時間 海上・航空テレメトリーOS',
    heroTitle: '国際貨物を、リアルタイムで追跡。',
    heroSubtitle:
      '世界140以上の国際港を結ぶコンテナ・航空貨物・コールドチェーン総合物流。',
    heroLookupLabel: '非公開 貨物番号照会',
    heroLookupPlaceholder: '貨物番号を手入力してください...',
    heroLookupButton: '3D地球儀トラッカー起動',
    heroConfigureBtn: 'コンテナ・航空見積り設定',
    heroClientBtn: '荷主デスクを開く',
    kpi1Title: '420+ 稼働船隊',
    kpi2Title: '99.94% 定時到着率',
    kpi3Title: '148 通関港湾',
    kpi4Title: '24/7 衛星テレメトリー',
    sectionFleetEyebrow: '01. 船隊・港湾ターミナルインフラ',
    sectionFleetTitle: '海上・航空・冷蔵・陸上 統合輸送ネットワーク',
    compareTariffsBtn: '全輸送モード料金比較',
    bookModePrefix: '予約:',
    sectionTelemetryEyebrow: '02. エンドツーエンド管理チェーン',
    sectionTelemetryTitle: '24時間 衛星・通関テレメトリーの仕組み',
    sectionPortsEyebrow: '03. 主要国際港湾・保税ハブ',
    sectionPortsTitle: '世界主要ハブ港湾ディレクトリ',
    readyCtaTitle: 'コンテナ手配または優先航空チャーターを開始しますか？',
    readyCtaDesc:
      '乗務員端末・24時間統合ERPとリアルタイム同期する専用Waybillを発行します。',
    launchEstimatorBtn: '運賃見積りを起動',
    enterClientBtn: '荷主ポータルへ',
    footerTagline: '148の通関港を結ぶ海上・優先航空・コールドチェーン衛星管理。',
  },
  zh: {
    navHome: '全球网络',
    navEstimator: '运费估算',
    navGlobe: '3D 实时地球',
    navClient: '客户托运门户',
    navEmployee: '船员终端',
    navAdmin: '24/7 主控ERP',
    navAbout: '关于我们',
    aboutEyebrow: '门户 07 · 企业历程与全球物流使命',
    aboutTitle: '横跨六大洋的主权级全球货运工程网络。',
    aboutSubtitle:
      'Vanguard Global Freight 于 1998 年在鹿特丹与新加坡创立，依托超大型集装箱船队、优先全货机包机与深冷温控基础设施，提供 24/7 全天候卫星监管物流服务。',
    bookWaybillCta: '预订运单',
    themeLabel: '网站主题',
    themeLight: '浅色',
    themeDark: '深色',
    languageLabel: '语言',
    heroEyebrow: 'Vanguard Global Freight · 24/7 海运与空运遥测系统',
    heroTitle: '全球货运，实时精准追踪。',
    heroSubtitle: '覆盖全球140多个国际港口的门到港集装箱、航空货运与冷链物流服务。',
    heroLookupLabel: '私密电子运单号查询',
    heroLookupPlaceholder: '请手动输入您的私密运单号...',
    heroLookupButton: '启动 3D 地球仪追踪',
    heroConfigureBtn: '配置集装箱与空运报价',
    heroClientBtn: '进入商业托运台',
    kpi1Title: '420+ 现役船队',
    kpi2Title: '99.94% 准班率',
    kpi3Title: '148 通关港口',
    kpi4Title: '24/7 卫星遥测',
    sectionFleetEyebrow: '01. 主力船队与港口枢纽设施',
    sectionFleetTitle: '海运、空运、冷链与陆运多式联运资产',
    compareTariffsBtn: '对比所有运输费率',
    bookModePrefix: '预订',
    sectionTelemetryEyebrow: '02. 全程监管链架构',
    sectionTelemetryTitle: '24/7 卫星遥测与海关预清关运作机制',
    sectionPortsEyebrow: '03. 区域港务局与保税枢纽',
    sectionPortsTitle: '全球互动港口枢纽名录',
    readyCtaTitle: '准备调度集装箱或包机优先空运航线？',
    readyCtaDesc: '立即生成与船员终端及 24/7 主控 ERP 实时同步的私密运单。',
    launchEstimatorBtn: '启动运费估算器',
    enterClientBtn: '进入客户门户',
    footerTagline: '覆盖 148 个海关口岸的海运、优先空运与冷链实时卫星遥测网络。',
  },
};

export function getTranslations(lang: LangCode): TranslationBundle {
  return TRANSLATIONS[lang] ?? TRANSLATIONS.en;
}
