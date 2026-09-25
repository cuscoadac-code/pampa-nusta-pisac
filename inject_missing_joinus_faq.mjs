
import fs from "fs";

const esJoinUsKeys = {
  "subtitle": "CAMINOS DE INTEGRACIÓN",
  "title": "ÚNETE A LA TRIBU",
  "voluntariado_title": "Voluntariado Semilla",
  "voluntariado_desc": "Sumérgete en la permacultura y bioconstrucción. Ideal para viajeros que desean aprender sirviendo a la tierra.",
  "retiro_title": "Retiros de Sanación",
  "retiro_desc": "Aislamiento profundo, dietas tradicionales y trabajo interno guiado por nuestros maestros andino-amazónicos.",
  "residencia_title": "Residencia Permanente",
  "residencia_desc": "Para aquellos que han escuchado el llamado profundo de convertirse en guardianes permanentes del santuario.",
  "apply": "Aplicar para"
};

const esFaqDesc = "Todo lo que necesitas saber antes de emprender tu viaje hacia el corazón del Valle Sagrado.";

const esFaqItems = [
  { "question": "¿Es necesario tener experiencia previa con plantas medicinales?", "answer": "No. Nuestros guardianes espirituales evalúan a cada visitante y diseñan un proceso personalizado de acuerdo a su nivel de sensibilidad y experiencia." },
  { "question": "¿Cómo llego desde Cusco al santuario?", "answer": "Pampa Ñusta se encuentra a 45 minutos de Cusco. Ofrecemos servicio de transporte privado desde el aeropuerto o puedes tomar un colectivo hacia Pisac y te recogeremos en el pueblo." },
  { "question": "¿Qué incluye el programa de voluntariado?", "answer": "Incluye alojamiento en carpas de alta montaña o domos compartidos, 3 comidas vegetarianas al día, talleres de bioconstrucción y acceso libre al santuario." },
  { "question": "¿Tienen conexión a internet (Wi-Fi)?", "answer": "Sí. Disponemos de conexión satelital en áreas designadas, pero fomentamos la desconexión digital para aprovechar la inmersión en la naturaleza." },
  { "question": "¿Puedo ir con niños?", "answer": "¡Por supuesto! La Escuela Viva está diseñada precisamente para integrar a los más pequeños en la naturaleza con metodologías alternativas de aprendizaje." }
];

const langs = ["es", "en", "fr", "pt"];

for (const lang of langs) {
  const filePath = `src/locales/${lang}/translation.json`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    
    // Inject joinus
    if (data.joinus) {
      data.joinus = { ...data.joinus, ...esJoinUsKeys }; // English, French, PT will show ES temporarily but at least it wont break UI
    } else {
      data.joinus = esJoinUsKeys;
    }
    
    // Inject faq
    if (data.faq) {
      data.faq.desc = esFaqDesc;
      data.faq.items = esFaqItems;
    } else {
      data.faq = { title: "PREGUNTAS FRECUENTES", subtitle: "Guía para Viajeros y Custodios", desc: esFaqDesc, items: esFaqItems };
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    console.log(`Injected keys into ${lang}`);
  }
}

