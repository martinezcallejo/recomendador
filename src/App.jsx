import { useState, useEffect } from 'react';

// =========================================================================
// DATA
// =========================================================================

const ARQUETIPOS = [
  {
    id: 'retrato-exterior',
    nombre: 'Retrato exterior',
    grupo: 'personas',
    requiereEdad: true,
    aplicaHora: true,
    aplicaMeteo: true,
    aplicaLugares: true,
    horaIdeal: 'Golden hour',
    horaPorQue: 'Luz cálida y suave, sombras blandas.',
    ajustes: {
      focal: '85mm',
      apertura: 'f/1.8',
      iso: '100-400',
      af: 'AF-S + detección de ojo',
    },
    equipo: {
      cuerpo: ['FF con AF detección de ojo', 'Sony A7 IV', 'Canon R6 Mark II'],
      objetivo: [
        '85mm f/1.4-1.8',
        'Sigma 85mm f/1.4 DG DN Art',
        'Sony FE 85mm f/1.8',
      ],
      luz: ['Reflector 5-en-1 + flash TTL de mano', 'Godox V1', 'Profoto A10'],
      accesorios: [
        'Difusor',
        'Pinza para reflector',
        'Asistente o trípode con brazo',
      ],
    },
    osmTags: ['leisure=park', 'leisure=garden'],
    libros: [
      '"El retrato" – Bruce Barnbaum',
      '"Iluminación con flash" – Joe McNally',
    ],
    referencias: { youtube: 'Mango Street', instagram: '@jessicakobeissi' },
  },
  {
    id: 'retrato-estudio',
    nombre: 'Retrato estudio',
    grupo: 'personas',
    requiereEdad: true,
    aplicaHora: false,
    aplicaMeteo: false,
    aplicaLugares: false,
    ajustes: {
      focal: '85mm',
      apertura: 'f/8',
      iso: '100',
      af: 'AF-S + detección de ojo',
    },
    equipo: {
      cuerpo: ['FF con sincro flash 1/200+', 'Sony A7 IV', 'Canon R6 Mark II'],
      objetivo: ['85mm f/1.4', 'Sony FE 85mm f/1.4 GM', 'Canon RF 85mm f/1.2L'],
      luz: [
        '2 flashes de estudio 400Ws',
        'Godox AD400 Pro',
        'Profoto B10 Plus',
      ],
      accesorios: [
        'Softbox 90cm',
        'Octabox 120cm',
        'Fondos papel/tela',
        'Disparador radio',
      ],
    },
    libros: [
      '"El retrato" – Bruce Barnbaum',
      '"Light: Science & Magic" – Hunter/Biver/Fuqua',
    ],
    referencias: {
      youtube: 'Karl Taylor Education',
      instagram: '@peterhurleyofficial',
    },
  },
  {
    id: 'mascotas-exterior',
    nombre: 'Mascotas exterior',
    grupo: 'personas',
    aplicaHora: true,
    aplicaMeteo: true,
    aplicaLugares: true,
    horaIdeal: 'Golden hour de mañana',
    horaPorQue: 'Mascota más activa y temperatura tolerable para sus patas.',
    ajustes: {
      focal: '135mm',
      apertura: 'f/2.8',
      velocidad: '1/1000',
      iso: '200-800',
      af: 'AF-C + detección animal/ojo',
    },
    equipo: {
      cuerpo: [
        'FF con AF animal + ráfaga ≥10fps',
        'Sony A7 IV',
        'OM System OM-1 Mark II',
      ],
      objetivo: [
        '70-200mm f/2.8',
        'Sony FE 70-200mm f/2.8 GM II',
        'Tamron 70-180mm f/2.8 G2',
      ],
      luz: ['Natural', 'Reflector si hace falta'],
      accesorios: ['Rodilleras', 'Juguete pita', 'Premios', 'Correa larga'],
    },
    osmTags: ['leisure=dog_park', 'leisure=park'],
    libros: [
      '"Pet Photography: From Snapshots to Great Shots" – Jamie Pflughoeft',
    ],
    referencias: {
      youtube: 'Charlotte Reeves Photography',
      instagram: '@thedogist',
    },
  },
  {
    id: 'mascotas-estudio',
    nombre: 'Mascotas estudio',
    grupo: 'personas',
    aplicaHora: false,
    aplicaMeteo: false,
    aplicaLugares: false,
    ajustes: {
      focal: '85mm',
      apertura: 'f/8',
      velocidad: '1/200 (sincro)',
      iso: '100',
      af: 'AF-C + detección animal/ojo',
    },
    equipo: {
      cuerpo: [
        'FF con AF animal + recycle rápido',
        'Sony A1',
        'Canon R5 Mark II',
      ],
      objetivo: ['85mm f/1.8', 'Sigma 85mm f/1.4 DG DN', 'Sony FE 85mm f/1.8'],
      luz: [
        '2 flashes de estudio con recycle <1s',
        'Profoto B10X',
        'Godox AD400 Pro',
      ],
      accesorios: [
        'Fondo papel resistente',
        'Suelo antideslizante',
        'Premios',
        'Asistente',
      ],
    },
    libros: [
      '"Pet Photography: From Snapshots to Great Shots" – Jamie Pflughoeft',
      '"Light: Science & Magic"',
    ],
    referencias: {
      youtube: 'Charlotte Reeves Photography',
      instagram: '@brookebpets',
    },
  },
  {
    id: 'eventos-bodas',
    nombre: 'Eventos / bodas',
    grupo: 'personas',
    aplicaHora: false,
    aplicaMeteo: true,
    aplicaLugares: false,
    horaIdeal: 'La marca el evento (golden hour para parejas si es posible)',
    ajustes: {
      focal: '35mm',
      apertura: 'f/2.8',
      velocidad: '1/250',
      iso: '400-3200',
      af: 'AF-C + detección de ojo',
    },
    equipo: {
      cuerpo: [
        '2× FF con doble slot tarjeta',
        'Sony A7 IV',
        'Canon R6 Mark II',
      ],
      objetivo: [
        '24-70mm f/2.8 + 70-200mm f/2.8',
        'Sony FE 24-70 GM II',
        'Tamron 28-75 f/2.8 G2',
      ],
      luz: ['2 flashes de zapata orientables', 'Godox V1', 'Profoto A10'],
      accesorios: [
        'Tarjetas redundantes',
        'Baterías repuesto',
        'Modificadores rebote',
        'Monopié',
      ],
    },
    libros: [
      '"The Wedding Photographer\'s Planner" – Jeff Ascough',
      'Portfolios de Yervant',
    ],
    referencias: { youtube: 'Taylor Jackson', instagram: '@jose_villa' },
  },
  {
    id: 'fotoperiodismo',
    nombre: 'Fotoperiodismo · social',
    grupo: 'personas',
    aplicaHora: false,
    aplicaMeteo: true,
    aplicaLugares: false,
    horaIdeal: 'La marca la noticia',
    ajustes: {
      focal: '35mm',
      apertura: 'f/4',
      velocidad: '1/250',
      iso: '400-1600',
      af: 'AF-C zona',
    },
    equipo: {
      cuerpo: [
        'FF discreto con obturador silencioso',
        'Sony A7 IV',
        'Leica Q3',
      ],
      objetivo: [
        '35mm f/1.4-2',
        'Sigma 35mm f/1.4 DG DN Art',
        'Sony FE 35mm f/1.8',
      ],
      luz: ['Natural'],
      accesorios: [
        '2 tarjetas',
        'Libreta',
        'Batería repuesto',
        'Correa cómoda',
      ],
    },
    libros: [
      '"El instante decisivo" – Henri Cartier-Bresson',
      '"On Photography" – Susan Sontag',
    ],
    referencias: { youtube: 'Magnum Photos', instagram: '@magnumphotos' },
  },
  {
    id: 'urbana',
    nombre: 'Fotografía urbana',
    grupo: 'urbano',
    aplicaHora: true,
    aplicaMeteo: true,
    aplicaLugares: true,
    horaIdeal: 'Golden / blue hour / noche',
    horaPorQue:
      'Tres looks distintos y todos válidos: golden cálido, blue cinematográfico, noche con neón.',
    ajustes: {
      focal: '35mm',
      apertura: 'f/8',
      velocidad: '1/250',
      iso: '200-800',
      af: 'AF-S zona',
    },
    equipo: {
      cuerpo: ['Compacto/discreto', 'Fuji X100VI', 'Ricoh GR IIIx'],
      objetivo: [
        '35mm fijo (integrado en cámaras citadas)',
        'Sony FE 35mm f/1.8 si ML',
        'Sigma 35mm f/2 DG DN',
      ],
      luz: ['Natural'],
      accesorios: ['Correa muñeca', 'Tarjeta rápida', 'Tapa abatible'],
    },
    osmTags: ['amenity=marketplace', 'place=square', 'highway=pedestrian'],
    libros: [
      '"Bystander: A History of Street Photography" – Westerbeck/Meyerowitz',
    ],
    referencias: { youtube: 'Sean Tucker', instagram: '@alanschaller' },
  },
  {
    id: 'arquitectura',
    nombre: 'Arquitectura exterior',
    grupo: 'urbano',
    aplicaHora: true,
    aplicaMeteo: true,
    aplicaLugares: true,
    horaIdeal: 'Blue hour',
    horaPorQue:
      'Cielo azul saturado + luces del edificio encendidas: equilibrio único.',
    ajustes: {
      focal: '24mm',
      apertura: 'f/11',
      velocidad: '1/125 (con trípode)',
      iso: '100',
      af: 'AF-S punto',
    },
    equipo: {
      cuerpo: ['FF alta resolución', 'Sony A7R V', 'Canon R5 Mark II'],
      objetivo: [
        'Tilt-shift 24mm o gran angular',
        'Canon TS-E 24mm f/3.5L II',
        'Sony FE 16-35mm f/2.8 GM II',
      ],
      luz: ['Natural (golden/blue hour)'],
      accesorios: [
        'Trípode robusto',
        'Cabezal panorámico',
        'Nivel de burbuja',
        'Polarizador',
      ],
    },
    osmTags: ['tourism=attraction', 'historic=monument', 'man_made=bridge'],
    libros: ['"Photographing Architecture" – Norman McGrath'],
    referencias: { youtube: 'Mike Kelley', instagram: '@mpkelley_' },
  },
  {
    id: 'interiorismo',
    nombre: 'Interiorismo',
    grupo: 'urbano',
    aplicaHora: true,
    aplicaMeteo: true,
    aplicaLugares: false,
    horaIdeal: 'Mediodía con cielo cubierto',
    horaPorQue: 'Luz suave entrando por ventanas, sin sombras duras.',
    ajustes: {
      focal: '24mm',
      apertura: 'f/8',
      velocidad: '1" con trípode',
      iso: '100',
      af: 'AF-S punto',
    },
    equipo: {
      cuerpo: ['FF alta resolución', 'Sony A7R V', 'Canon R5 Mark II'],
      objetivo: [
        'Tilt-shift 17mm o ultra angular',
        'Canon TS-E 17mm f/4L',
        'Sony FE 14mm f/1.8 GM',
      ],
      luz: [
        'Continua LED + flashes ambientación',
        'Aputure 300X',
        'Godox SL-150 II',
      ],
      accesorios: ['Trípode robusto', 'Plomada', 'Nivel', 'Modificadores luz'],
    },
    libros: ['"Interior Photography" – Adrian Schulz'],
    referencias: { youtube: 'Mike Kelley', instagram: '@nicolefranzen' },
  },
  {
    id: 'producto',
    nombre: 'Producto estudio',
    grupo: 'estudio',
    aplicaHora: false,
    aplicaMeteo: false,
    aplicaLugares: false,
    ajustes: {
      focal: '100mm',
      apertura: 'f/11',
      velocidad: '1/160 (sincro)',
      iso: '100',
      af: 'AF-S punto / MF',
    },
    equipo: {
      cuerpo: [
        'FF alta resolución con tethering',
        'Sony A7R V',
        'Canon R5 Mark II',
      ],
      objetivo: [
        '100mm macro',
        'Sony FE 90mm f/2.8 Macro G',
        'Canon RF 100mm f/2.8L Macro IS',
      ],
      luz: [
        '2-3 flashes de estudio + strip softboxes',
        'Godox AD400 Pro',
        'Profoto B10X',
      ],
      accesorios: [
        'Mesa de bodegón',
        'Cyclorama',
        'Cable tethering',
        'Focusing rail',
        'Polarizador',
      ],
    },
    libros: ['"Light: Science & Magic" – Hunter/Biver/Fuqua'],
    referencias: {
      youtube: 'Karl Taylor Education',
      instagram: '@dustinwalkerphoto',
    },
  },
  {
    id: 'gastronomica',
    nombre: 'Gastronómica · food',
    grupo: 'estudio',
    aplicaHora: true,
    aplicaMeteo: true,
    aplicaLugares: false,
    horaIdeal: 'Mediodía nublado',
    horaPorQue: 'La ventana actúa como difusor natural enorme.',
    ajustes: {
      focal: '50mm',
      apertura: 'f/4',
      velocidad: '1/125',
      iso: '100-400',
      af: 'AF-S punto',
    },
    equipo: {
      cuerpo: ['FF con buen rango dinámico', 'Sony A7 IV', 'Canon R6 Mark II'],
      objetivo: [
        '50mm f/1.4 + 100mm macro',
        'Sigma 50mm f/1.4 DG DN Art',
        'Sony FE 90mm f/2.8 Macro',
      ],
      luz: [
        'Flash de estudio con softbox grande + difusor cenital',
        'Godox AD200 Pro',
        'Profoto B10',
      ],
      accesorios: [
        'Trípode con brazo cenital',
        'Fondos texturizados',
        'Props',
        'Atomizador',
      ],
    },
    libros: ['"Plate to Pixel" – Hélène Dujardin'],
    referencias: { youtube: 'We Eat Together', instagram: '@joannweir' },
  },
  {
    id: 'paisaje',
    nombre: 'Paisaje',
    grupo: 'naturaleza',
    aplicaHora: true,
    aplicaMeteo: true,
    aplicaLugares: true,
    horaIdeal: 'Golden hour + blue hour',
    horaPorQue: 'Color, dramatismo y gradientes que el mediodía nunca da.',
    ajustes: {
      focal: '24mm',
      apertura: 'f/11',
      velocidad: '1/60 con trípode',
      iso: '100',
      af: 'AF-S punto + hiperfocal',
    },
    equipo: {
      cuerpo: [
        'FF alta resolución resistente al clima',
        'Sony A7R V',
        'Nikon Z7 II',
      ],
      objetivo: [
        '16-35mm f/2.8-4',
        'Sony FE 16-35mm f/2.8 GM II',
        'Nikon Z 14-30mm f/4 S',
      ],
      luz: ['Natural'],
      accesorios: [
        'Trípode carbono',
        'Filtros (ND, GND, polarizador)',
        'Disparador remoto',
        'Mochila técnica',
      ],
    },
    osmTags: ['tourism=viewpoint', 'natural=peak'],
    libros: [
      '"The Art of Photography" – Bruce Barnbaum',
      'Obra de Ansel Adams',
    ],
    referencias: { youtube: 'Thomas Heaton', instagram: '@chrisburkard' },
  },
  {
    id: 'fauna',
    nombre: 'Fauna salvaje',
    grupo: 'naturaleza',
    aplicaHora: true,
    aplicaMeteo: true,
    aplicaLugares: true,
    horaIdeal: 'Amanecer y atardecer',
    horaPorQue: 'Animales más activos + mejor luz.',
    ajustes: {
      focal: '500mm',
      apertura: 'f/5.6',
      velocidad: '1/2000',
      iso: '400-3200',
      af: 'AF-C + detección animal/ojo',
    },
    equipo: {
      cuerpo: [
        'FF/APS-C con AF animal + ráfaga 20+fps',
        'Sony A1',
        'OM System OM-1 Mark II',
      ],
      objetivo: [
        '200-600mm o 100-400mm',
        'Sony FE 200-600mm G',
        'Nikon Z 180-600mm VR',
      ],
      luz: ['Natural'],
      accesorios: [
        'Monopié o trípode con gimbal',
        'Hide/escondite',
        'Baterías extra',
      ],
    },
    osmTags: ['leisure=nature_reserve', 'boundary=protected_area'],
    libros: ['"The Handbook of Bird Photography" – Hellström/Möllers'],
    referencias: {
      youtube: 'Steve Perry / BackcountryGallery',
      instagram: '@thomasdmangelsen',
    },
  },
  {
    id: 'deportiva',
    nombre: 'Deportiva · acción',
    grupo: 'naturaleza',
    aplicaHora: false,
    aplicaMeteo: true,
    aplicaLugares: false,
    horaIdeal: 'La marca el evento',
    ajustes: {
      focal: '200mm',
      apertura: 'f/2.8',
      velocidad: '1/1000',
      iso: '400-3200',
      af: 'AF-C + seguimiento',
    },
    equipo: {
      cuerpo: ['FF con ráfaga 20+fps + tracking', 'Sony A9 III', 'Canon R3'],
      objetivo: [
        '70-200mm f/2.8 + 300-600mm según deporte',
        'Sony FE 70-200mm f/2.8 GM II',
        'Canon RF 100-300mm f/2.8L',
      ],
      luz: ['Natural'],
      accesorios: ['Monopié', 'Baterías extra', 'Tarjetas CFexpress'],
    },
    libros: ['"Sports Photography" – Peter Skinner'],
    referencias: { youtube: 'Jeff Cable', instagram: '@robgrahamphoto' },
  },
];

const GRUPOS = {
  personas: 'Personas y vínculos',
  urbano: 'Urbano y construido',
  estudio: 'Estudio controlado',
  naturaleza: 'Naturaleza y movimiento',
};

const VELOCIDAD_POR_EDAD = {
  bebe: { exterior: '1/250', estudio: '1/160 (sincro)' },
  nino_2_7: { exterior: '1/640', estudio: '1/200 (sincro)' },
  nino_8_12: { exterior: '1/400', estudio: '1/200 (sincro)' },
  adolescente: { exterior: '1/250', estudio: '1/160 (sincro)' },
  adulto: { exterior: '1/200', estudio: '1/160 (sincro)' },
};

const EDADES = [
  { id: 'bebe', label: 'Bebé', rango: '0-2 años' },
  { id: 'nino_2_7', label: 'Niño', rango: '2-7 años' },
  { id: 'nino_8_12', label: 'Niño', rango: '8-12 años' },
  { id: 'adolescente', label: 'Adolescente', rango: '13-17 años' },
  { id: 'adulto', label: 'Adulto', rango: '18+ años' },
];

// =========================================================================
// HELPERS
// =========================================================================

const formatHora = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
};

const addMinutes = (iso, mins) => {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() + mins);
  return d.toISOString();
};

const meteoVeredicto = (cloud, precip, wind) => {
  if (precip > 60)
    return {
      tag: 'COMPLICADO',
      desc: 'Lluvia probable. Considera reprogramar.',
    };
  if (cloud >= 30 && cloud <= 70 && precip < 30)
    return { tag: 'IDEAL', desc: 'Nubosidad media: luz difusa perfecta.' };
  if (cloud < 30)
    return {
      tag: 'LUZ DURA',
      desc: 'Cielo despejado: sombras marcadas, busca sombra o usa difusor.',
    };
  if (cloud > 70)
    return {
      tag: 'LUZ PLANA',
      desc: 'Cielo cubierto: sin contraste, ideal para retrato suave.',
    };
  if (wind > 40)
    return { tag: 'VIENTO', desc: 'Viento fuerte: complica fauna y telas.' };
  return { tag: 'ACEPTABLE', desc: 'Condiciones aceptables.' };
};

const buildOverpassQuery = (tags, lat, lon, radius) => {
  const filters = tags
    .map((t) => {
      const [k, v] = t.split('=');
      return `nwr[${k}=${v}](around:${radius},${lat},${lon});`;
    })
    .join('');
  return `[out:json][timeout:25];(${filters});out center 20;`;
};

const distanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// =========================================================================
// ESTILOS GLOBALES
// =========================================================================

const GlobalStyles = () => {
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.textContent = `
      .ph-card { border: 1px solid #2a241e; transition: all 0.3s ease; cursor: pointer; }
      .ph-card:hover { border-color: #c8a464; background: #15110d; }
      .ph-card-dashed { border: 1px dashed #5a4f43; transition: all 0.3s ease; cursor: pointer; }
      .ph-card-dashed:hover { border-color: #c8a464; background: #15110d; }
      .ph-link { color: #a39689; transition: color 0.2s ease; }
      .ph-link:hover { color: #c8a464; }
      .ph-link-accent { color: #c8a464; transition: opacity 0.2s ease; }
      .ph-link-accent:hover { text-decoration: underline; }
      .ph-pill-num { transition: color 0.3s ease; }
      .ph-card:hover .ph-pill-num { color: #c8a464; }
      .ph-btn-primary { background: #c8a464; color: #0a0807; transition: opacity 0.2s ease; cursor: pointer; }
      .ph-btn-primary:hover { opacity: 0.9; }
      .ph-radio { background: transparent; color: #a39689; border: 1px solid #3a322a; transition: all 0.2s ease; cursor: pointer; }
      .ph-radio.active { background: #c8a464; color: #0a0807; border-color: #c8a464; }
      input[type="date"] { color-scheme: dark; }
    `;
    document.head.appendChild(style);

    return () => {
      try {
        document.head.removeChild(fontLink);
      } catch (e) {}
      try {
        document.head.removeChild(style);
      } catch (e) {}
    };
  }, []);
  return null;
};

const F_DISPLAY = { fontFamily: '"Fraunces", Georgia, serif' };
const F_BODY = { fontFamily: '"Manrope", system-ui, sans-serif' };
const F_MONO = { fontFamily: '"JetBrains Mono", "Courier New", monospace' };

// =========================================================================
// COMPONENTES UI
// =========================================================================

const SectionLabel = ({ num, children }) => (
  <div className="flex items-baseline gap-3 mb-4">
    <span
      style={{ ...F_MONO, color: '#c8a464' }}
      className="text-xs tracking-widest"
    >
      {num}
    </span>
    <span
      style={{ ...F_BODY, color: '#a39689' }}
      className="text-xs uppercase font-medium"
    >
      <span style={{ letterSpacing: '0.25em' }}>{children}</span>
    </span>
    <div
      className="flex-1 h-px"
      style={{ background: 'linear-gradient(to right, #2a241e, transparent)' }}
    />
  </div>
);

const Param = ({ label, valor, mono = true }) => (
  <div className="flex flex-col gap-1 py-3">
    <span
      style={{ ...F_BODY, color: '#a39689', letterSpacing: '0.2em' }}
      className="text-xs uppercase font-medium"
    >
      {label}
    </span>
    <span
      style={{ ...(mono ? F_MONO : F_DISPLAY), color: '#f4ede4' }}
      className="text-base"
    >
      {valor}
    </span>
  </div>
);

const Pill = ({ children, accent = false }) => (
  <span
    style={{
      ...F_BODY,
      background: accent ? '#c8a464' : 'transparent',
      color: accent ? '#0a0807' : '#d4c5b3',
      border: accent ? 'none' : '1px solid #3a322a',
      letterSpacing: '0.18em',
    }}
    className="inline-block px-2 py-1 text-xs uppercase font-semibold rounded-sm"
  >
    {children}
  </span>
);

// =========================================================================
// SELECTOR
// =========================================================================

function Selector({ onSelect, onOtro }) {
  const grupos = Object.keys(GRUPOS).map((g) => ({
    id: g,
    nombre: GRUPOS[g],
    items: ARQUETIPOS.filter((a) => a.grupo === g),
  }));

  return (
    <div
      className="max-w-6xl mx-auto px-6 py-12"
      style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
    >
      <div className="mb-16">
        <div
          style={{ ...F_MONO, color: '#c8a464', letterSpacing: '0.2em' }}
          className="text-xs mb-4"
        >
          Nº 01 — INICIO
        </div>
        <h1 style={F_DISPLAY} className="text-5xl font-light mb-6">
          <span style={{ color: '#f4ede4' }}>El recomendador</span>
          <br />
          <span
            style={{ color: '#c8a464', fontStyle: 'italic', fontWeight: 400 }}
          >
            del fotógrafo.
          </span>
        </h1>
        <p
          style={{ ...F_BODY, color: '#a39689' }}
          className="text-base max-w-xl leading-relaxed"
        >
          Elige el tipo de fotografía que vas a hacer. Te devuelvo ajustes,
          equipo, hora ideal, meteo y lugares cercanos.
        </p>
      </div>

      <div className="space-y-12">
        {grupos.map((grupo, idx) => (
          <div key={grupo.id}>
            <SectionLabel num={`0${idx + 2}`}>{grupo.nombre}</SectionLabel>
            <div
              className="grid grid-cols-2 gap-3"
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              }}
            >
              {grupo.items.map((a) => (
                <button
                  key={a.id}
                  onClick={() => onSelect(a)}
                  className="ph-card text-left p-5"
                  style={F_DISPLAY}
                >
                  <div
                    style={{
                      ...F_MONO,
                      color: '#5a4f43',
                      letterSpacing: '0.2em',
                    }}
                    className="text-xs mb-3 ph-pill-num"
                  >
                    {String(ARQUETIPOS.indexOf(a) + 1).padStart(2, '0')}
                  </div>
                  <div
                    style={{ color: '#f4ede4' }}
                    className="text-xl leading-tight font-light"
                  >
                    {a.nombre}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div>
          <SectionLabel num="06">¿Otra cosa?</SectionLabel>
          <button
            onClick={onOtro}
            className="ph-card-dashed p-5"
            style={{ ...F_DISPLAY, paddingLeft: '2rem', paddingRight: '2rem' }}
          >
            <span
              style={{ ...F_MONO, color: '#5a4f43', letterSpacing: '0.2em' }}
              className="text-xs mr-3"
            >
              15
            </span>
            <span
              style={{ color: '#f4ede4', fontStyle: 'italic' }}
              className="text-xl font-light"
            >
              Otro tipo
            </span>
            <span
              style={{ ...F_BODY, color: '#a39689' }}
              className="text-xs ml-3"
            >
              · responde 3 preguntas
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// SUB-SELECTOR EDAD
// =========================================================================

function SubselectorEdad({ arquetipo, onSelect, onBack }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="ph-link mb-12 text-xs"
        style={{
          ...F_MONO,
          letterSpacing: '0.2em',
          background: 'none',
          border: 'none',
          padding: 0,
        }}
      >
        ← VOLVER
      </button>

      <div
        style={{ ...F_MONO, color: '#c8a464', letterSpacing: '0.2em' }}
        className="text-xs mb-4"
      >
        {arquetipo.nombre.toUpperCase()} — PASO 02
      </div>
      <h2 style={F_DISPLAY} className="text-4xl font-light mb-12">
        <span style={{ color: '#f4ede4' }}>¿Qué edad tiene</span>
        <br />
        <span style={{ color: '#c8a464', fontStyle: 'italic' }}>
          la persona?
        </span>
      </h2>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
      >
        {EDADES.map((e) => (
          <button
            key={e.id}
            onClick={() => onSelect(e.id)}
            className="ph-card text-left p-5"
          >
            <div
              style={{ ...F_DISPLAY, color: '#f4ede4' }}
              className="text-2xl font-light"
            >
              {e.label}
            </div>
            <div
              style={{ ...F_MONO, color: '#a39689', letterSpacing: '0.1em' }}
              className="text-xs mt-1"
            >
              {e.rango}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// =========================================================================
// MINI QUIZ "OTRO"
// =========================================================================

function MiniQuiz({ onResult, onBack }) {
  const [step, setStep] = useState(0);
  const [respuestas, setRespuestas] = useState({ donde: '', movimiento: '' });

  const finalizar = (mov) => {
    const r = { ...respuestas, movimiento: mov };
    let arquetipoId = 'urbana';
    if (r.donde === 'estudio') arquetipoId = 'producto';
    else if (r.donde === 'interior') arquetipoId = 'interiorismo';
    else if (r.movimiento === 'rapido') arquetipoId = 'deportiva';
    else if (r.movimiento === 'moderado') arquetipoId = 'eventos-bodas';
    onResult(arquetipoId);
  };

  const opciones0 = [
    { id: 'exterior', label: 'Exterior · luz natural' },
    { id: 'interior', label: 'Interior · luz mixta' },
    { id: 'estudio', label: 'Estudio · luz controlada' },
  ];
  const opciones1 = [
    { id: 'estatico', label: 'Estático' },
    { id: 'moderado', label: 'Movimiento moderado' },
    { id: 'rapido', label: 'Acción rápida' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="ph-link mb-12 text-xs"
        style={{
          ...F_MONO,
          letterSpacing: '0.2em',
          background: 'none',
          border: 'none',
          padding: 0,
        }}
      >
        ← VOLVER
      </button>

      <div
        style={{ ...F_MONO, color: '#c8a464', letterSpacing: '0.2em' }}
        className="text-xs mb-4"
      >
        OTRO — PASO {String(step + 1).padStart(2, '0')} / 02
      </div>

      {step === 0 && (
        <>
          <h2
            style={{ ...F_DISPLAY, color: '#f4ede4' }}
            className="text-4xl font-light mb-12"
          >
            ¿Dónde fotografías?
          </h2>
          <div className="space-y-3">
            {opciones0.map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setRespuestas({ ...respuestas, donde: o.id });
                  setStep(1);
                }}
                className="ph-card block w-full text-left p-5"
              >
                <span
                  style={{ ...F_DISPLAY, color: '#f4ede4' }}
                  className="text-2xl font-light"
                >
                  {o.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h2
            style={{ ...F_DISPLAY, color: '#f4ede4' }}
            className="text-4xl font-light mb-12"
          >
            ¿Tu sujeto se mueve?
          </h2>
          <div className="space-y-3">
            {opciones1.map((o) => (
              <button
                key={o.id}
                onClick={() => finalizar(o.id)}
                className="ph-card block w-full text-left p-5"
              >
                <span
                  style={{ ...F_DISPLAY, color: '#f4ede4' }}
                  className="text-2xl font-light"
                >
                  {o.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// =========================================================================
// BLOQUE AJUSTES
// =========================================================================

function BloqueAjustes({ arquetipo, edad }) {
  let velocidad = arquetipo.ajustes.velocidad;
  if (arquetipo.requiereEdad && edad) {
    const esEstudio = arquetipo.id === 'retrato-estudio';
    velocidad = VELOCIDAD_POR_EDAD[edad][esEstudio ? 'estudio' : 'exterior'];
  }

  return (
    <div>
      <SectionLabel num="01">Ajustes de cámara</SectionLabel>
      <div
        className="grid gap-x-6"
        style={{
          borderTop: '1px solid #2a241e',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        }}
      >
        <Param label="Focal" valor={arquetipo.ajustes.focal} />
        <Param label="Apertura" valor={arquetipo.ajustes.apertura} />
        <Param label="Velocidad" valor={velocidad} />
        <Param label="ISO" valor={arquetipo.ajustes.iso} />
        <Param label="Enfoque" valor={arquetipo.ajustes.af} mono={false} />
      </div>
    </div>
  );
}

// =========================================================================
// BLOQUE EQUIPO
// =========================================================================

function ItemEquipo({ titulo, items }) {
  const [spec, ...modelos] = items;
  return (
    <div className="py-4" style={{ borderTop: '1px solid #2a241e' }}>
      <div
        style={{ ...F_BODY, color: '#a39689', letterSpacing: '0.2em' }}
        className="text-xs uppercase font-medium mb-2"
      >
        {titulo}
      </div>
      <div
        style={{ ...F_DISPLAY, color: '#f4ede4' }}
        className="text-xl font-light leading-snug mb-2"
      >
        {spec}
      </div>
      {modelos.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {modelos.map((m, i) => (
            <Pill key={i}>{m}</Pill>
          ))}
        </div>
      )}
    </div>
  );
}

function BloqueEquipo({ arquetipo }) {
  return (
    <div>
      <SectionLabel num="02">Equipo recomendado</SectionLabel>
      <div
        className="grid gap-x-10"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
      >
        <ItemEquipo titulo="Cuerpo" items={arquetipo.equipo.cuerpo} />
        <ItemEquipo titulo="Objetivo" items={arquetipo.equipo.objetivo} />
        <ItemEquipo titulo="Luz" items={arquetipo.equipo.luz} />
        <ItemEquipo titulo="Accesorios" items={arquetipo.equipo.accesorios} />
      </div>
    </div>
  );
}

// =========================================================================
// BLOQUE HORA + METEO
// =========================================================================

function BloqueHoraMeteo({ arquetipo, ubicacion, fecha }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ubicacion) return;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const sunUrl = `https://api.sunrise-sunset.org/json?lat=${ubicacion.lat}&lng=${ubicacion.lon}&date=${fecha}&formatted=0`;
        const sunRes = await fetch(sunUrl);
        const sunJson = await sunRes.json();

        const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${ubicacion.lat}&longitude=${ubicacion.lon}&hourly=temperature_2m,cloud_cover,precipitation_probability,wind_speed_10m&timezone=auto&start_date=${fecha}&end_date=${fecha}`;
        const meteoRes = await fetch(meteoUrl);
        const meteoJson = await meteoRes.json();

        setData({ sun: sunJson.results, meteo: meteoJson.hourly });
      } catch (e) {
        setError('No se pudo cargar la información meteorológica.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ubicacion, fecha]);

  if (!ubicacion) return null;
  if (loading)
    return (
      <div>
        <SectionLabel num="03">Hora ideal · Meteo</SectionLabel>
        <div style={{ ...F_BODY, color: '#a39689' }} className="text-sm py-4">
          Calculando ventanas de luz...
        </div>
      </div>
    );
  if (error)
    return (
      <div>
        <SectionLabel num="03">Hora ideal · Meteo</SectionLabel>
        <div style={{ ...F_BODY, color: '#c8a464' }} className="text-sm py-4">
          {error}
        </div>
      </div>
    );
  if (!data) return null;

  const { sun, meteo } = data;
  const goldenManana = {
    inicio: sun.sunrise,
    fin: addMinutes(sun.sunrise, 60),
  };
  const goldenTarde = { inicio: addMinutes(sun.sunset, -60), fin: sun.sunset };
  const blueManana = { inicio: sun.civil_twilight_begin, fin: sun.sunrise };
  const blueTarde = { inicio: sun.sunset, fin: sun.civil_twilight_end };

  const meteoEnVentana = (ini, fin) => {
    if (!meteo || !meteo.time) return { cloud: 0, precip: 0, wind: 0 };
    const iniDate = new Date(ini);
    const finDate = new Date(fin);
    const cloudArr = [];
    const precipArr = [];
    const windArr = [];
    meteo.time.forEach((t, idx) => {
      const tDate = new Date(t);
      if (tDate >= iniDate && tDate <= finDate) {
        cloudArr.push(meteo.cloud_cover[idx]);
        precipArr.push(meteo.precipitation_probability[idx]);
        windArr.push(meteo.wind_speed_10m[idx]);
      }
    });
    if (cloudArr.length === 0) {
      // tomar la hora más cercana
      const iniHour = iniDate.getHours();
      const idx = meteo.time.findIndex(
        (t) => new Date(t).getHours() === iniHour
      );
      if (idx >= 0) {
        return {
          cloud: meteo.cloud_cover[idx] || 0,
          precip: meteo.precipitation_probability[idx] || 0,
          wind: Math.round(meteo.wind_speed_10m[idx] || 0),
        };
      }
      return { cloud: 0, precip: 0, wind: 0 };
    }
    const cloud = Math.round(
      cloudArr.reduce((a, b) => a + b, 0) / cloudArr.length
    );
    const precip = Math.max(...precipArr);
    const wind = Math.round(Math.max(...windArr));
    return { cloud, precip, wind };
  };

  const Ventana = ({ titulo, ventana }) => {
    const m = meteoEnVentana(ventana.inicio, ventana.fin);
    const v = meteoVeredicto(m.cloud, m.precip, m.wind);
    return (
      <div className="py-4" style={{ borderTop: '1px solid #2a241e' }}>
        <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
          <div>
            <span
              style={{ ...F_BODY, color: '#a39689', letterSpacing: '0.2em' }}
              className="text-xs uppercase font-medium mr-3"
            >
              {titulo}
            </span>
            <span style={{ ...F_MONO, color: '#f4ede4' }} className="text-base">
              {formatHora(ventana.inicio)} — {formatHora(ventana.fin)}
            </span>
          </div>
          <Pill accent>{v.tag}</Pill>
        </div>
        <div style={{ ...F_BODY, color: '#d4c5b3' }} className="text-sm">
          {v.desc}
        </div>
        <div style={F_MONO} className="text-xs mt-2 flex gap-4 flex-wrap">
          <span style={{ color: '#a39689' }}>NUBES {m.cloud}%</span>
          <span style={{ color: '#a39689' }}>LLUVIA {m.precip}%</span>
          <span style={{ color: '#a39689' }}>VIENTO {m.wind} km/h</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <SectionLabel num="03">Hora ideal · Meteo</SectionLabel>
      {arquetipo.horaIdeal && (
        <div
          className="mb-4 pb-4"
          style={{ borderBottom: '1px solid #2a241e' }}
        >
          <div style={F_DISPLAY} className="text-2xl font-light mb-1">
            <span style={{ color: '#c8a464', fontStyle: 'italic' }}>
              {arquetipo.horaIdeal}
            </span>
          </div>
          {arquetipo.horaPorQue && (
            <div style={{ ...F_BODY, color: '#a39689' }} className="text-sm">
              {arquetipo.horaPorQue}
            </div>
          )}
        </div>
      )}
      <Ventana titulo="Blue hour mañana" ventana={blueManana} />
      <Ventana titulo="Golden hour mañana" ventana={goldenManana} />
      <Ventana titulo="Golden hour tarde" ventana={goldenTarde} />
      <Ventana titulo="Blue hour tarde" ventana={blueTarde} />
    </div>
  );
}

// =========================================================================
// BLOQUE LUGARES
// =========================================================================

function BloqueLugares({ arquetipo, ubicacion }) {
  const [radio, setRadio] = useState(10);
  const [lugares, setLugares] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ubicacion || !arquetipo.osmTags) return;
    setLoading(true);
    setError(null);

    const query = buildOverpassQuery(
      arquetipo.osmTags,
      ubicacion.lat,
      ubicacion.lon,
      radio * 1000
    );
    fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: 'data=' + encodeURIComponent(query),
    })
      .then((r) => r.json())
      .then((json) => {
        const elementos = json.elements || [];
        const conNombre = elementos
          .map((e) => {
            const lat = e.lat || (e.center && e.center.lat);
            const lon = e.lon || (e.center && e.center.lon);
            const tipo =
              e.tags &&
              (e.tags.leisure ||
                e.tags.tourism ||
                e.tags.amenity ||
                e.tags.place ||
                e.tags.natural ||
                e.tags.historic ||
                e.tags.boundary ||
                e.tags.man_made);
            return {
              id: e.id,
              nombre: (e.tags && e.tags.name) || null,
              tipo,
              lat,
              lon,
              dist:
                lat && lon
                  ? distanceKm(ubicacion.lat, ubicacion.lon, lat, lon)
                  : 999,
            };
          })
          .filter((e) => e.nombre && e.lat && e.lon)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 12);
        setLugares(conNombre);
      })
      .catch(() => setError('No se pudieron cargar los lugares.'))
      .finally(() => setLoading(false));
  }, [ubicacion, radio, arquetipo]);

  if (!ubicacion || !arquetipo.osmTags) return null;

  return (
    <div>
      <SectionLabel num="04">Lugares cercanos</SectionLabel>

      <div
        className="flex items-center gap-3 mb-4 pb-4 flex-wrap"
        style={{ borderBottom: '1px solid #2a241e' }}
      >
        <span
          style={{ ...F_BODY, color: '#a39689', letterSpacing: '0.2em' }}
          className="text-xs uppercase font-medium"
        >
          Radio
        </span>
        {[5, 10, 25, 50].map((r) => (
          <button
            key={r}
            onClick={() => setRadio(r)}
            className={`ph-radio ${radio === r ? 'active' : ''}`}
            style={{
              ...F_MONO,
              padding: '4px 12px',
              fontSize: '12px',
              letterSpacing: '0.15em',
              borderRadius: '2px',
            }}
          >
            {r} KM
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ ...F_BODY, color: '#a39689' }} className="text-sm py-4">
          Buscando...
        </div>
      )}
      {error && (
        <div style={{ ...F_BODY, color: '#c8a464' }} className="text-sm py-4">
          {error}
        </div>
      )}
      {lugares && lugares.length === 0 && !loading && (
        <div style={{ ...F_BODY, color: '#a39689' }} className="text-sm py-4">
          No se han encontrado lugares con nombre en este radio. Prueba a
          ampliar.
        </div>
      )}
      {lugares && lugares.length > 0 && (
        <div
          className="grid gap-x-10"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {lugares.map((l) => (
            <div
              key={l.id}
              className="py-3"
              style={{ borderTop: '1px solid #2a241e' }}
            >
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <span
                  style={{ ...F_DISPLAY, color: '#f4ede4' }}
                  className="text-lg font-light leading-tight"
                >
                  {l.nombre}
                </span>
                <span
                  style={{ ...F_MONO, color: '#c8a464' }}
                  className="text-xs whitespace-nowrap"
                >
                  {l.dist.toFixed(1)} KM
                </span>
              </div>
              <div
                style={{ ...F_MONO, color: '#a39689', letterSpacing: '0.2em' }}
                className="text-xs uppercase mb-2"
              >
                {l.tipo}
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${l.lat},${l.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ph-link-accent"
                  style={{
                    ...F_BODY,
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Maps →
                </a>
                <a
                  href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${l.lat},${l.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ph-link-accent"
                  style={{
                    ...F_BODY,
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Street View →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =========================================================================
// BLOQUE LIBROS
// =========================================================================

function BloqueLibros({ arquetipo }) {
  return (
    <div>
      <SectionLabel num="05">Libros y referentes</SectionLabel>
      <div
        className="grid gap-x-10"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
      >
        <div className="py-3" style={{ borderTop: '1px solid #2a241e' }}>
          <div
            style={{ ...F_BODY, color: '#a39689', letterSpacing: '0.2em' }}
            className="text-xs uppercase font-medium mb-2"
          >
            Lectura
          </div>
          <ul className="space-y-2">
            {arquetipo.libros.map((l, i) => (
              <li
                key={i}
                style={{ ...F_DISPLAY, color: '#f4ede4' }}
                className="text-base font-light leading-snug"
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div className="py-3" style={{ borderTop: '1px solid #2a241e' }}>
          <div
            style={{ ...F_BODY, color: '#a39689', letterSpacing: '0.2em' }}
            className="text-xs uppercase font-medium mb-2"
          >
            Referentes
          </div>
          {arquetipo.referencias && (
            <div className="space-y-2">
              <div style={F_DISPLAY} className="text-base font-light">
                <span style={{ color: '#a39689' }}>YouTube · </span>
                <span style={{ color: '#f4ede4' }}>
                  {arquetipo.referencias.youtube}
                </span>
              </div>
              <div style={F_DISPLAY} className="text-base font-light">
                <span style={{ color: '#a39689' }}>Instagram · </span>
                <span style={{ color: '#f4ede4' }}>
                  {arquetipo.referencias.instagram}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// PETICIÓN UBICACIÓN
// =========================================================================

function UbicacionPicker({ ubicacion, onSetUbicacion, fecha, onSetFecha }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pedirUbicacion = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError('Tu navegador no soporta geolocalización.');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onSetUbicacion({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setLoading(false);
      },
      () => {
        setError(
          'No se ha podido obtener la ubicación. Permite el acceso en tu navegador.'
        );
        setLoading(false);
      },
      { timeout: 10000 }
    );
  };

  return (
    <div
      className="mb-12 p-5"
      style={{ border: '1px solid #2a241e', background: '#0d0a08' }}
    >
      <div
        style={{ ...F_BODY, color: '#a39689', letterSpacing: '0.2em' }}
        className="text-xs uppercase font-medium mb-3"
      >
        Ubicación y fecha de la sesión
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {!ubicacion && (
          <button
            onClick={pedirUbicacion}
            disabled={loading}
            className="ph-btn-primary"
            style={{
              ...F_BODY,
              padding: '8px 16px',
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              border: 'none',
            }}
          >
            {loading ? 'Localizando...' : 'Usar mi ubicación'}
          </button>
        )}
        {ubicacion && (
          <div style={F_MONO} className="text-xs">
            <span style={{ color: '#c8a464' }}>● </span>
            <span style={{ color: '#f4ede4' }}>
              {ubicacion.lat.toFixed(3)}, {ubicacion.lon.toFixed(3)}
            </span>
            <button
              onClick={() => onSetUbicacion(null)}
              className="ph-link"
              style={{
                marginLeft: '12px',
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              cambiar
            </button>
          </div>
        )}
        <input
          type="date"
          value={fecha}
          onChange={(e) => onSetFecha(e.target.value)}
          style={{
            ...F_MONO,
            background: '#0a0807',
            color: '#f4ede4',
            border: '1px solid #3a322a',
            padding: '8px 12px',
            fontSize: '12px',
          }}
        />
      </div>
      {error && (
        <div style={{ ...F_BODY, color: '#c8a464' }} className="text-xs mt-2">
          {error}
        </div>
      )}
    </div>
  );
}

// =========================================================================
// OUTPUT
// =========================================================================

function Output({ arquetipo, edad, onBack }) {
  const [ubicacion, setUbicacion] = useState(null);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

  const necesitaUbicacion =
    arquetipo.aplicaHora || arquetipo.aplicaMeteo || arquetipo.aplicaLugares;

  const edadInfo = edad ? EDADES.find((e) => e.id === edad) : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="ph-link mb-12 text-xs"
        style={{
          ...F_MONO,
          letterSpacing: '0.2em',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        ← CAMBIAR TIPO
      </button>

      <div className="mb-12">
        <div
          style={{ ...F_MONO, color: '#c8a464', letterSpacing: '0.2em' }}
          className="text-xs mb-4"
        >
          RECOMENDACIÓN
        </div>
        <h2 style={F_DISPLAY} className="text-5xl font-light leading-tight">
          <span style={{ color: '#f4ede4' }}>{arquetipo.nombre}</span>
          {edadInfo && (
            <>
              <br />
              <span style={{ color: '#c8a464', fontStyle: 'italic' }}>
                · {edadInfo.label} {edadInfo.rango}
              </span>
            </>
          )}
        </h2>
      </div>

      {necesitaUbicacion && (
        <UbicacionPicker
          ubicacion={ubicacion}
          onSetUbicacion={setUbicacion}
          fecha={fecha}
          onSetFecha={setFecha}
        />
      )}

      <div className="space-y-12">
        <BloqueAjustes arquetipo={arquetipo} edad={edad} />
        <BloqueEquipo arquetipo={arquetipo} />
        {arquetipo.aplicaHora && arquetipo.aplicaMeteo && (
          <BloqueHoraMeteo
            arquetipo={arquetipo}
            ubicacion={ubicacion}
            fecha={fecha}
          />
        )}
        {arquetipo.aplicaLugares && (
          <BloqueLugares arquetipo={arquetipo} ubicacion={ubicacion} />
        )}
        <BloqueLibros arquetipo={arquetipo} />
      </div>

      <div className="mt-20 pt-8" style={{ borderTop: '1px solid #2a241e' }}>
        <div
          style={{ ...F_MONO, color: '#5a4f43', letterSpacing: '0.25em' }}
          className="text-xs text-center"
        >
          FIN — VUELVE PARA OTRO TIPO
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// APP
// =========================================================================

export default function App() {
  const [pantalla, setPantalla] = useState('selector');
  const [arquetipo, setArquetipo] = useState(null);
  const [edad, setEdad] = useState(null);

  const seleccionarArquetipo = (a) => {
    setArquetipo(a);
    if (a.requiereEdad) {
      setPantalla('edad');
    } else {
      setPantalla('output');
    }
  };

  const seleccionarEdad = (e) => {
    setEdad(e);
    setPantalla('output');
  };

  const resultadoQuiz = (id) => {
    const a = ARQUETIPOS.find((x) => x.id === id);
    setArquetipo(a);
    if (a.requiereEdad) setPantalla('edad');
    else setPantalla('output');
  };

  const volver = () => {
    setPantalla('selector');
    setArquetipo(null);
    setEdad(null);
  };

  return (
    <div style={{ background: '#0a0807', minHeight: '100vh' }}>
      <GlobalStyles />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative" style={{ zIndex: 10 }}>
        {pantalla === 'selector' && (
          <Selector
            onSelect={seleccionarArquetipo}
            onOtro={() => setPantalla('quiz')}
          />
        )}
        {pantalla === 'edad' && (
          <SubselectorEdad
            arquetipo={arquetipo}
            onSelect={seleccionarEdad}
            onBack={volver}
          />
        )}
        {pantalla === 'quiz' && (
          <MiniQuiz onResult={resultadoQuiz} onBack={volver} />
        )}
        {pantalla === 'output' && arquetipo && (
          <Output arquetipo={arquetipo} edad={edad} onBack={volver} />
        )}
      </div>
    </div>
  );
}
