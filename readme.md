# Chroniques d'Atlas

Prototype de jeu web inspiré de [Pax Historia](https://www.paxhistoria.co/) : une carte du monde divisée en grandes provinces où des cultures rivales étendent leurs territoires, se disputent des provinces et font évoluer la population au fil des années.

## Lancer le prototype
Aucun backend n'est nécessaire. Ouvrez simplement `index.html` dans votre navigateur ou servez le dossier avec un serveur statique :

```bash
python -m http.server 8000
```

Puis rendez-vous sur [http://localhost:8000](http://localhost:8000).

## Contrôles
- **Lecture / Pause** : démarre ou arrête la simulation des tours.
- **Tour suivant** : avance manuellement de 5 ans.
- **Réinitialiser** : régénère l'état de la carte pour l'époque courante.
- **Pays suivi** : choisissez la culture (pays) à suivre visuellement avant de lancer la partie ou à tout moment.
- **Époque** : choisissez entre 1444, 1789, 1914, 1945, 1991 ou 2025 pour démarrer à des dates clés de l'histoire mondiale.
- **Vitesse** : règle l'intervalle entre deux tours.
- **Survol sur la carte** : affiche la culture et la population de la province pointée sur la carte mondiale.
- **Scoreboard** : récapitule provinces, population totale et momentum par culture.
- Le journal recense les conquêtes et unifications récentes.

## Adapter les règles
Toutes les règles de génération, de croissance démographique et de combat se trouvent dans `main.js`. Les provinces sont définies dans `PROVINCES` avec leurs polygones (coordonnées normalisées au canvas), leurs régions et leurs voisins dans `NEIGHBORS`. Modifiez les presets d'époque dans `ERA_PRESETS` pour ajuster les cultures de départ, ou les fonctions `tick` et `createWorld` pour explorer d'autres mécaniques.
