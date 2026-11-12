"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { basculerEcran, type Ecran } from "./navigation";

// Écrans 1 et 2 du prototype retenu (passation/prototype/index.html).
// Données en dur (Itération 2) — la génération réelle du rapport par un assistant IA n'est pas implémentée.
export default function Home() {
  const [ecran, setEcran] = useState<Ecran>("situation");
  const [rapport, setRapport] = useState(
    "Lors de la visite du 18 juin 2025, Léa était présente avec son père. L'enfant s'exprime librement et paraît sereine à domicile. Le père rapporte une amélioration de la situation scolaire. Aucun élément de préoccupation immédiate n'a été relevé. Une prochaine visite est envisagée avant la rentrée.",
  );

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        {ecran === "situation" ? (
          <header className={styles.header}>
            <div className={styles.labelService}>Intervention en cours</div>
            <h1>Famille Martin</h1>
            <div className={styles.subtitle}>Mesure AEMO · depuis le 14 mars 2025</div>
          </header>
        ) : (
          <header className={styles.header}>
            <div className={styles.labelService}>Rapport d&apos;intervention</div>
            <h1>Famille Martin</h1>
            <div className={styles.subtitle}>Visite du 18 juin 2025 · 14 h 30</div>
          </header>
        )}

        {ecran === "situation" ? (
          <>
            <div className={styles.relationsArea}>
              <div className={styles.areaLabel}>Acteurs de la situation</div>
              <div className={styles.relationsDiagram}>
                <div className={styles.actorBubble}>
                  Enfant
                  <br />
                  <span className={styles.actorMeta}>Léa, 9 ans</span>
                </div>
                <div className={styles.actorBubble}>
                  Juge
                  <br />
                  <span className={styles.actorMeta}>Mme Perrin</span>
                </div>
                <div className={`${styles.actorBubble} ${styles.central}`}>
                  Assistant social
                  <br />
                  <span className={styles.actorMeta}>Moi</span>
                </div>
              </div>
              <div className={styles.parentRow}>
                <span>→ Parent · M. Martin</span>
              </div>
            </div>

            <div className={styles.sectionTitle}>Que faire maintenant ?</div>
            <div className={styles.actionList}>
              <button
                type="button"
                className={styles.actionItem}
                onClick={() => setEcran(basculerEcran("aller-au-rapport"))}
              >
                <span className={styles.actionItemText}>Capturer ce que j&apos;entends</span>
                <span className={styles.actionItemArrow}>›</span>
              </button>
              <button
                type="button"
                className={styles.actionItem}
                onClick={() => setEcran(basculerEcran("aller-au-rapport"))}
              >
                <span className={styles.actionItemText}>Rédiger le rapport d&apos;intervention</span>
                <span className={styles.actionItemArrow}>›</span>
              </button>
              <button
                type="button"
                className={styles.actionItem}
                onClick={() => setEcran(basculerEcran("aller-au-rapport"))}
              >
                <span className={styles.actionItemText}>Envoyer au magistrat</span>
                <span className={styles.actionItemArrow}>›</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.feedbackBanner}>
              Cet écran est en cours de réflexion – son contenu reste à préciser.
            </div>
            <div className={styles.noteCapture}>✦ Notes capturées : 3 points clés repérés pendant l&apos;échange</div>
            <div className={styles.rapportBloc}>
              <span className={styles.tagIa}>Rédigé par l&apos;assistant</span>
              <textarea
                value={rapport}
                onChange={(e) => setRapport(e.target.value)}
                aria-label="Texte du rapport d'intervention"
              />
            </div>
            <button type="button" className={styles.btnPrimary}>
              Envoyer au magistrat
            </button>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setEcran(basculerEcran("revenir-a-situation"))}
            >
              Reprendre plus tard
            </button>
          </>
        )}

        <nav className={styles.navBar}>
          <button
            type="button"
            className={ecran === "situation" ? "active" : ""}
            onClick={() => setEcran(basculerEcran("revenir-a-situation"))}
          >
            Situation
          </button>
          <button
            type="button"
            className={ecran === "rapport" ? "active" : ""}
            onClick={() => setEcran(basculerEcran("aller-au-rapport"))}
          >
            Rapport
          </button>
        </nav>
      </div>
    </div>
  );
}
