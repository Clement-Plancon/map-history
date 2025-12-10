# Chroniques d'Atlas

Prototype de jeu web inspiré de [Pax Historia](https://www.paxhistoria.co/) : une carte du monde découpée en provinces réelles (données Natural Earth via world-atlas) où des cultures rivales étendent leurs territoires, se disputent les provinces et font évoluer la population au fil des années.

## Lancer le prototype
Aucun backend n'est nécessaire. Ouvrez simplement `index.html` dans votre navigateur ou servez le dossier avec un serveur statique :

```bash
python -m http.server 8000
```

Puis rendez-vous sur [http://localhost:8000](http://localhost:8000). La page récupère les provinces depuis le paquet `world-atlas` (TopoJSON `states-provinces-50m.json`) et les projette via D3.

## Contrôles
- **Lecture / Pause** : démarre ou arrête la simulation des tours.
- **Tour suivant** : avance manuellement la simulation.
- **Réinitialiser** : régénère l'état de la carte pour l'époque courante.
- **Pays suivi** : choisissez la culture (pays) à suivre visuellement avant de lancer la partie ou à tout moment.
- **Époque** : choisissez entre 1444, 1789, 1914, 1945, 1991 ou 2025 pour démarrer à des dates clés de l'histoire mondiale.
- **Vitesse** : règle l'intervalle entre deux tours.
- **Survol sur la carte** : affiche la culture, la population et le momentum de la province pointée.
- **Scoreboard** : récapitule provinces, population totale et momentum par culture.
- Le journal recense les conquêtes et unifications récentes.

## Adapter les règles
Toute la logique se trouve dans `main.js` :
- les provinces sont chargées depuis `world-atlas` et converties en GeoJSON, puis l'adjacence est calculée avec `topojson.neighbors` pour garantir un graphe fidèle à la géographie réelle ;
- `resolveCulture` associe une culture initiale par époque en fonction du pays maître de chaque province ;
- `stepSimulation` gère croissance, momentum et conquêtes (canvas redessiné à chaque tick) ;
- ajustez les époques dans `ERAS`, la vitesse par défaut, les règles de combat ou la palette dans `CULTURE_PALETTE` pour explorer d'autres mécaniques.
