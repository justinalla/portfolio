# CLAUDE.md — architecture historique

> Mise à jour : le portfolio utilise désormais Astro, TypeScript et Motion. Les instructions actives sont dans `README.md`. Modifier les sources dans `src/`, puis exécuter `npm run publish:prepare` avant de committer. GitHub Pages publie toujours `main` à la racine. Les indications ci-dessous décrivent la version HTML historique et ne doivent plus guider les modifications de code.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Portfolio personnel de Justin Allaglo (justinallaglocareer@gmail.com) — site statique multi-pages en HTML/CSS/JS pur, sans framework, sans build, sans dépendances npm. Tout le contenu est en français ; conserver l'orthographe accentuée.

## Développement

Aucune étape de build : ouvrir `index.html` dans un navigateur suffit. Pour un serveur local (Python absent de cette machine, Node disponible) :

```
npx --yes http-server . -p 8742
```

Vérification de syntaxe du JS : `node --check js/main.js`.

## Déploiement

- Dépôt GitHub : https://github.com/justinalla/portfolio (branche `main`)
- Site en ligne : https://justinalla.github.io/portfolio/ via GitHub Pages (build « legacy », branche `main`, racine `/`)
- Chaque `git push` sur `main` redéploie automatiquement le site en ~1 minute — pousser, c'est publier.
- GitHub CLI installé mais pas forcément dans le PATH de la session : utiliser `& "C:\Program Files\GitHub CLI\gh.exe"` si `gh` n'est pas reconnu. Compte authentifié : `justinalla`.
- Le site étant servi sous le sous-chemin `/portfolio/`, garder tous les liens internes (pages, css, js) **relatifs** — jamais de chemins commençant par `/`.

## Architecture

Cinq pages soeurs partageant la même structure ; `index.html` est la page d'entrée :

- `index.html` — accueil : hero animé, compteurs, ticker, teasers, projets vedettes
- `approche.html`, `travail.html`, `outils.html`, `contact.html` — une page par onglet de navigation
- `css/styles.css` — feuille de style unique partagée
- `js/main.js` — script unique partagé (chaque bloc est gardé par des `querySelector`, donc inoffensif sur les pages où l'élément n'existe pas)

### Duplication volontaire entre pages

Header/nav, footer, `<head>` (fonts, favicon data-URI, OG) et barre de progression sont copiés-collés dans chaque page — il n'y a pas de système d'include. Toute modification de ces blocs doit être répercutée sur les cinq fichiers. L'état actif de la nav est statique : classe `active` + `aria-current="page"` posées à la main sur le lien de la page courante.

### Conventions CSS

- Design tokens dans `:root` (palette « indigo & laiton » : fonds `--indigo-*`, texte `--ivory`, accents `--brass`). Ne pas introduire de couleurs en dur hors de cette palette.
- Typographie : Fraunces (titres), Instrument Sans (corps), Space Mono (labels `.mono`) via Google Fonts.
- Animations : `.rise .d1–.d5` = entrée séquencée au chargement (heros) ; `.reveal` + variable `--d` inline = apparition au scroll via IntersectionObserver (le JS ajoute `.in`). Toute animation doit rester couverte par le bloc `prefers-reduced-motion` en fin de fichier.
- Responsive : points de rupture principaux à 820/780/760/680/620/560 px + bloc d'ajustements globaux mobile à 680 px en fin de fichier. Le motif SVG « fil » vertical a été supprimé à la demande du propriétaire — ne pas le réintroduire.

### Comportements JS (js/main.js)

- Filtre de `travail.html` : boutons `.chip[data-f]` contre cartes `#grid .card[data-tags]`. « Tout » affiche tout ; un badge spécifique masque entièrement les non-correspondants (classe `.hide`, pas de grisé) et synchronise `aria-pressed`.
- Compteurs `[data-count]` (+ `data-suffix` optionnel, ex. « 4 Go ») animés à l'entrée dans le viewport.
- Tout le JS respecte `prefers-reduced-motion` (variable `reduceMotion`).

## Icônes et SVG

Icônes inline en trait (`.icon`, stroke `--brass`, viewBox 26 ou 36) dessinées à la main dans le HTML — pas de bibliothèque d'icônes. Suivre le même style (stroke-width 1.5, linecap round) pour toute nouvelle icône.
