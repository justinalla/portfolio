# Portfolio de Justin Allaglo

Site public : https://justinalla.github.io/portfolio/

Portfolio français en Astro, CSS, TypeScript et Motion. Cinq pages principales, six fiches projet, animations progressives et filtres par discipline. Le site reste lisible sans JavaScript.

## Développer

Node.js 22.12+ et npm.

```bash
npm ci
npm run dev
```

Les sources se trouvent dans `src/`. Les contenus des projets sont dans `src/data/projects.ts`, le design dans `src/styles/`, les interactions dans `src/scripts/main.ts`.

## Publier avec la configuration existante

GitHub Pages utilise déjà **main / racine**. Les fichiers générés sont donc également versionnés à la racine. `.nojekyll` permet de servir le dossier `_astro`.

Après une modification des sources :

```bash
npm run publish:prepare
git add .
git commit -m "Mettre à jour le portfolio"
git push origin main
```

`publish:prepare` vérifie les types, génère le site pour `/portfolio/`, copie les fichiers nécessaires à la racine et retire uniquement les anciens fichiers générés recensés dans `.pages-files.json`. Ne pas modifier directement les HTML à la racine.

Les anciennes adresses `approche.html`, `travail.html`, `outils.html` et `contact.html` redirigent vers les nouvelles pages. L'historique Git conserve la version précédente.

## Option : génération automatique par GitHub Actions

Un modèle est fourni dans `docs/github-pages-actions.yml`. Il est inactif pour conserver la publication existante. Pour l'activer ultérieurement, choisir GitHub Actions dans Settings → Pages puis copier le modèle dans `.github/workflows/deploy.yml`. Le workflow génère et publie `dist/` à partir des sources.

## Contenus

MaTontine présente quatre captures réelles fournies par le propriétaire, dans `public/images/matontine/`. Les images sont conservées sans retouche ; les noms et montants affichés relèvent de la démonstration. Le texte distingue les fonctionnalités visibles des modèles annoncés « Bientôt ». Les autres projets conservent des monogrammes typographiques. Aucun résultat commercial, témoignage ou portrait n'a été inventé. Contact par e-mail avec bouton de copie. Polices Google Fonts avec polices de secours ; aucun outil de suivi.
