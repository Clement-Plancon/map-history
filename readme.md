# Chroniques d'Atlas

Prototype de jeu web inspiré de [Pax Historia](https://www.paxhistoria.co/) : une carte procédurale où des cultures rivales étendent leurs territoires, se disputent des provinces et font évoluer la population au fil des années.

## Lancer le prototype
Aucun backend n'est nécessaire. Ouvrez simplement `index.html` dans votre navigateur ou servez le dossier avec un serveur statique :

```bash
python -m http.server 8000
```

Puis rendez-vous sur [http://localhost:8000](http://localhost:8000).

## Contrôles
- **Lecture / Pause** : démarre ou arrête la simulation des tours.
- **Tour suivant** : avance manuellement de 5 ans.
- **Réinitialiser** : régénère un monde procédural.
- **Vitesse** : règle l'intervalle entre deux tours.
- **Survol sur la carte** : affiche la culture, la population et les coordonnées de la province.
- **Scoreboard** : récapitule provinces, population totale et momentum par culture.
- Le journal recense les conquêtes et unifications récentes.

## Adapter les règles
Toutes les règles de génération, de croissance démographique et de combat se trouvent dans `main.js`. Modifiez les constantes (`WIDTH`, `HEIGHT`, `CULTURES`) et les fonctions `tick`, `createWorld` ou `neighbors` pour explorer d'autres mécaniques.
