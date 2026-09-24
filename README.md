# L'aromate — site web

Site vitrine bilingue (français par défaut, anglais sous `/en/`) du restaurant **L'aromate**, cuisine méditerranéenne et tunisienne à Laval.

- **Stack :** [Astro](https://astro.build) 7 + [Tailwind CSS](https://tailwindcss.com) 4. Le site est entièrement statique, sans backend.
- **Réservations :** par téléphone (liens `tel:`).
- **Pages :** `/` (FR) et `/en/` (EN), sur une seule page avec des ancres : Accueil, Brunch, Menu, À propos, Galerie, Nous trouver.
- **Lighthouse (mobile, build de production) :** 100 en performance, accessibilité, bonnes pratiques et SEO.

---

## Démarrage rapide

Prérequis : **Node.js 22.12 ou plus récent** (voir `.nvmrc`).

```bash
npm install        # une seule fois
npm run dev        # http://localhost:4321  (rechargement automatique)
npm run build      # génère le site final dans dist/
npm run preview    # sert dist/ localement pour vérifier le build
npm run check      # vérification des types / erreurs
```

---

## Modifier le contenu

Tout le contenu modifiable se trouve dans `src/data/`. Il n'est pas nécessaire de toucher aux composants.

### Le menu : `src/data/menu.json`

Le menu est une liste de catégories. Chaque catégorie contient des plats :

```jsonc
{
  "id": "pizzas",                                  // identifiant de l'ancre (#menu-pizzas), sans espaces ni accents
  "name": { "fr": "Nos Pizzas", "en": "Our Pizzas" },
  "note": { "fr": "…", "en": "…" },               // optionnel : texte sous le titre de la catégorie
  "items": [
    {
      "name": { "fr": "Thon", "en": "Tuna" },
      "price": 17,                                 // nombre seulement ; s'affiche « 17 $ » (17.5 donne « 17,50 $ »)
      "description": { "fr": "…", "en": "…" }      // optionnel ; laisser "" pour ne rien afficher
    }
  ]
}
```

Autres formes possibles pour un plat :

- **Plusieurs prix** (comme Kafteji ou Mokli) : remplacez `price` par
  `"prices": [ { "label": { "fr": "Régulier", "en": "Regular" }, "price": 16 }, … ]`
- **Prix du marché** : `"price": null, "priceNote": { "fr": "Prix du marché", "en": "Market price" }`
- **`"verify"`** : note interne, jamais affichée sur le site. Elle signale un élément à confirmer.

L'ordre dans le fichier est l'ordre d'affichage. Les onglets de catégories sont générés automatiquement. Le menu est aussi publié pour Google (schema.org `hasMenu`) à chaque build.

> Astuce : validez le fichier sur <https://jsonlint.com> si le build échoue après une modification. Une virgule manquante suffit à le faire échouer.

### Infos du restaurant : `src/data/info.json`

Adresse, téléphones, réseaux sociaux, heures d'ouverture, détails du brunch et texte « À propos ».

- **Heures :** remplissez `open` et `close` pour chaque jour au format 24 h (`"11:00"`, `"22:00"`). Laissez-les vides pour un jour de fermeture. Mettez ensuite **`"hoursConfirmed": true`**. Tant que ce n'est pas fait, le site affiche « Heures à confirmer » et n'envoie pas d'heures à Google.
- **Brunch :** `brunch.hours` et `brunch.price` sont optionnels et s'affichent dans le bloc Brunch s'ils sont remplis.
- **À propos :** `about.fr` et `about.en` contiennent un paragraphe par élément de la liste. **Le texte actuel est temporaire** et doit être personnalisé.
- **Téléphones :** `display` est le texte affiché. `tel` est le numéro international utilisé par le lien d'appel.

### Textes de l'interface : `src/i18n/ui.ts`

Boutons, titres de sections, titre et description SEO de chaque langue.

---

## Remplacer les photos

| Quoi | Où | Notes |
|---|---|---|
| **Logo** | `public/images/logo.png` | Carré, fond transparent, **512 × 512 px** recommandé. Le fichier actuel est un logo **temporaire**. |
| **Galerie** | `src/assets/gallery/` | JPG, PNG ou WebP, idéalement 1600 px ou plus, format carré. Toutes les images du dossier sont affichées **par ordre alphabétique** : préfixez les noms (`01-…`, `02-…`). La première photo est affichée en grand. |
| **Textes alternatifs de la galerie** | `src/data/gallery.json` | Une entrée par nom de fichier, en FR et en EN. Sans entrée, un texte générique est utilisé. |
| **Image de partage** (Facebook, iMessage…) | `public/images/og.jpg` | **1200 × 630 px**. |
| **Icônes** | `public/favicon.svg`, `favicon.png` (64 px), `apple-touch-icon.png` (180 px) | À régénérer à partir du vrai logo. |

**Pourquoi la galerie est dans `src/assets/gallery/` et non dans `public/images/gallery/`?** Astro n'optimise que les images placées dans `src/`. Il les redimensionne en plusieurs tailles et les convertit en WebP, ce qui est essentiel pour un bon score mobile. Les fichiers de `public/` sont servis tels quels. Les photos actuelles (« Photo à venir ») sont des images **temporaires**.

---

## Déploiement (gratuit)

### Netlify

1. Poussez le dépôt sur GitHub.
2. Sur <https://app.netlify.com> : **Add new site → Import an existing project**, puis choisissez le dépôt.
3. Les réglages sont lus depuis `netlify.toml` (commande `npm run build`, dossier `dist`, Node 22). Cliquez **Deploy**.
4. **Domain management → Add a domain →** `laromate.ca`, puis suivez les instructions DNS.

### Vercel

1. Sur <https://vercel.com/new>, importez le dépôt. Astro est détecté automatiquement (build `npm run build`, sortie `dist`).
2. **Settings → Domains →** ajoutez `laromate.ca`.

Chaque `git push` sur la branche principale redéploie le site automatiquement.

---

## Structure du projet

```
src/
  data/menu.json        ← menu (FR + EN)
  data/info.json        ← adresse, téléphones, heures, réseaux, texte À propos
  data/gallery.json     ← textes alternatifs des photos
  assets/gallery/       ← photos de la galerie (optimisées automatiquement)
  i18n/ui.ts            ← textes de l'interface + format des prix
  components/           ← sections de la page (Hero, Brunch, Menu, …)
  layouts/Base.astro    ← <head> : SEO, Open Graph, JSON-LD schema.org Restaurant
  pages/index.astro     ← page française (/)
  pages/en/index.astro  ← page anglaise (/en/)
public/
  images/logo.png, images/og.jpg, favicons, robots.txt
```

---

## ✅ À fournir ou à confirmer avant la mise en ligne

- [ ] **Logo** : le vrai fichier (PNG transparent, 512 px ou plus, ou SVG) pour `public/images/logo.png`, et les favicons.
- [ ] **Photos** : plats, salle et buffet du brunch pour `src/assets/gallery/`, ainsi qu'une image de partage `og.jpg`.
- [ ] **Heures d'ouverture** : inconnues pour le moment. À saisir dans `info.json` (`hours`), puis mettre `hoursConfirmed` à `true`. Heures et prix du brunch aussi, si souhaité.
- [ ] **Salade Océane** : elle figure **deux fois** sur le menu imprimé, à **18 $** et à **15 $**. Les deux lignes sont affichées pour l'instant. Laquelle garder ? S'agit-il de deux formats ?
- [ ] **Dorade ou loup de mer (450 g à 500 g)** : aucun prix sur le menu. Le site affiche « Prix du marché ».
- [ ] **Chapati Mahdia** : aucune description sur le menu imprimé.
- [ ] **⚠️ Tous les prix** : le menu source date d'environ **8 mois**. **Revérifiez chaque prix** avant le lancement.
- [ ] **Descriptions ajoutées** : les plats marqués `"verify": "description ajoutée"` dans `menu.json` n'avaient pas de description sur le menu imprimé. Une courte description FR et EN a été rédigée pour aider les clients qui ne connaissent pas ces plats. Toutes les traductions anglaises ont aussi été rédigées pendant le développement. À faire valider par le chef.
- [ ] **Code postal** : à ajouter dans `info.json` → `address.postalCode` (utile pour Google).
- [ ] **Lien Facebook** : l'URL exacte de la page « L'aromate Laval ». Le lien actuel est une recherche Facebook temporaire (`info.json` → `socials.facebook.url`).
- [ ] **Texte « À propos »** : paragraphe temporaire à remplacer par l'histoire réelle du restaurant.
