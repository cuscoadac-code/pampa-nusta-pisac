
import fs from "fs";

const esNavKeys = {
  "inicio": "Inicio",
  "leyenda": "Leyenda",
  "botanica": "Reserva Botánica",
  "identidad": "Identidad",
  "lideres": "Líderes",
  "media": "Media Hub",
  "unirse": "Únete a Nosotros",
  "recorrido": "Recorrido 360",
  "adopcion": "Adopta una Semilla"
};

const esLocationKeys = {
  "view_place": "VER EN GOOGLE MAPS",
  "maps": "ABRIR EN MAPAS",
  "whatsapp": "CONTACTAR POR WHATSAPP"
};

const langs = ["es", "en", "fr", "pt"];

for (const lang of langs) {
  const filePath = `src/locales/${lang}/translation.json`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    
    // Inject nav
    if (data.nav) {
      data.nav = { ...data.nav, ...esNavKeys };
    } else {
      data.nav = esNavKeys;
    }
    
    // Inject location
    if (data.location) {
      data.location = { ...data.location, ...esLocationKeys };
    } else {
      data.location = esLocationKeys;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    console.log(`Injected keys into ${lang}`);
  }
}

