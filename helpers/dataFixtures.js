const mongoose = require("mongoose");
const ProductModel = mongoose.model('Product');
const UserModel = mongoose.model('User');
var hash = require('../helpers/hash.js');

const userData = {
    "firstName" : "Thibault",
    "lastName" : "Buathier",
    "birthDate" : "1997-01-10",
    "businessName" : "",
    "business" : false,
    "email" : "admin@ynov.com",
    "password" : hash.hashPassword("admin"),
    "number" : 27,
    "street" : "rue Raoul Servant",
    "zip_code" : "69007",
    "city" : "Lyon",
    "country" : "France"
};

const computerData = {
    "name" : "GS63VR 6RF Stealth Pro",
    "price" : 1399,
    "category" : "Ordinateur",
    "manufacturer" : "MSI",
    "commercialDesc" : [
        "Garantie : 2 ans",
        "SAV : Support 7j/24h gratuit au 0123456789",
        "Condition de retour : Retour gratuit sous 14j à condition de non utilisation",
        "Adresse de retour : 12 rue pc 75001 PARIS"
    ],
    "generalDesc" : [
        "Désignation : MSI GS63VR 6RF-020XFR Stealth Pro",
        "Marque : MSI",
        "Modèle : GS63VR 6RF-020XFR",
    ],
    "technicalDesc" : [
        "Système d'exploitation : Aucun",
        "Famille OS : Aucun",
        "Système d'exploitation fourni : Non",
        "Marque processeur : Intel",
        "Processeur : Intel Core i7",
        "Plateforme : Intel Skylake",
        "Type de processeur : Intel Core i7-6700HQ (Quad-Core 2.6 GHz / 3.5 GHz Turbo - Cache 6 Mo)",
        "Fréquence CPU : 2,6 GHz",
        "Chipset : Mobile Intel HM170 Express",
        "Taille de la mémoire : 16 Go",
        "Nombre de barrettes : 2",
        "Type de mémoire : DDR4",
        "Fréquence(s) Mémoire : DDR4 2400 MHz",
        "Taille de mémoire Max : 32 Go",
        "Chipset graphique : NVIDIA GeForce GTX 1060",
        "Taille mémoire vidéo : 6 Go",
        "Type mémoire vidéo : GDDR5",
        "Ecran tactile : Non",
        "Type d'écran : LED",
        "Taille de l'écran : 15,6 pouces",
        "Résolution Max : 1920 x 1080 pixels",
        "Format de l'écran : 16/9",
        "Ecran large : Oui",
        "Dalle mate : Oui",
        "Dalle brillante : Non",
        "NVIDIA G-SYNC : Non",
        "VR Ready (réalité virtuelle) : Oui",
        "Taux de rafraîchissement : 60 Hz"
    ]
};

const switchData = {
    "name" : "NETGEAR GS108GE",
    "price" : 29.1,
    "category" : "Switch",
    "manufacturer" : "Netgear",
    "commercialDesc" : [
        "Garantie : à vie",
        "SAV : Support 7j/24h gratuit au 0123456789",
        "Condition de retour : Retour gratuit sous 30j",
        "Adresse de retour : 12 rue pc 75001 PARIS"
    ],
    "generalDesc" : [
        "Performance supérieure",
        "Haute qualité et fiabilité",
        "Priorité du trafic voix et vidéo",
        "Garantie à vie, support technique à vie via Chat en ligne et remplacement matériel sur site le jour ouvrable suivant",
        "Configuration simple, pas de configuration ou d'installation logicielle nécessaire",
        "Les LED en face avant vous informent sur l'alimentation du switch, l'état des connexions, l'activité et la vitesse",
        "Grâce à un fond de panier non bloquant, vous bénéficiez de performances Gigabit, sans compromis",
    ],
    "technicalDesc" : [
        "Marque : Netgear",
        "Numéro du modèle de l'article : GS108GE",
        "séries : Switch NETGEAR GS108GE",
        "Nombre de ports : 8 ports",
        "Débits disponibles : 10/100/1000Mbps",
        "Couleur : Noir",
        "Système d'exploitation : Windows, Linux, Mac OS",
        "Plate-forme du matériel informatique : PC",
        "Description du clavie : Français",
        "Type d'alimentation : 12 V DC, 1 A",
        "Bluetooth : Non",
        "Compatibilité du périphérique : inconnu",
        "Type de batterie : 12 V DC, 1 A",
        "Item dimensions L x W x H : 10,1 x 15,8 x 2,7 cm",
        "Poids du produit : 1.25 kilogrammes"
    ]
};

const gpuData = {
    "name" : "MSI GTX 1080",
    "price" : 580,
    "category" : "Carte graphique",
    "manufacturer" : "MSI",
    "commercialDesc" : [
        "Garantie : 2 ans",
        "SAV : Support 7j/24h gratuit au 0123456789",
        "Adresse de retour : Retour gratuit sous 14j à condition de non utilisation",
        "Adresse de retour : 12 rue pc 75001 PARIS"
    ],
    "generalDesc" : [
        "Performance supérieure",
        "Haute qualité et fiabilité",
        "Dernières technologies"
    ],
    "technicalDesc" : [
        "Référence constructeur : GeForce GTX 1080 GAMING X 8G",
        "Marque du chipset : NVIDIA",
        "Puce graphiqu : GeForce GTX 1080",
        "Nom de code de la puce : Pascal",
        "Fréquence : 1683 MHz (1708 MHz en mode OC)",
        "Unités de calcul : 2560 CUDA Cores",
        "NVIDIA GPU Boost 3 Technology : Oui",
        "Fréquence avec Boost : 1822 MHz (1847 MHz en mode OC)",
        "Interface : PCI-Express 16x",
        "Version PCI-Express prise en charge : 3.0",
        "Connecteur(s) d'alimentation PCI-Express : 1 x 6 et 1 x 8 broches",
        "Dimensions de la carte : 279 x 140 x 42 mm",
        "Puissance alimentation recommandée constructeur : 500 Watts"
    ]
};

UserModel.findOneOrCreate({"email" : "admin@ynov.com"}, function(err, result) {
    if (err) { throw err; }
    Object.keys(userData).map(function(key) {
        result[key] = userData[key];
    });
    result.save();
});

ProductModel.findOneOrCreate(computerData, function(err, result) {
    if (err) { throw err; }
});

ProductModel.findOneOrCreate(switchData, function(err, result) {
    if (err) { throw err; }
});

ProductModel.findOneOrCreate(gpuData, function(err, result) {
    if (err) { throw err; }
});