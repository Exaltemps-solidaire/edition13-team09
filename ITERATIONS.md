# Plan d'itérations — La Sauvegarde du Nord (G9QV8W)

- **Plan validé le 2026-11-13**, tel quel.
- **Source du plan** : proposé par l'agent — aucun plan d'itérations trouvé dans la passation (ni `cadrage/*iteration*`, ni clé `iterations` dans `passation.json`). `PASSATION.md` confirme : « Notre plan de livraison : Pas encore produit. »
- **Temps restant annoncé** : 60 minutes (question posée le 2026-11-12, avant Itération 1). Reconfirmé à 45 minutes ou plus le 2026-11-13, au début du codage de l'Itération 1.
- **Durée du tour de test de l'équipe** : 5 minutes.
- **Capacité** : chaque itération coûte au moins 10 min de codage + ~5 min de publication + 5 min de tour de test = ~20 min. 60 min ÷ 20 min = **3 itérations si tout tient pile dans le plafond, sans aucune marge**.
- ✂️ **Hors périmètre, faute de temps** : tout ce qui suit l'écran 2 du prototype (pas d'écran 3 dans `prototype/index.html` malgré les 3 écrans évoqués dans les croquis), toute génération réelle par IA du rapport (pas de clé configurée, aucune hypothèse de l'équipe à vérifier dessus), l'envoi réel au magistrat, la persistance en base. Seules 2 itérations sont détaillées ci-dessous ; une 3ᵉ, si le temps le permet, ne fera que stabiliser.
- ⚠️ La plateforme (Postgres, etc.) n'est pas encore démarrée sur cette machine — à lancer en arrière-plan dès le début de l'Itération 1, en codant pendant ce temps.
- ⚠️ Aucune hypothèse n'a été formulée par l'équipe (`cadrage/5-hypotheses.md` : « Pas encore produit »). Les critères d'acceptation ci-dessous sont déduits du prototype retenu (`prototype/index.html`), seule référence fonctionnelle disponible.

---

## Itération 1 : L'application est en ligne et montre l'écran « Vue de la situation »

- **Dans le périmètre** :
  - `.env.example` et `DEPLOIEMENT.md` (contrat de déployabilité, point manquant du squelette).
  - Reproduction de l'écran 1 du prototype : fiche « Famille Martin », mesure AEMO depuis le 14 mars 2025, schéma des 4 acteurs (Enfant/Léa, Juge/Mme Perrin, Assistant social, Parent/M. Martin), liste des 3 actions (« Capturer ce que j'entends », « Rédiger le rapport d'intervention », « Envoyer au magistrat »), barre de navigation basse à 2 onglets (Situation / Rapport).
  - Données en dur, pas d'appel API métier.
  - Déploiement complet (build, push, compose, vérification `curl`) et signalement de version.
- **Hors périmètre** : l'écran 2 (même vide ou en stub), toute navigation fonctionnelle entre les actions et un autre écran, toute logique de génération de rapport.
- **Critères d'acceptation** :
  - Étant donné l'URL publique, quand un visiteur ouvre `/`, alors il voit l'écran « Vue de la situation » avec « Famille Martin » et les 4 acteurs du schéma.
  - Étant donné l'écran affiché, quand on le compare au prototype, alors les 3 actions de la liste sont présentes et dans le même ordre.
  - Étant donné le contrat de déployabilité, quand `./scripts/verifier-deployabilite.sh` s'exécute, alors il ne signale aucune borne.
- **Hypothèse de l'équipe couverte** : aucune — `cadrage/5-hypotheses.md` est vide ; cette itération se base uniquement sur la fidélité au prototype retenu.
- **Codage estimé** : 10 minutes (proche du plafond : squelette de déploiement + reproduction d'écran).
- **Fichiers prévus** : `frontend/src/app/page.tsx`, `frontend/src/app/globals.css` (ou `page.module.css`), `.env.example`, `DEPLOIEMENT.md`, `adr.md` (si un choix structurant apparaît).
- **Tests unitaires prévus** : 1, sur une fonction pure de formatage (ex. « depuis le 14 mars 2025 » à partir d'une date) si on en introduit une ; sinon, aucun n'est dû — l'écran est du balisage pur fidèle au prototype, hors DoD du point 2.
- **Étapes ajoutées à la démo** : ouvrir l'application, vérifier la présence de « Famille Martin » et des 3 actions.
- **Bilan** : _à remplir en fin d'itération_

## Itération 2 : Le travailleur social ouvre et modifie le rapport pré-rédigé

- **Dans le périmètre** :
  - Écran 2 du prototype : notes capturées, étiquette « Rédigé par l'assistant », rapport en dur (texte de la visite du 18 juin 2025) dans un champ éditable.
  - Navigation réelle : les 3 actions de l'écran 1 mènent à l'écran 2 ; bouton « Reprendre plus tard » ramène à l'écran 1.
- **Hors périmètre** : génération réelle du texte par un LLM, envoi réel au magistrat (le bouton reste local, sans effet serveur), persistance des modifications au-delà de l'état de la page.
- **Critères d'acceptation** :
  - Étant donné l'écran 1 affiché, quand on clique « Rédiger le rapport d'intervention », alors l'écran 2 affiche le rapport pré-rédigé de la famille Martin.
  - Étant donné l'écran 2 affiché, quand on modifie le texte du champ, alors la modification reste visible à l'écran.
  - Étant donné l'écran 2 affiché, quand on clique « Reprendre plus tard », alors on revient à l'écran 1.
- **Hypothèse de l'équipe couverte** : aucune (idem Itération 1).
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** : `frontend/src/app/page.tsx` (ou nouveau composant d'écran), fichier de test associé — environ 3 fichiers.
- **Tests unitaires prévus** : 1 à 2, sur la logique de bascule d'écran (quel écran est actif selon l'action cliquée) — pas sur le balisage.
- **Étapes ajoutées à la démo** : cliquer « Rédiger le rapport d'intervention », vérifier l'affichage du rapport, cliquer « Reprendre plus tard ».
- **Bilan** : _à remplir en fin d'itération_

---

## À venir

1. Itération 3 (conditionnelle, selon temps restant après le tour de test de l'Itération 2) : stabilisation pour le pitch — pas de nouvelle fonctionnalité métier, correction de ce que le tour de test aura signalé.
