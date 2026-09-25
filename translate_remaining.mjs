import fs from 'fs';
import path from 'path';

const localesDir = path.resolve('src/locales');
const langs = ['es', 'en', 'fr', 'pt'];

const newTranslations = {
  es: {
    cinematic_transitions: {
      tierra: { title: "TIERRA", subtitle: "Banco Genético de la Wachuma" },
      agua: { title: "AGUA", subtitle: "Conservación de Semillas Nativas" },
      viento: { title: "VIENTO", subtitle: "Centro de Recreación para Niños" },
      fuego: { title: "FUEGO", subtitle: "Ceremonias de Plantas Maestras" },
      eter: { title: "ÉTER", subtitle: "Talleres Inmersivos de 4 a + Días" },
      memoria: "Memoria Viva del Santuario"
    },
    virtual_tour_extra: {
      drag_instructions: "Arrastra con el ratón o el dedo para rotar 360° · Pulsa en los iconos naranjas para explorar las instalaciones",
      instalaciones_title: "INSTALACIONES"
    },
    pampa_facilities: {
      wachuma_wasi: {
        name: "Domo Geodésico & Banco Genético de la Wachuma",
        shortDesc: "Invernadero geodésico bioclimático con más de 40 linajes madre de Trichocereus pachanoi y peruvianus aclimatados.",
        neuromarketingHook: "Más que preservar un cactus sagrado, estamos descodificando el genoma de la consciencia andina y protegiéndolo de la extinción climática.",
        scope: "El alcance abarca 12 hectáreas de conservación directa y la creación del primer banco genómico de Trichocereus en Sudamérica.",
        fullDesc: "El corazón botánico de Pampa Ñusta. Un domo geodésico de arquitectura bioclimática pasiva que alberga la mayor colección viva de cactus sagrado Wachuma de la cuenca del Vilcanota. Diseñado para emular el microclima de quebrada andina con sustratos minerales volcánicos, ventilación cenital y captación térmica diurna para proteger a los linajes madre de las heladas nocturnas."
      },
      arca_semillas: {
        name: "Arca de Semillas Andinas & Laboratorio Vivo",
        shortDesc: "Santuario de germoplasma con más de 200 variedades nativas de maíz sagrado, papas andinas, quinua y kiwicha.",
        neuromarketingHook: "En un mundo amenazado por el cambio climático, la verdadera riqueza no es el oro, sino el germoplasma que garantizará el alimento de la humanidad.",
        scope: "Impacto directo en la soberanía alimentaria de 18 comunidades altoandinas del Valle Sagrado, asegurando germoplasma biológicamente puro para las próximas 3 generaciones.",
        fullDesc: "Construido como una bóveda bioclimática de adobe y arcilla curada, el Arca de Semillas custodia el patrimonio genético de los Andes. Conserva variedades ancestrales de maíces policromos, tubérculos nativos de altura y granos sagrados, almacenados en vasijas de arcilla selladas con cera de abeja natural que previenen plagas sin un solo gramo de agroquímicos."
      },
      escuela_viva: {
        name: "Escuela Viva & Bio-Parque Infantil",
        shortDesc: "Aldea pedagógica al aire libre con anfiteatro de barro, bio-juegos y rescate de fauna andina.",
        neuromarketingHook: "No heredamos la tierra de nuestros ancestros, la tomamos prestada de nuestros hijos. Aquí formamos a los líderes ecológicos del mañana.",
        scope: "Formación ecológica bilingüe y apoyo emocional gratuito para 150 niños y niñas anualmente provenientes de colegios rurales vulnerables.",
        fullDesc: "Un proyecto piloto educativo que fusiona la metodología de escuelas del bosque con la cosmovisión andina. Diseñado para que la primera infancia de las comunidades rurales revalorice su cultura originaria a través de la bioconstrucción, la agricultura y el arte en quechua."
      },
      maloka_ceremonial: {
        name: "Maloka Ceremonial & Espacio Sonoro",
        shortDesc: "Templo circular de bioconstrucción y acústica 432 Hz para investigación de plantas maestras.",
        neuromarketingHook: "Donde la psiquiatría moderna encuentra sus límites, la medicina milenaria andina abre las puertas a la sanación profunda del trauma.",
        scope: "Creación de un estándar clínico-tradicional replicable a nivel internacional para el tratamiento de traumas a través de protocolos andinos rigurosos.",
        fullDesc: "La Maloka es un centro de vanguardia donde la ciencia moderna y la medicina tradicional convergen. Se investigan los beneficios neuroplásticos de los estados expandidos de consciencia facilitados por enteógenos andinos, bajo un marco ético, seguro y guiado por linajes ancestrales."
      },
      terrazas_permacultura: {
        name: "Andenes Regenerativos & Hidrología Solar",
        shortDesc: "Restauración de terrazas incas con tecnología de riego fotovoltaico y agricultura sintrópica.",
        neuromarketingHook: "Revivimos la genialidad de la ingeniería Inca y la potenciamos con tecnología solar del siglo XXI para alimentar el futuro de los Andes.",
        scope: "Restauración completa de 5 niveles de andenería Inca y creación del modelo hidro-solar de huella de carbono negativa a mayor altitud en Perú.",
        fullDesc: "Un proyecto de innovación agrícola que desafía la sequía andina. Hemos recuperado andenes prehispánicos abandonados integrando tecnología contemporánea de bombeo solar y microaspersión. El objetivo es crear un modelo replicable de seguridad alimentaria para las altas montañas peruanas."
      }
    }
  },
  en: {
    cinematic_transitions: {
      tierra: { title: "EARTH", subtitle: "Wachuma Genetic Bank" },
      agua: { title: "WATER", subtitle: "Native Seed Conservation" },
      viento: { title: "WIND", subtitle: "Children's Recreation Center" },
      fuego: { title: "FIRE", subtitle: "Master Plant Ceremonies" },
      eter: { title: "ETHER", subtitle: "Immersive 4+ Day Workshops" },
      memoria: "Living Memory of the Sanctuary"
    },
    virtual_tour_extra: {
      drag_instructions: "Drag with your mouse or finger to rotate 360° · Click on the orange icons to explore the facilities",
      instalaciones_title: "FACILITIES"
    },
    pampa_facilities: {
      wachuma_wasi: {
        name: "Geodesic Dome & Wachuma Genetic Bank",
        shortDesc: "Bioclimatic geodesic greenhouse with over 40 acclimated mother lineages of Trichocereus pachanoi and peruvianus.",
        neuromarketingHook: "More than preserving a sacred cactus, we are decoding the genome of Andean consciousness and protecting it from climate extinction.",
        scope: "The scope covers 12 hectares of direct conservation and the creation of the first Trichocereus genomic bank in South America.",
        fullDesc: "The botanical heart of Pampa Ñusta. A passive bioclimatic geodesic dome housing the largest living collection of the sacred Wachuma cactus in the Vilcanota basin. Designed to emulate the Andean ravine microclimate with volcanic mineral substrates, zenithal ventilation, and daytime thermal capture to protect mother lineages from night frosts."
      },
      arca_semillas: {
        name: "Andean Seed Ark & Living Laboratory",
        shortDesc: "Germplasm sanctuary with over 200 native varieties of sacred corn, Andean potatoes, quinoa, and kiwicha.",
        neuromarketingHook: "In a world threatened by climate change, true wealth is not gold, but the germplasm that will guarantee food for humanity.",
        scope: "Direct impact on the food sovereignty of 18 high Andean communities in the Sacred Valley, ensuring biologically pure germplasm for the next 3 generations.",
        fullDesc: "Built as a bioclimatic vault of adobe and cured clay, the Seed Ark guards the genetic heritage of the Andes. It preserves ancestral varieties of polychrome corn, native high-altitude tubers, and sacred grains, stored in clay vessels sealed with natural beeswax that prevent pests without a single gram of agrochemicals."
      },
      escuela_viva: {
        name: "Living School & Children's Bio-Park",
        shortDesc: "Outdoor educational village with a mud amphitheater, bio-games, and Andean fauna rescue.",
        neuromarketingHook: "We do not inherit the earth from our ancestors, we borrow it from our children. Here we train the ecological leaders of tomorrow.",
        scope: "Free bilingual ecological training and emotional support for 150 boys and girls annually from vulnerable rural schools.",
        fullDesc: "An educational pilot project that merges the forest school methodology with the Andean worldview. Designed for early childhood in rural communities to revalue their original culture through bioconstruction, agriculture, and art in Quechua."
      },
      maloka_ceremonial: {
        name: "Ceremonial Maloka & Sound Space",
        shortDesc: "Circular temple of bioconstruction and 432 Hz acoustics for research of master plants.",
        neuromarketingHook: "Where modern psychiatry meets its limits, ancient Andean medicine opens the doors to deep healing of trauma.",
        scope: "Creation of an internationally replicable clinical-traditional standard for the treatment of trauma through rigorous Andean protocols.",
        fullDesc: "The Maloka is an avant-garde center where modern science and traditional medicine converge. We investigate the neuroplastic benefits of expanded states of consciousness facilitated by Andean entheogens, under an ethical, safe framework guided by ancestral lineages."
      },
      terrazas_permacultura: {
        name: "Regenerative Terraces & Solar Hydrology",
        shortDesc: "Restoration of Inca terraces with photovoltaic irrigation technology and syntropic agriculture.",
        neuromarketingHook: "We revive the genius of Inca engineering and empower it with 21st century solar technology to feed the future of the Andes.",
        scope: "Complete restoration of 5 levels of Inca terracing and creation of the highest altitude negative carbon footprint hydro-solar model in Peru.",
        fullDesc: "An agricultural innovation project that challenges the Andean drought. We have recovered abandoned pre-Hispanic terraces by integrating contemporary solar pumping and micro-sprinkler technology. The goal is to create a replicable model of food security for the high Peruvian mountains."
      }
    }
  },
  fr: {
    cinematic_transitions: {
      tierra: { title: "TERRE", subtitle: "Banque Génétique de Wachuma" },
      agua: { title: "EAU", subtitle: "Conservation des Semences Natives" },
      viento: { title: "VENT", subtitle: "Centre de Loisirs pour Enfants" },
      fuego: { title: "FEU", subtitle: "Cérémonies des Plantes Maîtresses" },
      eter: { title: "ÉTHER", subtitle: "Ateliers Immersifs de 4 Jours et +" },
      memoria: "Mémoire Vivante du Sanctuaire"
    },
    virtual_tour_extra: {
      drag_instructions: "Faites glisser avec la souris ou le doigt pour faire pivoter à 360° · Cliquez sur les icônes oranges pour explorer les installations",
      instalaciones_title: "INSTALLATIONS"
    },
    pampa_facilities: {
      wachuma_wasi: {
        name: "Dôme Géodésique & Banque Génétique de Wachuma",
        shortDesc: "Serre géodésique bioclimatique avec plus de 40 lignées mères acclimatées de Trichocereus pachanoi et peruvianus.",
        neuromarketingHook: "Plus que la préservation d'un cactus sacré, nous décodons le génome de la conscience andine et le protégeons de l'extinction climatique.",
        scope: "La portée couvre 12 hectares de conservation directe et la création de la première banque génomique de Trichocereus en Amérique du Sud.",
        fullDesc: "Le cœur botanique de Pampa Ñusta. Un dôme géodésique bioclimatique passif abritant la plus grande collection vivante de cactus sacré Wachuma du bassin de Vilcanota. Conçu pour émuler le microclimat de la gorge andine avec des substrats minéraux volcaniques, une ventilation zénithale et une capture thermique diurne pour protéger les lignées mères des gelées nocturnes."
      },
      arca_semillas: {
        name: "Arche de Semences Andines & Laboratoire Vivant",
        shortDesc: "Sanctuaire de matériel génétique avec plus de 200 variétés natives de maïs sacré, pommes de terre andines, quinoa et kiwicha.",
        neuromarketingHook: "Dans un monde menacé par le changement climatique, la véritable richesse n'est pas l'or, mais le matériel génétique qui garantira la nourriture de l'humanité.",
        scope: "Impact direct sur la souveraineté alimentaire de 18 communautés alto-andines de la Vallée Sacrée, assurant un matériel génétique biologiquement pur pour les 3 prochaines générations.",
        fullDesc: "Construit comme une voûte bioclimatique d'adobe et d'argile séchée, l'Arche des Semences garde l'héritage génétique des Andes. Elle préserve les variétés ancestrales de maïs polychromes, de tubercules natifs d'altitude et de grains sacrés, stockés dans des récipients en argile scellés à la cire d'abeille naturelle qui préviennent les parasites sans un seul gramme d'agrochimie."
      },
      escuela_viva: {
        name: "École Vivante & Bio-Parc pour Enfants",
        shortDesc: "Village pédagogique en plein air avec amphithéâtre en boue, bio-jeux et sauvetage de la faune andine.",
        neuromarketingHook: "Nous n'héritons pas de la terre de nos ancêtres, nous l'empruntons à nos enfants. Ici, nous formons les leaders écologiques de demain.",
        scope: "Formation écologique bilingue et soutien émotionnel gratuits pour 150 garçons et filles par an issus d'écoles rurales vulnérables.",
        fullDesc: "Un projet pilote éducatif qui fusionne la méthodologie de l'école en forêt avec la vision du monde andine. Conçu pour que la petite enfance des communautés rurales revalorise sa culture d'origine à travers l'éco-construction, l'agriculture et l'art en quechua."
      },
      maloka_ceremonial: {
        name: "Maloka Cérémoniale & Espace Sonore",
        shortDesc: "Temple circulaire de bioconstruction et d'acoustique 432 Hz pour la recherche sur les plantes maîtresses.",
        neuromarketingHook: "Là où la psychiatrie moderne trouve ses limites, la médecine andine ancienne ouvre les portes à une guérison profonde des traumatismes.",
        scope: "Création d'un standard clinique-traditionnel reproductible au niveau international pour le traitement des traumatismes par le biais de protocoles andins rigoureux.",
        fullDesc: "La Maloka est un centre d'avant-garde où convergent la science moderne et la médecine traditionnelle. Nous étudions les avantages neuroplastiques des états modifiés de conscience facilités par les enthéogènes andins, dans un cadre éthique, sûr et guidé par des lignées ancestrales."
      },
      terrazas_permacultura: {
        name: "Terrasses Régénératives & Hydrologie Solaire",
        shortDesc: "Restauration des terrasses incas avec la technologie d'irrigation photovoltaïque et l'agriculture syntropique.",
        neuromarketingHook: "Nous ravivons le génie de l'ingénierie inca et l'équipons de la technologie solaire du 21e siècle pour nourrir l'avenir des Andes.",
        scope: "Restauration complète de 5 niveaux de terrasses incas et création du modèle hydro-solaire à l'empreinte carbone négative à la plus haute altitude du Pérou.",
        fullDesc: "Un projet d'innovation agricole qui défie la sécheresse andine. Nous avons récupéré des terrasses préhispaniques abandonnées en intégrant le pompage solaire contemporain et la technologie de micro-aspersion. L'objectif est de créer un modèle reproductible de sécurité alimentaire pour les hautes montagnes péruviennes."
      }
    }
  },
  pt: {
    cinematic_transitions: {
      tierra: { title: "TERRA", subtitle: "Banco Genético de Wachuma" },
      agua: { title: "ÁGUA", subtitle: "Conservação de Sementes Nativas" },
      viento: { title: "VENTO", subtitle: "Centro de Recreação Infantil" },
      fuego: { title: "FOGO", subtitle: "Cerimônias de Plantas Mestras" },
      eter: { title: "ÉTER", subtitle: "Workshops Imersivos de 4+ Dias" },
      memoria: "Memória Viva do Santuário"
    },
    virtual_tour_extra: {
      drag_instructions: "Arraste com o mouse ou dedo para girar 360° · Clique nos ícones laranjas para explorar as instalações",
      instalaciones_title: "INSTALAÇÕES"
    },
    pampa_facilities: {
      wachuma_wasi: {
        name: "Domo Geodésico & Banco Genético da Wachuma",
        shortDesc: "Estufa geodésica bioclimática com mais de 40 linhagens mães aclimatadas de Trichocereus pachanoi e peruvianus.",
        neuromarketingHook: "Mais do que preservar um cacto sagrado, estamos decodificando o genoma da consciência andina e protegendo-o da extinção climática.",
        scope: "O escopo abrange 12 hectares de conservação direta e a criação do primeiro banco genômico de Trichocereus na América do Sul.",
        fullDesc: "O coração botânico de Pampa Ñusta. Um domo geodésico bioclimático passivo que abriga a maior coleção viva do cacto sagrado Wachuma da bacia de Vilcanota. Projetado para emular o microclima da ravina andina com substratos minerais vulcânicos, ventilação zenital e captura térmica diurna para proteger as linhagens maternas das geadas noturnas."
      },
      arca_semillas: {
        name: "Arca de Sementes Andinas & Laboratório Vivo",
        shortDesc: "Santuário de germoplasma com mais de 200 variedades nativas de milho sagrado, batatas andinas, quinoa e kiwicha.",
        neuromarketingHook: "Num mundo ameaçado pelas mudanças climáticas, a verdadeira riqueza não é o ouro, mas o germoplasma que garantirá a alimentação da humanidade.",
        scope: "Impacto direto na soberania alimentar de 18 comunidades alto-andinas do Vale Sagrado, garantindo germoplasma biologicamente puro para as próximas 3 gerações.",
        fullDesc: "Construída como uma abóbada bioclimática de adobe e argila curada, a Arca das Sementes guarda a herança genética dos Andes. Preserva variedades ancestrais de milho policromo, tubérculos nativos de altitude e grãos sagrados, armazenados em potes de barro selados com cera de abelha natural que evitam pragas sem um único grama de agroquímico."
      },
      escuela_viva: {
        name: "Escola Viva & Bio-Parque Infantil",
        shortDesc: "Vila pedagógica ao ar livre com anfiteatro de barro, bio-jogos e resgate da fauna andina.",
        neuromarketingHook: "Não herdamos a terra de nossos ancestros, nós a pegamos emprestada de nossos filhos. Aqui formamos os líderes ecológicos de amanhã.",
        scope: "Formação ecológica bilíngue e apoio emocional gratuito para 150 meninos e meninas anualmente, provenientes de escolas rurais vulneráveis.",
        fullDesc: "Um projeto piloto educacional que mescla a metodologia das escolas da floresta com a cosmovisão andina. Projetado para que a primeira infância de comunidades rurais revalorize sua cultura de origem através da bioconstrução, agricultura e arte em quíchua."
      },
      maloka_ceremonial: {
        name: "Maloka Cerimonial & Espaço Sonoro",
        shortDesc: "Templo circular de bioconstrução e acústica 432 Hz para pesquisa de plantas mestras.",
        neuromarketingHook: "Onde a psiquiatria moderna encontra seus limites, a antiga medicina andina abre as portas para uma cura profunda de traumas.",
        scope: "Criação de um padrão clínico-tradicional replicável internacionalmente para o tratamento de traumas através de rigorosos protocolos andinos.",
        fullDesc: "A Maloka é um centro vanguardista onde a ciência moderna e a medicina tradicional convergem. Pesquisamos os benefícios neuroplásticos de estados expandidos de consciência facilitados por enteógenos andinos, sob uma estrutura ética, segura e guiada por linhagens ancestrais."
      },
      terrazas_permacultura: {
        name: "Terraços Regenerativos & Hidrologia Solar",
        shortDesc: "Restauração de terraços incas com tecnologia de irrigação fotovoltaica e agricultura sintrópica.",
        neuromarketingHook: "Revivemos a genialidade da engenharia inca e a potencializamos com a tecnologia solar do século 21 para alimentar o futuro dos Andes.",
        scope: "Restauração completa de 5 níveis de terraços incas e criação do modelo hidro-solar de pegada de carbono negativa na maior altitude do Peru.",
        fullDesc: "Um projeto de inovação agrícola que desafia a seca andina. Recuperamos terraços pré-hispânicos abandonados integrando o bombeamento solar contemporâneo e a tecnologia de microaspersão. O objetivo é criar um modelo replicável de segurança alimentar para as altas montanhas peruanas."
      }
    }
  }
};

async function run() {
  for (const lang of langs) {
    const filePath = path.join(localesDir, lang, 'translation.json');
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Quitar BOM si tiene
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    
    const json = JSON.parse(content);
    
    json.cinematic_transitions = newTranslations[lang].cinematic_transitions;
    json.pampa_facilities = newTranslations[lang].pampa_facilities;
    json.virtual_tour_extra = newTranslations[lang].virtual_tour_extra;
    
    fs.writeFileSync(filePath, JSON.stringify(json, null, 4), 'utf-8');
    console.log(`Updated ${lang}/translation.json`);
  }
}

run();
