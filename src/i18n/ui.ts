export const languages = { fr: 'Français', en: 'English' } as const;
export type Lang = keyof typeof languages;
export type Localized<T = string> = Record<Lang, T>;

/** Interface text. Menu and restaurant content live in src/data/*.json. */
export const ui = {
  fr: {
    'meta.title': "L'aromate — Restaurant méditerranéen à Laval | Brunch, Lunch, Dîner",
    'meta.description':
      "L'aromate, restaurant méditerranéen et tunisien à Laval : couscous, ojja, grillades, pâtes et pizzas. Brunch à volonté les samedis et dimanches. Réservez au (450) 967-1111.",
    'skip': 'Aller au contenu',
    'nav.label': 'Navigation principale',
    'nav.menu': 'Menu',
    'nav.brunch': 'Brunch',
    'nav.about': 'À propos',
    'nav.gallery': 'Galerie',
    'nav.contact': 'Nous trouver',
    'nav.open': 'Ouvrir le menu de navigation',
    'nav.close': 'Fermer le menu de navigation',
    'lang.switch': 'English',
    'lang.switchLabel': 'View this site in English',
    'cta.reserve': 'Réserver une table',
    'cta.menu': 'Voir le menu',
    'cta.call': 'Appeler',
    'cta.reserveShort': 'Réserver',
    'hero.logoAlt': "Logo du restaurant L'aromate",
    'brunch.kicker': 'Samedi & dimanche',
    'brunch.title': 'Brunch à volonté',
    'brunch.points': [
      'Buffet varié et généreux',
      'Produits frais et de qualité',
      'Pour toute la famille',
    ],
    'brunch.reserve': 'Réservation obligatoire',
    'brunch.cta': 'Réserver le brunch',
    'menu.title': 'Notre menu',
    'menu.intro': 'Cuisine tunisienne et méditerranéenne, préparée chaque jour avec des produits frais.',
    'menu.categories': 'Catégories du menu',
    'menu.taxes': 'Taxes en sus. Prix sujets à changement.',
    'about.title': 'À propos',
    'about.kicker': 'Notre maison',
    'gallery.title': 'Galerie',
    'gallery.follow': 'Suivez-nous sur Instagram',
    'gallery.defaultAlt': "Photo du restaurant L'aromate",
    'contact.title': 'Nous trouver',
    'contact.address': 'Adresse',
    'contact.hours': "Heures d'ouverture",
    'contact.hoursTbd': 'Heures à confirmer — appelez-nous !',
    'contact.closed': 'Fermé',
    'contact.phone': 'Téléphone',
    'contact.brunchPhone': 'Réservations brunch',
    'contact.directions': 'Itinéraire',
    'contact.mapTitle': "Carte Google Maps — L'aromate, Laval",
    'footer.rights': 'Tous droits réservés.',
    'footer.follow': 'Suivez-nous',
  },
  en: {
    'meta.title': "L'aromate — Mediterranean Restaurant in Laval | Brunch, Lunch, Dinner",
    'meta.description':
      "L'aromate, a Mediterranean and Tunisian restaurant in Laval: couscous, ojja, grills, pasta and pizza. All-you-can-eat brunch every Saturday and Sunday. Book at (450) 967-1111.",
    'skip': 'Skip to content',
    'nav.label': 'Main navigation',
    'nav.menu': 'Menu',
    'nav.brunch': 'Brunch',
    'nav.about': 'About',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Find us',
    'nav.open': 'Open navigation menu',
    'nav.close': 'Close navigation menu',
    'lang.switch': 'Français',
    'lang.switchLabel': 'Voir ce site en français',
    'cta.reserve': 'Book a table',
    'cta.menu': 'See the menu',
    'cta.call': 'Call',
    'cta.reserveShort': 'Book',
    'hero.logoAlt': "L'aromate restaurant logo",
    'brunch.kicker': 'Saturday & Sunday',
    'brunch.title': 'All-you-can-eat brunch',
    'brunch.points': [
      'A varied and generous buffet',
      'Fresh, quality ingredients',
      'For the whole family',
    ],
    'brunch.reserve': 'Reservations required',
    'brunch.cta': 'Book brunch',
    'menu.title': 'Our menu',
    'menu.intro': 'Tunisian and Mediterranean cooking, prepared fresh every day.',
    'menu.categories': 'Menu categories',
    'menu.taxes': 'Taxes extra. Prices subject to change.',
    'about.title': 'About us',
    'about.kicker': 'Our house',
    'gallery.title': 'Gallery',
    'gallery.follow': 'Follow us on Instagram',
    'gallery.defaultAlt': "Photo of L'aromate restaurant",
    'contact.title': 'Find us',
    'contact.address': 'Address',
    'contact.hours': 'Opening hours',
    'contact.hoursTbd': 'Hours to be confirmed — give us a call!',
    'contact.closed': 'Closed',
    'contact.phone': 'Phone',
    'contact.brunchPhone': 'Brunch reservations',
    'contact.directions': 'Directions',
    'contact.mapTitle': "Google Maps — L'aromate, Laval",
    'footer.rights': 'All rights reserved.',
    'footer.follow': 'Follow us',
  },
} as const;

export type UIKey = keyof (typeof ui)['fr'];

export function useTranslations(lang: Lang) {
  return <K extends UIKey>(key: K): (typeof ui)['fr'][K] => ui[lang][key] as (typeof ui)['fr'][K];
}

/** Quebec price format: "17 $" (non-breaking space). Decimals use a comma: "17,50 $". */
export function formatPrice(value: number): string {
  const n = Number.isInteger(value) ? String(value) : value.toFixed(2).replace('.', ',');
  return `${n} $`;
}

export const homePath = (lang: Lang) => (lang === 'fr' ? '/' : '/en/');
