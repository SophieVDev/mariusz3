function showPage() {
  document.getElementById("page").style.display = "block";
}

function hidePage() {
  document.getElementById("page").style.display = "none";
}

function getLocation() {
  if (navigator.permissions) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (permissionStatus) {
        if (permissionStatus.state === "granted") {
          showPage();
        } else if (permissionStatus.state === "prompt") {
          hidePage();
          navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            var xhr = new XMLHttpRequest();
            var url =
              "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
              latitude +
              "&lon=" +
              longitude;
            xhr.open("GET", url, true);
            xhr.onload = function () {
              var result = JSON.parse(xhr.responseText);
              if (result.address && result.address.country_code === "us") {
                window.location.href = "https://www.test.html";
              } else {
                console.log("Vous n'êtes pas aux États-Unis");
              }
            };
            xhr.send();

            showPage();
          });
        } else if (permissionStatus.state === "denied") {
          console.log("L'accès à votre position géographique est refusé.");
        }
      });
  } else {
    console.log(
      "La géolocalisation n'est pas prise en charge par votre navigateur"
    );
  }
}
//AUTRE
/*if (navigator.permissions) {
  navigator.permissions
    .query({ name: "geolocation" })
    .then(function (permissionStatus) {
      if (permissionStatus.state === "granted") {
        navigator.geolocation.getCurrentPosition(function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          var xhr = new XMLHttpRequest();
          var url =
            "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
            latitude +
            "&lon=" +
            longitude;
          xhr.open("GET", url, true);
          xhr.onload = function () {
            var result = JSON.parse(xhr.responseText);
            if (result.address && result.address.country_code === "us") {
              window.location.href = "https://www.test.html";
            } else {
              console.log("Vous n'êtes pas aux États-Unis");
            }
          };
          xhr.send();
        });
      } else if (permissionStatus.state === "prompt") {
        console.log(
          "Veuillez autoriser l'accès à votre position géographique."
        );
      } else if (permissionStatus.state === "denied") {
        console.log("L'accès à votre position géographique est refusé.");
      }
    });
} else {
  console.log(
    "La géolocalisation n'est pas prise en charge par votre navigateur"
  );
}
*/
//TROUVER LA GEOLOCALISATION

// DICTIONNAIRE POUR LA TRADUCTION
const languageDict = {
  fr: {
    info: "Information nutritionnelle",
    reg: "Énergie, Règlement",
    energy: "Energie, Règlement UE N° 1169/2011 (kj/100g)",
    proteines: "Protéines, N x 6,25 (g/100g)",
    glucides: "Glucides (g/100g)",
    lipides: "Lipides (g/100g)",
    sucres: "Sucres (g/100g)",
    acideGrasSatures: "Acide Gras saturés (g/100g)",
    selChlorureSodium: "Sel chlorure de sodium (g/100g)",
    etiquette: "Étiquette ",
    liste:
      "Eau, Protéines, Glucides, Alcool, Sels minéraux, Vitamines Oligo-éléments, Polyphénols, Acides minéraux",
  },
  en: {
    info: "Nutritional Information",
    reg: "Energy, EU Regulation No. 1169/2011 (kcal/100g)",
    energy: "Energy, EU Regulation N° 1169/2011 (kj/100g)",
    proteines: "Protein, N x 6.25 (g/100g)",
    glucides: "Carbohydrates (g/100g)",
    lipides: "Lipids (g/100g)",
    sucres: "Sugar (g/100g)",
    acideGrasSatures: "Saturated Fatty Acid (g/100g)",
    selChlorureSodium: "Sodium chloride salt (g/100g)",
    etiquette: "Label ",
    liste:
      "Water, Proteins, Carbohydrates, Alcohol, Mineral salts, Vitamins Trace elements, Polyphenols, Mineral acids",
  },
  es: {
    info: "Información nutricional",
    reg: "Energía, Reglamento UE N° 1169/2011 (kcal/100g)",
    energy: "Energía, Reglamento UE No. 1169/2011 (kj/100g)",
    proteines: "Proteína, N x 6.25 (g/100g)",
    glucides: "Glúcidos (g/100g)",
    lipides: "Lípidos (g/100g)",
    sucres: "azúcar (g/100g)",
    acideGrasSatures: "Ácido Graso Saturado  (g/100g)",
    selChlorureSodium: "Sal de cloruro de sodio (g/100g)",
    etiquette: "etiqueta ",
    liste:
      "Agua, Proteínas, Carbohidratos, Alcohol, Sales minerales, Vitaminas Oligoelementos, Polifenoles, Ácidos minerales",
  },

  // Ajouter la traduction pour d'autres langues si besoin
};

// Récupération de la langue du navigateur ( fr,en, es...)
const browserLang = navigator.language.substring(0, 2);

// Traduction des mots en fonction de la langue du navigateur
const info = document.querySelector("#text1");
const reg = document.querySelector("#text2");
const energy = document.querySelector("#text3");
const proteines = document.querySelector("#text4");
const glucides = document.querySelector("#text5");
const lipides = document.querySelector("#text6");
const sucres = document.querySelector("#text7");
const acideGrasSatures = document.querySelector("#text8");
const selChlorureSodium = document.querySelector("#text9");
const etiquette = document.querySelector("#text10");
const liste = document.querySelector("#text11");

if (languageDict.hasOwnProperty(browserLang)) {
  const translations = languageDict[browserLang];
  info.textContent = translations.info;
  reg.textContent = translations.reg;
  energy.textContent = translations.energy;
  proteines.textContent = translations.proteines;
  glucides.textContent = translations.glucides;
  lipides.textContent = translations.lipides;
  sucres.textContent = translations.sucres;
  acideGrasSatures.textContent = translations.acideGrasSatures;
  selChlorureSodium.textContent = translations.selChlorureSodium;
  selChlorureSodium.textContent = translations.selChlorureSodium;
  etiquette.textContent = translations.etiquette;
  liste.textContent = translations.liste;
} else {
  // Si la langue n'est pas supportée, nous écrivons cette phrase
  console.log(`La langue ${browserLang} n'est pas supportée.`);
}
