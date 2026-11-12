# Déploiement

Application d'aide à la rédaction des écrits professionnels (rapports AEMO/MJIE) pour les
travailleurs sociaux de **La Sauvegarde du Nord**. Elle montre la situation d'une famille suivie
et donne accès au rapport d'intervention à relire et compléter.

## Services

- `frontend/` : Next.js en export statique, servi par nginx sur le port 80 du conteneur (8080 sur
  la VM). **Service exposé au public.**
- `api/` : Node sans dépendance, sur le port 8081 (variable `PORT`). Routes `/health` et `/sante`
  uniquement pour l'instant ; pas encore de route métier sous `/api/v1/...`.

## Services externes appelés

Aucun pour l'instant : les deux écrans du prototype affichent des données en dur (famille Martin).
Rien ne casse si un service externe tombe, car aucun n'est encore appelé.

## Connu comme fragile ou inachevé

- Les données sont en dur dans le front (une seule famille, un seul rapport) : pas de base de
  données, pas de persistance.
- La génération du rapport par un assistant IA, visible dans le prototype, n'est pas implémentée :
  aucune hypothèse de l'équipe ne la couvre encore, et aucune clé LLM dédiée n'est configurée côté
  dépôt.
- La navigation vers l'écran « Rapport » n'est pas encore fonctionnelle (prévue en Itération 2).

## Contacts

- Côté équipe : squad `MARIONINENGLAND` (code `G9QV8W`), via PM Lab Solidaire.
- Côté association : non communiqué dans le dossier de passation.
