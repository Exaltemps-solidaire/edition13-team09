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
- **Bilan** :
  - Durée de codage réelle : 3 minutes (budget 10 min, pas de dépassement).
  - Critères d'acceptation : les 3 satisfaits (écran conforme au prototype, 3 actions dans l'ordre, `verifier-deployabilite.sh` sans borne).
  - Pas de test unitaire ajouté : balisage pur, aucune logique métier introduite ; `npm test` passe (2 tests existants, inchangés).
  - Déploiement réel effectué (recette du `/CLAUDE.md` racine) : plateforme démarrée, base `team09` créée, `podman-compose.yml` écrit, images construites et publiées, `curl localhost:8080/` et `localhost:8081/health` répondent ; `localhost:8080/sante` et `/health` aussi.
  - Corrections nécessaires en cours de route : les `Dockerfile` de `api/` et `frontend/` utilisaient des noms courts (`node:24-alpine`, `nginx:1.27-alpine`) qui échouaient à la résolution hors terminal interactif — qualifiés en `docker.io/library/...`, comme annoncé par le `/CLAUDE.md` racine.
  - `e2e/demo.spec.ts` mis à jour avec l'étape de l'écran 1, mais l'exécution Playwright locale échoue : Chromium headless shell installé mais ses dépendances système (`libnspr4.so`) manquent sur cette machine. Non bloquant pour la publication — signalé, pas corrigé (hors budget, hors DoD).
  - Signalé à PM Lab : version 1, `moteur_avance: false` (la squad la verra à l'étape « Le prototype »).
  - Rien n'est reporté : tout le périmètre prévu est fait.
  - **Modifications** :
    - `frontend/src/app/page.tsx` : remplace la page par défaut de Next.js par l'écran « Vue de la situation » (famille Martin, schéma des 4 acteurs, 3 actions) — sert les 2 premiers critères.
    - `frontend/src/app/page.module.css` : styles adaptés du prototype pour cet écran.
    - `frontend/nginx.conf` : en-têtes de sécurité du gabarit serveur, CSP réduite à `connect-src 'self'`, routes `/health` et `/sante` ajoutées — sert le 3ᵉ critère et la règle 5 du contrat.
    - `frontend/Dockerfile`, `api/Dockerfile` : images de base qualifiées (`docker.io/library/...`) — nécessaire à la construction sur cette machine.
    - `.env.example` : variable `PORT` de l'api documentée — règle 2 du contrat.
    - `DEPLOIEMENT.md` : page de déploiement (services, fragilités connues, contacts) — règle 8 du contrat.
    - `podman-compose.yml` : écrit à la racine, deux services sur `core-network`, ports 8080/8081 — recette de déploiement du serveur.
    - `e2e/demo.spec.ts` : étape « Je vois la situation de la famille Martin » ajoutée.

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
- **Bilan** :
  - Durée de codage réelle : 1 minute (budget 10 min, pas de dépassement).
  - Critères d'acceptation : les 3 satisfaits (navigation vers l'écran 2 depuis les 3 actions de l'écran 1, texte du rapport modifiable localement, retour à l'écran 1 via « Reprendre plus tard »). Bonus hors plan : les onglets de la barre de navigation basse sont aussi devenus fonctionnels.
  - Test unitaire ajouté : `frontend/src/app/navigation.test.ts`, sur la fonction pure `basculerEcran` (logique de bascule d'écran introduite pour cette itération) ; `npm test` passe (4 tests : 2 api + 2 front).
  - Déploiement réel effectué : image `frontend` reconstruite et republiée, `podman compose up -d --force-recreate`, `/health` et `/sante` vérifiés sur 8080 et 8081.
  - Reporté : rien.
  - Ce que le harnais a bloqué ou refusé : rien.
  - Point non résolu, signalé à nouveau : la démo Playwright reste non exécutable sur cette machine (dépendances système de Chromium absentes, `libnspr4.so` manquant) — corriger cela demande une installation système (`apt`/sudo) qui n'a pas été faite à la demande du développeur. Les 2 nouvelles étapes sont écrites dans `e2e/demo.spec.ts` mais non vérifiées localement ; à vérifier depuis un poste qui a Playwright opérationnel, ou en acceptant l'installation système dans une prochaine itération.
  - Signalé à PM Lab : version 2, `moteur_avance: false`.
  - **Modifications** :
    - `frontend/src/app/navigation.ts` : fonction pure `basculerEcran(action): Ecran` — logique de bascule d'écran, testée.
    - `frontend/src/app/navigation.test.ts` : 2 tests sur `basculerEcran`.
    - `frontend/src/app/page.tsx` : composant client (`"use client"`), état `ecran` et `rapport` ; écran 2 (notes capturées, tag IA, rapport éditable, boutons) ; les 3 actions de l'écran 1 et les 2 onglets de la nav bar deviennent cliquables — sert les 3 critères.
    - `frontend/src/app/page.module.css` : styles de l'écran 2 ajoutés (bandeau, bloc rapport, boutons), interactivité (`cursor: pointer`) sur les éléments cliquables.
    - `e2e/demo.spec.ts` : 2 étapes ajoutées (ouvrir le rapport, revenir à la situation), non exécutées localement (cf. point non résolu ci-dessus).

---

## Temps restant au début de l'Itération 2

Annoncé le 2026-11-13 : 35 minutes ou plus. Conforme à l'estimation de la replanification précédente.

## Replanification après l'Itération 1

- Codage + publication de l'Itération 1 : 5 minutes au total (3 min de codage), sans dépassement.
- Rien n'est reporté : l'Itération 2 reste valide telle que détaillée ci-dessus, sans changement de périmètre ni de priorité.
- Point de vigilance à vérifier au tour de test : la démo Playwright (`e2e/demo.spec.ts`) ne s'exécute pas encore sur cette machine (dépendances système de Chromium manquantes) — à corriger si le temps le permet, sans bloquer la publication.

## Replanification après l'Itération 2

- Codage de l'Itération 2 : 1 minute (budget 10 min) — les deux itérations codées sont très en dessous du plafond.
- ⚠️ Temps restant encore large (35 min annoncées moins ~2 min de codage+publication) : il reste probablement la place pour une itération de fonctionnalité avant la stabilisation finale, plutôt qu'une Itération 3 purement « stabilisation ». À valider avec les cadreurs avant de retailler l'Itération 3 : décision du développeur à la prochaine commande.

## À venir

1. Itération 3 (à retailler selon la décision ci-dessus) : soit une fonctionnalité supplémentaire couvrant la priorité suivante (ex. rendre réel le bouton « Envoyer au magistrat », ou différencier les 3 actions de l'écran 1), soit la stabilisation pour le pitch si le temps restant annoncé est redescendu.
